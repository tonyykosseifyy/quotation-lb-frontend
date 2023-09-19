import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Inter } from "next/font/google";
``;
import Head from "next/head";
import { ReactQueryProvider } from "@/app/ReactQueryProvider";

import LoadingProvider from "@/providers/LoadingProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rooster",
  description: "Your business is ready to crow",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>

        <body id='app'>
          <LoadingProvider>{children}</LoadingProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
