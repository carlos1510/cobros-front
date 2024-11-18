//import './main.js'

import * as React from 'react';
import { Outlet, redirect, useLoaderData, useLocation } from 'react-router-dom';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';

import '../../css/style.css';
import { authProvider } from '../../auth';

export function loader({ request}) {
  if(!authProvider.isAuthenticated){
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  console.log("auth provider", authProvider);
  console.log("fecha actual", new Date());
  console.log("token expired", authProvider.token.exp);
  console.log("token expired time", new Date(authProvider.token.exp).getTime());

  const tokenExpiration = new Date(authProvider.token.exp).getTime() - new Date().getTime();

  console.log("tiempo actual", new Date().getTime())
  console.log(tokenExpiration);

  if(tokenExpiration < 1){
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  let name: string = "";
  let rol: string = "";

  if ('user' in authProvider.token && authProvider.token.user) {
    const namefull = authProvider.token.user.fullName;
    name = namefull ? namefull.split(" ")[0] : "";
    rol = authProvider.token.user.role;
  } else {
    // Handle cases where `authProvider.token` does not have `user`
    console.error("Token does not have user data.");
  }

  //const username: string = authProvider.token.user.userName;
  //const namefull = authProvider.token.user.fullName;
  //const name = namefull ? namefull.split(" ")[0]:"";
  //const rol: string = authProvider.token.user.role;

  //return {username, namefull, name, rol};
  return { name, rol};
}

interface LoaderData {
  name: string;
  rol: string;
}

function Home(){
  //const { username, namefull, name, rol } = useLoaderData();
  const { name, rol} = useLoaderData() as LoaderData;
  //const { name, rol } = data;

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