import IncomeSheet from '@/app/ui/teacher/income-sheet';

import { fetchRegistrationById } from '@/app/lib/api';
import { notFound } from 'next/navigation';
import { getSession } from "@/app/lib/actions";
import { redirect } from "next/navigation";

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

  return (
    <div>	
     {/* <ListDescription id={id}></ListDescription> */}
      
      <h2 className="mb-6 text-xl md:text-1xl"><strong>Redimento</strong></h2>

      <IncomeSheet turmaId={classId} disciplinaId={subjectId} professorId={teacherId}/> 
       
    </div>
  );
} 