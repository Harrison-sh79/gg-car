import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Image src="/uber-logo-banner.jpg" alt="bg" width={1024} height={1024} className="object-contain w-full h-full" />
      <div className="absolute top-20 right-10">
        <SignIn />
      </div>

    </div>
  );
}