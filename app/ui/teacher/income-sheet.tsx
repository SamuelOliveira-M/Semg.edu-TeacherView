import { CheckPassingGrade,StudantStatus } from "../studant/status";
import { formatText } from "@/app/lib/utils";

import React from "react";
import { studentPerformanceSheet } from "@/app/lib/api";

export default async function IncomeSheet({ turmaId,disciplinaId,professorId }: {turmaId:string, disciplinaId:string, professorId:string,}) {
    
    const dataGrade =  await studentPerformanceSheet(turmaId, disciplinaId, professorId)

    const headers = [
      'Alunos', 'MAR', 'ABR', 'MAI', 'JUN', '1ºRS', 'AGO', 'SET', 'OUT', 'NOV', '2ºRS', 'PF', 'MF', 'Resultado'
    ];

  return (

    <div className="overflow-x-auto">
      <table className=" min-w-full text-gray-900 bg-blue-300 rounded-t-md">
        <thead className="text-center text-sm font-normal">
          <tr >
            {headers.map((header, index) => (
              index === 0 ? (
                <th key={index} scope="col" className="font-medium p-1 sticky left-0 z-10 bg-blue-300">{header}</th>
              ) : <th key={index} scope="col" className="font-medium p-1">{header}</th>
            ))}
          </tr>
        </thead>
        
        <tbody className="bg-white text-center">
          {dataGrade.matriculas.map((matricula, index) => (
            <tr key={index} className="w-full border-b py-3 text-sm last-of-type:border-none">
              <td className="whitespace-nowrap p-1 border sticky left-0 z-10 bg-gray-50">
                {formatText(matricula.aluno.nome ? matricula.aluno.nome : '')}
              </td>

              {matricula.avaliacao.map((avaliacao, indexDisciplina) => (
                <td key={`${index}-${indexDisciplina}`} className="whitespace-nowrap p-1 border">
                  {CheckPassingGrade(avaliacao.nota ? avaliacao.nota :0)}
                </td>
              ))}

              <td className="whitespace-nowrap p-1 border">
                {CheckPassingGrade(matricula.media ? matricula.media :0)}
              </td>
              
              <td className="whitespace-nowrap p-1 border">
                {StudantStatus(matricula.status ? matricula.status :'')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
