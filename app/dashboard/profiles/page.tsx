import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Separator } from "@/components/ui/separator";
import InputMenu from "@/app/components/OtherProfiles";
import { getInformationForOtherUsers } from "@/app/lib/actions/user.actions";


  
const OtherProfiles = async () => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const loggedInUserId = user?.id;
  const data = await getInformationForOtherUsers(loggedInUserId)

  return (
    <div className="flex flex-col items-start p-1 backdrop:blur-2xl rounded-lg gap-y-8 mb-5">
    <div className="flex items-center w-full justify-between px-2 flex-col sm:flex-row">
      <div className="grid gap-1">
        <h1 className="text-3xl md:text-4xl text-center sm:text-start">Profiles</h1>
        <p className="text-lg text-muted-foreground">
          Here you can search for other peoples profiles
        </p>
      </div>
    </div >
    <InputMenu data={data} />
    </div>
  )
}

export default OtherProfiles