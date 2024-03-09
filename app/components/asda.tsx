import { Button } from "@/components/ui/button";
import {
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { BentoGridThirdDemo } from "./Bendo-grid";

export function GridBackgroundDemo() {

  // Maybe try to make it work with children so you can wrap it
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
      </p>
        <BentoGridThirdDemo />
      <RegisterLink>
         <Button size="lg" className="w-full">Sign up for free</Button>
         </RegisterLink>
    </div>
  );
}
