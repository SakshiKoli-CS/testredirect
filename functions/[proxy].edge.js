export default function handler(request, context) {
  // Debug: Check what's in context.env
  console.log("context.env:", context?.env);
  console.log("ENVIRONMENT_NAME:", context?.env?.ENVIRONMENT_NAME);
  
  const environmentName = context?.env?.ENVIRONMENT_NAME;
  
  // Only apply in "test" environment
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

