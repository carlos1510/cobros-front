//import './main.js'

import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';

import '../../css/style.css';

function Home(){

      const location = useLocation();

      React.useEffect(() => {
        const element = document.querySelector('html');
        if (element !== null) element.style.scrollBehavior = 'auto';
        window.scroll({ top: 0 })
        const element2 = document.querySelector('html');
        if (element2 !== null) element2.style.scrollBehavior = '';
      }, [location.pathname]); // triggered on route change

      const [sidebarOpen, setSidebarOpen] = React.useState(false);


    return (
        <>
            
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar */}
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

              {/* Content area */}
              <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow">
                  <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <Outlet />
                  </div>
                </main>
              </div>

            </div>
        </>
    )
}

export default Home;