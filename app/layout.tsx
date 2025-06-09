import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./components/background_model";
// import BackgroundCanvas from "./components/background_model";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InCaseYouSeeThis",
  description: "InCaseYouSeeThis - Send  message with what you alwys wished to say to that name in your heart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {children}
        <div className="pointer-events-none animation overflow-hidde " />
        {/* <BackgroundCanvas /> */}
        <div className="overlay"></div>
      </body>
    </html>
  );
}
