import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AOSProvider from "./components/AOSProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Kassmic – Gold Savings & Investment App",
  description:
    "Grow your wealth by investing in 24K digital gold securely, starting with just ₹100.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${roboto.variable} font-sans antialiased`}
        style={{ fontFamily: `var(--font-roboto), system-ui, sans-serif` }}
      >
         <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}