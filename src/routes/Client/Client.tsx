
import { FaMoneyBillAlt, FaListOl, FaRegCircle, FaRegCheckCircle   } from "react-icons/fa";

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

function Client() {
    return (
        <div className="p-4">
            <h2 className="pb-4 text-3xl text-teal-600 font-bold">Lista de clientes</h2>
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
                                    <button className="bg-teal-600 hover:bg-teal-800 text-white py-1 px-2 mr-1" title="Cobrar">
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
    );
}

export default Client;