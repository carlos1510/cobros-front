import * as React from 'react';
import { FaMoneyBillAlt, FaListOl, FaRegCircle, FaRegCheckCircle, FaSearch   } from "react-icons/fa";
import CollentionForm from '../../components/CollentionForm';

import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from '../../components/common/Modal';
import { authProvider } from '../../auth';

const initialValues = {
    id: 0,
    userId: 0,
    creditId: 0,
    numberDocument: '',
    fullName: '',
    payDate: '',
    totalpago: 0,
    totalAmount: 0,
    restantAmount: 0, 
    amount: 0,
};

function Client() {
    const [isPago, setIsPago] = React.useState(false);
    const [clients, setClients] = React.useState([]);
    const [selectedClient, setSelectedClient] = React.useState(null);
    const [formData, setFormData] = React.useState(initialValues);
    const [isOpen, setIsOpen] = React.useState(false);
    const [client, setClient] = React.useState(null);
    const [userId, setUserId] = React.useState(0);
    const [payments, setPayments] = React.useState([]);

    React.useEffect(() => {
        handleClientsList();
        if ('user' in authProvider.token && authProvider.token.user) {
            setUserId(authProvider.token.user.id);
            setFormData({...initialValues, userId: authProvider.token.user.id});
        }
    }, []);

    // Maneja el envío de datos del primer formulario
    const handleForm1Submit = async (formData) => {
        try {
            const response = await axios.post(`${process.env.PUBLIC_URL}/fees/save`, formData);
            
            if (response.data.ok){
                //setFormData(initialValues);
                setFormData({...initialValues, userId: userId});
                setIsPago(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    html: `<p>Se <strong>Registro</strong> correctamente los daots</p>`,
                    timer: 3000,
                    position: 'center'
                });
                handleClientsList();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!", 
                    text: "No se pudo completar con el registro", 
                    timer: 3000
                });
            }
        } catch (error){
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error!", 
                text: "No se pudo completar con el registro", 
                timer: 3000
            });
        }
    };

    const handleClientsList = async () => {
        const response = await axios.get(`${process.env.PUBLIC_URL}/credits/creditsPay`);
        setClients(response.data.data);
    }

    const handleClientSelect = (client) => {
        setSelectedClient({...formData, creditId: client.id, numberDocument: client.numberDocument, fullName: client.fullName, 
            totalAmount: client.totalAmount, totalpago: client.totalpago, restantAmount: (client.totalAmount - client.totalpago)});
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSelectClientByPayment = async (client) => {
        setClient(client);
        const response = await axios.get(`${process.env.PUBLIC_URL}/fees/${client.id}/findPayments`);
        setPayments(response.data.data);
        console.log(client);
    }


    return (
        <>
        
            {
                !isPago && (
                    <div className="p-4">
                        <div className="flex flex-col md:flex-row md:justify-between mb-4">
                            {/* Titulo */}
                            <h2 className="text-3xl text-teal-600 font-bold mb-2 md:mb-0">Lista de clientes</h2>
                            
                            {/* Buscador */}
                            <div className="w-full md:w-1/3 relative">
                                {/*  className="w-full md:w-1/3 p-2 border border-gray-400 rounded-lg bg-transparent focus:border-teal-700 focus:outline-none" */}
                                <input 
                                    type="text" 
                                    placeholder="Escribe para buscar"
                                    className="border border-gray-400 w-full rounded-lg p-2 bg-transparent"
                                />
                                <FaSearch className="absolute top-[30%] right-3" />
                            </div>
                        </div>
                        {/* Para pantallas grandes */}
                        <div className="hidden md:block">
                            <table className="min-w-full bg-teal-50 dark:bg-gray-800 boder rounded-lg">
                                <thead>
                                    <tr className=" text-teal-600">
                                        <th className="py-2 px-4">Nombre Cliente</th>
                                        <th className="py-2 px-4">Dni</th>
                                        <th className="py-2 px-4">Telefono</th>
                                        <th className="py-2 px-4">Dirección</th>
                                        <th className="py-2 px-4">Monto Total</th>
                                        <th className="py-2 px-4">Monto Pagado</th>
                                        <th className="py-2 px-4">Monto Restante</th>
                                        <th className="py-2 px-4">Fecha</th>
                                        <th className="py-2 px-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients?.map((client, index) => (
                                        <tr key={index} className="text-center border-b border-teal-700 pt-2 pb-2">
                                            <td className="pt-4 pb-4">{ client.fullName }</td>
                                            <td>{ client.numberDocument }</td>
                                            <td>{ client.phone }</td>
                                            <td>{ client.address }</td>
                                            <td>{ client.totalAmount }</td>
                                            <td>{ client.totalpago }</td>
                                            <td>{ client.totalAmount - client.totalpago }</td>
                                            <td>{ client.payDateMax }</td>
                                            <td>
                                                <button className="bg-teal-600 hover:bg-teal-800 text-white py-1 px-2 mr-1" title="Cobrar" onClick={() => { setIsPago(true); handleClientSelect(client) }}>
                                                    <FaMoneyBillAlt  />
                                                </button>
                                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 mr-1" 
                                                    title="Ver Pagos"
                                                    onClick={() => {handleOpenModal(); handleSelectClientByPayment(client)}} >
                                                    <FaListOl />
                                                </button>
                                                <button className="border border-teal-600 text-teal-600 dark:text-white font-bold py-1 px-2 mr-1" title="Estado de Pago">
                                                    {client.ispago === 'SI' ? <FaRegCheckCircle /> : <FaRegCircle />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Para pantallas móviles */}
                        <div className="md:hidden">
                            {clients?.map((client, index) => (
                                <div key={index} className="bg-teal-50 dark:bg-gray-800 p-4 mb-4 border rounded-lg shadow">
                                    <p><strong>Nombre: </strong> {client.fullName}</p>
                                    <p><strong>Dni: </strong> {client.numberDocument}</p>
                                    <p><strong>Telefono: </strong> {client.phone}</p>
                                    <p><strong>Dirección: </strong> {client.address}</p>
                                    <p><strong>Fecha: </strong> {client.payDateMax}</p>
                                    <p><strong>Monto Total: </strong> S/. {client.totalAmount}</p>
                                    <p><strong>Monto Pagado: </strong> S/. {client.totalpago}</p>
                                    <p><strong>Restante: </strong> S/. {client.totalAmount - client.totalpago}</p>
                                    <div className="mt-2 flex space-x-2">
                                        <button className="bg-teal-600 hover:bg-teal-800 text-white py-1 px-2 rounded" title="Cobrar" onClick={() => { setIsPago(true); handleClientSelect(client) }}>
                                            <FaMoneyBillAlt  />
                                        </button>
                                        <button type='button' className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" title="Ver Pagos" 
                                            onClick={() => {handleOpenModal(); handleSelectClientByPayment(client)}}
                                        >
                                            <FaListOl />
                                        </button>
                                        <button className="border border-teal-600 text-teal-600 dark:text-white font-bold py-1 px-2 rounded" title="Estado de Pago">
                                            { client.ispago === 'SI' ? <FaRegCheckCircle /> : <FaRegCircle /> }
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Modal isOpen={isOpen} onClose={handleCloseModal} title={`${client?.fullName} - Pagos`}>
                            <div className="mb-4">
                                <div className='flex flex-col md:flex-row md:justify-between mb-4'>
                                    <h4 className='mb-2 md:mb-0'>Fecha Crédito: {client?.creditDate }</h4>
                                    <h4 className='mb-2 md:mb-0'>Monto Prestado: <span className='text-xl font-bold'>S/. {client?.totalAmount }</span></h4>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full border-collapse border border-gray-400">
                                    <thead className="text-xs font-semibold uppercase text-white bg-teal-600 dark:bg-gray-700 dark:bg-opacity-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">#</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Fecha de Pago</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Monto Pagado</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Restante</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                                        {
                                            payments?.map((pay, index) => (
                                                <tr key={index}>
                                                    <td className="p-2 whitespace-nowrap">{index + 1}</td>
                                                    <td className="p-2 whitespace-nowrap">{pay.payDate}</td>
                                                    <td className="p-2 whitespace-nowrap">{pay.amount}</td>
                                                    <td className="p-2 whitespace-nowrap">{pay.remainingAmount}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    <tfoot className="text-sm font-semibold text-gray-700 bg-gray-200 dark:bg-gray-800 dark:text-gray-300">
                                        <tr>
                                            <td className="p-2 whitespace-nowrap" colSpan={2}>Totales</td>
                                            <td className="p-2 whitespace-nowrap">
                                                {
                                                    payments?.reduce((total, pay) => total + pay.amount, 0).toFixed(2)
                                                }
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                {/* {
                                                    payments?.reduce((total, pay) => total + pay.remainingAmount, 0).toFixed(2)
                                                } */}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </Modal>
                    </div>
                )
            }
            
            
            {
                isPago && (
                    <CollentionForm titleForm={"Registrar"} onSubmit={handleForm1Submit} formDataParams={selectedClient} onClick={() => setIsPago(false)} />
                )
            }
            
        </>
        
    );
}

export default Client;