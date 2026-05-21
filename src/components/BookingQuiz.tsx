"use client";

import React, { useState, useEffect } from "react";
import { ghlCustomValues } from "../config/ghlConfig";
import {
  ToothIcon,
  SparklesIcon,
  ImplantIcon,
  ShieldIcon,
  CardIcon,
  CloseIcon,
  DocumentIcon,
  CheckIcon,
} from "./Icons";

interface FormData {
  dental_goal: string;
  insurance: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export default function BookingQuiz() {
  const [step, setStep] = useState<number>(1); // 1: Goal, 2: Insurance, 3: Contact, 4: Qualified (Calendar), 5: Disqualified (PDF)
  const [formData, setFormData] = useState<FormData>({
    dental_goal: "",
    insurance: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // API Call States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Calendar States
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState<boolean>(false);

  // PDF Download States
  const [pdfDownloading, setPdfDownloading] = useState<boolean>(false);
  const [pdfDownloaded, setPdfDownloaded] = useState<boolean>(false);
  const [showNurture, setShowNurture] = useState<boolean>(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Helper validators
  const validateField = (name: keyof FormData, val: string): string => {
    if (!val.trim()) {
      return "This field is required";
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val.trim())) {
        return "Please enter a valid email address";
      }
    }
    if (name === "phone") {
      const cleanPhone = val.replace(/\D/g, "");
      if (cleanPhone.length < 10) {
        return "Please enter a valid 10-digit phone number";
      }
    }
    return "";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errorMsg = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleRadioChange = (name: "dental_goal" | "insurance", value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // Submit assessment logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate step 3 fields
    const newErrors: FormErrors = {};
    let isFormValid = true;

    (["first_name", "last_name", "email", "phone"] as const).forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
        isFormValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    });

    if (!isFormValid) {
      return;
    }

    // GHL Qualifying Score Schema calculation
    let score = 0;
    let disqualified = false;

    // Smile Goal Score mapping
    if (formData.dental_goal === "invisalign") score += 20;
    else if (formData.dental_goal === "whitening") score += 10;
    else if (formData.dental_goal === "implants") score += 20;
    else if (formData.dental_goal === "cleaning") score += 0;

    // Insurance Score mapping
    if (formData.insurance === "yes") score += 15;
    else if (formData.insurance === "self-fund") score += 15;
    else if (formData.insurance === "no-fund") {
      score += 0;
      disqualified = true; // Hard disqualification trigger
    }

    setIsSubmitting(true);
    setApiError(null);

    // Route checks
    if (score >= 30 && !disqualified) {
      try {
        const response = await fetch("/api/ghl-capture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to process intake data");
        }

        // Successfully captured by secure GHL API handler, proceed to scheduler
        setStep(4);
      } catch (err: any) {
        console.error(err);
        setApiError("A connection error occurred. Direct booking is currently loading.");
        // Still allow them to see the scheduler so client UX is never broken
        setStep(4);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Disqualified / low ticket route
      setIsSubmitting(false);
      setStep(5);
    }
  };

  // Mock Calendar days generation
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthYearLabel = `${monthNames[month]} ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCalendarDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysCells = [];
  // Trailing empty days
  for (let i = 0; i < firstDayIndex; i++) {
    daysCells.push(<div key={`empty-${i}`} className="aspect-square bg-transparent" />);
  }

  // Active month days
  for (let d = 1; d <= lastDay; d++) {
    const cellDate = new Date(year, month, d);
    const isPast = cellDate < today;
    const isSunday = cellDate.getDay() === 0;
    const isDisabled = isPast || isSunday;

    const isActive =
      selectedDate &&
      selectedDate.getDate() === d &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;

    daysCells.push(
      <button
        key={`day-${d}`}
        type="button"
        disabled={isDisabled}
        onClick={() => {
          setSelectedDate(cellDate);
          setSelectedSlot(null);
        }}
        className={`aspect-square flex items-center justify-center text-[14.4px] font-medium rounded-md border border-transparent transition-all duration-200 ${
          isDisabled
            ? "text-text-muted bg-transparent cursor-not-allowed opacity-40"
            : isActive
            ? "bg-accent text-white font-bold"
            : "bg-white text-text-primary hover:border-accent hover:bg-accent-glow cursor-pointer shadow-sm"
        }`}
      >
        {d}
      </button>
    );
  }

  const mockSlots = ["9:00 AM", "10:15 AM", "11:30 AM", "1:45 PM", "3:00 PM", "4:15 PM"];

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setIsBookingConfirmed(true);
  };

  // PDF Trigger
  const handlePdfDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setPdfDownloading(true);

    setTimeout(() => {
      setPdfDownloading(false);
      setPdfDownloaded(true);
      setShowNurture(true);

      // Trigger actual dummy download
      const link = document.createElement("a");
      link.href = "data:application/pdf;base64,JVBERi0xLjQKJVRleHQgR3VpZGUgRG93bmxvYWQgU2ltdWxhdG9yCg==";
      link.download = `${ghlCustomValues.practice_name.replace(/\s+/g, "_")}_Pricing_Guide_2026.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <section id="booking" className="py-12 md:py-24 bg-bg-secondary border-t border-b border-black/8">
      <div className="w-full max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-12 md:gap-24 items-center">
        {/* Left Side Guarantees */}
        <div className="flex flex-col items-start">
          <span className="text-[13px] font-bold tracking-[1.5px] uppercase text-accent mb-2">
            Simple & Comfortable Intake
          </span>
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold leading-tight tracking-tight text-text-primary mb-4">
            Book Your Assessment
          </h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            Take our quick 1-minute smile quiz to check your PPO insurance coverage, qualify your candidacy, and schedule your appointment immediately.
          </p>
          <div className="flex flex-col gap-3">
            <div className="text-[15px] font-semibold text-text-primary flex items-center gap-2.5">
              <CheckIcon className="text-accent w-4.5 h-4.5" strokeWidth={2.5} /> Real-time PPO Insurance Match
            </div>
            <div className="text-[15px] font-semibold text-text-primary flex items-center gap-2.5">
              <CheckIcon className="text-accent w-4.5 h-4.5" strokeWidth={2.5} /> Free Guided Cosmetic Consultation
            </div>
            <div className="text-[15px] font-semibold text-text-primary flex items-center gap-2.5">
              <CheckIcon className="text-accent w-4.5 h-4.5" strokeWidth={2.5} /> Comfort Guarantee Included
            </div>
          </div>
        </div>

        {/* Right Side Intake Quiz Card */}
        <div className="relative bg-white border border-black/8 rounded-xl p-6 md:p-10 shadow-lg overflow-hidden transition-all duration-300 min-h-[420px]">
          {/* Progress Bar (Visible for quiz steps) */}
          {step <= 3 && (
            <div className="absolute top-0 left-0 w-full h-[6px] bg-bg-secondary">
              <div
                className="h-full bg-accent transition-all duration-400 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          {/* STEP 1: Smile Goals */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="font-heading text-[1.45rem] font-bold text-text-primary mb-6">
                Select your smile goal:
              </h3>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {[
                  { key: "invisalign", label: "Straighter Teeth (Invisalign)", Icon: ToothIcon, color: "text-[#0EA5E9]" },
                  { key: "whitening", label: "Brighter/Whiter Smile", Icon: SparklesIcon, color: "text-[#059669]" },
                  { key: "implants", label: "Replace Missing Teeth (Implants)", Icon: ImplantIcon, color: "text-[#4F46E5]" },
                  { key: "cleaning", label: "Routine Cleaning/Checkup", Icon: ShieldIcon, color: "text-[#0284C7]" },
                ].map((opt) => (
                  <label key={opt.key} className="block cursor-pointer">
                    <input
                      type="radio"
                      name="dental_goal"
                      checked={formData.dental_goal === opt.key}
                      onChange={() => handleRadioChange("dental_goal", opt.key)}
                      className="absolute opacity-0 pointer-events-none"
                    />
                    <span
                      className={`flex items-center gap-4 px-5 py-4 border rounded-lg min-h-[52px] transition-all duration-200 ${
                        formData.dental_goal === opt.key
                          ? "border-accent bg-accent/20 shadow-[0_0_0_1px_#0EA5E9]"
                          : "border-black/8 bg-white hover:border-black/15 hover:bg-bg-secondary"
                      }`}
                    >
                      <span className={`w-6 h-6 flex items-center justify-center ${opt.color}`}>
                        <opt.Icon className="w-5.5 h-5.5" strokeWidth={1.75} />
                      </span>
                      <span className="text-[15px] font-semibold text-text-primary">{opt.label}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end pt-6 border-t border-black/8">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.dental_goal}
                  className="w-full sm:w-auto inline-flex items-center justify-center h-[48px] px-8 text-[15.2px] font-semibold text-white bg-accent hover:bg-accent-hover disabled:bg-text-muted/40 disabled:cursor-not-allowed rounded-md transition-all duration-250 shadow-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Insurance Selection */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="font-heading text-[1.45rem] font-bold text-text-primary mb-6">
                Do you have PPO dental insurance?
              </h3>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {[
                  { key: "yes", label: "Yes, PPO Dental Insurance", Icon: ShieldIcon, color: "text-[#0284C7]" },
                  { key: "self-fund", label: "No, I will self-fund or finance", Icon: CardIcon, color: "text-[#0EA5E9]" },
                  { key: "no-fund", label: "No insurance / Cannot self-fund", Icon: CloseIcon, color: "text-[#EF4444]" },
                ].map((opt) => (
                  <label key={opt.key} className="block cursor-pointer">
                    <input
                      type="radio"
                      name="insurance"
                      checked={formData.insurance === opt.key}
                      onChange={() => handleRadioChange("insurance", opt.key)}
                      className="absolute opacity-0 pointer-events-none"
                    />
                    <span
                      className={`flex items-center gap-4 px-5 py-4 border rounded-lg min-h-[52px] transition-all duration-200 ${
                        formData.insurance === opt.key
                          ? "border-accent bg-accent/20 shadow-[0_0_0_1px_#0EA5E9]"
                          : "border-black/8 bg-white hover:border-black/15 hover:bg-bg-secondary"
                      }`}
                    >
                      <span className={`w-6 h-6 flex items-center justify-center ${opt.color}`}>
                        <opt.Icon className="w-5.5 h-5.5" strokeWidth={1.75} />
                      </span>
                      <span className="text-[15px] font-semibold text-text-primary">{opt.label}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-black/8">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-full sm:w-auto inline-flex items-center justify-center h-[48px] px-8 text-[15.2px] font-semibold text-text-primary bg-white border border-black/8 hover:bg-bg-secondary rounded-md transition-all duration-250"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.insurance}
                  className="w-full sm:w-auto inline-flex items-center justify-center h-[48px] px-8 text-[15.2px] font-semibold text-white bg-accent hover:bg-accent-hover disabled:bg-text-muted/40 disabled:cursor-not-allowed rounded-md transition-all duration-250 shadow-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact & Submit */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="animate-fade-in" noValidate>
              <h3 className="font-heading text-[1.45rem] font-bold text-text-primary mb-2">
                Your Contact Details
              </h3>
              <p className="text-[15.2px] text-text-secondary mb-6">
                Enter your details below to check availability and calculate your intake match score.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col">
                  <label htmlFor="first_name" className="text-[13.6px] font-semibold text-text-secondary mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    placeholder="Sarah"
                    className={`h-[48px] px-4 border rounded-md text-base text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent-glow transition-all ${
                      touched.first_name && errors.first_name ? "border-[#EF4444] bg-[#FEF2F2]" : "border-black/8"
                    }`}
                  />
                  {touched.first_name && errors.first_name && (
                    <span className="text-[12.8px] text-[#EF4444] mt-1">{errors.first_name}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="last_name" className="text-[13.6px] font-semibold text-text-secondary mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    placeholder="Miller"
                    className={`h-[48px] px-4 border rounded-md text-base text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent-glow transition-all ${
                      touched.last_name && errors.last_name ? "border-[#EF4444] bg-[#FEF2F2]" : "border-black/8"
                    }`}
                  />
                  {touched.last_name && errors.last_name && (
                    <span className="text-[12.8px] text-[#EF4444] mt-1">{errors.last_name}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="email" className="text-[13.6px] font-semibold text-text-secondary mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="sarah@example.com"
                  className={`h-[48px] px-4 border rounded-md text-base text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent-glow transition-all ${
                    touched.email && errors.email ? "border-[#EF4444] bg-[#FEF2F2]" : "border-black/8"
                  }`}
                />
                {touched.email && errors.email && (
                  <span className="text-[12.8px] text-[#EF4444] mt-1">{errors.email}</span>
                )}
              </div>

              <div className="flex flex-col mb-6">
                <label htmlFor="phone" className="text-[13.6px] font-semibold text-text-secondary mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="(415) 555-0144"
                  className={`h-[48px] px-4 border rounded-md text-base text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent-glow transition-all ${
                    touched.phone && errors.phone ? "border-[#EF4444] bg-[#FEF2F2]" : "border-black/8"
                  }`}
                />
                {touched.phone && errors.phone && (
                  <span className="text-[12.8px] text-[#EF4444] mt-1">{errors.phone}</span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-black/8">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePrev}
                  className="w-full sm:w-auto inline-flex items-center justify-center h-[48px] px-8 text-[15.2px] font-semibold text-text-primary bg-white border border-black/8 hover:bg-bg-secondary rounded-md transition-all duration-250 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center h-[48px] px-8 text-[15.2px] font-semibold text-white bg-accent hover:bg-accent-hover disabled:bg-text-muted/40 rounded-md transition-all duration-250 shadow-sm"
                >
                  {isSubmitting ? "Submitting Assessment..." : "Submit Assessment"}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Qualified (Calendar scheduler) */}
          {step === 4 && (
            <div className="animate-fade-in">
              {!isBookingConfirmed ? (
                <>
                  <div className="text-center mb-6">
                    <span className="inline-block text-[12px] font-bold uppercase tracking-wider bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-full mb-3">
                      ✦ Matching Confirmed
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-text-primary mb-1">
                      You qualify for a Free Consultation!
                    </h3>
                    <p className="text-[14.4px] text-text-secondary">
                      Select an available date and time below to lock in your appointment with our team.
                    </p>
                  </div>

                  {/* Calendar Widget */}
                  <div className="border border-black/8 rounded-lg p-4 mb-6 bg-bg-secondary">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 px-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/8 text-lg font-bold transition-all"
                      >
                        &lt;
                      </button>
                      <span className="font-heading font-bold text-[16px] text-text-primary">
                        {monthYearLabel}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/8 text-lg font-bold transition-all"
                      >
                        &gt;
                      </button>
                    </div>

                    {/* Week Grid Header */}
                    <div className="grid grid-cols-7 text-center font-bold text-[12.8px] text-text-muted mb-2.5">
                      <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                    </div>

                    {/* Days cells */}
                    <div className="grid grid-cols-7 gap-1.5">
                      {daysCells}
                    </div>

                    {/* Slots Area */}
                    {selectedDate && (
                      <div className="mt-6 pt-5 border-t border-black/8 animate-slide-down">
                        <h4 className="text-[15.2px] font-bold text-text-primary mb-3">
                          Available Slots for{" "}
                          <span className="text-accent">
                            {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                          </span>
                          :
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {mockSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => handleSlotSelect(slot)}
                              className="h-[44px] text-[13.6px] font-semibold border border-black/8 bg-white hover:border-accent hover:bg-accent-glow rounded-md transition-all cursor-pointer text-text-primary shadow-sm"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 animate-scale-up">
                  <div className="w-16 h-16 bg-[#DCFCE7] text-[#15803D] rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-[#BBF7D0]">
                    <CheckIcon className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-heading text-[1.35rem] font-bold text-text-primary mb-2.5">
                    Appointment Reserved!
                  </h4>
                  <p className="text-[15.2px] text-text-secondary max-w-[400px] mx-auto leading-relaxed">
                    Your appointment is scheduled for{" "}
                    <strong className="text-text-primary">
                      {selectedDate?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}{" "}
                      at {selectedSlot}
                    </strong>
                    . A text confirmation and calendar invite have been sent to your details.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Disqualified (Download PDF Nurture) */}
          {step === 5 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <span className="inline-block text-[12px] font-bold uppercase tracking-wider bg-bg-secondary text-text-secondary px-3 py-1 rounded-full mb-3">
                  Intake Completed
                </span>
                <h3 className="font-heading text-2xl font-bold text-text-primary mb-1">
                  Thank you for submitting your assessment!
                </h3>
                <p className="text-[14.4px] text-text-secondary max-w-[420px] mx-auto">
                  We have sent a confirmation message to your contact details. Based on your inputs, we recommend reading our ultimate dental care & insurance matching guide.
                </p>
              </div>

              {/* PDF Card */}
              {!showNurture ? (
                <div className="border border-black/8 bg-bg-secondary rounded-lg p-6 flex flex-col gap-4">
                  <div className="text-[#0EA5E9] flex items-center justify-center w-12 h-12 bg-white rounded-lg border border-black/8 shadow-sm mb-1">
                    <DocumentIcon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="font-heading text-[17px] font-bold text-text-primary mb-1">
                      {ghlCustomValues.practice_name} 2026 Premium Dental Pricing & Guide
                    </h4>
                    <p className="text-[14.4px] text-text-secondary leading-relaxed">
                      Learn how to maximize dental benefits, explore smart self-funding, and understand full treatment pricing details.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePdfDownload}
                    disabled={pdfDownloading}
                    className="w-full inline-flex items-center justify-center h-[48px] text-[15.2px] font-semibold text-white bg-accent hover:bg-accent-hover disabled:bg-accent-hover/75 rounded-md transition-all shadow-sm"
                  >
                    {pdfDownloading ? "Downloading Guide..." : "Download Guide PDF"}
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 animate-scale-up">
                  <div className="w-16 h-16 bg-[#DCFCE7] text-[#15803D] rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-[#BBF7D0]">
                    <CheckIcon className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-heading text-[1.2rem] font-bold text-text-primary mb-2">
                    {pdfDownloaded ? "Guide Downloaded ✓" : "Download Initiated"}
                  </h4>
                  <p className="text-[14.4px] text-text-secondary max-w-[400px] mx-auto leading-relaxed">
                    Your PDF download started successfully! We&apos;ve also subscribed you to our weekly smile tips for top oral hygiene.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
