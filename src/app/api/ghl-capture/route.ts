import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, phone, dental_goal, insurance, message } = body;

    // Validate backend structural environment presence
    const ghlToken = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!ghlToken || !locationId) {
      return NextResponse.json(
        { error: "Missing backend configuration variables." },
        { status: 500 }
      );
    }

    // Build GoHighLevel Contact Create Payload matching the API v2 standard
    const ghlPayload = {
      firstName: first_name,
      lastName: last_name,
      email: email,
      phone: phone,
      locationId: locationId,
      tags: ["Dental Intake Quiz Lead", `Goal: ${dental_goal}`, `Insurance: ${insurance}`],
      customFields: [
        { key: "dental_goal", value: dental_goal },
        { key: "insurance_type", value: insurance },
        { key: "custom_message", value: message || "" }
      ]
    };

    const ghlResponse = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ghlToken}`,
        "Content-Type": "application/json",
        "Version": "2021-07-28" // Explicit header version key for HighLevel infrastructure
      },
      body: JSON.stringify(ghlPayload),
    });

    if (!ghlResponse.ok) {
      const errorData = await ghlResponse.text();
      return NextResponse.json(
        { error: `GHL API error status: ${errorData}` },
        { status: ghlResponse.status }
      );
    }

    const result = await ghlResponse.json();
    return NextResponse.json({ success: true, contactId: result.contact?.id });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Execution Breakdown" },
      { status: 500 }
    );
  }
}
