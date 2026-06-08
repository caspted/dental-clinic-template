"use client";

import React from "react";
import Script from "next/script";

export default function ChatAssistant() {
  return (
    <Script
      src="https://beta.leadconnectorhq.com/loader.js"
      data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6a20d5f57645b2ba9abe9e52"
      strategy="afterInteractive"
    />
  );
}

