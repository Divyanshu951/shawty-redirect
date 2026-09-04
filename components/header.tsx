import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="border-surface-container/60 bg-surface/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="https://shawty.online"
          className="text-primary-dark font-bricolage flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <Image src="/icon.png" alt="icon" height={20} width={20} />
          <span className="mt-1">Shawty.online</span>
        </Link>
        <div className="flex items-center gap-3.5">
          <div className="bg-surface-container-low border-outline-variant/60 text-on-surface-variant inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-2xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
            <span>Link Verified</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
