import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RefundPolicy from "../components/sections/Refundpolicy";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen overflow-x-hidden  text-black">
      <Header />

      <RefundPolicy />

      <Footer />
    </main>
  );
}