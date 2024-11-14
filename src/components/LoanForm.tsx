import * as React from 'react';
import { FaSave, FaSearch, FaTimes } from 'react-icons/fa';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import moment from 'moment';
import axios from 'axios';

function LoanForm({ titleForm, onSubmit, formDataParams, onClick }) {
    const dateFormat = 'DD/MM/YYYY';
    const date = new Date();
        // Crear la fecha mínima a partir del objeto Date (formato nativo)
    const [startDate, setStartDate] = React.useState(`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`);
    const [formData, setFormData] = React.useState({...formDataParams, creditDate: startDate});
    //setFormData({...formDataParams, creditDate: startDate});

    const disabledDate = (current) => {
        return current && current < moment(startDate,'DD/MM/YYYY').startOf('day');  // Comparar con el startDate como objeto Date
    };

    function onChangeStart(date, dateString) {
        //setDate(date);
        setStartDate(dateString);
        setFormData({...formData, creditDate: dateString});
        console.log(dateString);
    }

    function onChangeEnd(date, dateString) {
        //setDate(date);
        //setStartDate(dateString);
        setFormData({...formData, endDate: dateString});
        console.log(dateString);
    }

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
                clientId: response.data.data.id
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
                    <h1 className="font-semibold text-gray-800 dark:text-gray-100">{titleForm} Credito</h1>
                </header>  
                <div className="p-3">
                    <form className="w-full min-w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numberDocumentoTxt">
                                    Numero de Documento
                                </label>
                                <div className="flex">
                                    <input type="number"  className="appearance-none w-full border-gray-400 rounded-bl-md rounded-tl-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                        placeholder="" 
                                        id="numberDocumentoTxt"
                                        name='numberDocument'
                                        value={formData.numberDocument}
                                        onChange={handleChange}
                                    />
                                    <button type="button" className="bg-gray-900 p-3 rounded-tr-md rounded-br-md text-white font-semibold hover:bg-teal-600 transition-colors" 
                                        onClick={() => getUserByDocument(formData.numberDocument)}    
                                    >
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fullNameTxt">
                                    Nombre Completo
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="fullNameTxt" 
                                    type="text" 
                                    name='fullName' 
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password" id='addressTxt'>
                                    Dirección
                                </label>
                                <input className="appearance-none block w-full text-gray-700 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="addressTxt" 
                                    type="text" 
                                    name='address'
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="referenceTxt">
                                    Referencia: 
                                </label>
                                <input className="appearance-none block w-full border border-gray-700 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="referenceTxt" 
                                    type="text" 
                                    name='reference'
                                    value={formData.reference}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phoneTxt">
                                    Telefono
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="phoneTxt" 
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
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="serviceIdTxt">
                                    Tipo de Servicio
                                </label>
                                <select name="serviceId" id="serviceIdTxt" className="w-full rounded-md py-3" 
                                    value={formData.serviceId}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="2">Prestamo Semanal</option>
                                    <option value="3">Prestamo Diario</option>
                                    <option value="4">Prestamo Mensual</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="creditDateTxt">
                                    Fecha
                                </label>
                                <DatePicker className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    format={dateFormat} 
                                    defaultValue={dayjs(startDate, dateFormat)}
                                    name='creditDate'
                                    inputReadOnly={true}                                    
                                    onChange={onChangeStart}
                                    id="creditDateTxt"
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="amountTxt">
                                    Monto a Prestar
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="amountTxt" 
                                    type="number" 
                                    placeholder="0.00"
                                    name='amount' 
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="interestAmountTxt">
                                    Interés Calculado
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="interestAmountTxt" 
                                    type="number" 
                                    placeholder="0.00"
                                    name='interestAmount' 
                                    value={formData.interestAmount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="totalAmountTxt">
                                    Monto Total
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="totalAmountTxt" 
                                    type="number" 
                                    placeholder="0.00"
                                    name='totalAmount' 
                                    value={formData.totalAmount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endDateTxt">
                                    Fecha Limite
                                </label>
                                <DatePicker className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    format={dateFormat} 
                                    name='endDate'
                                    onChange={onChangeEnd}
                                    disabledDate={disabledDate}
                                    inputReadOnly={true}
                                    id="endDateTxt"
                                />
                                
                            </div>
                        </div>

                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="shadow bg-gray-800 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
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

export default LoanForm;