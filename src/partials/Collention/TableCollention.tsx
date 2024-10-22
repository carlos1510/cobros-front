import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

interface Collention {
    id: number;
    name: string;
    username: string;
    role: string;
}

interface TableCollentionProps {
    data: Collention[];
}

function TableCollention({ data, onClick }: TableCollentionProps) {
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
                                    <div className="font-semibold text-left">Nombres</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Usuario</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Rol</div>
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
                                data?.map((collention) => {
                                    return (
                                        <tr key={collention.id}>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {collention.id}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {collention.name}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {collention.username}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {collention.role}
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                <button className="bg-teal-600 hover:bg-teal-800 text-white py-2 px-3 mr-1" title="Editar" onClick={onClick}> 
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

export default TableCollention;