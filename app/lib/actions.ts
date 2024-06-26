'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { login } from './api';
import { CreateGrade } from './definitions';
import { modifyGrade } from './api';

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days from now") // Changed to 1 week from now
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function signIn(formData: FormData) {

  const formDataObject = Object.fromEntries(formData);

  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(formDataObject);

  if (!parsedCredentials.success) {
    throw new Error('Invalid form data');
  }

  const { email, password } = parsedCredentials.data;
  const user = await login(email, password);

  if (typeof user === 'object' && 'error' in user) {
    throw new Error('User or password incorrect!');
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // One week in milliseconds
  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires, httpOnly: true });
  redirect(`/dashboard`)
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
  // No need to change the expiration time here, as it is already set for one week during sign-in

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn(formData);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Invalid form data') {
        return 'Invalid form data.';
      } else if (error.message === 'User or password incorrect!') {
        return 'User or password incorrect!';
      }
    }
    throw error;
  
  }
}

export async function handleSubmitServer(dataGrade:CreateGrade) {
  try {
    const grade = await modifyGrade(dataGrade);
    return grade; // Retorna o resultado da modificação da nota
  } catch (error) {
    throw new Error('Erro ao modificar a nota: ' + error); // Lança um erro se ocorrer algum problema
  }
}
