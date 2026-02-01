"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Pagination } from "../ui/pagination";

interface BlogArticle {
  uuid: string;
  title: string;
  description: string | null;
  snippet: string | null;
  url: string;
  image_url: string | null;
  source: string;
  published_at: string;
}

interface BlogMeta {
  found: number;
  returned: number;
  limit: number;
  page: number;
}

const FALLBACK_ARTICLES: BlogArticle[] = [
  {
    uuid: "1",
    title: "Why digital gold is gaining traction in India",
    description: "Digital gold allows investors to buy and hold 24K gold in small amounts with ease.",
    snippet: "Digital gold allows investors to buy and hold 24K gold in small amounts with ease.",
    url: "#",
    image_url: null,
    source: "Sample",
    published_at: new Date().toISOString(),
  },
  {
    uuid: "2",
    title: "Gold prices and market outlook",
    description: "Finance experts weigh in on gold as a store of value and inflation hedge.",
    snippet: "Finance experts weigh in on gold as a store of value and inflation hedge.",
    url: "#",
    image_url: null,
    source: "Sample",
    published_at: new Date().toISOString(),
  },
];

export default function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() || "gold investment finance";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const [data, setData] = useState<BlogArticle[]>([]);
  const [meta, setMeta] = useState<BlogMeta>({ found: 0, returned: 0, limit: 10, page: 1 });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BlogArticle | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, page: String(page), limit: "10" });
      const res = await fetch(`/api/blog?${params.toString()}`);
      const json = await res.json();
      setData(Array.isArray(json.data) ? json.data : []);
      setMeta(
        json.meta ?? { found: 0, returned: 0, limit: 10, page: 1 }
      );
    } catch {
      setData(FALLBACK_ARTICLES);
      setMeta({ found: FALLBACK_ARTICLES.length, returned: FALLBACK_ARTICLES.length, limit: 10, page: 1 });
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const totalPages = Math.max(1, Math.ceil((meta.found || 0) / meta.limit));

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/blog?${params.toString()}`);
  };

  const displayArticles = data.length > 0 ? data : FALLBACK_ARTICLES;
  const showPagination = meta.found > meta.limit;

  return (
    <section className="px-[5.5rem] py-12 pb-20">
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse border-white/10 bg-[#0C173D]/60">
              <CardHeader>
                <div className="h-40 rounded-lg bg-white/10" />
                <CardTitle className="h-5 bg-white/10 rounded" />
                <CardDescription className="h-4 bg-white/10 rounded w-2/3" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayArticles.map((article, i) => (
              <motion.div
                key={article.uuid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(article)}
                className="cursor-pointer"
              >
                <Card className="h-full overflow-hidden border-white/10 bg-[#0C173D]/80 transition-colors hover:border-[#D4AF37]/30">
                  {article.image_url ? (
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={article.image_url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-40 w-full bg-white/5 flex items-center justify-center">
                      <span className="text-4xl text-white/20">◆</span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-white">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-white/60 text-xs">
                      {article.source} · {new Date(article.published_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-white/80">
                      {article.description || article.snippet || "No description."}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {showPagination && totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => open === false && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.source} · {new Date(selected.published_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              {selected.image_url && (
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <img
                    src={selected.image_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <p className="text-white/85 leading-relaxed">
                {selected.description || selected.snippet || "No content available."}
              </p>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#D4AF37] hover:underline"
              >
                Read full article →
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
