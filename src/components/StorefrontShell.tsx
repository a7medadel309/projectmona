"use client";

import { usePathname } from "next/navigation";
import CartDrawer from "@/components/Cart/CartDrawer";

export default function StorefrontShell() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // لو إحنا في صفحة الأدمن، متظهرش الـ CartDrawer نهائياً
  if (isAdmin) return null;

  return <CartDrawer />;
}