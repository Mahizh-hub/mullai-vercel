"use client";

import AuthHeader from "@/components/auth/AuthHeader";
import PasswordInput from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/validations/signin.schema";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = signInSchema.safeParse({ email, password }).success;

  return (
    <>
      <AuthHeader
        title="Welcome back to Mullai!"
        subtitle="Sign in to continue to your school workspace"
      />

      <form className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Email Address *</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 border mt-2 rounded-md"
            placeholder="example@mullai.com"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Password *</label>
          <PasswordInput
            className="mt-2"
            value={password}
            onChange={setPassword}
          />
          <Link
            href="/forgot-password"
            className="text-pink-600 mt-2 text-xs font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Link href="/verify">
          <Button
            disabled={!isValid}
            className={`w-full h-12 mt-2 rounded-md font-medium transition ${
              isValid
                ? "bg-pink-600 text-white hover:bg-pink-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <LogIn />
            <span>SIGN IN</span>
          </Button>
        </Link>
      </form>
    </>
  );
}
