export default function handler(request, context) {
  // Access environment variable from context (Cloudflare Workers style)
  const environmentName = context?.env?.ENVIRONMENT_NAME;
  
  if (environmentName !== "test") {
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

