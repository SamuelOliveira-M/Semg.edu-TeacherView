import { unstable_noStore as noStore } from 'next/cache';
import {
  RegistrationTable,
  SchollClassTable,
  SubjectOfGrade,
  Teacher,
  SubjectOfTeacher,
  TeacherClasses,
  IDataStatistics,
  ICalendar,
  User,
  Erro,
  TeacherSubjects,
  PerformanceSheet,
  StudantPerformanceSheet,
  CreateGrade
} from './definitions';

export async function login(email:string,senha:string) {
  console.log(senha)
  const res = await fetch(`${process.env.API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email,senha}),
  });

  const data:User|Erro = await res.json();

  return data;
}




export async function POST(email:string,senha:string) {
  try{
    const res = await fetch(`${process.env.API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,senha}),
    });

    const data = await res.json();
    return data;
  }  
  catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}


export async function fetchFilteredClass() {
  
  noStore();
  
  try {
    const schoolClass = await fetch(`${process.env.API_URL}/class`, {
      method: 'GET',
    });
    
    const data:SchollClassTable[] = await schoolClass.json();
    return (data);
  } catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function fetchRegistrationById(id:string){
  try{
    const res = await fetch(`${process.env.API_URL}/studantee/${id}`, {
      method: 'GET',
    });
  
    const data:RegistrationTable[]= await res.json();
    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function studentPerformanceSheet(turmaId:string, disciplinaId:string, professorId:string){
  noStore();
  
  try{
    const res = await fetch(`${process.env.API_URL}/redimentoss/${turmaId}/${disciplinaId}`, {
      method: 'GET',
    });
  
    const data:PerformanceSheet= await res.json();
    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}




export async function uniqueFetchRegistrationById(id:string){
  try{
    const res = await fetch(`${process.env.API_URL}/profile/${id}`, {
      method: 'GET',
    });
    
    const data1 = await res.json();
    const data:RegistrationTable = data1[0]

    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function studantProfile(id:string){
  try{
    const res = await fetch(`${process.env.API_URL}/profile/${id}`, {
      method: 'GET',
    });
  
    const data:RegistrationTable = await res.json();
    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function studantProfileNotes(id:string){
  noStore();
  try{
    const res = await fetch(`${process.env.API_URL}/avaliacaos/${id}`, {
      method: 'GET',
    });
  
    const data:StudantPerformanceSheet = await res.json();
    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function reqTeachers(){
  try{
    const res = await fetch(`${process.env.API_URL}/teacherstt`, {
      method: 'GET',
    });
  
    const data:Teacher[] = await res.json();
    
    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function reqTeacher(id:string){
  try{
    const res = await fetch(`${process.env.API_URL}/teacherProfile/${id}`, {
      method: 'GET',
    });
  
    const data:Teacher = await res.json();
    return data;
  
  }catch (error) {
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}
export async function reqSubjectAndTeacher(id:string){
  try{
    const res = await fetch(`${process.env.API_URL}/teachers-subjects/${id}`, {
      method: 'GET',
    });
  
    const data:SubjectOfTeacher[] = await res.json();
    console.log(data)
    return data;
    
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function classTeacherSubject(turmaId:string,professorId:string){
  try{
    const res = await fetch(`${process.env.API_URL}/subjects/${turmaId}/${professorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data:TeacherSubjects[] = await res.json();
    return data;
    
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}



export async function test(id:string){
  try{
    const res = await fetch(`${process.env.API_URL}/tumasdoprofessorrr/${id}`, {
      method: 'GET',
    });
  
    const data:TeacherClasses[]= await res.json();
    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function getStatistics() {
  try{
    const res = await fetch(`${process.env.API_URL}/getStatistics`, {
      method: 'GET',
    });
  
    const data:IDataStatistics= await res.json();
    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function getCalendar(id:string) {
  try{
    const res = await fetch(`${process.env.API_URL}/calendar/${id}`, {
      method: 'GET',
    });
  
    const data:ICalendar[]= await res.json();
    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}

export async function modifyGrade(dataGrade:CreateGrade) {
  try{
    const res = await fetch(`${process.env.API_URL}/add/notas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataGrade),
    });
  
    const data= await res.json();
    return data;
  
  }catch (error) {
    console.error('Database Error:', error);
    return new Error('Erro Interno do Servidor. Por favor volte mais tarde !');
  }
}
