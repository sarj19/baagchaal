import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useEscapeToGoBack() {
  const navigate = useNavigate();
  useEffect(() => {
    const listener = (e: any) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);
}
