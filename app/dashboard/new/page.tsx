import { SubmitButton } from '@/app/components/SubmitButton'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import prisma from '@/app/lib/db'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TypeOfNote } from '@/constants';

const NewNoteRoute = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();


  async function postData(formData: FormData) {
    "use server"
    
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



  return (
    <Card>
    <form action={postData}>
      <CardHeader>
        <CardTitle>New Note</CardTitle>
        <CardDescription>
          Right here you can now create your new notes
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
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Describe your note as you want"
            required
          />
        </div>

        <div className='space-y-1'>
                <Label>What type of note</Label>
                <Select name="NoteCategory">
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Type of note"/>
                  </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
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
        <SubmitButton />
      </CardFooter>
    </form>
  </Card>
  )
}

export default NewNoteRoute