import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CallbackPageProps {

}
const CallbackPage: FC<CallbackPageProps> = () => {
    const navigate = useNavigate();

    
    useEffect(() => {
        // const parsedURL = new URL(window.location.href);
        // const token = parsedURL.searchParams.get('token');
        // if (token){
        //     localStorage.setItem('token', JSON.stringify(token));
        //     parsedURL.searchParams.delete('token');
            navigate('/dashboard');
        // }
}, [navigate])
    return (
        <>
            Callback...
        </>
    )
};

export default CallbackPage;