"use client";

import { Wrench, Zap, Cpu, Flame, Shield, Activity, HardHat, Gauge } from "lucide-react";

export default function IndustrialVisual({
  type = "mechanical",
  title = "",
  subtitle = "",
  className = "",
  compact = false,
}) {
  const getTheme = () => {
    switch (type) {
      case "mechanical":
      case "piping":
      case "aek-sibundong":
      case "endikat":
      case "water-intake":
        return {
          gradient: "from-[#08224d] via-[#0b3374] to-[#1258c7]",
          accent: "#38bdf8",
          glow: "rgba(56, 189, 248, 0.25)",
          icon: Wrench,
          tag: "ASME B31 PIPING",
          pattern: "piping",
        };
      case "electrical":
      case "substation":
        return {
          gradient: "from-[#061b3b] via-[#10306b] to-[#1d4ed8]",
          accent: "#f59e0b",
          glow: "rgba(245, 158, 11, 0.25)",
          icon: Zap,
          tag: "MEDIUM VOLTAGE / IEC",
          pattern: "circuit",
        };
      case "automation":
      case "scada":
        return {
          gradient: "from-[#041a3a] via-[#093557] to-[#0284c7]",
          accent: "#10b981",
          glow: "rgba(16, 185, 129, 0.25)",
          icon: Cpu,
          tag: "PLC & SCADA SYSTEM",
          pattern: "data",
        };
      case "power-plant":
      case "turbine":
        return {
          gradient: "from-[#0b1d3a] via-[#1e3a8a] to-[#2563eb]",
          accent: "#f97316",
          glow: "rgba(249, 115, 22, 0.25)",
          icon: Flame,
          tag: "HYDRO & THERMAL POWER",
          pattern: "energy",
        };
      case "hero":
      default:
        return {
          gradient: "from-[#031533] via-[#0b2859] to-[#164796]",
          accent: "#60a5fa",
          glow: "rgba(96, 165, 250, 0.25)",
          icon: HardHat,
          tag: "AIRINDO ENGINEERING",
          pattern: "grid",
        };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  return (
    <div
      className={`relative isolate overflow-hidden bg-gradient-to-br ${theme.gradient} text-white flex flex-col justify-between select-none ${className}`}
    >
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: compact ? "16px 16px" : "28px 28px",
        }}
      />

      {/* Decorative Engineering Schematics Lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke={theme.accent} strokeWidth="1" strokeDasharray="6 4" />
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke={theme.accent} strokeWidth="1" strokeDasharray="4 6" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="20%" cy="30%" r="5" fill={theme.accent} />
        <circle cx="75%" cy="30%" r="4" fill="#ffffff" />
        <circle cx="50%" cy="65%" r="35" stroke={theme.accent} strokeWidth="1" fill="none" strokeDasharray="4 4" />
      </svg>

      {/* Radial Gradient Glow Spot */}
      <div
        className="absolute -right-8 -top-8 h-44 w-44 rounded-full blur-2xl pointer-events-none"
        style={{ background: theme.glow }}
      />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between p-3.5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-2.5 py-0.5 text-[9.5px] font-mono font-semibold tracking-wider text-white/90 uppercase">
          <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: theme.accent }} />
          {theme.tag}
        </span>
        <div className="flex items-center gap-1 text-[10px] text-white/60 font-mono">
          <Activity size={11} className="text-white/80" />
          <span>SPEC OK</span>
        </div>
      </div>

      {/* Center Icon & Graphic */}
      <div className="relative z-10 flex flex-col items-center justify-center p-3 text-center my-auto">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-110">
          <IconComponent size={26} style={{ color: theme.accent }} />
          <div
            className="absolute -inset-1 rounded-2xl opacity-40 blur-sm -z-10"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
        {title && (
          <h4 className="mt-2.5 text-[14px] font-bold text-white tracking-wide line-clamp-1 drop-shadow-sm">
            {title}
          </h4>
        )}
        {subtitle && (
          <p className="text-[11px] text-white/80 line-clamp-1 font-medium mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 bg-black/25 px-3 py-1.5 text-[10px] text-white/70 font-mono">
        <span className="flex items-center gap-1">
          <Gauge size={10} className="text-white/80" /> QMS / K3 PASS
        </span>
        <span className="text-[9px] uppercase tracking-wider text-white/50">ATP-ENG</span>
      </div>
    </div>
  );
}
