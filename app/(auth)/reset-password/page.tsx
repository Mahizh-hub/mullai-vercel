"use client";

import AuthHeader from "@/components/auth/AuthHeader";
import PasswordInput from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { resetPasswordSchema } from "@/lib/validations/reset.schema";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValid = resetPasswordSchema.safeParse({
    password,
    confirmPassword,
  }).success;

  const handleSubmit = () => {
    // API
    console.log("Reset password: ", password);
  };

  return (
    <>
      <AuthHeader
        title="Reset your password"
        subtitle="Create a new password for your Mullai account."
      />

      <div className="space-y-5">
        <div>
          <label className="text-xs text-gray-600">New Password *</label>
          <PasswordInput
            value={password}
            className="mt-2"
            onChange={setPassword}
          />
        </div>
        <div>
          <label className="text-xs text-gray-600">Confirm Password *</label>
          <PasswordInput
            value={confirmPassword}
            className="mt-2"
            onChange={setConfirmPassword}
          />
        </div>

        <Button
          disabled={!isValid}
          onClick={handleSubmit}
          className={`mt-2 ${
            isValid
              ? "bg-pink-600 text-white hover:bg-pink-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Reset Password
        </Button>
      </div>
    </>
  );
}
