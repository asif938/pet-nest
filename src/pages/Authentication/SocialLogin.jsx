import React from 'react';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { askForNotificationPermission } from '../../firebase/notification';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/dashboard';
    const axiosInstance = useAxios();

  const handleGoogleLogin = () => {
    console.log("Google Login");
    // Add your Google Auth logic here
    signInWithGoogle()
    .then(async (result) => {
        const user = result.user;
        const userInfo = {
            // name: user.displayName,
            email: user.email,
            role: 'user',
            created_at: new Date().toISOString(),
            last_log_in: new Date().toISOString()
        }
        const res = await axiosInstance.post('/users', userInfo);
        console.log(res.data);

        //askForNotificationPermission(user.email); // added in notification branch

        navigate(from);
    })
    .catch(error => {
        console.error(error);
    })
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 w-full justify-center border border-gray-300 dark:border-gray-600 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <FcGoogle size={20} />
        <span className="text-gray-700 dark:text-gray-300">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
