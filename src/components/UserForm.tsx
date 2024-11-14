import * as React from 'react';
import { FaSave, FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';

function UserForm({titleForm, onSubmit, formDataParams, onClick}) {
    const [formData, setFormData] = React.useState(formDataParams);
     // Maneja el cambio en los inputs
     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const getUserByDocument = async (nroDocument) => {
        try {
          const response = await axios.get(`${process.env.PUBLIC_URL}/clients/getNumeroDocument/${nroDocument}`);
          if(response.data.ok === true) {
            setFormData({...formData, 
                numberDocument: response.data.data.numberDocument, 
                fullName: response.data.data.fullName,
                phone: response.data.data.phone,
                address: response.data.data.address,
                reference: response.data.data.reference,
                id: response.data.data.id
            });
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="p-4">
            <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-100">{titleForm} Usuario</h2>
                </header>  
                <div className="p-3">
                    <form className="w-full min-w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Numero de Documento
                                </label>
                                <div className="flex">
                                    <input type="text"  
                                        className="appearance-none w-full border-gray-400 rounded-bl-md rounded-tl-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                        placeholder="" id="" 
                                        name='numberDocument'
                                        value={formData.numberDocument}
                                        onChange={handleChange}
                                    />
                                    <button type="button" className="bg-gray-900 p-3 rounded-tr-md rounded-br-md text-white font-semibold hover:bg-teal-600 transition-colors" onClick={() => getUserByDocument(formData.numberDocument)}>
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fullName">
                                    Nombre Completo
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="fullName" 
                                    type="text" 
                                    name='fullName'
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Telefono
                                </label>
                                <input className="appearance-none block w-full text-gray-700 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-password" 
                                    type="number"  
                                    placeholder="999 999 999"
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Rol
                                </label>
                                <select className="w-full rounded-md" 
                                    name='role'
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un rol</option>
                                    <option value="SUPERADMIN">SUPER ADMINISTRADOR</option>
                                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                    <option value="PRESTAMISTA">PRESTAMISTA</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="userName">
                                    Usuario
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="userName" 
                                    type="text" 
                                    name='userName'
                                    value={formData.userName}
                                    onChange={handleChange}    
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="password" 
                                    type="password" 
                                    placeholder="****************" 
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="shadow bg-gray-800 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                    <span className="max-xs:sr-only flex items-center"> <FaSave className="pr-1"/> Guardar</span>
                                </button>

                                <button className="shadow ml-4 bg-red-500 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" 
                                    onClick={onClick}>
                                    <span className="max-xs:sr-only flex items-center"> <FaTimes className="pr-1"/> Cancelar</span>
                                </button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserForm;