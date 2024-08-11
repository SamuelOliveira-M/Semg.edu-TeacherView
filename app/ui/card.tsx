export function Card({ materia, professor,horarioInicio, horarioFim }: {
	materia: string;
	professor: string,
	horarioInicio:string,
	horarioFim:string 
}){

	return(
		<div
			className="border rounded-lg p-1 text-center bg-white w-full"
		>
			<p className="text-xs sm:text-base">
				{materia.substring(0, 10)}
				
				<span className='text-xs hidden sm:inline sm:text-base'>
					{materia.substring(10, 15)}
				</span>
			</p>
			
			<p className="text-xs sm:text-base">
				{professor.substring(0, 7)}
				
				<span className='text-xs hidden sm:inline sm:text-base'>
					{professor.substring(7, 15)}
				</span>
			
			</p>
			
			<div className="flex flex-col items-center sm:flex-row sm:justify-center">
            <p className="text-xs sm:text-sm">{horarioInicio}</p>
						<span className="pr-1 pl-1 hidden sm:block">:</span>
            <p className="text-xs sm:text-sm">{horarioFim}</p>
        </div>
		</div>
	)
}
