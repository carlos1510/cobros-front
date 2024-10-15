import { FaPlus } from "react-icons/fa";
import TableUser from "../../partials/Users/TableUser";

const users = [
    {
      id: '0',
      name: 'Alex Shatov',
      username: 'alexshatov@gmail.com',
      role: '🇺🇸',
    },
    {
      id: '1',
      name: 'Philip Harbach',
      username: 'philip.h@gmail.com',
      role: '🇩🇪',
    },
    {
      id: '2',
      name: 'Mirko Fisuk',
      username: 'mirkofisuk@gmail.com',
      role: '🇫🇷',
    },
    {
      id: '3',
      name: 'Olga Semklo',
      username: 'olga.s@cool.design',
      role: '🇮🇹',
    },
    {
      id: '4',
      name: 'Burak Long',
      username: 'longburak@gmail.com',
      role: '🇬🇧',
    },
  ];

function User() {
    return (
        <>
            <div className="p-4">
                <div className="sm:flex sm:justify-between sm:items-center mb-8">

                    {/* Left: Title */}
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl md:text-3xl text-teal-700 dark:text-gray-100 font-bold">Usuarios</h1>
                    </div>

                    {/* Right: Actions */}
                    <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-8">
                    
                        {/* Add view button */}
                        <button className="btn bg-gray-900  text-gray-100 px-2 py-2 rounded-md hover:bg-teal-600 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                            <span className="max-xs:sr-only flex items-center"> <FaPlus className="pr-1"/> Agregar</span>
                        </button>                
                    </div>
                </div>
                {/* Card (Users) */}
                <TableUser data={users} />
            </div>

            <div className="p-4">
                <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                    <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Usuario</h2>
                    </header>  
                    <div className="p-3">
                        <form className="w-full min-w-full">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        Numero de Documento
                                    </label>
                                    <input className="appearance-none block w-full border border-red-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Jane" />
                                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <div className="w-full md:w-2/3 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        Nombre Completo
                                    </label>
                                    <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Telefono
                                </label>
                                <input className="appearance-none block w-full text-gray-700 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number"  />
                                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        Rol
                                    </label>
                                    <select name="" id="" className="w-full">
                                        <option value="">Seleccione un rol</option>
                                        <option value="Admin">Administrador</option>
                                        <option value="Cliente">Cliente</option>
                                        <option value="Gerente">Gerente</option>
                                    </select>
                                </div>
                                <div className="w-full md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        Usuario
                                    </label>
                                    <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                                </div>
                                <div className="w-full md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        Contraseña
                                    </label>
                                    <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" placeholder="****************" />
                                </div>
                            </div>

                            <div className="md:flex md:items-center">
                                <div className="md:w-1/3"></div>
                                <div className="md:w-2/3">
                                    <button className="shadow bg-gray-800 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                        Sign Up
                                    </button>

                                    <button className="shadow ml-4 bg-red-500 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                        Sign Up
                                    </button>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;