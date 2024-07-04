import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import CardClass from '@/app/ui/class/card-class';

export default async function PlaygroundPage() {
  
  return (
    <>
      <div className="w-full">
        <div>
          <Suspense fallback={<InvoicesTableSkeleton />}>
            <CardClass/>
          </Suspense>
        </div>  
      </div>
    </>
  );
}
