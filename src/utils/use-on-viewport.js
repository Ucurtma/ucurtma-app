import { useEffect, useState } from 'react';

export default function useOnViewport(ref) {
  const [isOnViewport, setIsOnViewport] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIsOnViewport(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isOnViewport;
}
