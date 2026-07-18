export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    try {
      const authValue = authHeader.split(' ')[1];
      const decoded = atob(authValue);
      const [user, password] = decoded.split(':');

      // Utilise 'demo' et 'demo' pour éviter toute erreur de frappe
      if (user.trim() === 'demo' && password.trim() === 'demo') {
        return new Response(null, {
          headers: { 'x-middleware-next': '1' }
        });
      }
    } catch (e) {
      // Ignorer les erreurs
    }
  }

  return new Response('Accès Privé', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Demo Privee"'
    }
  });
}
