import { Inter } from "next/font/google";
import "../globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import DrawerAppBar from '../components/app-bar/app-bar';
import Footer from '../components/footer/footer';
import ThemeProviderWrapper from '@/theme/theme-provider-wrapper';
import { ClerkProvider } from '@clerk/nextjs'
import ConvexClientProvider from "../convexProvider/convexProvider";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Neutre",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <ConvexClientProvider>
        <DrawerAppBar />
        <div style={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {children}
        </div>
        <div style={{
          bottom: 0,
          width: '100%',
        }}>
          <Footer />
        </div>
      </ConvexClientProvider>
    </>
  );
}
