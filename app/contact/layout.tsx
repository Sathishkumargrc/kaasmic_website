import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Kaasmic - Digital Gold Investment",
  description: "Get in touch with Kaasmic for any queries regarding digital gold investment. Visit our office in Salem or reach out to us online.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
