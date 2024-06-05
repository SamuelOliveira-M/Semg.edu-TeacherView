import React from 'react';
import clsx from 'clsx';

interface CheckPassingGradeProps {
  nota: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export function StudantStatus( Resultado:string ) {
  return (
    <span
      className={clsx(
        {
          'border-l-2  border-green-600 bg bg-green-200 p-1 rounded-r-sm': Resultado === "Aprovado",
          'border-l-2  border-read-600 bg bg-read-200 p-1 rounded-r-sm': Resultado === "Reprovado",
          'border-l-2  border-gray-600 bg bg-gray-200 p-1 rounded-r-sm': Resultado==="Cursando",
        },
      )}
    >
      {Resultado === "Reprovado" ? (
        <>
          Reprovado
        </>
      ) : null}
      {Resultado === "Aprovado" ? (
        <>
          Aprovado
        </>
      ) : null}
      {Resultado === "Cursando" ? (
        <>
          Cursando
        </>
      ) : null}
    </span>
  );
}

export const CheckPassingGradeForm: React.FC<CheckPassingGradeProps> = ({ nota, handleChange, name }) => {
  const checkGrade = (): "Reprovado" | "Aprovado" | "Vazio" => {
    if (nota === 0) {
      return 'Vazio';
    }
    if (nota >= 6) {
      return 'Aprovado';
    }
    return 'Reprovado';
  };

  const status = checkGrade();

  return (
    <input
      type="number"
      name={name}
      value={nota === 0 ? '' : nota.toString()}
      onChange={handleChange}
      min={0.1}
      max={10}
      step={0.1}
      maxLength={2}
      className={clsx(
        'inline-flex items-center text-xs w-full p-1 text-center',
        
        {
          'border-none': true,
          'text-green-500': status === 'Aprovado',
          'text-red-500': status === 'Reprovado',
          'text-gray-500': status === 'Vazio',
        }
      )}
    />
  );
};

export function checkPassingGradeMedia(nota: number ) {

	const checkGrade: () => "Reprovado" | "Aprovado" | "Vazio" = () => {
    
    if(nota===0){
      return 'Vazio'
    }
		if(nota>=6){
			return 'Aprovado'
		}
		return 'Reprovado'
	}

	const status: "Reprovado" | "Aprovado" | "Vazio"= checkGrade()

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          '': status === 'Aprovado',
          'text-red-500': status === 'Reprovado',
        },
      )}
    >
      {status === 'Reprovado' ? (
        <>
          {nota.toFixed(1)}
        </>
      ) : null}
      {status === 'Aprovado' ? (
        <>
          {nota.toFixed(1)}
        </>
      ) : null}
      {status === 'Vazio' ? (
        <>
          
        </>
      ) : null}
    </span>
  );
}
// 
export function CheckPassingGrade(nota: number ) {

	const checkGrade: () => "Reprovado" | "Aprovado" | "Vazio" = () => {
    
    if(nota===0){
      return 'Vazio'
    }
		if(nota>=6){
			return 'Aprovado'
		}
		return 'Reprovado'
	}

	const status: "Reprovado" | "Aprovado" | "Vazio"= checkGrade()

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          '': status === 'Aprovado',
          'text-red-500': status === 'Reprovado',
        },
      )}
    >
      {status === 'Reprovado' ? (
        <>
          {nota.toFixed(1)}
        </>
      ) : null}
      {status === 'Aprovado' ? (
        <>
          {nota.toFixed(1)}
        </>
      ) : null}
      {status === 'Vazio' ? (
        <>
          
        </>
      ) : null}
    </span>
  );
}