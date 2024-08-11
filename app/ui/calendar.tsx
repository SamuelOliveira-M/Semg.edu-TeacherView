import { Card } from './card';
import { lusitana } from './fonts';
import { ICalendar } from '../lib/definitions';

export async function Calendar({ dataCalendar }: { dataCalendar: ICalendar[] }){
	return (
		<div>
			<h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Calendário</h2>
			<table className="bg-blue-400 rounded-t-md w-full shadow-md">
				<thead className="text-white">
					<tr>
						{dataCalendar.map((dia, i) => (
							<th scope="col" key={i} className="w-32"> {/* Define a largura específica aqui */}
								<p>{dia.diaSemana.substring(0, 3)}<span className="hidden sm:inline">{dia.diaSemana.substring(3)}</span></p>
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-gray-100">
					{Array.from({ length: Math.max(...dataCalendar.map(d => d.aulas.length)) }).map((_, rowIndex) => (
						<tr key={rowIndex}>
							{dataCalendar.map((dia, colIndex) => (
								<td key={colIndex} className="w-32"> {/* Define a largura específica aqui */}
									{dia.aulas[rowIndex] ? (
										<div className="flex flex-col">
											<Card
												materia={dia.aulas[rowIndex].lotacao.disciplina.nome}
												professor={dia.aulas[rowIndex].lotacao.professor.nome}
												horarioInicio={dia.aulas[rowIndex].horario.horarioInicio}
												horarioFim={dia.aulas[rowIndex].horario.horarioFim}
											/>
										</div>
									) : (
										<div>Sem aula</div>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}