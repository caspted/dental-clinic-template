import type { Metadata } from "next";
import { Libre_Franklin, Montserrat } from "next/font/google";
import "./globals.css";
import { ghlCustomValues } from "../config/ghlConfig";

const libreFranklin = Libre_Franklin({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bocobo Dental Care Co. : Quality & Affordable Dentist Manila",
  description: "Experience quality and affordable dental treatment in Manila with a complete and well-equipped dental clinic. Book your dental appointment with Bocobo Dental Care Co.",
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
      "postalCode": "1004",
      "addressCountry": "PH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 14.578069,
      "longitude": 120.982349
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
    "employee": [
      {
        "@type": "Dentist",
        "name": "Dr. Kristine Marcial",
        "jobTitle": "Dentist"
      },
      {
        "@type": "Dentist",
        "name": "Dr. Kaelen Daulo",
        "jobTitle": "Dentist"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${libreFranklin.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
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
