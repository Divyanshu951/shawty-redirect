import Footer from "@/components/not-found/footer";
import Header from "@/components/not-found/header";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col font-sans text-gray-800">
      <Header />

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

            <Footer title="Need help finding your way?" />
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
