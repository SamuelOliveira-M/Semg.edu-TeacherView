
import { getClassroomById } from '@/app/lib/api';
import { SchollClass } from '@/app/lib/definitions';
import Image from 'next/image';
import { notFound } from 'next/navigation';



export default async function BannerClass({classId}:{classId:string}) {

  const classroom = await getClassroomById(classId)
  if (classroom instanceof Error) {
    return(
      <p>Erro ao renderizar o componente, por favor atualize a pagina !</p>
    )
  }

  if(!classroom){
    return(
      <p>Erro ao renderizar o componente, por favor atualize a pagina !</p>
    )
  }

  
  return (

    <div className="class-card bg-blue-700 p-8 rounded-lg shadow-lg max-w mx-auto flex">
      <div className=" flex items-center flex-1 mt-2 ">
        <div>
        <h1 className="text-2xl mb-4 text-white font-semibold"><strong>{classroom.nome}</strong></h1>
        <h3 className="text-lg mb-2 text-white">Joaquim Antônio de Araújo</h3>      
        </div>
      </div>
      <div className="hidden lg:block flex-shrink-0 ml-4 ">
        <Image 
          src="/sala3.png" 
          alt="Imagem da turma" 
          width={150}
          height={180}
        />
      </div>
    </div>
  );
}
