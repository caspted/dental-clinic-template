import { NextResponse } from "next/server";
import { ghlCustomValues } from "../../../config/ghlConfig";

// Dynamic System Prompt derived from GHL custom configurations
const SYSTEM_PROMPT = `
You are ${ghlCustomValues.setter_name || "Sarah"}, a warm, friendly, and highly professional virtual receptionist for ${ghlCustomValues.practice_name || "Zenith Dental Care"}. 
Your goal is to answer patient inquiries gently, address their concerns about treatments or pricing, and guide them to schedule a consultation with our specialists, ${ghlCustomValues.doctor_name || "Dr. Kristine Marcial & Dr. Kaelen Daulo"}.

Here are your core practice business details:
- Practice Name: ${ghlCustomValues.practice_name}
- Tagline: ${ghlCustomValues.practice_tagline}
- Lead Dentists: ${ghlCustomValues.doctor_name} (${ghlCustomValues.doctor_specialty})
- Treatments Offered: ${ghlCustomValues.procedures_offered}
- Dental Implant Pricing: Low range starts at ${ghlCustomValues.implant_price_low} and high range is ${ghlCustomValues.implant_price_high}.
- Financing Options: ${ghlCustomValues.financing_options}
- Address: ${ghlCustomValues.practice_address}, ${ghlCustomValues.practice_city}, ${ghlCustomValues.practice_state}
- Phone Number: ${ghlCustomValues.practice_phone}
- Clinic Website: ${ghlCustomValues.practice_website}
- Imaging Technologies: ${ghlCustomValues.imaging_type}

Conversation Guidelines:
1. Tone: Empathetic, welcoming, clear, and clinical yet deeply friendly.
2. Conciseness: Keep responses short and conversational (max 2-3 sentences). This fits perfectly in a mobile floating chat bubble.
3. Medical Safety: Never diagnose dental issues or suggest specific treatments for symptoms. Always advise the patient to book a free assessment with our dentists, ${ghlCustomValues.doctor_name}, to get a professional diagnosis.
4. Booking Goal: If the patient expresses interest in visiting the clinic, scheduling an appointment, taking the assessment, or booking a consultation, explain how easy it is to schedule and append the exact tag "[TRIGGER_BOOKING]" to the very end of your response text.

Example: "We can certainly help you with that! [TRIGGER_BOOKING]"
`;

// Helper: Provide realistic fallback response in mock mode
function getMockResponse(message: string): { response: string; triggerBooking: boolean } {
  const msg = message.toLowerCase();

  let response = `Hello! I'm ${ghlCustomValues.setter_name}, your virtual care assistant here at ${ghlCustomValues.practice_name}. How can I help you care for your smile today?`;
  let triggerBooking = false;

  if (msg.includes("price") || msg.includes("cost") || msg.includes("implants") || msg.includes("how much")) {
    response = `For dental implants, our high-quality placements typically range from ${ghlCustomValues.implant_price_low} to ${ghlCustomValues.implant_price_high}. We also offer ${ghlCustomValues.financing_options} to make care accessible. Would you like to schedule a free assessment to get an exact quote?`;
  } else if (msg.includes("insurance") || msg.includes("ppo") || msg.includes("coverage")) {
    response = `We accept most major PPO dental insurances and do a real-time benefits match! We can check your specific plan coverage during your free diagnostic consult. Shall we get that set up for you?`;
    triggerBooking = true;
  } else if (msg.includes("book") || msg.includes("appointment") || msg.includes("schedule") || msg.includes("visit") || msg.includes("consult")) {
    response = `I'd love to help you lock in an appointment with ${ghlCustomValues.doctor_name}! Let's open our live calendar so you can pick a convenient slot.`;
    triggerBooking = true;
  } else if (msg.includes("address") || msg.includes("where") || msg.includes("location") || msg.includes("direction")) {
    response = `Our modern clinic is located at ${ghlCustomValues.practice_address} in ${ghlCustomValues.practice_city}, ${ghlCustomValues.practice_state}. We have convenient parking available for patients!`;
  } else if (msg.includes("phone") || msg.includes("number") || msg.includes("call")) {
    response = `You can call our scheduling desk directly at ${ghlCustomValues.practice_phone}! We are always happy to help you over the phone.`;
  } else if (msg.includes("pain") || msg.includes("hurt") || msg.includes("emergency") || msg.includes("bleeding")) {
    response = `I'm so sorry to hear you're experiencing pain. While I cannot give medical advice, our dentists recommend having it checked immediately to prevent further infection. Let's get you in for a diagnostic visit right away.`;
    triggerBooking = true;
  } else if (msg.includes("financing") || msg.includes("credit") || msg.includes("payment")) {
    response = `Yes, we support ${ghlCustomValues.financing_options}. This allows you to split payments with 0% interest! Would you like to schedule a checkup to discuss custom smile financing?`;
  }

  return { response, triggerBooking };
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // Validate parameters
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages history array is required." }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1].content;

    // Fallback: If no API key is set, run in premium mock interactive mode
    if (!apiKey || apiKey === "your_gemini_api_key_placeholder" || apiKey.trim() === "") {
      const mockResult = getMockResponse(latestMessage);
      // Add slight synthetic latency for realistic feel
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({
        response: mockResult.response,
        triggerBooking: mockResult.triggerBooking,
        isMock: true
      });
    }

    // Format message history for Gemini API Structure
    // Gemini roles must alternate user/model
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    // Call standard Gemini Developer API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const apiPayload = {
      contents: contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    };

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Gemini API direct call returned error status:", response.status, errorText);
      // Failover to mock responder so front-end clinic experience NEVER breaks
      const mockResult = getMockResponse(latestMessage);
      return NextResponse.json({
        response: mockResult.response,
        triggerBooking: mockResult.triggerBooking,
        isMock: true,
        error: "Fallback activated due to API error"
      });
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse out trigger booking flag
    const triggerBooking = text.includes("[TRIGGER_BOOKING]");
    text = text.replace("[TRIGGER_BOOKING]", "").trim();

    return NextResponse.json({
      response: text || "I am happy to assist you. Would you like to schedule an assessment?",
      triggerBooking: triggerBooking,
      isMock: false
    });

  } catch (error: any) {
    console.error("Execution breakdown inside chat API handler:", error);
    // Absolute safety fallback
    return NextResponse.json({
      response: `Thank you for reaching out! To lock in your consultation with our dentists, please fill out the quick intake form right here on the page, or give us a call.`,
      triggerBooking: true,
      isMock: true
    });
  }
}
