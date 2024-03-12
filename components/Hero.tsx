import Image from "next/image";

const TopGradient = () => {
    return 
}

export default function Hero() {
  return (
    <div className="flex flex-row justify-between">
      <div>Content</div>
      <Image src="/assets/images/doc.png" alt="Hero" width={600} height={600} />
    </div>
  );
}
