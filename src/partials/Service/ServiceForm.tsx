import * as React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

function ServiceForm({titleForm, onSubmit, formDataParams, onClick}) {
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
                    <h2 className="text-2xl md:text-3xl text-teal-700 dark:text-gray-100 font-bold">{titleForm} Servicio</h2>
                </header>  
                <div className="p-3">
                    <form className="w-full min-w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-gray-100" htmlFor="serviceName_id">
                                    Nombre del Servicio
                                </label>
                                <input type="text"  
                                        className="appearance-none w-full border-gray-400 rounded-bl-md rounded-tl-md py-3 px-4 leading-tight 
                                        focus:outline-none focus:bg-white focus:border-gray-500 dark:text-gray-800" 
                                        placeholder="" id="serviceName_id" 
                                        name='serviceName'
                                        value={formData.serviceName}
                                        onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-gray-100" htmlFor="period_id">
                                    Periodo
                                </label>
                                <select className="w-full rounded-md dark:text-gray-800" 
                                    name='period'
                                    value={formData.period}
                                    onChange={handleChange}
                                    id='period_id'
                                >
                                    <option value="">Seleccione</option>
                                    <option value="DIAS">DIAS</option>
                                    <option value="SEMANAS">SEMANAS</option>
                                    <option value="MES">MES</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-gray-100" htmlFor="numberPeriod_id">
                                    Numero del Periodo
                                </label>
                                <input type="number"  
                                        className="appearance-none w-full border-gray-400 rounded-bl-md rounded-tl-md py-3 px-4 leading-tight 
                                        focus:outline-none focus:bg-white focus:border-gray-500 dark:text-gray-800" 
                                        placeholder="" id="numberPeriod_id" 
                                        name='numberPeriod'
                                        value={formData.numberPeriod}
                                        onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-gray-100" htmlFor="porcentage_id">
                                    Porcentaje
                                </label>
                                <input type="number"  
                                        className="appearance-none w-full border-gray-400 rounded-bl-md rounded-tl-md py-3 px-4 leading-tight 
                                        focus:outline-none focus:bg-white focus:border-gray-500 dark:text-gray-800" 
                                        placeholder="" id="porcentage_id" 
                                        name='porcentage'
                                        value={formData.porcentage}
                                        onChange={handleChange}
                                />
                            </div>
                        </div>
                        

                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="shadow bg-gray-800 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded dark:bg-teal-600 dark:hover:bg-teal-400" type="submit">
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

export default ServiceForm;