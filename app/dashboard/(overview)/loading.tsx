import DashboardSkeleton from '@/app/ui/skeletons';
import { redirect } from "next/navigation";
import { getSession } from '@/app/lib/actions';

export default async function Loading() {
  const session = await getSession();
  if(!session){
    redirect("/login");
  }
  return <DashboardSkeleton />;
}