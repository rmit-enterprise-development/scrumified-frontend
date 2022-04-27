import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import md5 from 'md5';

const FE_BASE_URL = 'http://localhost:3000/';
const SECRET_KEY = md5('EmChiXemAnhLa_#BanNhauMaThoi');

export default function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.auth;
  const url = req.url;

  if (url === FE_BASE_URL) {
    if (jwt)
      try {
        const user = verify(jwt, SECRET_KEY);
        console.log('Middleware catch: ', user);
        return NextResponse.redirect(`${FE_BASE_URL}dashboard`);
      } catch (error) {
        return NextResponse.next();
      }
  }

  if (
    url.includes('/dashboard') ||
    url.includes('/profile') ||
    url.includes('/project')
  ) {
    if (!jwt) return NextResponse.redirect(FE_BASE_URL);

    try {
      const user = verify(jwt, SECRET_KEY);
      console.log('Middleware catch: ', user);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(FE_BASE_URL);
    }
  }

  return NextResponse.next();
}
