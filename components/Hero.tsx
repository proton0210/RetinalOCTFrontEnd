import { descriptionText, titleText } from "@/constants/text";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <div className="flex flex-row justify-between gap-10">
        <div>
          <h1 className="text-4xl font-bold font-mono leading-normal tracking-tight  text-gradient">
            {titleText}
          </h1>
          <p className="mt-6 text-lg font-sans leading-8 text-gray-700">
            {descriptionText}
          </p>
        </div>

        <Image
          src="/assets/images/doc.png"
          alt="Hero"
          width={600}
          height={600}
        />
      </div>
      <div className="flex-center mt-20">
        <Link href="/product">
          <Button
            className="primary-gradient font-semibold font-sans  text-white
            transition duration-0 hover:duration-150
            rounded-md
          "
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
