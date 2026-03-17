import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TermsandConditions from "../components/sections/Terms";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gold-gradient text-white overflow-x-hidden">
      <Header />
      <TermsandConditions />
      <Footer />
    </main>
  );
}
