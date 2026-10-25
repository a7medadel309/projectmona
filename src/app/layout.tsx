import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { InventoryProvider } from "@/context/InventoryContext";
import CartDrawer from "@/components/Cart/CartDrawer";
import FloatingHomeButton from "@/components/FloatingHomeButton/FloatingHomeButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sukoon | Haute Parfumerie",
  description: "Artisanal niche fragrances crafted for quiet sophistication.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#F8F6F0] text-[#121212]"
      >
        <AuthProvider>
          <InventoryProvider>
            <CartProvider>
              <Header />
              <CartDrawer />
              <ToastContainer position="top-right" theme="light" />
              <main className="flex-1 flex flex-col pt-16">{children}</main>
              <FloatingHomeButton />
              <Footer />
            </CartProvider>
          </InventoryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}