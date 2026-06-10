const formatPrice = (val: string | undefined, fallback: string): string => {
  if (!val) return fallback;
  // Repair environment variable expansions where $1 or $3 are interpreted as bash variables
  if (val.startsWith(",500")) return "$1,500";
  if (val.startsWith(",000")) return "$3,000";
  if (!val.startsWith("$")) {
    return `$${val}`;
  }
  return val;
};

export const ghlCustomValues = {
  practice_name: process.env.NEXT_PUBLIC_GHL_PRACTICE_NAME || "Bocobo Dental Care Co.",
  practice_tagline: process.env.NEXT_PUBLIC_GHL_PRACTICE_TAGLINE || "Quality and Affordable Dental Treatment in Manila",
  practice_phone: process.env.NEXT_PUBLIC_GHL_PRACTICE_PHONE || "0922 443 7318",
  practice_address: process.env.NEXT_PUBLIC_GHL_PRACTICE_ADDRESS || "3rd Floor Bocobo Commercial Center, 1253 J. Bocobo St. Corner Padre Faura St., Ermita, Manila, 1000, Philippines",
  practice_city: process.env.NEXT_PUBLIC_GHL_PRACTICE_CITY || "Manila",
  practice_state: process.env.NEXT_PUBLIC_GHL_PRACTICE_STATE || "Metro Manila",
  practice_website: process.env.NEXT_PUBLIC_GHL_PRACTICE_WEBSITE || "https://www.bocobodentalcare.com",
  doctor_name: process.env.NEXT_PUBLIC_GHL_DOCTOR_NAME || "Dr. Kristine Marcial & Dr. Kaelen Daulo",
  doctor_first_name: process.env.NEXT_PUBLIC_GHL_DOCTOR_FIRST_NAME || "Dr. Marcial & Dr. Daulo",
  doctor_email: process.env.NEXT_PUBLIC_GHL_DOCTOR_EMAIL || "info@bocobodentalcare.com",
  doctor_specialty: process.env.NEXT_PUBLIC_GHL_DOCTOR_SPECIALTY || "General, Implant & Esthetic Dentistry Specialists",
  procedures_offered: process.env.NEXT_PUBLIC_GHL_PROCEDURES_OFFERED || "Checkups & Cleaning, Smile Design & Veneers, Implants & Orthodontics",
  implant_price_low: formatPrice(process.env.NEXT_PUBLIC_GHL_IMPLANT_PRICE_LOW, "$1,500"),
  implant_price_high: formatPrice(process.env.NEXT_PUBLIC_GHL_IMPLANT_PRICE_HIGH, "$3,000"),
  financing_options: process.env.NEXT_PUBLIC_GHL_FINANCING_OPTIONS || "flexible, installment and card options available",
  setter_name: process.env.NEXT_PUBLIC_GHL_SETTER_NAME || "Sarah",
  setter_email: process.env.NEXT_PUBLIC_GHL_SETTER_EMAIL || "appointments@bocobodentalcare.com",
  followup_from_name: process.env.NEXT_PUBLIC_GHL_FOLLOWUP_FROM_NAME || "Bocobo Scheduling Team",
  followup_from_email: process.env.NEXT_PUBLIC_GHL_FOLLOWUP_FROM_EMAIL || "nurture@bocobodentalcare.com",
  imaging_type: process.env.NEXT_PUBLIC_GHL_IMAGING_TYPE || "Modern Digital X-Rays",
  webhook_url: process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL || "",
  form_embed_url: process.env.NEXT_PUBLIC_GHL_FORM_EMBED_URL || "",
  calendar_embed_url: process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL || "",
  chatbot_widget_id: process.env.NEXT_PUBLIC_GHL_CHATBOT_WIDGET_ID || ""
};
