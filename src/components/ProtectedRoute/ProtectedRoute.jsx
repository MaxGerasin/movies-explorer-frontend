import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, isLogin, ...props }) {
  return (
    isLogin ? <Component {...props} /> : <Navigate to="/" />
  );
}
