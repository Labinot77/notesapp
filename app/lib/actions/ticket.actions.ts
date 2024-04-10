import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function CreateTicketData(formData: FormData) {
  "use server"
  
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Not authorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const NoteCategory = formData.get("NoteCategory") as string;

  await prisma.note.create({
    data: {
      userId: user?.id,
      description: description,
      title: title,
      type: NoteCategory || "No category"
    },
    
  });
  return redirect("/dashboard/mytickets");
}

export async function FindUserTickets({ noteId }: { noteId: string }) {
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      title: true,
      description: true,
      id: true,
      type: true
    },
  });
  return data;
}
