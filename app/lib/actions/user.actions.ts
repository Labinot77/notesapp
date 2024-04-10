import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../db";

export async function getInformationForOtherUsers(loggedInUserId: any) {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      accountType: true,
      image: true
    },
    where: {
      id: {
        not: loggedInUserId,
      },
    },
  });

  return data;
}
