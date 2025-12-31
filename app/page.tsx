import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 min-h-screen items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          className="py-2 text-center px-4 bg-black text-white rounded-lg"
          href="/signin"
        >
          SignIn
        </Link>
        <Link
          className="py-2 text-center px-4 bg-black text-white rounded-lg"
          href="/verify"
        >
          Verify
        </Link>
        <Link
          className="py-2 text-center px-4 bg-black text-white rounded-lg"
          href="/forgot-password"
        >
          Forgot Password
        </Link>
        <Link
          className="py-2 text-center px-4 bg-black text-white rounded-lg"
          href="/reset-password"
        >
          Reset Password
        </Link>
      </div>
      <Link
        className="py-2 text-center px-4 bg-black text-white rounded-lg"
        href="/dashboard"
      >
        Dashboard
      </Link>
    </div>
  );
}
