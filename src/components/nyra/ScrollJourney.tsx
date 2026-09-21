import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

const ScrollJourney = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });

  // Person walks from far left toward the bus door.
  const personX = useTransform(progress, [0, 0.7], ["2%", "72%"]);
  const personY = useTransform(progress, (v) =>
    v < 0.7 ? Math.sin(v * Math.PI * 14) * 6 : 0,
  );
  const personRotate = useTransform(progress, (v) =>
    v < 0.7 ? Math.sin(v * Math.PI * 14) * 3 : 0,
  );
  const legSwing = useTransform(progress, (v) =>
    v < 0.7 ? Math.sin(v * Math.PI * 14) * 25 : 0,
  );
  const legSwing2 = useTransform(progress, (v) =>
    v < 0.7 ? -Math.sin(v * Math.PI * 14) * 25 : 0,
  );
  const armSwing = useTransform(progress, (v) =>
    v < 0.7 ? Math.sin(v * Math.PI * 14) * 15 : 0,
  );

  // Boarding
  const personScale = useTransform(progress, [0.7, 0.8], [1, 0.2]);
  const personOpacity = useTransform(progress, [0, 0.7, 0.8], [1, 1, 0]);
  const personBoardY = useTransform(progress, [0.7, 0.8], [0, 20]);

  const doorScale = useTransform(
    progress,
    [0.72, 0.8, 0.82, 0.88],
    [1, 0.1, 0.1, 1],
  );

  // Bus idles, then drives off the right side
  const busX = useTransform(progress, [0, 0.88, 1], ["0%", "0%", "60%"]);
  const busShake = useTransform(progress, (v) =>
    v > 0.88 ? Math.sin(v * Math.PI * 80) * 1.5 : 0,
  );
  // Motion-blur ramps up while the bus accelerates away
  const busBlurPx = useTransform(progress, [0.88, 0.95, 1], [0, 3.5, 5]);
  const busBlur = useMotionTemplate`blur(${busBlurPx}px)`;
  // Headlight glow brightens as it moves
  const headlightOpacity = useTransform(progress, [0.85, 0.92, 1], [0.25, 0.8, 1]);
  // Speed lines appear during drive-off
  const speedLinesOpacity = useTransform(progress, [0.88, 0.93, 1], [0, 0.8, 1]);
  const speedLinesX = useTransform(progress, [0.88, 1], ["0%", "-40%"]);

  // Wheels spin faster while moving
  const wheelDuration = 1.2;

  const roadOffset = useTransform(progress, [0, 1], ["0px", "-800px"]);

  const sunX = useTransform(progress, [0, 1], ["10%", "85%"]);
  const sunY = useTransform(progress, (v) => 20 + Math.sin(v * Math.PI) * -10);

  // Parallax layers — far moves slow, near moves fast
  const cloud1X = useTransform(progress, [0, 1], ["0%", "-30%"]);
  const cloud2X = useTransform(progress, [0, 1], ["0%", "-50%"]);
  const mountainsX = useTransform(progress, [0, 1], ["0%", "-12%"]);
  const hillsX = useTransform(progress, [0, 1], ["0%", "-22%"]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div className="relative w-full h-full">
        {/* Soft sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.97 0.015 250) 0%, oklch(0.99 0.005 250) 60%, oklch(1 0 0) 100%)",
          }}
        />


        {/* Sun */}
        <motion.div
          style={{ left: sunX, top: sunY }}
          className="absolute w-24 h-24 rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.85 0.1 250) 0%, oklch(0.85 0.1 250 / 0.4) 60%, transparent 80%)",
              filter: "blur(2px)",
            }}
          />
        </motion.div>

        {/* Clouds */}
        <motion.div
          style={{ x: cloud1X }}
          className="absolute top-[15%] left-[20%] flex gap-2 opacity-90"
        >
          <div className="w-28 h-9 rounded-full bg-white blur-sm" />
          <div className="w-16 h-6 rounded-full bg-white -ml-6 mt-2 blur-sm" />
        </motion.div>
        <motion.div
          style={{ x: cloud2X }}
          className="absolute top-[25%] right-[15%] flex gap-2 opacity-85"
        >
          <div className="w-32 h-10 rounded-full bg-white blur-sm" />
        </motion.div>

        {/* Distant mountains (slow parallax) */}
        <motion.div
          style={{ x: mountainsX }}
          className="absolute bottom-[35%] -left-[6%] -right-[6%] h-32 opacity-40"
        >
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,200 L150,80 L300,140 L450,60 L600,120 L750,50 L900,110 L1050,70 L1200,130 L1200,200 Z"
              fill="oklch(0.78 0.04 250)"
            />
          </svg>
        </motion.div>

        {/* Nearer hills (faster parallax) */}
        <motion.div
          style={{ x: hillsX }}
          className="absolute bottom-[30%] -left-[10%] -right-[10%] h-24 opacity-55"
        >
          <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,160 L100,110 L240,140 L380,90 L520,130 L680,80 L820,120 L980,95 L1200,140 L1200,160 Z"
              fill="oklch(0.7 0.05 250)"
            />
          </svg>
        </motion.div>

        {/* Ground */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[35%]"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.96 0.008 250) 0%, oklch(0.99 0.003 250) 100%)",
          }}
        />

        {/* Road */}
        <div className="absolute bottom-[10%] left-0 right-0 h-16 bg-foreground/5 border-y border-foreground/10" />
        <motion.div
          style={{ backgroundPositionX: roadOffset }}
          className="absolute bottom-[10%] left-0 right-0 h-16 flex items-center"
        >
          <div
            className="w-full h-1.5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, oklch(0.62 0.19 256) 0 40px, transparent 40px 80px)",
            }}
          />
        </motion.div>


        {/* Bus + lighting + motion blur */}
        <motion.div
          style={{ x: busX, y: busShake, filter: busBlur }}
          className="absolute bottom-[14%] right-[5%] z-20"
        >
          {/* Speed-line streaks behind the bus when driving off */}
          <motion.div
            style={{ opacity: speedLinesOpacity, x: speedLinesX }}
            className="pointer-events-none absolute top-[42%] right-full mr-2 flex flex-col gap-2 w-40"
            aria-hidden
          >
            <div className="h-[2px] w-full bg-gradient-to-l from-sky-400/70 to-transparent blur-[1px]" />
            <div className="h-[2px] w-3/4 bg-gradient-to-l from-indigo-400/60 to-transparent blur-[1px]" />
            <div className="h-[2px] w-5/6 bg-gradient-to-l from-sky-300/60 to-transparent blur-[1px]" />
            <div className="h-[2px] w-2/3 bg-gradient-to-l from-indigo-300/50 to-transparent blur-[1px]" />
          </motion.div>

          {/* Headlight glow on the front-right of the bus */}
          <motion.div
            style={{ opacity: headlightOpacity }}
            className="pointer-events-none absolute top-[55%] -right-6 h-24 w-32 -translate-y-1/2 rounded-full"
            aria-hidden
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(ellipse at left center, oklch(0.95 0.15 95 / 0.7) 0%, oklch(0.95 0.15 95 / 0.25) 40%, transparent 70%)",
                filter: "blur(6px)",
              }}
            />
          </motion.div>

          <Bus doorScale={doorScale} wheelDuration={wheelDuration} />

          {/* Soft underglow from sun-side ambient light */}
          <div
            className="pointer-events-none absolute -bottom-1 left-4 right-4 h-3 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0 0 0 / 0.25) 0%, transparent 70%)",
              filter: "blur(4px)",
            }}
            aria-hidden
          />
        </motion.div>

        {/* Person */}
        <motion.div
          style={{
            left: personX,
            y: personY,
            rotate: personRotate,
            opacity: personOpacity,
            scale: personScale,
          }}
          className="absolute bottom-[14%] z-10 origin-bottom"
        >
          <motion.div style={{ y: personBoardY }}>
            <Person legSwing={legSwing} legSwing2={legSwing2} armSwing={armSwing} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const Person = ({
  legSwing,
  legSwing2,
  armSwing,
}: {
  legSwing: any;
  legSwing2: any;
  armSwing: any;
}) => (
  <svg width="90" height="140" viewBox="0 0 90 140" className="drop-shadow-xl">
    <ellipse cx="45" cy="138" rx="22" ry="3" fill="oklch(0 0 0 / 0.2)" />

    <motion.rect
      x="38"
      y="90"
      width="8"
      height="40"
      rx="3"
      fill="oklch(0.4 0.08 285)"
      style={{ rotate: legSwing2, originX: 0.5, originY: 0, transformBox: "fill-box" }}
    />
    <motion.rect
      x="46"
      y="90"
      width="8"
      height="40"
      rx="3"
      fill="oklch(0.35 0.09 285)"
      style={{ rotate: legSwing, originX: 0.5, originY: 0, transformBox: "fill-box" }}
    />

    <motion.g style={{ rotate: armSwing, originX: "30px", originY: "60px" }}>
      <rect x="10" y="75" width="22" height="18" rx="3" fill="oklch(0.85 0.18 95)" stroke="oklch(0.5 0.12 80)" strokeWidth="1.5" />
      <rect x="19" y="68" width="4" height="9" rx="1.5" fill="oklch(0.5 0.12 80)" />
      <line x1="30" y1="60" x2="22" y2="76" stroke="oklch(0.7 0.08 50)" strokeWidth="3" strokeLinecap="round" />
    </motion.g>

    <path
      d="M30 55 Q30 50 35 50 L55 50 Q60 50 60 55 L62 92 Q62 95 58 95 L32 95 Q28 95 28 92 Z"
      fill="url(#jacketGrad)"
    />

    <rect x="22" y="58" width="14" height="28" rx="4" fill="oklch(0.62 0.19 256)" stroke="oklch(0.55 0.18 340)" strokeWidth="1" />
    <rect x="25" y="64" width="8" height="3" rx="1" fill="oklch(0.55 0.18 340)" opacity="0.6" />

    <motion.g style={{ rotate: -10, originX: "60px", originY: "60px" }}>
      <rect x="58" y="58" width="7" height="28" rx="3" fill="url(#jacketGrad)" />
      <ellipse cx="68" cy="92" rx="14" ry="7" fill="oklch(0.82 0.13 195)" stroke="oklch(0.5 0.1 195)" strokeWidth="1.5" />
      <line x1="58" y1="85" x2="68" y2="86" stroke="oklch(0.5 0.1 195)" strokeWidth="2" strokeLinecap="round" />
      <rect x="62" y="88" width="12" height="2" rx="1" fill="oklch(0.5 0.1 195)" opacity="0.5" />
    </motion.g>

    <rect x="42" y="42" width="6" height="10" fill="oklch(0.78 0.07 50)" />

    <circle cx="45" cy="32" r="13" fill="oklch(0.82 0.07 50)" />
    <path d="M33 30 Q33 18 45 18 Q57 18 57 30 L57 25 Q57 22 53 22 L37 22 Q33 22 33 25 Z" fill="oklch(0.25 0.04 30)" />
    <circle cx="50" cy="32" r="1.2" fill="oklch(0.15 0 0)" />
    <path d="M47 38 Q50 40 53 38" stroke="oklch(0.3 0.05 30)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

    <defs>
      <linearGradient id="jacketGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.72 0.18 295)" />
        <stop offset="100%" stopColor="oklch(0.55 0.22 295)" />
      </linearGradient>
    </defs>
  </svg>
);

const Bus = ({
  doorScale,
  wheelDuration,
}: {
  doorScale: any;
  wheelDuration: number;
}) => (
  <svg width="280" height="160" viewBox="0 0 280 160" className="drop-shadow-xl">
    <ellipse cx="140" cy="155" rx="120" ry="5" fill="oklch(0 0 0 / 0.2)" />

    {/* Body */}
    <rect x="10" y="30" width="250" height="100" rx="14" fill="url(#busGrad)" stroke="oklch(0.62 0.19 256)" strokeWidth="2" />
    {/* Top-light highlight stripe (sun above) */}
    <rect x="14" y="33" width="242" height="8" rx="6" fill="url(#busHighlight)" opacity="0.85" />
    {/* Subtle ambient occlusion underbelly */}
    <rect x="10" y="118" width="250" height="12" rx="6" fill="url(#busShade)" opacity="0.6" />

    {/* Headlights (front-right) */}
    <rect x="250" y="55" width="10" height="14" rx="2" fill="oklch(0.95 0.18 95)" />
    <rect x="250" y="95" width="10" height="14" rx="2" fill="oklch(0.85 0.15 85)" opacity="0.7" />
    {/* Headlight glow lens */}
    <circle cx="258" cy="62" r="6" fill="oklch(1 0.12 95 / 0.7)" filter="url(#lightBlur)" />

    {/* Windshield with reflection */}
    <path d="M235 35 L258 50 L258 80 L235 80 Z" fill="oklch(0.62 0.19 256 / 0.25)" stroke="oklch(0.62 0.19 256)" strokeWidth="1.5" />
    <path d="M238 38 L256 51 L256 56 L238 50 Z" fill="oklch(1 0 0 / 0.55)" />

    {[40, 80, 120, 160, 200].map((x) => (
      <g key={x}>
        <rect
          x={x}
          y="42"
          width="32"
          height="32"
          rx="4"
          fill="url(#windowGrad)"
          stroke="oklch(0.62 0.19 256)"
          strokeWidth="1.5"
        />
        {/* diagonal glass reflection */}
        <path
          d={`M${x + 4} ${44} L${x + 16} ${44} L${x + 4} ${56} Z`}
          fill="oklch(1 0 0 / 0.45)"
        />
      </g>
    ))}

    <rect x="10" y="86" width="250" height="14" fill="oklch(0.62 0.19 256)" />
    <text
      x="135"
      y="98"
      textAnchor="middle"
      fill="white"
      fontSize="12"
      fontWeight="900"
      fontFamily="Space Grotesk, sans-serif"
      letterSpacing="2"
    >
      NYRA TRAVELS
    </text>

    {/* Door — collapses (slides open) then re-expands (closes) */}
    <motion.rect
      x="25"
      y="105"
      width="22"
      height="25"
      rx="2"
      fill="oklch(0.62 0.19 256 / 0.4)"
      stroke="oklch(0.62 0.19 256)"
      strokeWidth="1.5"
      style={{ scaleX: doorScale, originX: "25px", originY: "117px" }}
    />

    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: wheelDuration, repeat: Infinity, ease: "linear" }}
      style={{ originX: 0.5, originY: 0.5, transformBox: "fill-box" }}
    >
      <circle cx="55" cy="135" r="18" fill="oklch(0.25 0.02 250)" stroke="oklch(0.55 0.02 250)" strokeWidth="3" />
      <rect x="53" y="120" width="4" height="30" fill="oklch(0.75 0.02 250)" />
      <rect x="40" y="133" width="30" height="4" fill="oklch(0.75 0.02 250)" />
    </motion.g>
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: wheelDuration, repeat: Infinity, ease: "linear" }}
      style={{ originX: 0.5, originY: 0.5, transformBox: "fill-box" }}
    >
      <circle cx="215" cy="135" r="18" fill="oklch(0.25 0.02 250)" stroke="oklch(0.55 0.02 250)" strokeWidth="3" />
      <rect x="213" y="120" width="4" height="30" fill="oklch(0.75 0.02 250)" />
      <rect x="200" y="133" width="30" height="4" fill="oklch(0.75 0.02 250)" />
    </motion.g>

    <defs>
      <linearGradient id="busGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(1 0 0)" />
        <stop offset="55%" stopColor="oklch(0.97 0.01 250)" />
        <stop offset="100%" stopColor="oklch(0.88 0.02 250)" />
      </linearGradient>
      <linearGradient id="busHighlight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(1 0 0 / 0.95)" />
        <stop offset="100%" stopColor="oklch(1 0 0 / 0)" />
      </linearGradient>
      <linearGradient id="busShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0 0 0 / 0)" />
        <stop offset="100%" stopColor="oklch(0 0 0 / 0.45)" />
      </linearGradient>
      <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.85 0.08 250 / 0.55)" />
        <stop offset="100%" stopColor="oklch(0.62 0.19 256 / 0.25)" />
      </linearGradient>
      <filter id="lightBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
    </defs>
  </svg>
);

export default ScrollJourney;
