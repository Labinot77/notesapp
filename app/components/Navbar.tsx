import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "@/components/ui/button";
import UserNavDock from "./UserNavDock";
import { NotebookIcon } from "lucide-react";

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser()


  return (
    <nav className="border-b bg-background h-[7vh] flex items-center">
      <div className="container flex items-center justify-between">
        <div className="flex items-center justify-start space-x-6">
        <Link href="/">
          <NotebookIcon className="sm:hidden block text-primary"/>
          <h1 className="font-bold text-2xl hidden sm:block">Notepad <span className="text-primary">website </span>|</h1>
        </Link>
        {(await isAuthenticated()) && (
      <Link
      href="/dashboard">
      <h1 className="text-lg font-medium hover:bg-accent px-2 py-1 rounded-md hover:text-accent-foreground hidden sm:block">Dashboard</h1>
      </Link>
        )}
        </div>



        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          {(await isAuthenticated()) ? (
            <UserNavDock email={user?.email as string} image={user?.picture as string} name={user?.given_name as string}  />
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button> Sign in</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary"> Sign up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
