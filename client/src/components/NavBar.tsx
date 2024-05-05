import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import useAuth from '../hooks/useAuth';

const tabs: string[] = [
  'Home',
  'Series',
  'Films',
  'New&Popular',
  'MyList',
  'Browse by Languages',
];

export default function NavBar() {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1400) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });
  }, []);

  const { user, isloading } = useSelector(
    (state: RootState) => state.user.value
  );

  const { logout } = useAuth();
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-16 py-6 flex items-center ${
          showBackground ? 'bg-black opacity-90' : null
        }`}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRawRe0teFSEAWgdSzNp7s-E_XRl_p61unPKRTJi4keEg&s"
          alt="logo"
          className="h-16 "
        />
        <div className="flex gap-7 ml-8 mr-auto">
          {tabs.map((tab) => {
            return (
              <div
                key={tab}
                className="text-white hover:text-gray-300 cursor-pointer">
                <p>{tab}</p>
              </div>
            );
          })}
        </div>
        {user && !isloading && (
          <div>
            <div className="text-white hover:text-gray-300 cursor-pointer ml-auto">
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
