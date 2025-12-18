export default function handler(request, context) {
  // Only apply in "test" environment
  if (process.env.ENVIRONMENT_NAME !== "test") {
    return fetch(request);
  }

  const parsedUrl = new URL(request.url);
  const pathname = parsedUrl.pathname;

  if (pathname.includes('//')) {
    const normalizedPath = pathname.replace(/\/{2,}/g, '/');
    parsedUrl.pathname = normalizedPath;
    return Response.redirect(parsedUrl, 308);
  }

  if (pathname === '/contact') {
    parsedUrl.pathname = '/about';
    return Response.redirect(parsedUrl, 308);
  }

  return fetch(request);
}

