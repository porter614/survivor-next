import Navbar from "@components/Navbar";
import Image from "next/image";
import bgPic from "@public/island.jpg";

interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 -z-10">
        {" "}
        {/* Changed from absolute to fixed */}
        <Image
          src={bgPic}
          alt="Picture of a Fijian Island"
          quality={100}
          sizes="100vw"
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
        />
      </div>
      <main className="grow mb-4 relative z-0">
        <div className="h-24" />
        {children}
      </main>
      <Navbar />
    </div>
  );
}
