import { ReactNode } from "react"
import DashboardNav from "../components/DashboardNav"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db"

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      name: true,
      email: true,
      accountType: true,
      colorScheme: true
    }
  })
  return data
}

async function getData({ 
  email, 
  id, 
  firstName, 
  lastName, 
  image,
}:{ 
  email: string, 
  id: string, 
  firstName: string | undefined | null,
  lastName: string | undefined | null,
  image: string | undefined
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      accountType: true,
      stripeCustomerId: true
    }
    
  })

  if(!user) {
    const name = `${firstName ?? ''} ${lastName ?? ''}`
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
        image: image as string
      }
    })
  }
}

const DashBoardLayout = async ({ children}: { children: ReactNode}) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getUserData(user?.id as string)


  if(!user) {
    return redirect('/')
  }

  await getData({ 
    email: user.email as string, 
    firstName: user.given_name as string, 
    lastName: user.family_name as string, 
    id: user.id as string,
    image: user.picture as string
  })
  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav accountType={data?.accountType}/>
      </aside>
      <main>

        {children}
        </main>
      </div>
    </div>
  )
}

export default DashBoardLayout