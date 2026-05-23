"use client";

import React, { useState, useEffect, useRef } from "react";
import { ghlCustomValues } from "../config/ghlConfig";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isStickyVisible, setIsStickyVisible] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load initial prompt and toggle welcome tooltip
  useEffect(() => {
    // Initial friendly greeting utilizing custom practice and assistant configuration
    setMessages([
      {
        role: "assistant",
        content: `Hi! I'm ${ghlCustomValues.setter_name || "Sarah"}, your virtual smile assistant for ${ghlCustomValues.practice_name}. How can I help you today? Ask me about implants, insurance, financing, or booking your free consult!`,
        timestamp: new Date()
      }
    ]);

    // Check if dismissed previously in session
    const tooltipDismissed = sessionStorage.getItem("sarah_tooltip_dismissed");
    if (!tooltipDismissed) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 3500); // Popup welcome text bubble after 3.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Track sticky bottom mobile CTA visibility to dynamically position floating elements
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && window.scrollY > 400) {
        setIsStickyVisible(true);
      } else {
        setIsStickyVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
    sessionStorage.setItem("sarah_tooltip_dismissed", "true");
  };

  const handleDismissTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    sessionStorage.setItem("sarah_tooltip_dismissed", "true");
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Create user message
    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Fast-path local interceptor: direct scroll for schedule inquiries
    const cleanText = text.toLowerCase();
    if (cleanText.includes("book") || cleanText.includes("schedule") || cleanText.includes("appointment") || cleanText.includes("calendar")) {
      await new Promise((resolve) => setTimeout(resolve, 850));
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Perfect! I'm opening our live appointment calendar right now. Please select your preferred day and time from the booking section.`,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
      scrollToBooking();
      return;
    }

    try {
      // Send chat history and current prompt to internal secure api handler
      // Mapping messages to fit Gemini API role standard (alternating user/assistant)
      const chatHistory = messages.concat(userMessage).map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!response.ok) {
        throw new Error("Chat api failed");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          timestamp: new Date()
        }
      ]);

      // If AI tags state trigger, automatically scroll down to dynamic scheduling widget
      if (data.triggerBooking) {
        setTimeout(() => {
          scrollToBooking();
        }, 1200);
      }

    } catch (error) {
      console.error("Chatbot assistant transaction failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, my connection sputtered! But I can definitely help. You can view our pricing and book a direct consultation with ${ghlCustomValues.doctor_name} using the intake calendar right on this page!`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  // Quick chips definitions
  const quickReplies = [
    { text: "Do you take PPO insurance? 🛡️", query: "Do you accept PPO insurance?" },
    { text: "How much are implants? 🦷", query: "What are the price ranges for dental implants?" },
    { text: "Are there financing options? 💳", query: "Do you have monthly payment plans or financing?" },
    { text: "Book Consultation ⚡", query: "I would like to book a direct appointment consultation." }
  ];

  return (
    <>
      {/* Floating Toggle Trigger Button */}
      <div className={`fixed right-6 z-[9999] flex flex-col items-end transition-all duration-300 ${isStickyVisible ? "bottom-[84px] md:bottom-6" : "bottom-6"}`}>
        {/* Tooltip Welcome Banner */}
        {showTooltip && (
          <div 
            onClick={handleToggle}
            className="mb-3.5 bg-white border border-black/8 rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] max-w-[270px] cursor-pointer animate-fade-in relative hover:border-accent hover:shadow-accent transition-all duration-300"
          >
            <button 
              onClick={handleDismissTooltip}
              className="absolute top-2 right-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Dismiss"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex gap-3 items-start pr-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-glow text-accent flex items-center justify-center font-bold text-sm border border-accent/15">
                {ghlCustomValues.setter_name ? ghlCustomValues.setter_name[0] : "S"}
              </span>
              <div>
                <p className="text-[13px] font-bold text-text-primary mb-0.5">{ghlCustomValues.setter_name || "Sarah"}</p>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Have questions about pricing, procedures, or insurance? Let&apos;s chat!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pulsing Toggle Bubble */}
        <button
          onClick={handleToggle}
          className={`w-[60px] h-[60px] rounded-full bg-gradient-to-tr from-[#0284C7] to-[#0EA5E9] text-white flex items-center justify-center shadow-[0_12px_24px_-6px_rgba(14, 165, 233, 0.4)] hover:shadow-[0_12px_24px_rgba(14,165,233,0.6)] active:scale-95 transition-all duration-300 cursor-pointer relative group`}
        >
          {/* Active online green dot */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full animate-ping opacity-75" />
          </span>

          {isOpen ? (
            // Close SVG
            <svg className="w-6 h-6 transition-transform duration-300 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Animated Chat SVG
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742a3 3 0 000 2.518l6.837 3.419A3 3 0 0021 16V8a3 3 0 00-5.479-1.679l-6.837 3.42z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Main Slide-in Glassmorphic Chat Drawer */}
      {isOpen && (
        <div 
          className={`fixed right-6 w-[380px] h-[525px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/8 flex flex-col z-[9999] overflow-hidden animate-scale-up transition-all duration-300 ${isStickyVisible ? "bottom-[156px] md:bottom-24" : "bottom-24"}`}
        >
          {/* Drawer Header Area */}
          <div className="bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center font-bold text-lg border border-white/20">
                {ghlCustomValues.setter_name ? ghlCustomValues.setter_name[0] : "S"}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-sky-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-[15px] leading-tight flex items-center gap-1.5">
                  {ghlCustomValues.setter_name || "Sarah"}
                  <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider text-[9.5px]">Assistant</span>
                </h4>
                <p className="text-[11.5px] text-white/80 font-medium">Online • Answers standard inquiries</p>
              </div>
            </div>
            <button 
              onClick={handleToggle}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Feed History Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-secondary/40 select-text">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-[82%] animate-fade-in ${
                  msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                {/* Bubble styling */}
                <div
                  className={`px-4 py-3 rounded-2xl text-[14.5px] leading-relaxed shadow-sm font-medium ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-tr-sm"
                      : "bg-white border border-black/6 text-text-primary rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                {/* Timestamp */}
                <span className="text-[10.5px] text-text-muted mt-1 px-1.5 font-medium">
                  {msg.timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                </span>
              </div>
            ))}

            {/* Simulating active typing loader */}
            {isTyping && (
              <div className="flex flex-col max-w-[82%] mr-auto items-start animate-fade-in">
                <div className="px-4 py-3 bg-white border border-black/6 text-text-primary rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-reply dynamic interactive pills */}
          <div className="px-4 py-2 border-t border-black/6 bg-white/70 overflow-x-auto flex gap-1.5 scrollbar-none flex-shrink-0">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(reply.query)}
                className="whitespace-nowrap flex-shrink-0 text-[12.5px] font-bold text-text-secondary border border-black/8 hover:border-accent hover:text-accent bg-bg-secondary hover:bg-accent-glow/30 px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {reply.text}
              </button>
            ))}
          </div>

          {/* Input text message bar */}
          <form 
            onSubmit={handleFormSubmit}
            className="p-3 bg-white border-t border-black/8 flex items-center gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about treatments, pricing, or hours..."
              className="flex-1 h-[40px] px-4 text-base border border-black/8 bg-bg-secondary rounded-full focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent-glow transition-all font-medium text-text-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-[40px] h-[40px] rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center transition-all cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send Message"
            >
              <svg className="w-4 h-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
