import Navbar from "@components/Navbar";
import Image from "next/image";
import bgPic from "@public/island.jpg";

interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgPic}
          alt="Picture of a Fijian Island"
          quality={100}
          className="h-screen xl:w-screen"
          priority
        />
      </div>
      <main className="grow mb-4 relative z-0">
        {children}
        <div className="h-24" />
      </main>
      <Navbar />
    </div>
  );
}
