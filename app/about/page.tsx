import Header from "../components/layout/Header";
import PageBanner from "../components/layout/PageBanner";
import Footer from "../components/layout/Footer";
import AboutContent from "../components/sections/AboutContent";

export default function AboutPage() {
  return (
    <main className="">
      <Header />
      <PageBanner
        title="About Us"
        description="We are building a trusted platform for Kaasmic gold investment. Our mission is to make 24K gold accessible, secure, and simple for everyone."
      />
      <AboutContent />
      <Footer />
    </main>
  );
}
