import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AOSProvider from "./components/AOSProvider";
import { MetalPricesProvider } from "./context/MetalPricesProvider";
import { ReduxProvider } from "./redux/Provider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Kassmic – Gold Savings & Investment App",
  description:
     "Grow your wealth by investing in 24K Kaasmic physical gold securely and confidently.",
  icons: {
    icon: "/assets/kassmic_logo.png",
    apple: "/assets/kassmic_logo.png",
  },
  openGraph: {
    title: "Kassmic – Gold Savings & Investment App",
    description:  "Grow your wealth by investing in 24K Kaasmic physical gold securely and confidently.",
    images: ["/assets/kassmic_logo.png"],
  },
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
        <ReduxProvider>
          <AOSProvider>
            <MetalPricesProvider>
              {children}
            </MetalPricesProvider>
          </AOSProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}