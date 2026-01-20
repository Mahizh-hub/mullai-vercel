import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Mullai One",
  description: "School Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
