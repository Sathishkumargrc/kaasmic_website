import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gold-gradient text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
