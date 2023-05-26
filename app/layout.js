import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Rooster",
    description: "Your business is ready to crow",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:image:secure_url" content="/favicon.ico" />
            </Head>
            <body>{children}</body>
        </html>
    );
}
