import * as React from 'react';
import { FaMoneyBillAlt, FaListOl, FaRegCircle, FaRegCheckCircle, FaSearch, FaSave, FaTimes   } from "react-icons/fa";
import CollentionForm from '../../components/CollentionForm';

const clients = [
    {
        nombre: 'Carlos vasquez',
        dni: '123456789',
        telefono: '1234567890',
        direccion: 'Calle 123, 456, Ciudad',
        monto: 500,
        fecha: '09/10/2024',
        pagado: false
    },
    {
        nombre: 'Jhosely Sanches',
        dni: '123456789',
        telefono: '1234567890',
        direccion: 'Calle 123, 456, Ciudad',
        monto: 500,
        fecha: '09/10/2024',
        pagado: true
    },
]

const formData = {
    id: 0,
    numberDocument: '',
    fullName: '',
    payDate: '',
    amount: 0,
};

function Client() {
    const [isPago, setIsPago] = React.useState(false);
    // Maneja el envío de datos del primer formulario
    const handleForm1Submit = (formData) => {
        console.log("Datos del primer formulario:", formData);
    };

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
                                        <th className="py-2 px-4">Monto</th>
                                        <th className="py-2 px-4">Fecha</th>
                                        <th className="py-2 px-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients?.map((client, index) => (
                                        <tr key={index} className="text-center border-b border-teal-700 pt-2 pb-2">
                                            <td className="pt-4 pb-4">{ client.nombre }</td>
                                            <td>{ client.dni }</td>
                                            <td>{ client.telefono }</td>
                                            <td>{ client.direccion }</td>
                                            <td>{ client.monto }</td>
                                            <td>{ client.fecha }</td>
                                            <td>
                                                <button className="bg-teal-600 hover:bg-teal-800 text-white py-1 px-2 mr-1" title="Cobrar" onClick={() => setIsPago(true)}>
                                                    <FaMoneyBillAlt  />
                                                </button>
                                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 mr-1" title="Ver Pagos">
                                                    <FaListOl />
                                                </button>
                                                <button className="border border-teal-600 text-teal-600 dark:text-white font-bold py-1 px-2 mr-1" title="Estado de Pago">
                                                    {client.pagado === true ? <FaRegCheckCircle /> : <FaRegCircle />}
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
                                    <p><strong>Nombre: </strong> {client.nombre}</p>
                                    <p><strong>Dni: </strong> {client.dni}</p>
                                    <p><strong>Telefono: </strong> {client.telefono}</p>
                                    <p><strong>Dirección: </strong> {client.direccion}</p>
                                    <p><strong>Monto: </strong> {client.monto}</p>
                                    <div className="mt-2 flex space-x-2">
                                        <button className="bg-teal-600 hover:bg-teal-800 text-white py-1 px-2 rounded" title="Cobrar">
                                            <FaMoneyBillAlt  />
                                        </button>
                                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" title="Ver Pagos">
                                            <FaListOl />
                                        </button>
                                        <button className="border border-teal-600 text-teal-600 dark:text-white font-bold py-1 px-2 rounded" title="Estado de Pago">
                                            {client.pagado === true ? <FaRegCheckCircle /> : <FaRegCircle />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
            
            
            {
                isPago && (
                    <CollentionForm titleForm={"Registrar"} onSubmit={handleForm1Submit} formDataParams={formData} onClick={() => setIsPago(false)} />
                )
            }
            
        </>
        
    );
}

export default Client;