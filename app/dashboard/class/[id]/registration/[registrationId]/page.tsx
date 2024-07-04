import ListDescription from "@/app/ui/studant/list-description"; 
import LinhaGrade from "@/app/ui/studant/table-records";
import { studantProfileNotes } from "@/app/lib/api";
import { ErrorMensage } from "@/app/ui/error-mensage";


export default async function Page({ params }: { params: { registrationId: string } }) {
  
  const id = params.registrationId
  const dataGrade =  await studantProfileNotes(id)
  if (dataGrade instanceof Error) {
		return( 
      ErrorMensage(dataGrade.message)
    )	
	}
  return (
    <main>
      <ListDescription id={id}></ListDescription>
      
      <h2 className="mb-6 text-xl md:text-1xl"><strong>Redimento</strong></h2>
      <LinhaGrade studantGrade={dataGrade}></LinhaGrade>      
    </main>
  )  
}

