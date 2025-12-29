import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 px-6">
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="/mullai-bm-2.png"
              alt="Mullai background"
              width={500}
              height={500}
              priority
              className="
                    absolute
                    left-40
                    top-1/2
                    -translate-y-1/2
                    z-0
                  "
            />
          </div>
        </div>

        <div className="hidden lg:block" />

        {/* AUTH CONTENT */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-full max-w-xs md:max-w-lg bg-white">{children}</div>
        </div>
      </div>
    </div>
  );
}
