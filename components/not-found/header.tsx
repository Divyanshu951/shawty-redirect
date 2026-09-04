import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-8 py-4">
      <Link
        href="https://shawty.online"
        className="text-primary-dark font-bricolage flex items-center gap-2 text-xl font-bold tracking-tight"
      >
        <Image src="/icon.png" alt="icon" height={20} width={20} />
        <span className="mt-1">Shawty.online</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="https://app.shawty.online/auth/login"
          className="hover:text-primary-dark text-sm font-medium text-gray-600 transition-colors"
        >
          Log In
        </Link>
        <Link
          href="https://app.shawty.online/auth/signup"
          className="bg-primary hover:bg-primary-dark/70 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors duration-200"
        >
          Get Started Free
        </Link>
      </div>
    </header>
  );
};

export default Header;
