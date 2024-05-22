'use client'

import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { TeacherSubjects } from '../lib/definitions';

interface FilterProps {
  subjects: TeacherSubjects[];
}

const Filter: React.FC<FilterProps> = ({ subjects }) => {
  console.log(subjects);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const [selectedDisciplina, setSelectedDisciplina] = useState<string | null>(null);

  useEffect(() => {
    const urlParts = pathname.split('/');
    const disciplinaIndex = urlParts.indexOf('subject');
    if (disciplinaIndex !== -1 && urlParts.length > disciplinaIndex + 1) {
      setSelectedDisciplina(urlParts[disciplinaIndex + 1]);
    }
  }, [pathname]);


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubjectId = event.target.value;

    push(`/dashboard/class/1d40e9da-5e84-4c29-8cfa-21563f284b1b/subject/${selectedSubjectId}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0 mb-1">
      <select
        className="peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={handleSelectChange}
        value={selectedDisciplina || ''}
      >
        {subjects.map((subject, index) => (
          <option key={index} value={subject.disciplina.id}>
            {subject.disciplina.nome}
          </option>
        ))}
      </select>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default Filter;
