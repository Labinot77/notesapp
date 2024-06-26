import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "./components/Navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";
import { BackgroundBeams } from "@/components/ui/background-beams.tsx";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes Website",
  description: "Create your daily notes",
};

async function getData(userId: string) {
  if(userId) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        colorScheme: true
      }
    })
    return data
  }
}

export default async function RootLayout({ children,}: Readonly<{ children: React.ReactNode }>) {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string)

  
  return (
    <html lang="en">
      <body className={`${inter.className} ${data?.colorScheme ?? 'theme-orange'}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
          <BackgroundBeams className="-z-10"/> 
        </ThemeProvider>
      </body>
    </html>
  );
}
