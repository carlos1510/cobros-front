
import { FaLock, FaUser } from 'react-icons/fa'
import './App.css'

function App() {

  return (
    <>
      <div className="h-[100vh] flex flex-col items-center  bg-background bg-cover justify-center text-white">
        <div className="h-[300px] w-80 bg-blue-600/20 boder border-blue-600/20 backdrop-blur-lg rounded-lg px-6 my-4">
          <div className="">
            <h2 className="text-3xl font-Lobster pb-6 text-center">Login</h2>
            <form className='flex flex-col items-center' action="">
              <div className="w-full relative">
                <input type="text" className='border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent' placeholder="Usuario" />
                <FaUser className="absolute top-[40%] right-3" />
              </div>
              <div className="w-full relative">
                <input type="text" className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Password" />
                <FaLock className="absolute top-[40%] right-3" />
              </div>
              <button type="submit" className="my-2 py-2 w-full rounded-full bg-blue-600">Iniciar</button>
              <span>Copyright © 2024 - Carlos Vásquez</span>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
