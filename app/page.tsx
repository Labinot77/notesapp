import { Button } from "@/components/ui/button";
import {
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession()


  return (
    <section className="flex items-center justify-center h-[90vh]">
   <div className="relative items-center w-full px-5 py-12 mx-auto z-10 lg:px-16 max-w-7xl md:px-12">
     <div className="max-w-3xl mx-auto text-center">
       <div>
         <span className="w-auto px-6 py-3 rounded-full bg-secondary">
          <span className="text-sm font-medium text-primary ">
          Sort your notes easily
           </span>
         </span>

         <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl ">Create Notes with ease</h1>
         <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, est officiis recusandae illo debitis dolorem doloremque magnam saepe perspiciatis, ut quo.</p>
       </div>
       {(await isAuthenticated()) ? (
         <div className="mt-16 w-full">
          <Link
          href='/dashboard/new'>
           <Button>
             Create a new note
           </Button>
          </Link>
         </div>
       ) : (
         <div className="flex justify-center max-w-sm mx-auto mt-10">
         <RegisterLink>
         <Button size="lg" className="w-full z-10">Sign up for free</Button>
         </RegisterLink>
       </div>
       )}
     </div>
   </div>
 </section>
  );
}
