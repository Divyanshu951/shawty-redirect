import Link from "next/link";

const Footer = ({ title }: { title: string }) => {
  return (
    <div className="mt-8 border-t border-gray-100 pt-6">
      <p className="mb-3 text-sm font-semibold text-gray-900">{title}</p>
      <div className="text-primary-dark flex flex-wrap gap-3 text-sm font-medium">
        <Link href="https://shawty.online" className="hover:underline">
          Homepage
        </Link>
        <span className="text-gray-300">•</span>
        <Link
          href="https://app.shawity.online/auth/signup"
          className="hover:underline"
        >
          Create a Link
        </Link>
      </div>
    </div>
  );
};

export default Footer;
