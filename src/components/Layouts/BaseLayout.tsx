import Navbar from "@components/Navbar";
import Image from "next/image";
import bgPic from "@public/island.jpg";

interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col">
      <Image
        src={bgPic}
        alt="Picture of a Fijian Island"
        fill
        quality={100}
        className="-z-10"
      />
      <Navbar />
      <main className="grow">{children}</main>
    </div>
  );
}
