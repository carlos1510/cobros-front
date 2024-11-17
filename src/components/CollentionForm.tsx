import * as React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

function CollentionForm({ titleForm, onSubmit, formDataParams, onClick }) {
    console.log("datos",formDataParams);
    //const [formData, setFormData] = React.useState(formDataParams);
    const dateFormat = 'DD/MM/YYYY';
    const date = new Date();
        // Crear la fecha mínima a partir del objeto Date (formato nativo)
    const [startDate, setStartDate] = React.useState(`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`);
    const [formData, setFormData] = React.useState({...formDataParams, payDate: startDate});

    function onChange(date, dateString) {
        //setDate(date);
        console.log(date);
        setStartDate(dateString);
        setFormData({...formData, payDate: dateString});
    }
    // Maneja el cambio en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.amount > 0){
            if (formData.amount <= formData.restantAmount){
                onSubmit(formData);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!", 
                    text: "El monto es superior al monto restante, por favor ingrese un monto valido!", 
                    timer: 3000
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!", 
                text: "El monto debe ser mayor a cero", 
                timer: 3000
            });
        }
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
                            <input type="hidden" value={formData.creditId} name='creditId' />
                            <input type="hidden" value={formData.id} name='id' />
                            <input type="hidden" value={formData.userId} name='userId' />
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numberDocumentTxt">
                                    Numero de Documento
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="numberDocumentTxt" 
                                    type="text" 
                                    placeholder="12345678" 
                                    name="numberDocument"
                                    value={formData.numberDocument}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-2/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fullNameTxt">
                                    Nombre Completo
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="fullNameTxt" 
                                    type="text" 
                                    placeholder="Nombre completo" 
                                    name="fullName"
                                    value={formData.fullName}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className='flex flex-wrap -mx-3 mb-6'>
                            <div className='w-full md:w-1/3 px-3'>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="totalAmountTxt">
                                    Monto Total
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="totalAmountTxt" 
                                    type="text" 
                                    placeholder="0.00" 
                                    name="totalAmount"
                                    value={formData.totalAmount}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className='w-full md:w-1/3 px-3'>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="totalPagadoTxt">
                                    Monto Pagado
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="totalPagadoTxt" 
                                    type="text" 
                                    placeholder="0.00" 
                                    name="totalpago"
                                    value={formData.totalpago}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className='w-full md:w-1/3 px-3'>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="restantAmountTxt">
                                    Monto Restante
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="restantAmountTxt" 
                                    type="text" 
                                    placeholder="0.00" 
                                    name="restantAmount"
                                    value={formData.restantAmount}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="payDateTxt">
                                    Fecha de Pago
                                </label>
                                <DatePicker className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    format={dateFormat} 
                                    defaultValue={dayjs(startDate, dateFormat)}
                                    name='payDate'
                                    inputReadOnly={true}                                    
                                    onChange={onChange}
                                    id="payDateTxt"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="amountTxt">
                                    Monto a Pagar
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="amountTxt" 
                                    type="number" 
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
                                <button className="shadow bg-gray-800 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" >
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