import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';

export const PrivateRoutes = () => {
  const { user, isloading } = useSelector(
    (state: RootState) => state.user.value
  );

  if (isloading) return <div>Loading ...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};
