// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import LivePrice from "../livePrice";
// import { navLinks } from "../helper/CommonVariable";

// const SCROLL_THRESHOLD = 60;

// export const HEADER_HEIGHT_PX = 88;

// interface HeaderProps {
//   isScrolled?: boolean;
//   fixedWhenScrolled?: boolean;
// }

// export default function Header({
//   isScrolled: isScrolledProp,
//   fixedWhenScrolled = false,
// }: HeaderProps) {
//   const [internalScrolled, setInternalScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () =>
//       setInternalScrolled(window.scrollY > SCROLL_THRESHOLD);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const isScrolled = isScrolledProp ?? internalScrolled;

//   const positionClass = fixedWhenScrolled
//     ? isScrolled
//       ? "fixed top-0 left-0 right-0"
//       : "relative"
//     : "sticky top-0";

//   return (
//     <>
//       <motion.header
//         initial={!isScrolled ? { y: -24, opacity: 0 } : false}
//         animate={!isScrolled ? { y: 0, opacity: 1 } : false}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className={`z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-[5.5rem] py-4 sm:py-5 lg:py-6 transition-all duration-300 ${positionClass} ${
//           isScrolled
//             ? "bg-[#0C173D]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
//             : "bg-transparent"
//         }`}
//       >
//         <Link href="/" className="flex items-center gap-2 sm:gap-3">
//           <Image
//             src="/assets/kassmic_logo.png"
//             alt="Kaasmic Logo"
//             width={32}
//             height={32}
//             className="shrink-0 sm:w-10 sm:h-10"
//           />
//           <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
//             Kaasmic
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
//           {navLinks?.map(({ label, href }) => (
//             <Link
//               key={label}
//               className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors"
//               href={label === "Pricing" ? "/#pricing" : href}
//             >
//               {label}
//             </Link>
//           ))}

//           <LivePrice />
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="lg:hidden text-white p-2 z-50"
//           aria-label="Toggle menu"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             {mobileMenuOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>
//       </motion.header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-40 lg:hidden"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             {/* Backdrop */}
//             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

//             {/* Menu Panel */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="absolute top-0 right-0 bottom-0 w-[280px] bg-[#0C173D] border-l border-white/10 shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <nav className="flex flex-col px-6 py-20 space-y-6">
//                 {navLinks?.map(({ label, href }) => (
//                   <Link
//                     key={label}
//                     className="text-base font-medium text-white hover:text-[#D4AF37] transition-colors py-2"
//                     href={label === "Pricing" ? "/#pricing" : href}
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {label}
//                   </Link>
//                 ))}
//                 <div className="pt-4 border-t border-white/10">
//                   <LivePrice />
//                 </div>
//               </nav>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import LivePrice from "../livePrice";
import { navLinks } from "../helper/CommonVariable";

const SCROLL_THRESHOLD = 60;

export const HEADER_HEIGHT_PX = 88;

interface HeaderProps {
  isScrolled?: boolean;
  fixedWhenScrolled?: boolean;
}

export default function Header({
  isScrolled: isScrolledProp,
  fixedWhenScrolled = false,
}: HeaderProps) {
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setInternalScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isScrolled = isScrolledProp ?? internalScrolled;

  const positionClass = fixedWhenScrolled
    ? isScrolled
      ? "fixed top-0 left-0 right-0"
      : "relative"
    : "sticky top-0";

  return (
    <>
      <motion.header
        initial={!isScrolled ? { y: -24, opacity: 0 } : false}
        animate={!isScrolled ? { y: 0, opacity: 1 } : false}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-[5.5rem] py-4 sm:py-5 lg:py-6 transition-all duration-300 ${positionClass} ${
          isScrolled
            ? "bg-[#0C173D]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/assets/kassmic_logo.png"
            alt="Kaasmic Logo"
            width={32}
            height={32}
            className="shrink-0 sm:w-10 sm:h-10"
          />
          <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Kaasmic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks?.map(({ label, href }) => (
            <Link
              key={label}
              className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors"
              href={label === "Pricing" ? "/#pricing" : href}
            >
              {label}
            </Link>
          ))}
          <LivePrice />
        </nav>

        {/* Mobile right side: price pill + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <LivePrice type="mobile" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 z-50"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[280px] bg-[#0C173D] border-l border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col px-6 py-20 space-y-6">
                {navLinks?.map(({ label, href }) => (
                  <Link
                    key={label}
                    className="text-base font-medium text-white hover:text-[#D4AF37] transition-colors py-2"
                    href={label === "Pricing" ? "/#pricing" : href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                {/* Full detail rates inside drawer */}
                <div className="pt-4 border-t border-white/10">
                  <LivePrice type="drawer" />
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}