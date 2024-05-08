"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import Loading from "@/components/modals/loading";
import localFont from "next/font/local";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AlertModal from "@/components/modals/alert";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const quicksand = localFont({
  src: [
    {
      path: "../assets/fonts/Quicksand-Light.ttf",
      weight: "100",
      style: "thin", //weight 100
    },
    {
      path: "../assets/fonts/Quicksand-Light.ttf",
      weight: "200",
      style: "extralight", //weight 200
    },
    {
      path: "../assets/fonts/Quicksand-Light.ttf",
      weight: "300",
      style: "light", //weight 300
    },
    {
      path: "../assets/fonts/Quicksand-Regular.ttf",
      weight: "400",
      style: "normal", //weight 400
    },
    {
      path: "../assets/fonts/Quicksand-Medium.ttf",
      weight: "500",
      style: "medium", //weight 500
    },
    {
      path: "../assets/fonts/Quicksand-SemiBold.ttf",
      weight: "600",
      style: "semibold", //weight 600
    },
    {
      path: "../assets/fonts/Quicksand-Bold.ttf",
      weight: "700",
      style: "bold", //weight 700
    },
    {
      path: "../assets/fonts/Quicksand-Bold.ttf",
      weight: "800",
      style: "extrabold", //weight 800
    },
    {
      path: "../assets/fonts/Quicksand-Bold.ttf",
      weight: "900",
      style: "blackbold", //weight 900
    },
  ],
});

const theme = createTheme({
  typography: {
    fontFamily: quicksand.style.fontFamily,
  },
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" dir="" className={quicksand.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <SiteHeader />
            {children}
            <CommonClient />
            <Footer />
            <Loading></Loading>
            <AlertModal></AlertModal>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
