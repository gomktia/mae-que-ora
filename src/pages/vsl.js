import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Redirect /vsl para a página principal (/)
// A VSL agora é a homepage do site
export default function VslRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Preserva query params no redirect
    const query = router.query;
    router.replace({ pathname: '/', query });
  }, [router]);

  return null;
}
