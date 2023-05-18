import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Hero from "@components/Hero";
import { FeatureTiles } from "@components/FeatureTiles";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureTiles />
    </>
  );
}
