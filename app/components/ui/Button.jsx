import Link from "next/link";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-light",
  outline: "border border-white/70 text-white hover:bg-white/10",
};

export default function Button({ href, variant = "primary", className = "", children, ...props }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
