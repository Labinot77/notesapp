"use client"
 
import { z } from "zod"

export const UserValidation = z.object({
  name: z.string().min(2).max(15),
  email: z.string().min(6).max(20),
  bio: z.string().min(5).max(100)
})