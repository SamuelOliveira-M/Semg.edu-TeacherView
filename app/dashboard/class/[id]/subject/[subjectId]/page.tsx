import IncomeSheet from '@/app/ui/teacher/income-sheet';

import { fetchRegistrationById } from '@/app/lib/api';
import { notFound } from 'next/navigation';
import { getSession } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import BannerClass from '@/app/ui/class/banner-class';
import { lusitana } from '@/app/ui/fonts';
import Filter from '@/app/ui/filter';
import { classTeacherSubject } from '@/app/lib/api';

export default async function Page(
  { params }: { params: {
    id:string,
    subjectId: string,
    } }

  ) {

    const session = await getSession();
    if(!session){
      redirect("/login");
    }
    
  const classId = params.id
  const subjectId = params.subjectId; 
  const teacherId = session.user.id

  const subjects = await classTeacherSubject(classId,session.user.id);
  
  return (
    <div>	
      <BannerClass/>

      <h1 className={`${lusitana.className} mt-8 mb-4 text-xl md:text-2xl`}>
        Ficha de Redimento
      </h1>
      <Filter subjects = {subjects}/>
    
      <IncomeSheet turmaId={classId} disciplinaId={subjectId} professorId={teacherId}/>        
    </div>
  );
} 