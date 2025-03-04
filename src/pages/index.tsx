import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Hero from "@components/Hero";
import { FeatureTiles } from "@components/FeatureTiles";

export default function Home() {
  return (
    // lauren rox
    <main className="min-h-screen overflow-x-hidden m-0 p-0">
      <Hero />
      <div id="featureTiles" className="w-screen max-w-none">
        <FeatureTiles />
      </div>
    </main>
  );
}
