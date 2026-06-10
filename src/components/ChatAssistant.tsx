"use client";

import React from "react";
import Script from "next/script";
import { ghlCustomValues } from "../config/ghlConfig";

export default function ChatAssistant() {
  const widgetId = ghlCustomValues.chatbot_widget_id;

  if (!widgetId) {
    return null;
  }

  return (
    <Script
      src="https://beta.leadconnectorhq.com/loader.js"
      data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={widgetId}
      strategy="afterInteractive"
    />
  );
}

