import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { buttonVariants } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={Logo}
          alt="Logo"
          width={200} // Set the width of the logo
          height={200} // Set the height of the logo
        />
      </Link>
      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
}
