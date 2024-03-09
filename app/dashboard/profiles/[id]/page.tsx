import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


async function getForUserData(userId: any) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      accountType: true,
      image: true
    },
  });

  return data;
}

const page = async ({params}: {params: { id: string }}) => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const userData = await getForUserData({userId: params.id as string})
  return (
    <div>{userData?.name}</div>
  )
}

export default page