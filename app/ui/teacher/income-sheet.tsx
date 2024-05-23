'use client'

import React, { useState } from 'react';
import { CheckPassingGrade,StudantStatus ,checkPassingGradeMedia} from '../studant/status';
import { PerformanceSheet } from '@/app/lib/definitions';
import { formatText } from '@/app/lib/utils';

const MyComponent: React.FC<{ dataGrade: PerformanceSheet }> = ({ dataGrade }) => {
  const [formData, setFormData] = useState<{ [key: string]: number | string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // try {
    //   const response = await fetch('/api/submit-grades', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const result = await response.json();
    //   console.log('Result:', result);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  const headers = [
    'Alunos', 'MAR', 'ABR', 'MAI', 'JUN', '1ºRS', 'AGO', 'SET', 'OUT', 'NOV', '2ºRS', 'PF', 'MF', 'Resultado'
  ];

  return (
    <form onSubmit={handleSubmit}>
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
                  <td key={`${index}-${indexDisciplina}`} className="whitespace-nowrap border">
                    <CheckPassingGrade
                      nota={Number(formData[`nota-${index}-${indexDisciplina}`]) || avaliacao.nota}
                      handleChange={handleChange}
                      name={`nota-${index}-${indexDisciplina}`}
                    />
                  </td>
                ))}
                <td className="whitespace-nowrap border">
                  {checkPassingGradeMedia(matricula.media ? matricula.media :0)}
                </td>
                <td className="whitespace-nowrap border">
                  {StudantStatus(matricula.status ? matricula.status :'')}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Enviar</button>
    </form>
  );
};

export default MyComponent;
