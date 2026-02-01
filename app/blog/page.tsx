import { Suspense } from "react";
import Header from "../components/layout/Header";
import PageBanner from "../components/layout/PageBanner";
import Footer from "../components/layout/Footer";
import BlogSearch from "../components/sections/BlogSearch";
import BlogContent from "../components/sections/BlogContent";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gold-gradient text-white overflow-x-hidden">
      <Header />
      <PageBanner title="Blogs">
        <Suspense fallback={<div className="h-10 w-full max-w-[55%] mx-auto rounded-lg bg-white/5" />}>
          <BlogSearch />
        </Suspense>
      </PageBanner>
      <Suspense fallback={<div className="px-[5.5rem] py-12 h-64 animate-pulse bg-white/5 rounded-lg" />}>
        <BlogContent />
      </Suspense>
      <Footer />
    </main>
  );
}
