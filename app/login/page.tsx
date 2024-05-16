import {AcmeLogoLarge} from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { redirect } from "next/navigation";
import { getSession } from '@/app/lib/actions';

export default async  function LoginPage() {
  const session = await getSession();
  
  if(session){
    const id = session.id
    redirect(`/dashboard/${id}`);
  }
  
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center max-w-[400px] flex-col space-y-2.5 p-4">  
        <AcmeLogoLarge />
        <LoginForm />
      </div>
    </main>
  );
}
