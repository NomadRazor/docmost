import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TanstackProvider } from "@/components/providers/tanstack-provider";
import CustomToaster from "@/components/ui/custom-toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
    <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TanstackProvider>
        {children}
        <CustomToaster />
      </TanstackProvider>
    </ThemeProvider>
    </body>
    </html>
  )

}
