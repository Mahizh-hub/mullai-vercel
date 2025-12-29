"use client";

import { useEffect, useState } from "react";

interface Props {
  initialSeconds?: number;
  onResend: () => void;
}

export default function ResendTimer({ initialSeconds = 30, onResend }: Props) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const isExpired = seconds === 0;

  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  const handleResend = () => {
    if (!isExpired) return;
    onResend();
    setSeconds(initialSeconds);
  };

  return (
    <div className="text-xs text-gray-500 flex items-center gap-2 mt-2">
      {!isExpired ? (
        <>
          <span>Didn’t receive the code?</span>
          <span>
            Resend in{" "}
            <strong className="text-pink-600">
              00:{seconds.toString().padStart(2, "0")}
            </strong>
          </span>
        </>
      ) : (
        <>
          <span>Didn’t receive the code?</span>
          <button
            type="button"
            onClick={handleResend}
            className="text-pink-500 font-medium hover:underline"
          >
            Resend OTP
          </button>
        </>
      )}
    </div>
  );
}
