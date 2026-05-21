import React from "react";

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

// 1. Preventive Care / Shield Icon
export function ShieldIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

// 2. Cosmetic Artistry / Sparkles Icon
export function SparklesIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3c.1 2.5 1.5 3.9 4 4-2.5.1-3.9 1.5-4 4-.1-2.5-1.5-3.9-4-4 2.5-.1 3.9-1.5 4-4z" fill="currentColor" fillOpacity="0.1" />
      <path d="M19 14c.05 1.3.7 1.95 2 2-1.3.05-1.95.7-2 2-.05-1.3-.7-1.95-2-2 1.3-.05 1.95-.7 2-2z" />
      <path d="M5 15c.05 1.3.7 1.95 2 2-1.3.05-1.95.7-2 2-.05-1.3-.7-1.95-2-2 1.3-.05 1.95-.7 2-2z" />
    </svg>
  );
}

// 3. Restoration / Dental Implant Icon
export function ImplantIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dental Crown outline */}
      <path d="M6 5c0-1.5 2-2.5 6-2.5s6 1 6 2.5c0 1.5-.8 2.5-2 3H10C8.8 7.5 6 6.5 6 5z" fill="currentColor" fillOpacity="0.05" />
      {/* Abutment base */}
      <path d="M10 8h4v2h-4z" />
      {/* Titanium Screw Threads */}
      <path d="M12 10v11" />
      <path d="M9 12h6" />
      <path d="M10 15h4" />
      <path d="M9 18h6" />
      <path d="M11 21h2" />
    </svg>
  );
}

// 4. Smile Goal / Tooth Icon
export function ToothIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1 4 2.2 5.2.8.8.8 2.3.3 3.3l-.5 1c-.3.7 0 1.5.7 1.5h1.3c.7 0 1.3-.5 1.5-1.2l.5-1.8c.2-.7.8-1.2 1.5-1.2s1.3.5 1.5 1.2l.5 1.8c.2.7.8 1.2 1.5 1.2h1.3c.7 0 1-.8.7-1.5l-.5-1c-.5-1-.5-2.5.3-3.3 1.2-1.2 2.2-2.7 2.2-5.2 0-3.5-2.5-6-6-6z" fill="currentColor" fillOpacity="0.05" />
    </svg>
  );
}

// 5. Credit Card / Finance Icon
export function CardIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.05" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <rect x="5" y="14" width="3" height="2" rx="0.5" />
    </svg>
  );
}

// 6. Close / Cancel Icon
export function CloseIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

// 7. Document / PDF Icon
export function DocumentIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" fillOpacity="0.05" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

// 8. Checkmark Icon
export function CheckIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
