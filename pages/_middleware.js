import { NextResponse } from 'next/server';

const FE_BASE_URL = 'https://scrumified.vercel.app/';

export default function Middleware(req) {
  // get cookie from request
  const { cookies } = req;

  // get auth token from cookie
  const jwt = cookies.auth;

  // get requesting url
  const url = req.url;

  // if page is index
  if (url === FE_BASE_URL) {
    // if auth token exist, go to dashboard
    if (jwt) {
      let response = NextResponse.redirect(`${FE_BASE_URL}dashboard`);
      response.cookie('jump-from', 'home');
      return response;
    }

    // otherwise, serve next response
    return NextResponse.next();
  }

  // if page is other than index
  if (
    url.includes('/dashboard') ||
    url.includes('/profile') ||
    url.includes('/project')
  ) {
    // if token exist, serve next response
    if (jwt) return NextResponse.next();

    // otherwise, go to index
    let response = NextResponse.redirect(FE_BASE_URL);
    response.cookie('jump-from', new URL(url).pathname.slice(1));
    return response;
  }

  return NextResponse.next();
}
