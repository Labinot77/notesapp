"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import prisma from "../lib/db"
import { revalidatePath } from "next/cache"
import { TrashDelete } from "./SubmitButton"
import { Delete, Trash } from "lucide-react"



export function DialogDemo() {
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
        <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[370px] flex justify-center items-center">
        <DialogHeader>
          <DialogDescription>
            Are you sure you want to delete it
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <form 
        // action={deleteNote}
        >
                <TrashDelete />
              </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
