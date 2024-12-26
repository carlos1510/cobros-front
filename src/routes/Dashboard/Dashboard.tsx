import * as React from "react";
import {
    BanknotesIcon,
    UsersIcon,
    ChartBarIcon,
    ClockIcon,
  } from "@heroicons/react/24/solid";
import StatisticsCard from "../../components/widgets/cards/StatisticsCard";
import { DatePicker } from "antd";
import { FaSearch } from "react-icons/fa";

function Dashboard() {
    return (
        <>
            <div className="p-4">
                <div className="sm:flex sm:justify-between sm:items-center mb-6">

                    {/* Left: Title */}
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl md:text-3xl text-teal-700 dark:text-gray-100 font-bold">Dashboard</h1>
                    </div>

                </div>
                <div className="mb-2 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                            <div className="relative">
                                <DatePicker className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    
                                    name='credit2Date'
                                    inputReadOnly={true}                                    
                              
                                />
                            </div>
                            <div className="relative">
                                <DatePicker className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    
                                    name='creditDate'
                                    inputReadOnly={true}                                    
                              
                                />
                            </div>
                            
                            <button 
                                className="btn bg-gray-900 text-gray-100 px-2 py-2 rounded-md hover:bg-teal-600 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white flex items-center justify-center"
                            >
                                <span className="flex items-center">
                                    <FaSearch className="pr-1" /> 
                                    Buscar
                                </span>
                            </button>               
                        </div>
            </div>
            <div className="mt-6">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                    <StatisticsCard key="hola" title="Monto Cobrado" color="teal" value="$200"
                    icon={React.createElement(BanknotesIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                    ></StatisticsCard>

                    <StatisticsCard key="hola" title="Créditos Nuevos" color="teal" value="50"
                    icon={React.createElement(ChartBarIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                    ></StatisticsCard>

                    <StatisticsCard key="hola" title="Total Créditos Activos" color="teal" value="50"
                        icon={React.createElement(ChartBarIcon, {
                            className: "w-6 h-6 text-white",
                        })}
                    ></StatisticsCard>

                    <StatisticsCard key="hola" title="Total Clientes" color="teal" value="50"
                    icon={React.createElement(UsersIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                    ></StatisticsCard>
                </div>
                <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-3 border border-blue-gray-100 shadow-sm">
                        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                            <div>
                                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                                    Próximos a vencer
                                </h6>
                                <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                    {React.createElement(ClockIcon, {
                                        className: "w-4 h-4 text-gray-300",
                                    })} <strong>30 done</strong> this month
                                </p>
                            </div>
                        </div>
                        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                            Cliente
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                            Monto Prestado
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                            Monto Pagado
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                            Fecha de Vencimiento
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                            Avance %
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-3 px-5 border-b border-gray-50">Material XD Version</td>
                                        <td className="py-3 px-5 border-b border-gray-50">
                                            <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">$14,000</p>
                                        </td>
                                        <td className="py-3 px-5 border-b border-gray-50">
                                            <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">$14,000</p>
                                        </td>
                                        <td className="py-3 px-5 border-b border-gray-50">20/12/2024</td>
                                        <td className="py-3 px-5 border-b border-gray-50">
                                            <div className="w-10/12">
                                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">60%</p>
                                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full font-sans rounded-full text-xs font-medium h-1">
                                                    <div className="flex justify-center items-center h-full overflow-hidden break-all rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" style={{ width: "60%" }}></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;