// Static mobile fallback for the R3F data-ocean scene. Zero JS-per-frame —
// pure CSS gradients + a CSS-painted dot grid. Same violet/amber palette
// and "data" feel without any WebGL or rAF loop blocking the main thread.

export function HeroStaticBg() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep purple base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #2e1065 0%, #1a0533 35%, #0a0514 75%, #050208 100%)",
        }}
      />

      {/* Vibrant violet glow rising from center-bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 90%, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.12) 35%, transparent 70%)",
        }}
      />

      {/* Amber highlight kiss */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 35% 25% at 30% 20%, rgba(252,211,77,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Static data-grid dots — pure CSS, no animation */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(167,139,250,0.55) 1px, transparent 1.6px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 65%, black 0%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 65%, black 0%, black 30%, transparent 80%)",
        }}
      />

      {/* Subtle horizon line */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          top: "62%",
          background:
            "linear-gradient(to right, transparent 0%, rgba(139,92,246,0.4) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
