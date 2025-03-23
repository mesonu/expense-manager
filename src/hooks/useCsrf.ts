// src/hooks/useCsrf.ts
import { useState, useEffect } from 'react';

export function useCsrf() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/auth/csrf');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.token) {
          setCsrfToken(data.token);
        } else {
          throw new Error('No token received');
        }
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch CSRF token');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { csrfToken, loading, error };
}



// // src/hooks/useCsrf.ts
// import { useState, useEffect } from 'react';

// export function useCsrf() {
//   const [csrfToken, setCsrfToken] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await fetch('/api/auth/csrf');
//         const data = await response.json();
//         if (data.token) {
//           setCsrfToken(data.token);
//         }
//       } catch (error) {
//         console.error('Failed to fetch CSRF token:', error);
//       }
//     };

//     fetchToken();
//   }, []);

//   return { csrfToken };
// }

// // src/hooks/useCsrf.ts
// import { useState, useEffect } from 'react';
// import { generateCSRFToken } from '@/lib/utils/security';

// export function useCsrf() {
//   const [csrfToken, setCsrfToken] = useState<string | null>(null);

//   useEffect(() => {
//     const generateToken = async () => {
//       const token = await generateCSRFToken();
//       setCsrfToken(token);
//     };

//     generateToken();
//   }, []);

//   return { csrfToken };
// }