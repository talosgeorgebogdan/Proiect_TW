'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollAnimate({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it's visible so it doesn't animate out when scrolling past
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 }); // Triggers when 10% of the element is visible

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
      {children}
    </div>
  );
}