import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authStore } from '../stores/auth_store/Store'

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const isAuthenticated = authStore((state) => state.token);

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/login');
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null; // Render nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
