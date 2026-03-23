import type { Metadata } from "next";
import { FacebookCoverShell } from "@/components/socials/facebook-cover-shell";
import { FacebookCoverContent } from "@/components/socials/facebook-cover-content";

export const metadata: Metadata = {
  title: "Socials Facebook Banner — Berneby Solutions",
};

export default function SocialsFacebookBannerPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] p-10 font-sans" style={{ fontSize: "16px" }}>
      <div className="mx-auto max-w-[1900px]">
        <div className="mb-10 text-center">
          <h1 className="font-display text-[30px] font-bold uppercase tracking-widest text-brand-cyan">
            Facebook Cover Banner
          </h1>
          <p className="mt-[8px] font-mono text-[12px] uppercase tracking-widest text-brand-navy-muted">
            1640x624px master · safe-zone centered · no fake CTA
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="mx-auto w-fit">
            <FacebookCoverShell>
              <FacebookCoverContent />
            </FacebookCoverShell>
          </div>
        </div>

        <div
          className="mx-auto mt-16 max-w-xl"
          style={{ border: "1px solid rgba(3,249,249,0.2)", background: "rgba(3,249,249,0.05)", padding: "24px" }}
        >
          <p className="mb-[16px] font-mono text-[11px] font-bold uppercase tracking-widest text-brand-cyan">
            Export - Facebook Cover
          </p>
          <ol className="flex flex-col gap-[8px] font-mono text-[12px] text-blue-100">
            <li>
              <span className="text-brand-cyan">1.</span> Dev-Server starten:{" "}
              <strong className="text-white">pnpm dev</strong>
            </li>
            <li>
              <span className="text-brand-cyan">2.</span> Export ausfuehren:{" "}
              <strong className="text-white">pnpm run capture:facebook-banner</strong>
            </li>
            <li>
              <span className="text-brand-cyan">3.</span> Ergebnis in{" "}
              <strong className="text-white">exports/facebook-banner</strong>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
