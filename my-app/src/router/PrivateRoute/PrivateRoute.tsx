import { ReactNode, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const location = useLocation();
  const [showWarning, setShowWarning] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!userData.email) {
      setShowWarning(true);
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [userData]);

  if (redirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userData.email && showWarning) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Access Restricted</h2>
          <p className="text-sm text-gray-600">
            You need to log in to access this page. You will be redirected to the login page in <span className="font-semibold text-red-600">5 seconds</span>.
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setRedirect(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded transition-all"
            >
              Go to Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
