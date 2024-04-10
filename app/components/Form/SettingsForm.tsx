"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from '@/app/lib/db'
import { SubmitButton } from '@/app/components/Buttons';
import { revalidatePath } from 'next/cache';
import { Badge } from '@/components/ui/badge';
import { Toast } from '@/components/ui/toast';
import { ToastSimple } from '../Toast';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().min(0 , {
    message: "Bio must be at least 2 characters.",
  }),
  email: z.string().min(2 , {
    message: "Email must be at least 2 characters.",
  })
})

  export function SettingsPage({data}: {data: any}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      bio: data.bio || null,
      email: data.email
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {    
        try {
          console.log('Submitting form with values:', values);

          await prisma.user.update({
            where: {
              id: data?.id,
            },
            data: {
              name: values.name,
              bio: values.bio,
              // Add other fields you want to update
            },
          });
      
          console.log('User data updated successfully');
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }

      
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder={data.name} {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Biography</FormLabel>
          <FormControl>
            <Input placeholder={data.bio} {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Your email adress</FormLabel>
          <FormControl>
            <Input disabled placeholder={data.email} {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
        <Label>Color Scheme</Label>
                 <Select name="color" defaultValue={data?.colorScheme}>
                   <SelectTrigger className='w-full'>
                     <SelectValue placeholder="Select a color"/>
                   </SelectTrigger>
                     <SelectContent>
                       <SelectGroup>
                         <SelectLabel>Color</SelectLabel>
                         <SelectItem value="theme-green">Green</SelectItem>
                         <SelectItem value="theme-blue">Blue</SelectItem>
                         <SelectItem value="theme-violet">Violet</SelectItem>
                         <SelectItem value="theme-yellow">Yellow</SelectItem>
                         <SelectItem value="theme-orange">Orange</SelectItem>
                         <SelectItem value="theme-red">Red</SelectItem>
                         <SelectItem value="theme-rose">Rose</SelectItem>
                       </SelectGroup>
                     </SelectContent>
                 </Select>
      <SubmitButton/>
    </form>
  </Form>
  )}
    // <div className='grid items-start gap-8 rounded-lg backdrop-blur-2xl'>
    //   <div className='flex items-center justify-between px-2'>
    //     <div className='grid gap-1'>
    //       <h1 className='text-3xl md:text-4xl'>Settings</h1>
    //       <p className='text-lg text-muted-foreground '>Your Profile settings</p>
    //     </div>
    //   </div>
    //   <Card className='m-2'>
    //     <form action={postData}>
    //       <CardHeader>
    //         <CardTitle>
    //           General Data
    //         </CardTitle>
    //         <CardDescription>
    //           Please provide general information about yourself
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <div className='space-y-2'>
    //         <Badge variant="destructive">{data?.accountType}</Badge>
    //           <div className='space-y-1'>
    //             <Label>Upload your Photo</Label>
    //             <h1>ne sum go napravil oshte uploadware</h1>
    //           </div>
    //         </div>
    //         <div className='space-y-2'>
    //           <div className='space-y-1 w-full '>
    //             <Label>Your Name</Label>
    //             <Input name='name' type='text' placeholder='Enter your name'
    //              defaultValue={data?.name ?? undefined}/>
    //             </div>
    //           </div>
    //         <div className='space-y-2'>
    //           <div className='space-y-1 w-full'>
    //             <Label>Your bio</Label>
    //             <Input name='bio' type='text'  placeholder='Enter your bio'
    //              defaultValue={data?.bio ?? undefined}/>
    //             </div>
    //           </div>
           
    //           <div className='space-y-1'>
    //             <Label>Your Email</Label>
    //             <Input name='email' type='email' id='email' placeholder='Your Email'
    //             disabled
    //             defaultValue={data?.email ?? undefined}
    //            />
    //           </div>

    //           <div className='space-y-1'>
    //             <Label>Color Scheme</Label>
    //             <Select name="color" defaultValue={data?.colorScheme}>
    //               <SelectTrigger className='w-full'>
    //                 <SelectValue placeholder="Select a color"/>
    //               </SelectTrigger>
    //                 <SelectContent>
    //                   <SelectGroup>
    //                     <SelectLabel>Color</SelectLabel>
    //                     <SelectItem value="theme-green">Green</SelectItem>
    //                     <SelectItem value="theme-blue">Blue</SelectItem>
    //                     <SelectItem value="theme-violet">Violet</SelectItem>
    //                     <SelectItem value="theme-yellow">Yellow</SelectItem>
    //                     <SelectItem value="theme-orange">Orange</SelectItem>
    //                     <SelectItem value="theme-red">Red</SelectItem>
    //                     <SelectItem value="theme-rose">Rose</SelectItem>
    //                   </SelectGroup>
    //                 </SelectContent>
    //             </Select>
    //           </div>
    //       </CardContent>
    //       <CardFooter>
    //        <SubmitButton title={'Your information was saved'}/>
    //       </CardFooter>
    //     </form>
    //   </Card>
    // </div>


export default SettingsPage