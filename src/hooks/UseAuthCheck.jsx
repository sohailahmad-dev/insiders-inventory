import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = (isAdminCheck = false) => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/LoginSignup');
            return;
        }

        const parsedUser = JSON.parse(user);

        if (isAdminCheck && parsedUser.role !== 'Admin') {
            navigate('/LoginSignup');
        }
    }, [navigate, isAdminCheck]);
};

export default useAuthCheck;
