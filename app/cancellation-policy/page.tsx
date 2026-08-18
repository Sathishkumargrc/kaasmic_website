import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CancellationPolicy from "../components/sections/CancellationPolicy";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gold-gradient text-white overflow-x-hidden">
      <Header />
      <CancellationPolicy />
      <Footer />
    </main>
  );
}
