export const platforms = {
  chrome: {
    name: "Chrome",
    storeUrl:
      "https://chromewebstore.google.com/detail/rbu-attendance-planner/ofjnpaipledbhalkoaoddlehlejlpodm?pli=1",
    statsSource: "manual",
    note: "Brave, Opera, Vivaldi and Arc install from the same listing.",
  },
  edge: {
    name: "Edge",
    storeUrl:
      "https://microsoftedge.microsoft.com/addons/detail/rbu-attendance-planner/nlekpgmfiionjeeejjhfaepkbaajaiee",
    statsSource: "auto",
  },
  firefox: {
    name: "Firefox",
    storeUrl: "#",
    statsSource: "auto",
    amoSlug: "",
  },
  safari: {
    name: "Safari",
    downloadPath: "/api/dl/safari",
  },
} as const;

export type PlatformKey = keyof typeof platforms;
