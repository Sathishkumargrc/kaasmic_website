"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim() || "gold investment";
    const params = new URLSearchParams();
    params.set("search", q);
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[55%] mx-auto">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
          <SearchIcon />
        </span>
        <Input
          type="search"
          placeholder="Search blogs..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-10 w-full rounded-lg border-white/20 bg-white/5 text-white placeholder:text-white/50"
        />
      </div>
    </form>
  );
}
