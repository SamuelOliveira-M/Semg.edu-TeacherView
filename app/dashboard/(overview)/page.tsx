import { redirect } from "next/navigation";
import { getSession } from '@/app/lib/actions';
import BannerTeacher from "@/app/ui/teacher/banner-teacher";
import SchoolClassCard from "@/app/ui/teacher/teacher-classses-cards";

export default async function Page() {
  
  const session = await getSession();
  if(!session){
    redirect("/login");
  }
    
  return (
    <>
      <div className="border-b border-gray-300 mb-4">
        <BannerTeacher id={session.user.id}></BannerTeacher>
      </div>
      <SchoolClassCard id={session.user.id}></SchoolClassCard>
    </>
  ) 
}