export default function handler(request, context) {
  const parsedUrl = new URL(request.url);
  const pathname = parsedUrl.pathname;

  // Normalize consecutive slashes (//) to single slash (/)
  if (pathname.includes('//')) {
    const normalizedPath = pathname.replace(/\/{2,}/g, '/');
    parsedUrl.pathname = normalizedPath;
    return Response.redirect(parsedUrl, 308);
  }

  // Redirect /contact to /about with 308 Permanent Redirect
  if (pathname === '/contact') {
    parsedUrl.pathname = '/about';
    return Response.redirect(parsedUrl, 308);
  }

  // Forward all other requests to the origin server
  return fetch(request);
}

