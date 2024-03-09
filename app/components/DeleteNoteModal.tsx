"use client"


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash } from "lucide-react"
interface DialogInterface {
  noteId: string,
  deleteNote: any
}

export function DialogDemo({ noteId, deleteNote }: DialogInterface) {

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append('noteId', noteId);
    await deleteNote(formData);
  
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
        <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[370px] flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogDescription>
            Are you sure you want to delete it
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
             <Button onClick={handleDelete}>
              Confirm
             </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
