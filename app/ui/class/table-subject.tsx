import { lusitana } from '@/app/ui/fonts';  
import clsx from 'clsx';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Redimento } from './buttons';
import { classTeacherSubject } from '@/app/lib/api';
import { redirect } from "next/navigation";
import { getSession } from '@/app/lib/actions';

export default async function TableSubject({
  id,
}: {
  id: string; 
}) { 
  
  const session = await getSession();
  if(!session){
    redirect("/login");
  }

  const subjects = await classTeacherSubject(id,"2126e1bc-77c9-4df1-8d5e-915598c9146d");//session.user.id
  
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Minhas Disciplinas
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className='bg-white py-1'>
          {subjects.map((subject) => {
            return (
              <div key={subject.disciplina.id} className='flex justify-between items-center p-2 '>  
                <p
                  className={`truncate text-sm md:text-base`}
                >
                  {subject.disciplina.nome}
                </p>
                
                <Redimento 
                  turmaId={id}
                  disciplinaId={subject.disciplina.id}
                />
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>             
    </div>
  );
}
