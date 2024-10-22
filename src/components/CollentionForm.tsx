import * as React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

function CollentionForm({ titleForm, onSubmit, formDataParams, onClick }) {
    console.log("datos",formDataParams);
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
    return (
        <div className="p-4">
            <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-100">{titleForm} Cobro</h2>
                </header>  
                <div className="p-3">
                    <form className="w-full min-w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Numero de Documento
                                </label>
                                <input className="appearance-none block w-full border border-red-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-first-name" 
                                    type="text" 
                                    placeholder="12345678" 
                                    name="numberDocument"
                                    value={formData.numberDocument}
                                    onChange={handleChange}
                                />
                                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                            </div>
                            <div className="w-full md:w-2/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Nombre Completo
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-last-name" 
                                    type="text" 
                                    placeholder="Nombre completo" 
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Fecha de Pago
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-last-name" 
                                    type="text" 
                                    placeholder="dd/mm/yyyy" 
                                    name="payDate"
                                    value={formData.payDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Monto a Pagar
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-last-name" 
                                    type="text" 
                                    placeholder="0.00" 
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="shadow bg-gray-800 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" >
                                    <span className="max-xs:sr-only flex items-center"> <FaSave className="pr-1"/> Guardar</span>
                                </button>

                                <button className="shadow ml-4 bg-red-500 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={onClick}>
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

export default CollentionForm;