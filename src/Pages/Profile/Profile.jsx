import React, { useContext } from 'react';
import { AuthContext } from '../../Context/Auth/AuthContext';
import userLogo from '../../assets/userLogo.png';
import { User, Mail, ShieldCheck, ShieldX } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation()
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
      <Helmet key={location.pathname}>
        <title>Your Profile</title>
      </Helmet>
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center border border-blue-100">
        <div className="relative mb-6">
          <img
            src={user?.photoURL || userLogo}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-lg"
          />
          <span className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1.5 shadow-md">
            <User className="text-white w-5 h-5" />
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-1 flex items-center justify-center gap-2">
            {user?.displayName || 'No Name'}
          </h2>
          <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
            <Mail className="w-5 h-5" />
            <span className="text-base font-medium">
              {user?.email || 'No Email'}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            {user?.emailVerified ? (
              <>
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span className="text-green-600 font-semibold">
                  Email Verified
                </span>
              </>
            ) : (
              <>
                <ShieldX className="w-5 h-5 text-red-500" />
                <span className="text-red-600 font-semibold">
                  Email Not Verified
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
