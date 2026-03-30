import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import NoiseCanvas from "@/components/NoiseCanvas";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ali Abuelhassan — Portfolio",
  description:
    "Exploring the intersection of behavior, finance, and product design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NoiseCanvas />
        <CustomCursor />
        <div className="relative flex flex-col flex-1" style={{ zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
