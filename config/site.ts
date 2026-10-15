export const siteConfig = {
  name: "RBU Attendance Planner",
  description:
    "The intelligent, real-time attendance calculator and simulation dashboard for Ramdeobaba University students.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://rbu-attendance-planner-site.vercel.app",
  headline: "Stop Doing Attendance Math on a Calculator",
  subline: "Know How Many Classes You Can Skip Safely, Or Need To Attend",
  badge: "Built for Ramdeobaba University students",
  stats: {
    showPlaceholder: true,
    placeholderTotal: "250+ Downloads",
    footnote: "Chrome, Edge, Firefox and Safari count.",
  },
  safariRequirements: [
    "Apple Safari 17.0 or higher",
    "macOS Sonoma (14.x) or macOS Sequoia (15.x)",
    "Note: Older macOS releases (Ventura or earlier) do not support unpacked folder loading in Safari. Newer releases remain untested.",
    "Nothing else to install.",
  ],
  stuckPrompt: `I am installing the RBU Attendance Planner extension in Safari on my Mac and I am stuck. Please help me step by step, and ask me which step I am on if it is unclear.

Background:
- The extension only runs on https://rcoem.in/studentCourseFileNew.htm (the college attendance page).
- It is not on the App Store. I downloaded safari-extension.zip from the project website and unzipped it into a folder. The folder must directly contain manifest.json, content.js and styles.css.
- This needs Safari 17.0 or higher on macOS Sonoma (14.x) or Sequoia (15.x). Ventura or earlier does not support loading an unpacked folder in Safari, and newer macOS releases are untested. No Xcode, Terminal or paid software is needed.

The steps:
1. Unzip safari-extension.zip. Open the folder and check manifest.json, content.js and styles.css are directly inside.
2. Safari > Settings > Advanced: tick "Show features for web developers". A Developer tab appears in Settings.
3. Settings > Developer: tick "Allow unsigned extensions" and authenticate with my password or Touch ID.
4. Click "Add Temporary Extension...", choose the unzipped folder that directly contains manifest.json (not the zip, not Downloads or Applications), click Select.
5. Settings > Extensions: make sure RBU Attendance Planner is ticked. Open the attendance page, click the extension icon next to the address bar, choose "Always Allow on This Website", then refresh with Cmd+R.

Known problems:
- "Extension Not Supported: 'Applications' cannot be used as an extension": I picked a parent folder. Click "Add Temporary Extension..." again and choose the folder that directly contains manifest.json.
- The extension disappeared after I quit Safari: Apple resets temporary extensions when Safari quits. Re-tick "Allow unsigned extensions" in Settings > Developer, then add the folder again. Hiding Safari with Cmd+H instead of quitting avoids this.
- The dashboard does not appear on the attendance page: Settings > Extensions > RBU Attendance Planner > set rcoem.in to Allow, then hard refresh with Option+Cmd+R.

My Mac and macOS version: [write here]
My Safari version: [write here]
Where I am stuck, and what I see: [write here, and attach a screenshot]`,
};
