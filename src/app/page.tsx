import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsRow from "../components/StatsRow";
import ServicesPillars from "../components/ServicesPillars";
import Reviews from "../components/Reviews";
import BookingQuiz from "../components/BookingQuiz";
import AccordionFAQ from "../components/AccordionFAQ";
import Footer from "../components/Footer";
import ChatAssistant from "../components/ChatAssistant";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero Section Banner */}
        <Hero />

        {/* Practice Experience counters */}
        <StatsRow />

        {/* Services / Treatments Grid */}
        <ServicesPillars />

        {/* Patient Review Sliders */}
        <Reviews />

        {/* Multi-step Intake Questionnaire & GHL Booking Calendar */}
        <BookingQuiz />

        {/* Frequently Asked Objections FAQ */}
        <AccordionFAQ />
      </main>

      {/* Footer Contact Details & Legal Maps */}
      <Footer />

      {/* Floating AI reception desk assistant */}
      <ChatAssistant />
    </div>
  );
}
