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
  practice_name: process.env.NEXT_PUBLIC_GHL_PRACTICE_NAME || "Zenith Dental Care",
  practice_tagline: process.env.NEXT_PUBLIC_GHL_PRACTICE_TAGLINE || "Get the Confident, Healthy Smile You Deserve",
  practice_phone: process.env.NEXT_PUBLIC_GHL_PRACTICE_PHONE || "(415) 555-0199",
  practice_address: process.env.NEXT_PUBLIC_GHL_PRACTICE_ADDRESS || "450 Sutter St, Suite 2100",
  practice_city: process.env.NEXT_PUBLIC_GHL_PRACTICE_CITY || "San Francisco",
  practice_state: process.env.NEXT_PUBLIC_GHL_PRACTICE_STATE || "CA",
  practice_website: process.env.NEXT_PUBLIC_GHL_PRACTICE_WEBSITE || "https://zenithdentalsf.com",
  doctor_name: process.env.NEXT_PUBLIC_GHL_DOCTOR_NAME || "Dr. Alex Mercer",
  doctor_first_name: process.env.NEXT_PUBLIC_GHL_DOCTOR_FIRST_NAME || "Alex",
  doctor_email: process.env.NEXT_PUBLIC_GHL_DOCTOR_EMAIL || "info@zenithdentalsf.com",
  doctor_specialty: process.env.NEXT_PUBLIC_GHL_DOCTOR_SPECIALTY || "Premium General & Cosmetic Dentist",
  procedures_offered: process.env.NEXT_PUBLIC_GHL_PROCEDURES_OFFERED || "Checkups & Cleaning, Smile Design & Veneers, Implants & Crowns",
  implant_price_low: formatPrice(process.env.NEXT_PUBLIC_GHL_IMPLANT_PRICE_LOW, "$1,500"),
  implant_price_high: formatPrice(process.env.NEXT_PUBLIC_GHL_IMPLANT_PRICE_HIGH, "$3,000"),
  financing_options: process.env.NEXT_PUBLIC_GHL_FINANCING_OPTIONS || "flexible, 0% interest monthly payment options through CareCredit",
  setter_name: process.env.NEXT_PUBLIC_GHL_SETTER_NAME || "Sarah",
  setter_email: process.env.NEXT_PUBLIC_GHL_SETTER_EMAIL || "appointments@clinic.com",
  followup_from_name: process.env.NEXT_PUBLIC_GHL_FOLLOWUP_FROM_NAME || "Scheduling Team",
  followup_from_email: process.env.NEXT_PUBLIC_GHL_FOLLOWUP_FROM_EMAIL || "nurture@clinic.com",
  imaging_type: process.env.NEXT_PUBLIC_GHL_IMAGING_TYPE || "Digital X-Rays (90% less radiation)"
};
