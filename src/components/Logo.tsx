import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export default function Logo({ className = "", size = 64, animate = true }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} id="brand-logo-container">
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Soft premium shadow filters */}
          <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#8B5CF6" floodOpacity="0.16" />
          </filter>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients for the monogram lettering and lotus */}
          <linearGradient id="ts-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" /> {/* Hot Pink */}
            <stop offset="50%" stopColor="#A855F7" /> {/* Lavender Purple */}
            <stop offset="100%" stopColor="#6366F1" /> {/* Indigo Dream */}
          </linearGradient>

          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>

          {/* Light golden aura background glow */}
          <radialGradient id="sparkle-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#F472B6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Golden Aura Radial Glow */}
        <circle cx="100" cy="100" r="85" fill="url(#sparkle-glow)" opacity="0.9" />

        {/* 2. Mystical Rotating Outer Constellation Ring */}
        <motion.g
          animate={animate ? { rotate: 360 } : undefined}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          style={{ originX: "100px", originY: "100px" }}
        >
          {/* Glowing dotted ring */}
          <circle cx="100" cy="100" r="78" stroke="url(#ring-gradient)" strokeWidth="3" strokeDasharray="6 8" opacity="0.7" />

          {/* Sweet pink heart emblem on the ring */}
          <path
            d="M 100 18 Q 100 10, 94 14 Q 88 18, 100 30 Q 112 18, 106 14 Q 100 10, 100 18 Z"
            fill="#EC4899"
            filter="url(#soft-shadow)"
          />
          {/* Cute golden stars riding the ring */}
          <polygon points="178,100 181,95 187,95 182,91 184,85 178,89 172,85 174,91 169,95 175,95" fill="#FBBF24" />
          <polygon points="22,100 25,95 31,95 26,91 28,85 22,89 16,85 18,91 13,95 19,95" fill="#FBBF24" />
          
          {/* Sweet little green sprouts of health */}
          <path d="M 100 182 Q 94 172, 104 172 Q 104 182, 100 182 Z" fill="#4ADE80" />
          <path d="M 100 182 Q 106 175, 98 169 Q 96 177, 100 182 Z" fill="#22C55E" />
        </motion.g>

        {/* 3. Sacred Lotus Outline Frame */}
        <g filter="url(#soft-shadow)">
          {/* Outer Lotus Petals */}
          <path
            d="M 100 35 C 70 65, 35 100, 35 125 C 35 155, 70 165, 100 165 C 130 165, 165 155, 165 125 C 165 100, 130 65, 100 35 Z"
            fill="#FAF5FF"
            stroke="#E9D5FF"
            strokeWidth="3.5"
          />
          {/* Inner Lotus Petal accents */}
          <path d="M 100 45 C 80 75, 52 110, 52 128 C 52 150, 75 156, 100 156 C 125 156, 148 150, 148 128 C 148 110, 120 75, 100 45 Z" fill="#FDF4FF" opacity="0.95" />
          
          {/* Gentle pink base shading inside the lotus */}
          <path d="M 100 100 C 85 120, 65 135, 65 145 C 65 152, 80 156, 100 156 C 120 156, 135 152, 135 145 C 135 135, 115 120, 100 100 Z" fill="#FCE7F3" opacity="0.55" />
        </g>

        {/* 4. Elegant Glowing "T.S." Monogram Text Layer */}
        <g filter="url(#soft-shadow)">
          {/* Monogram letters T.S. styled with state-of-the-art space display look */}
          <text
            x="100"
            y="124"
            fill="url(#ts-gradient)"
            fontWeight="900"
            fontSize="54"
            fontFamily="'Space Grotesk', 'Outfit', 'Inter', system-ui, sans-serif"
            textAnchor="middle"
            letterSpacing="-1"
            className="select-none"
            style={{
              fontKerning: "normal",
              textShadow: "0px 4px 10px rgba(168, 85, 247, 0.22)"
            }}
          >
            T.S
          </text>
        </g>

        {/* 5. Heart-inspired custom connecting bridge accent between the T & S */}
        <path
          d="M 96 114 Q 100 110, 104 114"
          stroke="#F472B6"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* 6. Friendly Sparkly Floating Ornaments over the letters */}
        <motion.g
          animate={animate ? { y: [0, -3, 0] } : undefined}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          {/* Glowing star sparklies */}
          <path d="M 72 82 C 72 79, 74 79, 76 79 C 74 79, 74 77, 72 77 C 72 77, 70 77, 70 79 C 70 79, 72 79, 72 82 Z" fill="#FBBF24" />
          <path d="M 128 85 C 128 82, 130 82, 132 82 C 130 82, 130 80, 128 80 C 128 80, 126 80, 126 82 C 126 82, 128 82, 128 85 Z" fill="#FBBF24" />
          <circle cx="100" cy="62" r="3" fill="#EC4899" />
          <circle cx="100" cy="144" r="2.5" fill="#3B82F6" />
        </motion.g>
      </svg>
    </div>
  );
}
