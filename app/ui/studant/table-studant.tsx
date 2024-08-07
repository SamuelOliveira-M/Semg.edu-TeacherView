import Image from 'next/image';
import { lusitana } from '../fonts';
import clsx from 'clsx';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { formatDateToBirth, formatText } from '@/app/lib/utils';
import { RegistrationTable } from '@/app/lib/definitions';

export default async function StudantTable({
  matriculas,
  id,
}: {
  matriculas: RegistrationTable[],
  id:string,
}) {
  
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Alunos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white py-1 ">
          {matriculas.map((studant,i) => {
            return (
              <Link 
              key={studant.id}
              href={`/dashboard/class/${id}/registration/${studant.id}`}
              >
                <div
                  key={studant.id}
                  className={clsx(
                    'flex flex-row items-center justify-between p-2 hover:shadow-md',
                    {
                      'border-t': i !== 0,
                    },
                  )}
                >
                  <div className="flex items-center">
                    <Image
                      src={studant.aluno.url_image}
                      alt={`${studant.aluno.nome}'s profile picture`}
                      className="mr-4 rounded-full"
                      width={32}
                      height={32}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm md:text-base">
                        {formatText(studant.aluno.nome)}
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {formatDateToBirth(studant.aluno.data_nascimento)}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                  >
                    {formatText(studant.aluno.municipio_nascimento)}
                  </p>  
                </div>
              </Link>
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
