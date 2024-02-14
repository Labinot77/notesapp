"use client"

import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Trash } from "lucide-react"
import { useFormStatus } from "react-dom"

export const SubmitButton = () => {
  const {pending} = useFormStatus()
  return (
    <>  
    {pending ? (
          <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Saving
        </Button>
    ): (
      <Button type="submit">Save now</Button>
    )}
    </>
  )
}

export const TrashDelete = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant={"destructive"} size="icon" disabled>
             <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={"destructive"} size="icon" type="submit">
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
