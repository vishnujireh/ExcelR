import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RESERVED = ['api', '_next', 'admin' ];
const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore system & root routes
  if (
    pathname === '/' ||
    RESERVED.some(p => pathname.startsWith(`/${p}`)) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const slug = pathname.slice(1);

  try {
    const res = await fetch(
      `https://demo3.excelr.com/api/get_page_type?api_key=sk_KcJ4OSav26Zm240UNRgZeFDgZZ6vKsiK&base_url=${slug}`,
      { cache: 'no-store' }
    );

    if (!res.ok) return NextResponse.next();

    const data = await res.json();
    if (!data?.status) return NextResponse.next();

    // COURSE
    if (data.type === 'course') {
      return NextResponse.rewrite(
        new URL(`/course/${slug}`, req.url)
      );
    }

    // BLOG
    if (data.type === 'blog') {
      return NextResponse.rewrite(
        new URL(`/blogs/${slug}`, req.url)
      );
    }

    // PAGE (exclude blogs & gallery)
    if (
      data.type === 'page' &&
      slug !== 'blogs' &&
      !pathname.startsWith('/gallery')
    ) {
      return NextResponse.rewrite(
        new URL(`/page/${slug}`, req.url)
      );
    }

  } catch (err) {
    console.error('Middleware error:', err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|admin|.*\\..*).*)'],
};
