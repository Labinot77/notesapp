
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from '@/app/lib/db'
import { Button } from '@/components/ui/button';
import { SubmitButton } from '@/app/components/Buttons';
import { revalidatePath } from 'next/cache';
import SettingsForm from '@/app/components/Form/SettingsForm';


async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      name: true,
      email: true,
      bio: true,
      accountType: true,
      colorScheme: true
    }
  })
  return data
}

const SettingsPage = async () => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string)

  async function postData(formData: FormData) {
    "use server"

    const name = formData.get('name') as string
    const bio = formData.get('bio') as string
    const colorScheme = formData.get('color') as string

    await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        name: name ?? undefined,
        bio: bio ?? undefined,
        colorScheme: colorScheme ?? undefined,
      }
    })
    revalidatePath('/', "layout")
  }
  return (
    <SettingsForm data={data} postData={postData}/>
   
  )
}

export default SettingsPage