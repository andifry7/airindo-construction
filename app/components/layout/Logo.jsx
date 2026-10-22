import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = "lg" }) {
  const dims =
    size === "lg" ? { box: 36, text: "text-xl" } : { box: 32, text: "text-lg" };
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image
        src="/images/logo.webp"
        alt="Logo PT. Airindo Teknologi Perkasa"
        width={dims.box}
        height={dims.box}
        priority
        className="h-auto w-auto object-contain"
      />
      <span className={`font-bold tracking-tight text-white ${dims.text}`}>
        Airindo Construction
      </span>
    </Link>
  );
}
