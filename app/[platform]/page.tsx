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
  Star,
  ArrowRight,
  ArrowUpRight,
  Clock,
} from "lucide-react";

const platformMeta: Record<
  PlatformKey,
  {
    fullName: string;
    tagline: string;
    ecosystem: string;
    badge: string;
    badgeColor: string;
    gradient: string;
  }
> = {
  chrome: {
    fullName: "Google Chrome",
    tagline: "Web Store Listing",
    ecosystem: "Also runs seamlessly on Brave, Arc, Opera & Vivaldi.",
    badge: "Available Now",
    badgeColor:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    gradient: "from-blue-500/10 via-amber-500/5 to-emerald-500/10",
  },
  edge: {
    fullName: "Microsoft Edge",
    tagline: "Microsoft Edge Add-ons",
    ecosystem: "One-click install from the Microsoft Edge store.",
    badge: "Available Now",
    badgeColor:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    gradient: "from-blue-500/10 to-teal-500/10",
  },
  firefox: {
    fullName: "Mozilla Firefox",
    tagline: "Firefox Add-ons (AMO)",
    ecosystem: "Official AMO store listing for Firefox desktop (under review).",
    badge: "Under Review",
    badgeColor:
      "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25",
    gradient: "from-orange-500/10 via-amber-500/5 to-pink-500/10",
  },
  safari: {
    fullName: "Apple Safari",
    tagline: "macOS Sonoma & Sequoia",
    ecosystem: "Native unpacked developer folder for macOS 14+.",
    badge: "macOS 14+",
    badgeColor:
      "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    gradient: "from-indigo-500/10 to-blue-500/10",
  },
};

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

const platformSeoDetails: Record<
  PlatformKey,
  { title: string; description: string }
> = {
  chrome: {
    title: "Download for Google Chrome & Chromium Browsers",
    description:
      "Install RBU Attendance Planner on Google Chrome, Brave, Arc, Opera, and Vivaldi. Real-time safe bunk calculations directly on your student portal.",
  },
  edge: {
    title: "Download for Microsoft Edge",
    description:
      "Install RBU Attendance Planner from Microsoft Edge Add-ons. Real-time safe bunk calculations directly on your student portal.",
  },
  firefox: {
    title: "Download for Mozilla Firefox",
    description:
      "Install RBU Attendance Planner from Firefox Add-ons (AMO). Real-time safe bunk calculations and attendance simulation on Firefox desktop.",
  },
  safari: {
    title: "Download & Install for Apple Safari on macOS",
    description:
      "Download and install the native unpacked RBU Attendance Planner extension for Apple Safari on macOS Sonoma and Sequoia.",
  },
};

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { platform } = await params;
  const validKey = platform as PlatformKey;
  const info = platforms[validKey];

  if (!info) {
    return { title: "Platform Not Found" };
  }

  const seo = platformSeoDetails[validKey] || {
    title: `Download & Install RBU Attendance Planner for ${info.name}`,
    description: `Official installation guide and download package for RBU Attendance Planner on ${info.name}.`,
  };

  const canonicalUrl = `${siteConfig.url}/${validKey}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${seo.title} | ${siteConfig.name}`,
      description: seo.description,
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${seo.title} | ${siteConfig.name}`,
      description: seo.description,
    },
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

  const otherPlatforms = (
    ["chrome", "edge", "firefox", "safari"] as PlatformKey[]
  ).filter((p) => p !== platformKey);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <Container size="md">
          {/* Breadcrumb Back Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to overview</span>
            </Link>
          </div>

          {/* Hero Header Card */}
          <div className="relative rounded-3xl glass-panel p-6 sm:p-10 mb-10 overflow-hidden bg-white/95 dark:bg-[var(--card-bg)] border border-slate-200/90 dark:border-[var(--border-color)] shadow-md dark:shadow-xl">
            {/* Background ambient accent */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 bg-[var(--accent-color)]/10 blur-[80px] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-center gap-2 mb-4">
              {platformKey === "firefox" ? (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Under Store Review
                </span>
              ) : (
                <Badge variant="accent" size="sm">
                  Official {info.name} Distribution
                </Badge>
              )}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[var(--card-bg)] text-[var(--text-muted)] border border-slate-200/80 dark:border-[var(--border-color)]">
                v1.0.0 Stable
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                100% Free
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-color)]">
              Get RBU Attendance Planner for {info.name}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
              {isSafari
                ? "Direct unpacked distribution for Apple Safari 17+ on macOS Sonoma and Sequoia."
                : `Add the attendance calculator to ${info.name} and view real-time safe bunk calculations on your college portal.`}
            </p>

            {/* Firefox Review Alert Banner */}
            {platformKey === "firefox" && (
              <div className="mt-6 p-4 sm:p-5 rounded-2xl border border-amber-300/80 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                <div className="text-xs sm:text-sm leading-relaxed text-amber-950 dark:text-amber-200">
                  <strong className="font-semibold block mb-0.5 text-sm">
                    Mozilla Store Review in Progress:
                  </strong>
                  The RBU Attendance Planner extension for Firefox is currently under review by Mozilla. Kindly check back in a few days.
                </div>
              </div>
            )}

            {/* Main Action Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {isSafari ? (
                <Button
                  variant="primary"
                  size="lg"
                  href="/api/dl/safari"
                  external
                  className="shadow-lg shadow-[var(--accent-color)]/20 hover:shadow-[var(--accent-color)]/30 hover:scale-[1.02] transition-all"
                >
                  <Download className="w-5 h-5 mr-1" />
                  Download safari-extension.zip
                </Button>
              ) : (
                (() => {
                  const storeInfo =
                    platforms[platformKey as "chrome" | "edge" | "firefox"];
                  const storeUrl = storeInfo.storeUrl;

                  if (storeUrl && (storeUrl as string) !== "#") {
                    return (
                      <Button
                        variant="primary"
                        size="lg"
                        href={`/api/go/${platformKey}`}
                        external
                        className="shadow-lg shadow-[var(--accent-color)]/20 hover:shadow-[var(--accent-color)]/30 hover:scale-[1.02] transition-all"
                      >
                        <Download className="w-5 h-5 mr-1" />
                        Install from {storeInfo.name} Store
                        <ExternalLink className="w-4 h-4 ml-1 opacity-75" />
                      </Button>
                    );
                  }

                  return (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Button
                        variant="secondary"
                        size="lg"
                        disabled
                        className="cursor-not-allowed opacity-85 border-amber-400/40 bg-amber-500/10 text-amber-900 dark:text-amber-200"
                      >
                        <Clock className="w-4 h-4 mr-2 text-amber-600 dark:text-amber-400" />
                        Extension Under Review
                      </Button>
                      <span className="text-xs text-[var(--text-muted)]">
                        Kindly check back in a few days
                      </span>
                    </div>
                  );
                })()
              )}
            </div>

            {/* Chromium note if on Chrome */}
            {"note" in info && info.note && (
              <div className="mt-6 pt-5 border-t border-[var(--border-color)]/60 text-xs text-[var(--text-muted)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
                <span>{info.note}</span>
              </div>
            )}
          </div>

          {/* SAFARI SPECIFIC DETAILED GUIDE */}
          {isSafari ? (
            <div className="space-y-8">
              {/* Friendly Note about Apple Fee */}
              <Card className="border-indigo-500/25 bg-indigo-500/5 p-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-color)]">
                      Why a manual unpacked installation on Safari?
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                      Apple requires an annual developer fee to list extensions
                      on the Mac App Store. Because this is a free,
                      non-commercial student tool created by students, Safari
                      uses macOS&apos;s official unpacked developer loader.
                      Modern Safari loads the unzipped folder directly, just
                      like Chromium&apos;s &ldquo;Load unpacked&rdquo;. No Xcode
                      or Terminal commands needed!
                    </p>
                  </div>
                </div>
              </Card>

              {/* System Requirements Checklist */}
              <Card className="p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  System Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {siteConfig.safariRequirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-color)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* CRITICAL LIGHT-MODE SAFE ALERT */}
              <div className="p-5 rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm flex items-start gap-3.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed text-amber-950 dark:text-amber-200">
                  <strong className="font-semibold block mb-0.5">
                    Important Safari Behavior:
                  </strong>
                  Apple automatically resets temporary extensions when you
                  completely quit Safari (Cmd + Q). To keep the planner active,
                  simply hide Safari using{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-amber-200/60 dark:bg-black/60 border border-amber-300 dark:border-amber-500/40 font-mono text-[11px] font-bold text-amber-950 dark:text-amber-200">
                    Cmd + H
                  </kbd>{" "}
                  instead of quitting, or re-add the folder when you next launch
                  Safari.
                </div>
              </div>

              {/* Stepper Timeline for Safari */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--text-color)]">
                  Step-by-Step Installation
                </h2>

                <div className="space-y-3">
                  {[
                    {
                      num: 1,
                      title: "Download and unzip package",
                      desc: "Click the download button above to get safari-extension.zip. Extract it and verify that manifest.json, content.js, and styles.css sit directly inside the folder.",
                    },
                    {
                      num: 2,
                      title: "Enable Developer Features in Safari",
                      desc: "Open Safari > Settings (Cmd + ,) > Advanced tab. Check 'Show features for web developers'. A Developer tab will now appear in your Settings.",
                    },
                    {
                      num: 3,
                      title: "Allow Unsigned Extensions",
                      desc: "Go to Settings > Developer tab. Check 'Allow unsigned extensions' and authenticate with Touch ID or your macOS administrator password.",
                    },
                    {
                      num: 4,
                      title: "Add Temporary Extension folder",
                      desc: "Click 'Add Temporary Extension...', browse to the unzipped folder that directly contains manifest.json (not the zip file or Downloads parent), and click Select.",
                    },
                    {
                      num: 5,
                      title: "Activate on the college portal",
                      desc: "In Settings > Extensions, ensure RBU Attendance Planner is ticked. Open https://rcoem.in/studentCourseFileNew.htm, click the extension puzzle piece icon next to the address bar, select 'Always Allow on This Website', and refresh (Cmd + R).",
                    },
                    {
                      num: 6,
                      title: "Loved our product? Drop your review!",
                      desc: "Help support fellow RBU students! Reach out or send your feedback to 0xadnandalal@gmail.com.",
                      isReview: true,
                    },
                  ].map((s) => (
                    <Card
                      key={s.num}
                      className={`p-5 flex items-start gap-4 transition-all hover:border-[var(--accent-color)]/30 ${
                        s.isReview
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 ${
                          s.isReview
                            ? "bg-emerald-500/15 text-emerald-500"
                            : "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                        }`}
                      >
                        {s.isReview ? (
                          <Star className="w-4 h-4 fill-emerald-500" />
                        ) : (
                          s.num
                        )}
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm sm:text-base font-semibold text-[var(--text-color)]">
                          {s.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                          {s.isReview ? (
                            <>
                              Loved our product? Send your thoughts or feedback{" "}
                              <a
                                href="mailto:0xadnandalal@gmail.com"
                                className="font-semibold text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:brightness-110"
                              >
                                via email
                              </a>{" "}
                              to help support fellow RBU students!
                            </>
                          ) : (
                            s.desc
                          )}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Troubleshooting Accordion Cards */}
              <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
                <h3 className="text-lg font-bold text-[var(--text-color)] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[var(--accent-color)]" />
                  Common Troubleshooting Cases
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  <Card className="p-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-color)] mb-1">
                      &ldquo;Extension Not Supported: &apos;Applications&apos;
                      cannot be used as an extension&rdquo;
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      You selected a parent folder. Click &ldquo;Add Temporary
                      Extension...&rdquo; again and choose the specific
                      extracted folder containing manifest.json directly.
                    </p>
                  </Card>

                  <Card className="p-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-color)] mb-1">
                      Extension disappeared after quitting Safari
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Apple resets temporary extensions on quit. Re-tick
                      &ldquo;Allow unsigned extensions&rdquo; in Settings &gt;
                      Developer, then re-add the folder. Use Cmd+H instead of
                      Cmd+Q to avoid resets.
                    </p>
                  </Card>

                  <Card className="p-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-color)] mb-1">
                      Dashboard missing on the attendance page
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Open Settings &gt; Extensions, select RBU Attendance
                      Planner, set rcoem.in to Allow, then perform a hard
                      refresh with Option + Cmd + R.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Stuck Installing AI Prompt Helper */}
              <Card className="p-6 border-[var(--accent-color)]/30 bg-[var(--accent-color)]/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-[var(--text-color)]">
                      Stuck installing on Safari?
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                      Copy our tailored troubleshooting prompt into ChatGPT,
                      Claude, or your favorite AI assistant, add where you got
                      stuck, and attach a screenshot.
                    </p>
                  </div>
                  <CopyPromptButton className="shrink-0" />
                </div>
              </Card>
            </div>
          ) : (
            /* CHROME, EDGE, AND FIREFOX FLOW */
            <div className="space-y-8">
              {/* Stepper Timeline */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--text-color)]">
                  Installation Steps
                </h2>

                <div className="grid grid-cols-1 gap-3.5">
                  <Card className="p-5 flex items-start gap-4 hover:border-[var(--accent-color)]/30 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-bold text-sm flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[var(--text-color)] mb-1">
                        Install from the store
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                        {platformKey === "firefox"
                          ? "Once Mozilla's store review concludes, click the install button above to open the official AMO listing."
                          : `Click the primary installation button above to open the official store listing and click "Add to ${info.name}".`}
                      </p>
                    </div>
                  </Card>

                  <Card className="p-5 flex items-start gap-4 hover:border-[var(--accent-color)]/30 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-bold text-sm flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[var(--text-color)] mb-1">
                        Open rcoem.in and log in
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                        Visit the official Ramdeobaba University student portal
                        and sign in with your student credentials.
                      </p>
                    </div>
                  </Card>

                  <Card className="p-5 flex items-start gap-4 hover:border-[var(--accent-color)]/30 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-bold text-sm flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[var(--text-color)] mb-1">
                        Open attendance page
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                        Navigate to your course attendance view. The RBU
                        Attendance Planner dashboard automatically loads and
                        displays safe bunk margins and advice.
                      </p>
                    </div>
                  </Card>

                  {/* Review prompt step */}
                  <Card className="p-5 flex items-start gap-4 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 font-bold text-sm flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 fill-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[var(--text-color)] mb-1">
                        Loved our product? Drop your review!
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                        Loved our product? Drop your review{" "}
                        {(() => {
                          const storeInfo =
                            platforms[
                              platformKey as "chrome" | "edge" | "firefox"
                            ];
                          const storeUrl = storeInfo.storeUrl;
                          const targetUrl =
                            storeUrl && (storeUrl as string) !== "#"
                              ? storeUrl
                              : "mailto:0xadnandalal@gmail.com";

                          return (
                            <a
                              href={targetUrl}
                              target={
                                targetUrl.startsWith("mailto:")
                                  ? undefined
                                  : "_blank"
                              }
                              rel={
                                targetUrl.startsWith("mailto:")
                                  ? undefined
                                  : "noopener noreferrer"
                              }
                              className="font-semibold text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:brightness-110"
                            >
                              {targetUrl.startsWith("mailto:")
                                ? "via email"
                                : "on the store"}
                            </a>
                          );
                        })()}{" "}
                        to support fellow RBU students!
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Ecosystem Switcher */}
          <div className="mt-16 pt-10 border-t border-[var(--border-color)]">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] mb-1.5 block">
                Cross-Platform Ecosystem
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-color)] tracking-tight">
                Also available for your other browsers
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5">
                Switch guides or install RBU Attendance Planner across all your
                devices and preferred browser workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherPlatforms.map((p) => {
                const meta = platformMeta[p];
                return (
                  <Link
                    key={p}
                    href={`/${p}`}
                    className="group relative rounded-2xl p-5 bg-white/95 dark:bg-[var(--card-bg)]/90 border border-slate-200/90 dark:border-[var(--border-color)] shadow-sm dark:shadow-none hover:shadow-xl hover:border-[var(--accent-color)]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Subtle ambient hover tint */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${meta.badgeColor} flex items-center gap-1.5`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              p === "firefox"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            } animate-pulse`}
                          />
                          {meta.badge}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors">
                        {meta.fullName}
                      </h3>

                      <p className="text-xs font-medium text-[var(--text-muted)] mt-0.5">
                        {meta.tagline}
                      </p>

                      <p className="text-xs text-[var(--text-muted)]/80 mt-2 line-clamp-2 leading-relaxed">
                        {meta.ecosystem}
                      </p>
                    </div>

                    <div className="relative z-10 mt-5 pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs font-semibold text-[var(--accent-color)]">
                      <span>Get for {platforms[p].name}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
