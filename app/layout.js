import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";

import Head from "next/head";

import { Providers } from "@/providers";

export const metadata = {
  title: "Rooster",
  description: "Your business is ready to crow",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <link
          rel='icon'
          href='/favicon.ico'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>

      <body id='app'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
