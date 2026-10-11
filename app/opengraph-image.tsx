import { ImageResponse } from "next/og";

export const alt =
  "RBU Attendance Planner — Real-Time Safe Bunk Calculator & Simulator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d1117",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Top Header Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#6366f1",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            R
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              borderRadius: "9999px",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Built for Ramdeobaba University Students
          </div>
        </div>

        {/* Central Bold Value Proposition */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "64px",
              fontWeight: "900",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#f8fafc",
            }}
          >
            <span style={{ display: "flex" }}>Stop Doing Attendance</span>
            <span style={{ display: "flex" }}>Math on a Calculator</span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              fontSize: "24px",
              color: "#94a3b8",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            <span>Know how many classes you can&nbsp;</span>
            <span style={{ color: "#34d399", fontWeight: "700" }}>
              Skip Safely
            </span>
            <span>,&nbsp;or&nbsp;</span>
            <span style={{ color: "#818cf8", fontWeight: "700" }}>
              Need to Attend
            </span>
            <span>&nbsp;with live What-If simulation.</span>
          </div>
        </div>

        {/* Footer Support Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "30px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {[
              "Chrome & Brave",
              "Microsoft Edge",
              "Mozilla Firefox",
              "Apple Safari",
            ].map((name) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#cbd5e1",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {name}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#64748b",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            100% Free • Zero Ads • Private Client-Side
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
