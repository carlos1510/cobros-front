import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { formatoFecha2 } from "../../utils/FormDate";

interface Service {
    serviceName: string;
}

interface Client {
    numberDocument: string;
    fullName: string;

}
interface Loan {
    id: number;
    service: Service;
    client: Client;
    creditDate: string;
    endDate: string;
    amount: number;
    totalAmount: number;
}

interface TableLoanProps {
    data: Loan[];
    onClick: () => void; 
}

function TableLoan({ data, onClick }: TableLoanProps) {
    return (
        <div className="col-span-full xl:col-span-6 bg-teal-50 dark:bg-gray-800 shadow-sm rounded-xl">
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-white dark:text-gray-500 bg-teal-600 dark:bg-gray-700 dark:bg-opacity-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">#</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Tipo de Crédito</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Nro. Doc. cliente</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Cliente</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Fecha Credito</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Fecha Fin Credito</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Monto Prestado</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Total</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Editar</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Eliminar</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                            {
                                data?.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {user.id}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {user?.service.serviceName}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {user?.client.numberDocument}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {user?.client.fullName}
                                            </td>
                                            
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {formatoFecha2(user.creditDate)}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {formatoFecha2(user.endDate)}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-right text-gray-600 dark:text-gray-400">
                                                S/. {user.amount}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-right text-gray-600 dark:text-gray-400">
                                                S/. {user.totalAmount}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                <button className="bg-teal-600 hover:bg-teal-800 text-white py-2 px-3 mr-1" title="Cobrar" onClick={onClick}>
                                                    <FaPencilAlt />
                                                </button>
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                <button className="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-3 mr-1" title="Ver Pagos">
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TableLoan;