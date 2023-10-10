import { FC } from 'react';
import api from '../../utils/axiosInstance';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface DashboardPageProps {

}

const getUser = async () => {
    await api.get('/api/user');
}

const handleLogout = async (navigate: NavigateFunction) => {
    localStorage.removeItem('token');
    await api.post('/logout');
    // navigate('/');
}

const DashboardPage: FC<DashboardPageProps> = () => {
    const navigate = useNavigate();


    return <>
        <button onClick={() => handleLogout(navigate)}>Logout</button>
        <button onClick={getUser}>Get User</button>
        <h3>Protected Dashboard</h3>;
    </>
};

export default DashboardPage;