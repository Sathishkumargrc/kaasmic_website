// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { useMetalPrices } from "@/app/context/MetalPricesProvider";

// interface LivePriceProps {
//   type?: "sticky" | "hero" | "drawer";
// }

// export default function LivePrice(props: LivePriceProps) {
//   const { type = "hero" } = props;
//   const isSticky = type === "sticky";
//   const isDrawer = type === "drawer";

//   const { prices } = useMetalPrices();
//   console.log(prices)

//   const labelColor = isSticky
//     ? "text-black/70"
//     : isDrawer
//       ? "text-white/60"
//       : "text-white/70";

//   const goldText = isSticky ? "text-[#B8962E]" : "text-[#D4AF37]";
//   const silverText = isSticky ? "text-gray-700" : "text-gray-300";

//   // Drawer mode - full width card layout
//   if (isDrawer) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="w-full"
//       >
//         <div className="flex flex-col gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
//           <div className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
//             Live Rates
//           </div>

//           {/* Gold Rate */}
//           <div className="flex items-center justify-between pb-3 border-b border-white/10">
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
//               <span className="text-xs font-medium text-white/70">Gold/gm</span>
//             </div>
//             <div className="flex items-baseline gap-2">
//               <span className="text-lg font-bold text-[#D4AF37]">
//                 ₹{prices?.gold?.buyPrice?.toFixed(2)}
//               </span>
//               {/* <span
//                 className={`text-[10px] font-semibold ${goldChange >= 0 ? "text-green-400" : "text-red-400"}`}
//               >
//                 {goldChange >= 0 ? "↑" : "↓"} {Math.abs(goldChange)}%
//               </span> */}
//             </div>
//           </div>

//           {/* Silver Rate */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
//               <span className="text-xs font-medium text-white/70">Silver/gm</span>
//             </div>
//             <div className="flex items-baseline gap-2">
//               <span className="text-lg font-bold text-gray-300">
//                 ₹{prices?.silver?.buyPrice?.toFixed(2)}
//               </span>
//               {/* <span
//                 className={`text-[10px] font-semibold ${silverChange >= 0 ? "text-green-400" : "text-red-400"}`}
//               >
//                 {silverChange >= 0 ? "↑" : "↓"} {Math.abs(silverChange)}%
//               </span> */}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   // Default mode - horizontal layout (hero/sticky)
//   return (
//     <div>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 sm:ml-3 lg:ml-4 sm:pl-3 lg:pl-6 sm:border-l border-white/20"
//       >
//         {/* Gold Rate */}
//         <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
//           <div className="flex items-center gap-1.5 sm:gap-2">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
//             <span
//               className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${labelColor}`}
//             >
//               Gold/gm
//             </span>
//           </div>
//           <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5">
//             <span className={`text-sm sm:text-base lg:text-[17px] font-bold ${goldText}`}>
//               ₹{prices?.gold?.buyPrice?.toFixed(2)}
//             </span>
//             {/* <span
//               className={`text-[10px] sm:text-[11px] font-semibold ${goldChange >= 0 ? "text-green-400" : "text-red-400"}`}
//             >
//               {goldChange >= 0 ? "↑" : "↓"} {Math.abs(goldChange)}%
//             </span> */}
//           </div>
//         </div>

//         {/* Silver Rate */}
//         <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
//           <div className="flex items-center gap-1.5 sm:gap-2">
//             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300 animate-pulse"></div>
//             <span
//               className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${labelColor}`}
//             >
//               Silver/gm
//             </span>
//           </div>
//           <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5">
//             <span className={`text-sm sm:text-base lg:text-[17px] font-bold ${silverText}`}>
//               ₹{prices?.silver?.buyPrice?.toFixed(2)}
//             </span>
//             {/* <span
//               className={`text-[10px] sm:text-[11px] font-semibold ${silverChange >= 0 ? "text-green-400" : "text-red-400"}`}
//             >
//               {silverChange >= 0 ? "↑" : "↓"} {Math.abs(silverChange)}%
//             </span> */}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMetalPrices } from "@/app/context/MetalPricesProvider";

interface LivePriceProps {
  type?: "sticky" | "hero" | "drawer" | "mobile";
}

export default function LivePrice(props: LivePriceProps) {
  const { type = "hero" } = props;
  const isSticky = type === "sticky";
  const isDrawer = type === "drawer";
  const isMobile = type === "mobile";

  const { prices } = useMetalPrices();

  const labelColor = isSticky
    ? "text-black/70"
    : isDrawer
      ? "text-white/60"
      : "text-white/70";

  const goldText = isSticky ? "text-[#B8962E]" : "text-[#D4AF37]";
  const silverText = isSticky ? "text-gray-700" : "text-gray-300";

  // Mobile mode — compact horizontal pill for header bar with labels
  if (isMobile) {
    return (
      <div className="flex items-center gap-2.5 bg-black/20 rounded-full px-3 py-1.5 border border-white/10">
        {/* Gold */}
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
          <div className="flex flex-col leading-none">
            <span className="text-[9px] text-white/50 font-medium">Gold/gm</span>
            <span className="text-[10px] font-bold text-[#D4AF37]">
              ₹{prices?.gold?.buyPrice?.toFixed(0)}
            </span>
          </div>
        </div>
        <div className="w-px h-5 bg-white/20" />
        {/* Silver */}
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse shrink-0" />
          <div className="flex flex-col leading-none">
            <span className="text-[9px] text-white/50 font-medium">Silver/gm</span>
            <span className="text-[10px] font-bold text-gray-300">
              ₹{prices?.silver?.buyPrice?.toFixed(0)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Sticky mobile mode — same pill but with dark-on-light colors
  if (isSticky && false) {
    // handled below via isStickyMobile concept — keep unified
  }

  // Drawer mode - full width card layout
  if (isDrawer) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full"
      >
        <div className="flex flex-col gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
            Live Rates
          </div>

          {/* Gold Rate */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
              <span className="text-xs font-medium text-white/70">Gold/gm</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#D4AF37]">
                ₹{prices?.gold?.buyPrice?.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Silver Rate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
              <span className="text-xs font-medium text-white/70">Silver/gm</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-300">
                ₹{prices?.silver?.buyPrice?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default mode - horizontal layout (hero/sticky)
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 sm:ml-3 lg:ml-4 sm:pl-3 lg:pl-6 sm:border-l border-white/20"
      >
        {/* Gold Rate */}
        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span
              className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${labelColor}`}
            >
              Gold/gm
            </span>
          </div>
          <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5">
            <span className={`text-sm sm:text-base lg:text-[17px] font-bold ${goldText}`}>
              ₹{prices?.gold?.buyPrice?.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Silver Rate */}
        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300 animate-pulse"></div>
            <span
              className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${labelColor}`}
            >
              Silver/gm
            </span>
          </div>
          <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5">
            <span className={`text-sm sm:text-base lg:text-[17px] font-bold ${silverText}`}>
              ₹{prices?.silver?.buyPrice?.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}