"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

export default function PasswordInput({ value, onChange, className }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type password"
        className="w-full h-12 px-4 rounded-md focus:outline-none focus:ring-2 border focus:ring-blue-600"
      />
      <Button
        variant="ghost"
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
