import type { Metadata } from "next";
import "@rainbow-me/rainbowkit/styles.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/700.css";
import "@fontsource/fira-code/400.css";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = { title: "PromptCover | GenLayer", description: "Coverage at every trust boundary." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Providers>{children}</Providers></body></html>; }
