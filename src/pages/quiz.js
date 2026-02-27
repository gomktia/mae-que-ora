import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Redirect /quiz para a homepage (/) onde o quiz agora vive
export default function QuizRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
}
