import TableStudant from '@/app/ui/studant/table-studant';
import TableSubject from'@/app/ui/class/table-subject'
import { Suspense } from 'react';
import { classTeacherSubject, fetchRegistrationById } from '@/app/lib/api';
import { notFound, redirect } from 'next/navigation';
import BannerClass from '@/app/ui/class/banner-class';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import { LatestInvoicesSkeleton } from '@/app/ui/skeletons';
import { Calendar } from "@/app/ui/calendar"; 
import { getCalendar } from '@/app/lib/api';
import { ErrorMensage } from '@/app/ui/error-mensage';
import { getSession } from '@/app/lib/actions';


export default async function Page({ params }: { params: { id: string } }) {
  
  const classid = params.id; 

  const session = await getSession();
  if(!session){
    redirect("/login");
  }

  const schoolClass = await fetchRegistrationById(classid)
  if (!schoolClass) {
    notFound();
  }

  const calendar = await getCalendar(classid)
  if (calendar instanceof Error) {
		return( 
      ErrorMensage(calendar.message)
    )	
	}

  const matriculas = await fetchRegistrationById(classid);
  if (matriculas instanceof Error) {
		return( 
      ErrorMensage(matriculas.message)
    )	
	}

  const teacherSubjects = await classTeacherSubject(classid,session.user.id);
  if (teacherSubjects instanceof Error) {
		return( 
      ErrorMensage(teacherSubjects.message)
    )	
	}

  return (
    <div>	
      <BannerClass/>
      
      <div className='pt-8'>
        <Calendar dataCalendar={calendar}/>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <TableSubject subjects={teacherSubjects} id={classid} />
        </Suspense>
        
        <Suspense fallback={<RevenueChartSkeleton />}>
          <TableStudant matriculas={matriculas} id={classid}/>
        </Suspense>
      </div>
    </div>
  );
}