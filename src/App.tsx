
import { FaLock, FaUser } from 'react-icons/fa'
import './App.css'

import { Form, redirect, useActionData, useLocation } from 'react-router-dom';
import { authProvider } from './auth';

interface ActionData {
  error?: string;
}

export async function action({ request }: { request: Request}): Promise<Response | ActionData> {
  const formData = await request.formData();
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (!username || !password) { 
    return { error: "Please enter both username and password" };
  }

  try{

    await authProvider.login(username, password);

  } catch(error) {
      return { error: "Error al iniciar sesión " + error};
  }

  //let redirectTo = formData.get("redirectTo");

  return redirect("/home");
}

function App() {
  const actionData = useActionData();
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("from");

  return (
    <>
      <div className="h-[100vh] flex flex-col items-center  bg-background bg-cover justify-center text-white">
        <div className="h-[300px] w-80 bg-blue-600/20 boder border-blue-600/20 backdrop-blur-lg rounded-lg px-6 my-4">
          <div className="">
            <h2 className="text-3xl font-Lobster pb-6 text-center">Login</h2>
            <Form className='flex flex-col items-center' method="POST">
              {redirectTo && (
                                <input type="hidden" name="redirectTo" value={redirectTo} />
                            )}
              <div className="w-full relative">
                <input type="text" 
                  className='border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent' 
                  placeholder="Usuario" 
                  name="username"
                  id="username"
                  required
                />
                <FaUser className="absolute top-[40%] right-3" />
              </div>
              <div className="w-full relative">
                <input type="password" 
                  className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" 
                  placeholder="Password" 
                  id='password' 
                  name='password'
                  required
                />
                <FaLock className="absolute top-[40%] right-3" />
              </div>
              {(actionData as ActionData)?.error && (
                    <p className="text-red-500">{(actionData as ActionData)?.error}</p>
                )}
              <button type="submit" className="my-2 py-2 w-full rounded-full bg-blue-600">Iniciar</button>
              <span>Copyright © 2024 - Carlos Vásquez</span>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
