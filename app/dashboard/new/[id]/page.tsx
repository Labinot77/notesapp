import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { SubmitButton }  from "@/app/components/Buttons";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TypeOfNote } from "@/constants";
import { FindUserTickets } from "@/app/lib/actions/ticket.actions";



export default async function DynamicRoute({params}: {params: { id: string }}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await FindUserTickets({ noteId: params.id as string });
  
  async function UpdateTicketData(formData: FormData) {
    "use server";

    if (!user) throw new Error("you are not allowed");

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;

    await prisma.note.update({
      where: {
        id: data?.id,
        userId: user.id,
      },
      data: {
        description: description,
        title: title,
        type: type
      },
    });

    revalidatePath("/dashboard/mytickets");

    return redirect("/dashboard/mytickets");
  }

  return (
    <Card>
      <form action={UpdateTicketData}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>
            Right here you can now edit your notes
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Title for your note"
              defaultValue={data?.title}
              className="resize-none"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your note as you want"
              required
              defaultValue={data?.description}
              className="resize-none"
            />
          </div>

          <div className='space-y-1'>
                <Label>Type</Label>
                <Select name="type" defaultValue={data?.type as string}>
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>What type of note</SelectLabel>
                        {TypeOfNote.map((item, i) => (
                          <SelectItem
                          value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                </Select>
              </div>

              
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButton title="Succesfuly edited" />
        </CardFooter>
      </form>
    </Card>
  );
}