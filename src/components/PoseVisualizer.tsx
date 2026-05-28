import React from "react";
import { motion } from "motion/react";

interface PoseVisualizerProps {
  poseId: string;
  isBreathing?: boolean;
  className?: string;
  size?: number;
}

export default function PoseVisualizer({ poseId, isBreathing = true, className = "", size = 260 }: PoseVisualizerProps) {
  // Normalize ID
  const id = poseId?.toLowerCase() || "tadasana";

  // Breathing motion settings
  const breathTransition = {
    repeat: Infinity,
    duration: 5,
    ease: "easeInOut",
  };

  const inhaleScale = [1, 1.05, 1];
  const inhaleOpacity = [0.4, 0.9, 0.4];

  // Render pose outline dynamically
  const renderPoseBody = () => {
    switch (id) {
      case "vrikshasana":
      case "tree":
        return (
          <g>
            {/* Grounding Mat */}
            <rect x="30" y="175" width="140" height="8" rx="4" fill="#E9D5FF" />
            
            {/* Standing Left Leg (Chubby Cozy Leg!) */}
            <line x1="100" y1="175" x2="100" y2="125" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" />
            
            {/* Bent Right Leg placing on left thigh */}
            <path d="M 100 125 L 72 145 L 98 150" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            {/* Spine & Head (Cozy cozy pink outfit!) */}
            <motion.g
              animate={isBreathing ? { y: [0, -4, 0] } : undefined}
              transition={breathTransition}
            >
              {/* Torso Shirt */}
              <line x1="100" y1="125" x2="100" y2="78" stroke="#F472B6" strokeWidth="22" strokeLinecap="round" />
              
              {/* Hands raised over head joined */}
              <path d="M 100 85 C 80 85, 75 55, 100 35" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" fill="none" />
              <path d="M 100 85 C 120 85, 125 55, 100 35" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" fill="none" />
              
              {/* Skin arms meeting at top */}
              <path d="M 90 52 L 100 32" stroke="#FFD8A8" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M 110 52 L 100 32" stroke="#FFD8A8" strokeWidth="8" strokeLinecap="round" fill="none" />

              {/* Head with blushing details */}
              <circle cx="100" cy="58" r="14" fill="#FFD8A8" />
              
              {/* Cute smiling face */}
              <circle cx="95" cy="57" r="1.5" fill="#374151" />
              <circle cx="105" cy="57" r="1.5" fill="#374151" />
              <path d="M 98 62 Q 100 65 102 62" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="92" cy="60" r="2.5" fill="#FB7185" opacity="0.6" />
              <circle cx="108" cy="60" r="2.5" fill="#FB7185" opacity="0.6" />
              
              {/* Hair bun */}
              <circle cx="100" cy="42" r="6" fill="#4B5563" />
            </motion.g>

            {/* Heart Chakra energy aura */}
            <motion.circle
              cx="100"
              cy="95"
              r="20"
              stroke="#F472B6"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
              animate={isBreathing ? { scale: inhaleScale, opacity: inhaleOpacity } : undefined}
              transition={breathTransition}
            />
          </g>
        );

      case "adhomukha":
      case "downward_dog":
      case "downward-facing dog":
        return (
          <g>
            {/* Grounding Mat */}
            <rect x="25" y="170" width="150" height="8" rx="4" fill="#E9D5FF" />
            
            <motion.g
              animate={isBreathing ? { scaleY: [1, 0.97, 1], originY: 1 } : undefined}
              transition={breathTransition}
            >
              {/* Chubby legs in blue joggers */}
              <line x1="55" y1="168" x2="95" y2="80" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" />
              
              {/* Torso in soft pink hoodie */}
              <line x1="95" y1="80" x2="130" y2="110" stroke="#F472B6" strokeWidth="22" strokeLinecap="round" />
              
              {/* Supporting arms */}
              <line x1="130" y1="110" x2="148" y2="168" stroke="#FFD8A8" strokeWidth="12" strokeLinecap="round" />
              <line x1="130" y1="110" x2="140" y2="140" stroke="#F472B6" strokeWidth="14" strokeLinecap="round" />
              
              {/* Head hanging down with cheeks and hair */}
              <circle cx="140" cy="124" r="12" fill="#FFD8A8" />
              <circle cx="145" cy="121" r="1.5" fill="#374151" />
              <circle cx="141" cy="126" r="2.2" fill="#FB7185" opacity="0.6" />
              <path d="M 132 116 Q 138 116 142 120" stroke="#4B5563" strokeWidth="6" strokeLinecap="round" />
              <circle cx="132" cy="116" r="4" fill="#4B5563" />
            </motion.g>

            {/* Base spine chakra bloom */}
            <motion.circle
              cx="95"
              cy="80"
              r="18"
              stroke="#A78BFA"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              fill="none"
              animate={isBreathing ? { scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] } : undefined}
              transition={breathTransition}
            />
          </g>
        );

      case "bhujangasana":
      case "cobra":
        return (
          <g>
            {/* Grounding Mat */}
            <rect x="25" y="160" width="150" height="8" rx="4" fill="#E9D5FF" />
            
            {/* Lower Body cosy blue joggers flat on mat */}
            <path d="M 40 156 Q 85 152 115 146" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" fill="none" />
            
            {/* Cobra Arch rising forward */}
            <motion.g
              animate={isBreathing ? { rotate: [0, -3, 0], originX: 0.6, originY: 1 } : undefined}
              transition={breathTransition}
            >
              {/* Torso (Pink comfy hoodie) */}
              <path d="M 115 146 Q 140 126 134 95" stroke="#F472B6" strokeWidth="22" strokeLinecap="round" fill="none" />
              
              {/* Supporting Skin Arm on mat */}
              <line x1="128" y1="158" x2="132" y2="115" stroke="#FFD8A8" strokeWidth="11" strokeLinecap="round" />
              <line x1="131" y1="125" x2="132" y2="115" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" />
              
              {/* Head looking slightly skyward with hair */}
              <circle cx="142" cy="78" r="13" fill="#FFD8A8" />
              <circle cx="147" cy="74" r="1.5" fill="#374151" />
              <path d="M 144 82 Q 148 85 148 79" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="143" cy="77" r="2.5" fill="#FB7185" opacity="0.6" />
              <circle cx="134" cy="70" r="5" fill="#4B5563" />
            </motion.g>

            {/* Throats Visuddha glowing orb */}
            <motion.circle
              cx="135"
              cy="90"
              r="16"
              stroke="#60A5FA"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
              animate={isBreathing ? { scale: inhaleScale, opacity: inhaleOpacity } : undefined}
              transition={breathTransition}
            />
          </g>
        );

      case "balasana":
      case "child_pose":
      case "child's pose":
        return (
          <g>
            {/* Grounding Mat */}
            <rect x="25" y="158" width="150" height="8" rx="4" fill="#E9D5FF" />
            
            {/* Chubby legs folded under */}
            <path d="M 120 156 Q 100 138 78 152" stroke="#93C5FD" strokeWidth="15" strokeLinecap="round" fill="none" />
            
            {/* Folded Torso draped forward */}
            <motion.g
              animate={isBreathing ? { scaleY: [1, 1.04, 1], originY: 1 } : undefined}
              transition={breathTransition}
            >
              {/* Spine draped forward (Comfy Pink Sweater) */}
              <path d="M 115 148 Q 85 116 58 136" stroke="#F472B6" strokeWidth="22" strokeLinecap="round" fill="none" />
              
              {/* Arms extended out on floor */}
              <path d="M 75 146 L 45 146" stroke="#FFD8A8" strokeWidth="11" strokeLinecap="round" />
              <path d="M 75 146 L 62 146" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" />
              
              {/* Head resting on ground */}
              <circle cx="48" cy="136" r="12" fill="#FFD8A8" />
              <circle cx="44" cy="138" r="1.5" fill="#374151" />
              <circle cx="48" cy="138" r="2" fill="#FB7185" opacity="0.6" />
              <circle cx="56" cy="132" r="5.5" fill="#4B5563" />
            </motion.g>
          </g>
        );

      case "sukhasana":
      case "meditation":
      case "easy meditation pose":
        return (
          <g>
            {/* Meditative Seat base chubby legs */}
            <path d="M 50 148 C 65 168, 135 168, 150 148" stroke="#93C5FD" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M 68 148 C 80 156, 120 156, 132 148" stroke="#818CF8" strokeWidth="12" strokeLinecap="round" fill="none" />
            
            {/* Tall Sitting Spine */}
            <motion.g
              animate={isBreathing ? { y: [0, -3, 0], scaleX: [1, 1.01, 1] } : undefined}
              transition={breathTransition}
            >
              {/* Cozy Pink Sweater Torso */}
              <line x1="100" y1="145" x2="100" y2="92" stroke="#F472B6" strokeWidth="22" strokeLinecap="round" />
              
              {/* Gyan Mudra arms on knees */}
              <path d="M 82 110 Q 64 120, 72 138" stroke="#FFD8A8" strokeWidth="11" strokeLinecap="round" fill="none" />
              <path d="M 118 110 Q 136 120, 128 138" stroke="#FFD8A8" strokeWidth="11" strokeLinecap="round" fill="none" />
              
              {/* Sleeves */}
              <path d="M 82 110 Q 72 115, 75 125" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" fill="none" />
              <path d="M 118 110 Q 128 115, 125 125" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" fill="none" />

              {/* Head with friendly expression */}
              <circle cx="100" cy="70" r="14" fill="#FFD8A8" />
              <circle cx="94" cy="68" r="1.5" fill="#374151" />
              <circle cx="106" cy="68" r="1.5" fill="#374151" />
              <path d="M 97 73 Q 100 76 103 73" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="91" cy="72" r="2.5" fill="#FB7185" opacity="0.6" />
              <circle cx="109" cy="72" r="2.5" fill="#FB7185" opacity="0.6" />

              {/* Cute hair bun and details */}
              <circle cx="100" cy="54" r="6" fill="#4B5563" />
              <circle cx="96" cy="54" r="3" fill="#FB7185" />
            </motion.g>

            {/* Radiant Crown Aura (Sahasrara) */}
            <motion.circle
              cx="100"
              cy="65"
              r="22"
              stroke="#C084FC"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              fill="none"
              animate={isBreathing ? { scale: [1, 1.15, 1], opacity: [0.3, 0.8, 0.3] } : undefined}
              transition={breathTransition}
            />
          </g>
        );

      case "virabhadrasana":
      case "warrior2":
        return (
          <g>
            {/* Grounding Mat */}
            <rect x="25" y="165" width="150" height="8" rx="4" fill="#E9D5FF" />
            
            {/* Lunge Legs in cozy blue joggers */}
            <path d="M 52 165 L 85 125 L 128 125" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="128" y1="125" x2="148" y2="165" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" />
            
            {/* Torso upright in pink active tank top */}
            <line x1="88" y1="125" x2="88" y2="82" stroke="#F472B6" strokeWidth="22" strokeLinecap="round" />
            
            {/* Head looking sideways to Left with details */}
            <circle cx="88" cy="64" r="13" fill="#FFD8A8" />
            <circle cx="81" cy="62" r="1.5" fill="#374151" />
            <path d="M 79 67 Q 83 69 83 66" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="81" cy="65" r="2.5" fill="#FB7185" opacity="0.6" />
            <circle cx="95" cy="56" r="5" fill="#4B5563" />

            {/* Active T-shape arms extending */}
            <motion.g
              animate={isBreathing ? { y: [0, -1.5, 0] } : undefined}
              transition={breathTransition}
            >
              {/* Pink comfortable outstretched arms */}
              <line x1="45" y1="92" x2="132" y2="92" stroke="#FFD8A8" strokeWidth="11" strokeLinecap="round" />
              <line x1="72" y1="92" x2="105" y2="92" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" />
            </motion.g>

            {/* Glowing inner fire solar plexus chakra */}
            <motion.circle
              cx="88"
              cy="105"
              r="18"
              stroke="#F59E0B"
              strokeWidth="2"
              fill="none"
              animate={isBreathing ? { scale: [1, 1.1, 1], opacity: [0.4, 0.9, 0.4] } : undefined}
              transition={breathTransition}
            />
          </g>
        );

      case "marjaryasana":
      case "cat_cow":
        return (
          <g>
            {/* Grounding Mat */}
            <rect x="25" y="165" width="150" height="8" rx="4" fill="#E9D5FF" />
            
            {/* Tabletop soft blue joggers and arms */}
            <line x1="58" y1="165" x2="58" y2="125" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" />
            <line x1="132" y1="165" x2="132" y2="125" stroke="#FFD8A8" strokeWidth="11" strokeLinecap="round" />
            <line x1="132" y1="125" x2="132" y2="140" stroke="#F472B6" strokeWidth="13" strokeLinecap="round" />

            {/* Cat or Cow spine moving (comfy Pink Sweater) */}
            <motion.path
              d="M 58 125 Q 95 135 132 125"
              animate={isBreathing ? { d: ["M 58 125 Q 95 135 132 125", "M 58 125 Q 95 102 132 125", "M 58 125 Q 95 135 132 125"] } : undefined}
              transition={breathTransition}
              stroke="#F472B6"
              strokeWidth="22"
              strokeLinecap="round"
              fill="none"
            />

            {/* Head bobbing in sync with spine */}
            <motion.g
              animate={isBreathing ? { y: [8, -4, 8] } : undefined}
              transition={breathTransition}
            >
              <circle cx="144" cy="116" r="12" fill="#FFD8A8" />
              <circle cx="148" cy="114" r="1.5" fill="#374151" />
              <path d="M 144 120 Q 148 122 147 118" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="144" cy="116" r="2.5" fill="#FB7185" opacity="0.6" />
              <circle cx="138" cy="106" r="4.5" fill="#4B5563" />
            </motion.g>
          </g>
        );

      case "butterfly":
        return (
          <g>
            {/* Grounding Mat */}
            <rect x="25" y="155" width="150" height="8" rx="4" fill="#E9D5FF" />

            {/* Cozy sitting torso in pink sweater */}
            <motion.line 
              x1="100" y1="150" x2="100" y2="98" 
              stroke="#F472B6" strokeWidth="22" strokeLinecap="round"
              animate={isBreathing ? { y: [0, -3, 0] } : undefined}
              transition={breathTransition}
            />
            {/* Cute blushing head */}
            <motion.g
              animate={isBreathing ? { y: [0, -3, 0] } : undefined}
              transition={breathTransition}
            >
              <circle cx="100" cy="78" r="14" fill="#FFD8A8" />
              <circle cx="94" cy="76" r="1.5" fill="#374151" />
              <circle cx="106" cy="76" r="1.5" fill="#374151" />
              <path d="M 97 81 Q 100 84 103 81" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="91" cy="80" r="2.5" fill="#FB7185" opacity="0.6" />
              <circle cx="109" cy="80" r="2.5" fill="#FB7185" opacity="0.6" />
              <circle cx="100" cy="62" r="5.5" fill="#4B5563" />
            </motion.g>

            {/* Flapping butterfly legs in blue joggers */}
            <motion.path
              d="M 68 146 Q 100 152 132 146"
              fill="none"
              stroke="#93C5FD"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <motion.path
              d="M 68 146 C 40 128, 100 152, 68 146 Z"
              fill="#93C5FD"
              opacity="0.5"
              animate={isBreathing ? { scaleY: [1, 0.72, 1], originY: 1 } : undefined}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 132 146 C 160 128, 100 152, 132 146 Z"
              fill="#93C5FD"
              opacity="0.5"
              animate={isBreathing ? { scaleY: [1, 0.72, 1], originY: 1 } : undefined}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
          </g>
        );

      case "bridge":
        return (
          <g>
            {/* Grounding Mat */}
            <rect x="25" y="155" width="150" height="8" rx="4" fill="#E9D5FF" />

            {/* Thighs and calves in blue joggers */}
            <line x1="50" y1="155" x2="62" y2="132" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" />
            
            {/* Cute lying head on mat, hair bun */}
            <circle cx="148" cy="148" r="12" fill="#FFD8A8" />
            <circle cx="145" cy="146" r="1.5" fill="#374151" />
            <path d="M 148 152 Q 146 154 144 150" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="148" cy="145" r="2.5" fill="#FB7185" opacity="0.6" />
            <circle cx="156" cy="142" r="5" fill="#4B5563" />

            {/* Cozy Spine bridging upwards (in Pink Sweatshirt) */}
            <motion.path
              d="M 62 132 C 75 110, 125 110, 136 142"
              fill="none"
              stroke="#F472B6"
              strokeWidth="20"
              strokeLinecap="round"
              animate={isBreathing ? { d: ["M 62 132 C 75 118, 125 118, 136 142", "M 62 132 C 75 88, 125 88, 136 142", "M 62 132 C 75 118, 125 118, 136 142"] } : undefined}
              transition={breathTransition}
            />
          </g>
        );

      default:
        // Mountain Pose (Default) - Cozy Straight Standing Tall
        return (
          <g>
            {/* Grounding Mat */}
            <rect x="25" y="175" width="150" height="8" rx="4" fill="#E9D5FF" />
            
            {/* Cozy chubby Legs (blue leggings) */}
            <line x1="93" y1="175" x2="93" y2="112" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" />
            <line x1="107" y1="175" x2="107" y2="112" stroke="#93C5FD" strokeWidth="14" strokeLinecap="round" />
            
            <motion.g
              animate={isBreathing ? { y: [0, -3, 0] } : undefined}
              transition={breathTransition}
            >
              {/* Cozy Pink Hoodie shirt */}
              <line x1="100" y1="112" x2="100" y2="76" stroke="#F472B6" strokeWidth="22" strokeLinecap="round" />
              
              {/* Cute smiling face */}
              <circle cx="100" cy="56" r="14" fill="#FFD8A8" />
              <circle cx="94" cy="54" r="1.5" fill="#374151" />
              <circle cx="106" cy="54" r="1.5" fill="#374151" />
              <path d="M 97 60 Q 100 63 103 60" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="91" cy="58" r="2.5" fill="#FB7185" opacity="0.6" />
              <circle cx="109" cy="58" r="2.5" fill="#FB7185" opacity="0.6" />
              <circle cx="100" cy="40" r="6.5" fill="#4B5563" />

              {/* Chubby safe arms */}
              <line x1="84" y1="88" x2="76" y2="128" stroke="#FFD8A8" strokeWidth="10" strokeLinecap="round" />
              <line x1="116" y1="88" x2="124" y2="128" stroke="#FFD8A8" strokeWidth="10" strokeLinecap="round" />
              
              {/* Pink Sleeves */}
              <line x1="86" y1="88" x2="82" y2="105" stroke="#F472B6" strokeWidth="12" strokeLinecap="round" />
              <line x1="114" y1="88" x2="118" y2="105" stroke="#F472B6" strokeWidth="12" strokeLinecap="round" />
            </motion.g>

            {/* Glowing aura */}
            <motion.circle
              cx="100"
              cy="95"
              r="26"
              stroke="#A78BFA"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
              animate={isBreathing ? { scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] } : undefined}
              transition={breathTransition}
            />
          </g>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#FAF5FF] to-white rounded-3xl border border-purple-100 shadow-sm relative overflow-hidden ${className}`}>
      {/* Visual background ambient particle beam */}
      <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-purple-200/20 via-transparent to-transparent pointer-events-none rounded-t-3xl" />
      
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[0_4px_10px_rgba(168,85,247,0.15)]"
      >
        <defs>
          <radialGradient id="spiritual-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D8B4FE" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient radial energy circle behind */}
        <circle cx="100" cy="100" r="85" fill="url(#spiritual-radial)" />

        {renderPoseBody()}
      </svg>
      
      {isBreathing && (
        <div className="mt-2 text-[10px] font-mono tracking-widest text-purple-700 font-bold uppercase animate-pulse flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
          Breathing Cycle Active
        </div>
      )}
    </div>
  );
}
