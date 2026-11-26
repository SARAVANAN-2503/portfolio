import { NextResponse, type NextRequest } from 'next/server';

const OBSOLETE_BRANDED_SLUGS = new Set([
  'seltrix',
  'nexusone',
  'nexusone-coach',
  'nexusone.coach',
  'breath-work',
  'breathwork',
  'zponz',
  'govpass',
  'appolo',
  'appolo-smart-test',
  'apollo',
  'apollo-smart-test',
  'adunity',
  'quickbizz',
]);

const OBSOLETE_BRANDED_ASSETS = new Set([
  '/seltrix.png',
  '/nexusone.coach.png',
  '/zponz.png',
  '/govpass.png',
  '/appolo smart test.png',
  '/appolo%20smart%20test.png',
  '/adunity.png',
]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (OBSOLETE_BRANDED_ASSETS.has(pathname)) {
    return new NextResponse('410 Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  if (pathname.startsWith('/projects/')) {
    const slug = pathname.slice('/projects/'.length);
    if (OBSOLETE_BRANDED_SLUGS.has(slug)) {
      return new NextResponse(
        '410 Gone: This project URL has been permanently removed.',
        {
          status: 410,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Robots-Tag': 'noindex, nofollow',
            'Cache-Control': 'public, max-age=3600',
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/projects/:path*', '/:path*.png'],
};
