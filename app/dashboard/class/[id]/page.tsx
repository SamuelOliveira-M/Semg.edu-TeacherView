import TableStudant from '@/app/ui/studant/table-studant';
import TableSubject from'@/app/ui/class/table-subject'
import { Suspense } from 'react';
import { fetchRegistrationById } from '@/app/lib/api';
import { notFound } from 'next/navigation';
import BannerClass from '@/app/ui/class/banner-class';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import { LatestInvoicesSkeleton } from '@/app/ui/skeletons';
import { Calendar } from "@/app/ui/calendar"; 

export default async function Page({ params }: { params: { id: string } }) {
  
  const id = params.id; 

  const schoolClass = await fetchRegistrationById(id)

  if (!schoolClass) {
    notFound();
  }

  return (
    <div>	
      <BannerClass/>
      
      <div className='pt-8'>
        <Calendar id={id}/>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <TableSubject id={id} />
        </Suspense>
        
        <Suspense fallback={<RevenueChartSkeleton />}>
          <TableStudant id={id} />
        </Suspense>
      </div>
    </div>
  );
}