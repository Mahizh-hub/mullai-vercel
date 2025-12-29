"use client";

import AuthHeader from "@/components/auth/AuthHeader";
import ResendTimer from "@/components/auth/ResendTimer";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { otpSchema } from "@/lib/validations/otp.schema";
import Link from "next/link";
import { useState } from "react";

export default function VerifyPage() {
  const [otp, setOtp] = useState("");

  const isValid = otpSchema.safeParse({ otp }).success;

  const handleResendOTP = () => {
    // API
    console.log("Resend OTP");
  };

  return (
    <>
      <AuthHeader
        title="Verify your email address"
        subtitle="Enter the 4-digit verification code sent to your email"
      />

      <div className="space-y-4">
        <InputOTP
          maxLength={4}
          value={otp}
          onChange={setOtp}
          className="w-full h-12 text-center tracking-widest text-xl rounded-md border"
          placeholder="----"
        >
          <InputOTPSlot index={0} className="rounded-sm size-10 border-r" />
          <InputOTPSlot index={1} className="rounded-sm size-10 border-r" />
          <InputOTPSlot index={2} className="rounded-sm size-10 border-r" />
          <InputOTPSlot index={3} className="rounded-sm size-10 border-r" />
        </InputOTP>

        <ResendTimer onResend={handleResendOTP} />

        <Link href="/dashboard">
          <Button
            disabled={!isValid}
            className={`w-full h-12 mt-2 rounded-md font-medium ${
              isValid
                ? "bg-pink-600 text-white hover:bg-pink-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Verify & Continue
          </Button>
        </Link>
      </div>
    </>
  );
}
