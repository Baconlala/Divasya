import { ImageResponse } from "next/og";

export const alt = "Divasya — Give with confidence. See exactly where it goes.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #6E1423 0%, #4A0D18 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6E1423, #4A0D18)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            🪔
          </div>
          <div style={{ display: "flex", color: "#FBF5EA", fontSize: 40, fontWeight: 700 }}>
            Divasya
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            color: "#FBF5EA",
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          Give with confidence. See exactly where it goes.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            color: "#E6C874",
            fontSize: 28,
            fontFamily: "Arial, sans-serif",
          }}
        >
          Verified temples · Sadhu seva · Gurukul education · Animal welfare
        </div>
      </div>
    ),
    { ...size }
  );
}
