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
  metadataBase: new URL('https://resources.madebyren.me'), // Ensures absolute URLs for images work correctly
  title: "Made By Ren Vault",
  description: "Resources hub for Funnel Strategists",
  
  // Open Graph (Facebook, LinkedIn, Discord)
  openGraph: {
    title: "Made By Ren Vault",
    description: "Resources hub for Funnel Strategists. Stop guessing, start architecting.",
    url: 'https://resources.madebyren.me',
    siteName: 'Made By Ren',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/agEzTZFOjO9SzqbJdY4l/media/694a613e7be49d7223fe8073.png',
        width: 1200,
        height: 630,
        alt: 'Made By Ren Vault Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card (X)
  twitter: {
    card: 'summary_large_image',
    title: "Made By Ren Vault",
    description: "Resources hub for Funnel Strategists",
    images: ['https://storage.googleapis.com/msgsndr/agEzTZFOjO9SzqbJdY4l/media/694a613e7be49d7223fe8073.png'],
  },
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
