import { Poppins } from "next/font/google";
import "./globals.css";
import NavComponent from "@/components/nav/nav.component";
import FooterComponent from "@/components/footer/footer.component";
import Newsletter from "@/components/newsletter/newsletter.component";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Made By Ren Vault",
  description: "Resources hub for Funnel Strategists",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NavComponent />
        <div className="mb-10 mt-[4.8rem]">{children}</div>

        <FooterComponent />
      </body>
    </html>
  );
}
