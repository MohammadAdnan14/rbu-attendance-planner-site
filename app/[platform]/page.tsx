import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CopyPromptButton } from "@/components/CopyPromptButton";
import { platforms, type PlatformKey } from "@/config/platforms";
import { siteConfig } from "@/config/site";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Laptop,
} from "lucide-react";

interface PlatformPageProps {
  params: Promise<{ platform: string }>;
}

export function generateStaticParams() {
  return [
    { platform: "chrome" },
    { platform: "edge" },
    { platform: "firefox" },
    { platform: "safari" },
  ];
}

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { platform } = await params;
  const validKey = platform as PlatformKey;
  const info = platforms[validKey];

  if (!info) {
    return { title: "Platform Not Found" };
  }

  return {
    title: `Install RBU Attendance Planner on ${info.name}`,
    description: `Step-by-step instructions to install RBU Attendance Planner on ${info.name}.`,
  };
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { platform } = await params;

  if (
    platform !== "chrome" &&
    platform !== "edge" &&
    platform !== "firefox" &&
    platform !== "safari"
  ) {
    notFound();
  }

  const platformKey = platform as PlatformKey;
  const info = platforms[platformKey];
  const isSafari = platformKey === "safari";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <Container size="md">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <Badge variant="accent" size="sm" className="mb-3">
              {info.name} Installation Guide
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-color)]">
              Install RBU Attendance Planner on {info.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">
              {isSafari
                ? "Manual installation guide for Apple Safari on macOS."
                : `Add the extension to ${info.name} and view your attendance calculations in seconds.`}
            </p>
          </div>

          {/* Safari Specific Flow (Phase 5) */}
          {isSafari ? (
            <div className="space-y-8">
              {/* Friendly Apple fee note */}
              <Card className="border-indigo-500/20 bg-indigo-500/5">
                <div className="flex gap-3">
                  <Laptop className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="text-sm space-y-2 text-[var(--text-color)]">
                    <p className="font-semibold text-indigo-400">
                      Why a manual install on Safari?
                    </p>
                    <p className="text-[var(--text-muted)] leading-relaxed text-xs sm:text-sm">
                      Apple charges an annual developer fee to list on the Mac
                      App Store. Because this is a free, non-commercial student
                      project, Safari uses modern macOS unpacked loading
                      instead. Modern Safari loads an unzipped extension folder
                      directly, similar to Chromium&apos;s &ldquo;Load
                      unpacked&rdquo;. Thank you for bearing with us!
                    </p>
                  </div>
                </div>
              </Card>

              {/* Download CTA */}
              <Card className="text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
                <div>
                  <h2 className="text-lg font-bold text-[var(--text-color)]">
                    Download Extension Package
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                    Direct zip archive containing manifest.json, content.js, and
                    styles.css.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  href="/api/dl/safari"
                  className="w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  Download safari-extension.zip
                </Button>
              </Card>

              {/* Requirements Block */}
              <Card>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  System Requirements
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-color)]">
                  {siteConfig.safariRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Safari Quit Callout Warning */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  <strong>Important:</strong> Safari forgets temporary
                  extensions when you quit it completely. Hide Safari with{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-amber-500/30 font-mono text-[11px]">
                    Cmd + H
                  </kbd>{" "}
                  instead of quitting (Cmd + Q), or repeat steps 3 and 4 next
                  time you open Safari.
                </p>
              </div>

              {/* Five Installation Steps */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--text-color)]">
                  Step-by-Step Installation
                </h3>

                {[
                  {
                    step: 1,
                    title: "Download and unzip",
                    desc: "Download safari-extension.zip and extract it. Open the folder and verify that manifest.json, content.js, and styles.css sit directly inside.",
                  },
                  {
                    step: 2,
                    title: "Enable Developer Features",
                    desc: "In Safari, open Settings (Cmd + ,) > Advanced. Check 'Show features for web developers'. A Developer tab will appear in Settings.",
                  },
                  {
                    step: 3,
                    title: "Allow Unsigned Extensions",
                    desc: "Go to Settings > Developer. Check 'Allow unsigned extensions' and authenticate with Touch ID or your Mac password.",
                  },
                  {
                    step: 4,
                    title: "Add Temporary Extension",
                    desc: "Click 'Add Temporary Extension...', navigate to the unzipped folder that directly contains manifest.json (not the zip, not Downloads or Applications), and click Select.",
                  },
                  {
                    step: 5,
                    title: "Activate on the college portal",
                    desc: "In Settings > Extensions, ensure RBU Attendance Planner is ticked. Open https://rcoem.in/studentCourseFileNew.htm, click the extension icon next to the address bar, choose 'Always Allow on This Website', then refresh (Cmd + R).",
                  },
                ].map((s) => (
                  <Card key={s.step} className="p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-bold text-sm flex items-center justify-center shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-[var(--text-color)] mb-1">
                        {s.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Troubleshooting Cases */}
              <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
                <h3 className="text-lg font-bold text-[var(--text-color)] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[var(--accent-color)]" />
                  Troubleshooting
                </h3>

                <div className="space-y-3">
                  <Card className="p-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-color)] mb-1">
                      &ldquo;Extension Not Supported: &apos;Applications&apos;
                      cannot be used as an extension&rdquo;
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      You selected a parent folder. Click &ldquo;Add Temporary
                      Extension...&rdquo; again and select the folder that
                      directly contains manifest.json.
                    </p>
                  </Card>

                  <Card className="p-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-color)] mb-1">
                      Extension disappeared after quitting Safari
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Apple resets temporary extensions on quit. Re-tick
                      &ldquo;Allow unsigned extensions&rdquo; in Settings &gt;
                      Developer, then add the folder again. Use Cmd+H instead of
                      Cmd+Q to avoid resetting.
                    </p>
                  </Card>

                  <Card className="p-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-color)] mb-1">
                      Dashboard missing on the attendance page
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Open Settings &gt; Extensions, select RBU Attendance
                      Planner, set rcoem.in to Allow, then perform a hard
                      refresh with Option+Cmd+R.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Stuck Installing Block */}
              <Card className="p-6 border-[var(--accent-color)]/30 bg-[var(--accent-color)]/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-[var(--text-color)]">
                      Stuck installing?
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                      Copy our troubleshooting prompt into your AI assistant,
                      mention where you are stuck, and attach a screenshot.
                    </p>
                  </div>
                  <CopyPromptButton className="shrink-0" />
                </div>
              </Card>
            </div>
          ) : (
            /* Chrome, Edge, and Firefox Flow */
            (() => {
              const storeInfo =
                platforms[platformKey as "chrome" | "edge" | "firefox"];
              const storeUrl = storeInfo.storeUrl;
              const note = "note" in storeInfo ? storeInfo.note : null;

              return (
                <div className="space-y-8">
                  {/* Install Button & Store CTA */}
                  <Card className="text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 p-6">
                    <div>
                      <h2 className="text-xl font-bold text-[var(--text-color)]">
                        Get RBU Attendance Planner
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                        Official extension for {storeInfo.name}. One-click
                        installation.
                      </p>
                    </div>

                    {storeUrl && storeUrl !== "#" ? (
                      <Button
                        variant="primary"
                        size="lg"
                        href={`/api/go/${platformKey}`}
                        className="w-full sm:w-auto"
                      >
                        <Download className="w-4 h-4" />
                        Install from {storeInfo.name} Store
                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                      </Button>
                    ) : (
                      <div className="flex flex-col items-center sm:items-end">
                        <Button
                          variant="secondary"
                          size="lg"
                          disabled
                          className="w-full sm:w-auto cursor-not-allowed opacity-75"
                        >
                          Store Listing Review in Progress
                        </Button>
                        <span className="text-[11px] text-[var(--text-muted)] mt-1.5">
                          Check back shortly or build from GitHub source
                        </span>
                      </div>
                    )}
                  </Card>

                  {/* Chromium Note on Chrome page */}
                  {note && (
                    <div className="p-4 rounded-xl glass-panel text-xs sm:text-sm text-[var(--text-muted)] flex items-center gap-2">
                      <span className="font-medium text-[var(--text-color)]">
                        Chromium compatibility:
                      </span>
                      <span>{note}</span>
                    </div>
                  )}

                  {/* Three Steps from PRD 7.2 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[var(--text-color)]">
                      3 Simple Steps
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      <Card className="p-5 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-bold text-sm flex items-center justify-center shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-[var(--text-color)] mb-1">
                            Install from the store
                          </h4>
                          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                            Click the install button above to open the official
                            store listing and add the extension to your browser.
                          </p>
                        </div>
                      </Card>

                      <Card className="p-5 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-bold text-sm flex items-center justify-center shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-[var(--text-color)] mb-1">
                            Open rcoem.in and log in
                          </h4>
                          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                            Navigate to the official Ramdeobaba University
                            student portal and log in with your credentials.
                          </p>
                        </div>
                      </Card>

                      <Card className="p-5 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-bold text-sm flex items-center justify-center shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-[var(--text-color)] mb-1">
                            Go to attendance
                          </h4>
                          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                            Open your attendance page. The RBU Attendance
                            Planner dashboard appears automatically right over
                            your course table.
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
