import { SubmitButton } from '@/app/components/Buttons'
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TypeOfNote } from '@/constants';
import { CreateTicketData } from '@/app/lib/actions/ticket.actions';

const NewNoteRoute = async () => {
  return (
    <Card>
    <form action={CreateTicketData}>
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
        <SubmitButton title='Your note has been created.' />
      </CardFooter>
    </form>
  </Card>
  )
}

export default NewNoteRoute