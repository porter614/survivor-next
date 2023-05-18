import "@/styles/globals.css";
import localFont from "next/font/local";
const myFont = localFont({ src: "./survivant.ttf" });
import type { AppProps } from "next/app";
import Layout from "@components/Layouts/BaseLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
