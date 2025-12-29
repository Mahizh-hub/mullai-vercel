"use client";

import AuthHeader from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/lib/validations/forgot.schema";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const isValid = forgotPasswordSchema.safeParse({ email }).success;

  return (
    <div>
      <AuthHeader
        title="Forgot yout password?"
        subtitle="Enter your registered email address and we'll send you a verification code to reset your password."
      />

      <form className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">
            Email address <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="example@mullai.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 border"
          />
        </div>

        <Link href="/verify">
          <Button
            type="submit"
            disabled={!isValid}
            className={`w-full h-12 mt-2 rounded-md font-medium transition ${
              isValid
                ? "bg-pink-600 text-white hover:bg-pink-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Send verification code
          </Button>
        </Link>

        <p className="text-xs mt-2 text-gray-600">
          Back to{" "}
          <Link
            href="/signin"
            className="text-pink-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
