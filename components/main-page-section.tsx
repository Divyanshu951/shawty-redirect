"use client";
import {
  BadgeCheck,
  Earth,
  Copy,
  PlugZap,
  X,
  Loader2Icon,
  Check,
} from "lucide-react";
import Image from "next/image";
import { incrementClickCount } from "@/app/actions";
import { redirect, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  metadata: {
    title: string;
    description: string | undefined;
    image: string | undefined;
    siteName: string | undefined;
  } | null;
  destinationUrl: string;
};

const MainPageSection = ({ metadata, destinationUrl }: Props) => {
  const { shortCode } = useParams();
  const [timer, setTimer] = useState<number>(5);
  const [automatedRedirect, setAutomatedRedirect] = useState<boolean>(true);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  async function handleRedirect() {
    setRedirecting(true);
    await incrementClickCount(shortCode as string);

    redirect(destinationUrl, "replace");
  }

  useEffect(() => {
    if (timer === 0) {
      handleRedirect();
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  function cancelTimer() {
    setAutomatedRedirect(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  const handleCopy = async () => {
    try {
      // Use the browser's native Clipboard API
      setIsCopying(true);
      await navigator.clipboard.writeText(destinationUrl);
      setIsCopying(false);
      setIsCopied(true);

      // Revert the button text back to normal after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <main className="font-jakarta flex flex-1 items-center justify-center">
      <div className="flex w-full max-w-135 flex-col items-center">
        <div className="bg-surface-container-lowest shadow-clay relative w-full rounded-3xl border border-orange-100/80 p-6 transition-all sm:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="text-primary-secondary mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200/60 bg-orange-50 px-3 py-1 text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px]">
                <BadgeCheck
                  size={16}
                  className="fill-primary-secondary text-white"
                />
              </span>
              <span>Shawty Safe Redirect</span>
            </div>
            <h1 className="text-on-surface text-2xl leading-snug font-extrabold tracking-tight sm:text-[26px]">
              {automatedRedirect
                ? "Redirecting via shawty..."
                : "Redirection Cancelled"}
            </h1>
            <p className="text-on-surface-variant mt-1.5 max-w-sm text-sm">
              {automatedRedirect
                ? "Taking you to your verified destination in a moment."
                : "You have safely stopped the automated redirect."}
            </p>
          </div>
          <div className="border-surface-container bg-surface-container-low/60 mb-6 overflow-hidden rounded-2xl border p-4">
            <div className="border-surface-container mb-3 flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-400"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
              </div>
            </div>
            <div className="bg-surface-container border-surface-container group relative mb-3 h-36 w-full overflow-hidden rounded-xl border">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                data-alt="Destination preview mockup"
              >
                {!metadata?.image ? (
                  <div className="flex h-full w-full items-center justify-center">
                    No Preview available
                  </div>
                ) : (
                  <Image src={metadata.image} alt={metadata.title} fill />
                )}
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
              {metadata?.description && (
                <div className="absolute right-3 bottom-2.5 left-3 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-orange-200 uppercase drop-shadow-xs">
                      Destination Preview
                    </span>
                    <p className="max-w-80 truncate text-sm font-bold whitespace-nowrap text-white drop-shadow-sm">
                      {metadata.title}
                    </p>
                  </div>
                  {metadata.siteName && (
                    <span className="shrink-0 rounded border border-white/20 bg-black/40 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur-md">
                      {metadata.siteName}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="bg-surface-container-lowest border-surface-container flex items-center justify-between gap-2 rounded-xl border p-2.5 shadow-2xs">
              <div className="flex min-w-0 items-center gap-2.5 pl-1">
                <div className="text-primary-secondary flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-200">
                  <span className="material-symbols-outlined text-[16px]">
                    <Earth size={18} />
                  </span>
                </div>
                <span
                  className="text-on-surface truncate font-mono text-[14px]"
                  id="destination-url"
                >
                  {destinationUrl}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant/40 flex min-w-20 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors"
                title="Copy to clipboard"
              >
                {isCopied ? (
                  isCopying ? (
                    <Loader2Icon size={16} />
                  ) : (
                    <Check size={16} />
                  )
                ) : (
                  <>
                    <span
                      className="material-symbols-outlined text-base"
                      id="copy-icon"
                    >
                      <Copy size={14} />
                    </span>
                    <span id="copy-text">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button
              disabled={redirecting}
              onClick={handleRedirect}
              className="bg-primary-secondary hover:bg-primary-hover shadow-clay-button flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed sm:flex-1"
              id="redirect-btn"
            >
              {redirecting ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    <PlugZap size={24} />
                  </span>
                  <span id="redirect-btn-text">
                    {automatedRedirect ? "Redirect Now" : "Redirect Manually"}
                  </span>
                  {automatedRedirect && <span>({timer})</span>}
                </>
              )}
            </button>
            <button
              disabled={redirecting}
              onClick={cancelTimer}
              className="bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant/60 flex h-12 w-full items-center justify-center gap-1.5 rounded-xl border px-5 text-sm font-semibold transition-colors disabled:cursor-not-allowed sm:w-auto"
            >
              <span className="material-symbols-outlined text-[18px]">
                <X size={24} />
              </span>
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPageSection;
