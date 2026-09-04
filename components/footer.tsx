import Link from "next/link";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-surface-container/60 bg-surface/50 w-full border-t py-5 text-center">
      <Link
        href="https://shawty.online"
        className="text-on-surface-variant/80 mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-6 text-xs font-medium sm:flex-row sm:gap-4"
      >
        <span>
          Powered by{" "}
          <strong className="text-on-surface font-bricolage font-semibold">
            Shawty
          </strong>{" "}
          URL Shortener
        </span>
        <span className="text-outline-variant hidden sm:inline">•</span>
        <span className="inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-primary text-[14px]">
            <Shield size={14} className="fill-current" />
          </span>
          Encrypted &amp; Verified Interstitial
        </span>
      </Link>
    </footer>
  );
};

export default Footer;
