export default function handler(request, context) {
  const parsedUrl = new URL(request.url);
  const route = parsedUrl.pathname;

  // Redirect /contact to /about with 308 Permanent Redirect
  if (route === '/contact') {
    parsedUrl.pathname = '/about';
    return Response.redirect(parsedUrl, 308);
  }

  // Forward all other requests to the origin server
  return fetch(request);
}

