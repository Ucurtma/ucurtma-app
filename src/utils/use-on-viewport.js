import { useEffect, useState } from 'react';

export default function useOnViewport(ref) {
  const [isOnViewport, setIsOnViewport] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIsOnViewport(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isOnViewport;
}
