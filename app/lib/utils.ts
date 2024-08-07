import { number } from 'prop-types';
import { Revenue } from './definitions';
import { SubjectOfGrade } from "@/app/lib/definitions";


export const formatDaysweek = (day:string)=>{
  let myNewStr = day.slice(0, 3);
  return(myNewStr)
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'pt-BR',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateToBirth = (
  dateStr: Date,
  locale: string = 'pt-BR',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day:'numeric'
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatlocality = (
  city: string,
  state: string,
) => {
  city = city.charAt(0).toUpperCase() + city.slice(1);
  state = state.toUpperCase()

  const formatter = city+"-"+state;
  return formatter;
};

export const formatCpf = (
  cpf: string|undefined,
) => {
  if(!cpf){
    return 'Cpf não informado'
  }
  cpf = cpf.replace(/\D/g, '');

  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  return cpf;
};

export const formatText = (
  text:string
) =>{
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return text
}

export const formatMonthName = (
  monthNumber: number,
  locale: string = 'pt-BR',
): string => {
  const date = new Date();
  date.setMonth(monthNumber - 1); // Os meses começam em 0 no JavaScript

  const options: Intl.DateTimeFormatOptions = {
    month: 'short', // Abreviação do mês
  };

  const formatter = new Intl.DateTimeFormat(locale, options);
  const monthName = formatter.format(date);
  console.log(monthName)

  return monthName.toUpperCase();
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
