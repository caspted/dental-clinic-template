import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ghlCustomValues } from "../config/ghlConfig";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenith Dental Care : Premium General & Cosmetic Dentist San Francisco",
  description: "Experience premium, state-of-the-art dental care in San Francisco. Get the confident, healthy smile you deserve with our signature comfort guarantee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": ghlCustomValues.practice_name,
    "image": `${ghlCustomValues.practice_website}/assets/hero.webp`,
    "@id": `${ghlCustomValues.practice_website}/#dentist`,
    "url": ghlCustomValues.practice_website,
    "telephone": ghlCustomValues.practice_phone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ghlCustomValues.practice_address,
      "addressLocality": ghlCustomValues.practice_city,
      "addressRegion": ghlCustomValues.practice_state,
      "postalCode": "94108",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.7892,
      "longitude": -122.4081
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "medicalSpecialty": "CosmeticDentistry",
    "employee": {
      "@type": "Dentist",
      "name": ghlCustomValues.doctor_name,
      "jobTitle": ghlCustomValues.doctor_specialty
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
