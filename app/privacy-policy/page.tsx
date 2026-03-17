import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PrivacyPolicy from "../components/sections/PrivacyPolicy";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gold-gradient text-white overflow-x-hidden">
      <Header />
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}
