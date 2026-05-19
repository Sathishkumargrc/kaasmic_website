"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetBlogsQuery } from "../../redux/features/api/blogApi";
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
import Image from "next/image";

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
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}



export default function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() || "gold investment finance";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const [selected, setSelected] = useState<BlogArticle | null>(null);

  // Fetch blogs using RTK Query hook
  const { data: blogResponse, isLoading } = useGetBlogsQuery({
    search,
    page,
    limit: 10,
  });

  const loading = isLoading;
  const data = blogResponse?.data?.posts ?? [];
  const meta = blogResponse?.data?.meta;

  const totalPages = meta?.last_page ?? 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/blog?${params.toString()}`);
  };

  const displayArticles = data;
  const showPagination = meta ? meta.total > meta.per_page : false;

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
                      <Image
                        src={article?.image_url}
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
                  <Image
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
