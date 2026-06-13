import Header from "../components/layout/Header";
import PageBanner from "../components/layout/PageBanner";
import Footer from "../components/layout/Footer";
import FAQContent from "../components/sections/FAQContent";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gold-gradient text-white overflow-x-hidden">
      <Header />
      <PageBanner
        title="Frequently Asked Questions"
        description="Find answers to common questions about Kaasmic gold, buying, selling, and redemption."
      />
      <FAQContent />
      <Footer />
    </main>
  );
}
