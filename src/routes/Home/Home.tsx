//import './main.js'

import * as React from 'react';
import { Outlet, redirect, useLoaderData, useLocation } from 'react-router-dom';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';

import '../../css/style.css';
import { authProvider } from '../../auth';

export function loader({ request}) {
  if(!authProvider.isAuthenticated){
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  const tokenExpiration = new Date(authProvider.token.exp).getTime() - new Date().getTime();

  console.log(tokenExpiration);

  if(tokenExpiration < 1){
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  const username: string = authProvider.token.user.userName;
  const namefull = authProvider.token.user.fullName;
  const name = namefull ? namefull.split(" ")[0]:"";
  const rol: string = authProvider.token.user.role;

  return {username, namefull, name, rol};
}

function Home(){
  const { username, namefull, name, rol } = useLoaderData();

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
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} name={name} rol={rol} />

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