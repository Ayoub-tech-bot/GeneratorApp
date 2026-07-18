export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    const authValue = authHeader.split(' ')[1];
    
    try {
      const decoded = atob(authValue);
      const [user, password] = decoded.split(':');

      // Modifiez le nom d'utilisateur et le mot de passe ici
      if (user === 'client' && password === 'secret') {
        // Autorise l'accès à la page
        return new Response(null, {
          headers: { 'x-middleware-next': '1' }
        });
      }
    } catch (e) {
      // Ignorer les erreurs de décodage
    }
  }

  // Bloque l'accès et affiche la popup de connexion du navigateur
  return new Response('Accès Privé', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Demo Privee"'
    }
  });
}
