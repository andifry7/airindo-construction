import {
  Wrench,
  Zap,
  Cpu,
  Flame,
  Briefcase,
  Clock3,
  ShieldCheck,
  MessageSquareText,
  TrendingUp,
  Lightbulb,
  Users,
  MessagesSquare,
  BadgeCheck,
  Headset,
  Handshake,
  HardHat,
} from "lucide-react";

/**
 * Registry ikon: nama (string) → komponen lucide.
 *
 * Database hanya menyimpan nama ikon karena komponen React tidak bisa
 * diserialisasi ke JSON. Ini satu-satunya tempat pemetaannya.
 */
export const iconRegistry = {
  Wrench,
  Zap,
  Cpu,
  Flame,
  Briefcase,
  Clock3,
  ShieldCheck,
  MessageSquareText,
  TrendingUp,
  Lightbulb,
  Users,
  MessagesSquare,
  BadgeCheck,
  Headset,
  Handshake,
  HardHat,
};

/** Ambil komponen ikon berdasarkan nama; jatuh ke HardHat bila tidak dikenal. */
export function resolveIcon(name, fallback = HardHat) {
  return iconRegistry[name] ?? fallback;
}

/** Kebalikan dari resolveIcon — dipakai saat membangun fallback dari lib/data.js. */
export function iconNameOf(component, fallback = "HardHat") {
  const found = Object.entries(iconRegistry).find(([, value]) => value === component);
  return found ? found[0] : fallback;
}
