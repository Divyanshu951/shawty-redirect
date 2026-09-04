import Image from "next/image";
import Footer from "./not-found/footer";
import Header from "./not-found/header";

const LinkNotActive = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col font-sans text-gray-800">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-12">
        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
          <div>
            <p className="mb-12 font-mono text-xl font-semibold tracking-wide text-amber-600 uppercase">
              Link Inactive
            </p>

            <h1 className="font-bricolage mt-2 mb-4 text-4xl leading-tight font-extrabold text-gray-900">
              This link is currently unavailable.
            </h1>

            <div className="space-y-4 text-base leading-relaxed text-gray-600">
              <p>
                The URL you are trying to access exists, but it has been turned
                off or paused by the link owner.
              </p>
              <p>
                If you believe this is an error, please contact the person or
                organization who provided you with this link to ask them to
                reactivate it.
                <br />
                <br />
                Note: Link creators can toggle access back on at any time.
              </p>
            </div>

            <Footer title="Where to go from here?" />
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/link-disabled.png"
              alt="link disabled"
              height={900}
              width={900}
              className="scale-130"
              loading="eager"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LinkNotActive;
