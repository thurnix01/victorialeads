import "@/styles/globals.css";
import { Syne, IBM_Plex_Sans } from "next/font/google";

/** Display: Syne — geometric, less “default SaaS” than Inter. Body: IBM Plex Sans — industrial clarity. */
const display = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${display.variable} ${sans.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
