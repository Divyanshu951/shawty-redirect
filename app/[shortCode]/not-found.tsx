import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col font-sans text-gray-800">
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

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-12">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Left Column: Paraphrased Text */}
          <div>
            <p className="mb-12 font-mono text-xl font-semibold tracking-wide text-gray-600 uppercase">
              Error 404 - Destination Not Found
            </p>

            <h1 className="font-bricolage mt-2 mb-4 text-4xl leading-tight font-extrabold text-gray-900">
              Looks like you&apos;ve got the wrong address.
            </h1>

            <div className="space-y-4 text-base leading-relaxed text-gray-600">
              <p>
                The link you followed might contain a typo, or it may have been
                moved or deleted. Remember that shortened URLs are{" "}
                <strong className="text-gray-800">case-sensitive</strong>,{" "}
                double-check the uppercase and lowercase characters and try
                again.
              </p>
              <p>
                If the problem persists, reach out directly to the person or
                team who shared the link with you.
                <br />
                <br />
                Note: You don&apos;t need an account to view shortened links.
              </p>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">
                Need help finding your way?
              </p>
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
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/notfound-image.png"
              alt="not found"
              height={900}
              width={900}
              loading="eager"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
