export default function handler(request, context) {
  const parsedUrl = new URL(request.url);
  const pathname = parsedUrl.pathname;
  const environmentName = context?.env?.ENVIRONMENT_NAME;

  // Only apply in "test" environment
  if (environmentName === "test") {
    if (pathname.includes('//')) {
      const normalizedPath = pathname.replace(/\/{2,}/g, '/');
      parsedUrl.pathname = normalizedPath;
      return Response.redirect(parsedUrl, 308);
    }

    if (pathname === '/contact') {
      parsedUrl.pathname = '/about';
      return Response.redirect(parsedUrl, 308);
    }
  }

  return fetch(request);
}

