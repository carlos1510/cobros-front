//import './main.js'

import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';

function Home(){

      const location = useLocation();

      React.useEffect(() => {
        document.querySelector('html').style.scrollBehavior = 'auto'
        window.scroll({ top: 0 })
        document.querySelector('html').style.scrollBehavior = ''
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
              </div>

            </div>
        </>
    )
}

export default Home;