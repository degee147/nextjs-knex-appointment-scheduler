import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from './AuthContext';

const useAuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {

        const token = localStorage.getItem('authToken');

        // If there is no token, redirect to the login page
        if (!token) {
          router.push('/login');
        }

        // const { isLoggedIn } = useAuth();

        // // If there is no token, redirect to the login page
        // if (!isLoggedIn) {
        //     router.push('/login');
        // }
    }, [router]);
};

export default useAuthRedirect;
