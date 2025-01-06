import * as React from "react";
import {
    BanknotesIcon,
    UsersIcon,
    ChartBarIcon,
    ClockIcon,
  } from "@heroicons/react/24/solid";
import StatisticsCard from "../../components/widgets/cards/StatisticsCard";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
//import moment from 'moment';
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { authProvider } from "../../auth";

/*const datos = {
    montoCobro: 0,
    montoCredito: 0,
    TotalCredito: 0,
    cantidadCliente: 0,
    clientsFinished: [
        {id: 1, fullName: "Carlos Vasquez", amounCredit: 1200, amountPayment: 260, finishedDate: "03/01/2025", avance: 20}
    ]
}*/
function Dashboard() {
    const dateFormat = 'DD/MM/YYYY';
    const date = new Date();
    const [startDate, setStartDate] = React.useState(`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`);
    const [endDate, setEndDate] = React.useState(`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`);
    const [userId, setUserId] = React.useState(0);
    const [datos, setDatos] = React.useState(null);

    React.useEffect(() => {
            //handleCreditList();
        if ('user' in authProvider.token && authProvider.token.user) {
            setUserId(authProvider.token.user.id);
            //setFormData({...initialValues, userId: authProvider.token.user.id});
            //getServices(authProvider.token.user.id);
        }
    }, []);

    function onChangeStart(date, dateString) {
        //setFormData({...formData, endDate: dateString});
        setStartDate(dateString);
        //console.log(fecha);
        console.log(date);
    }

    function onChangeEnd(date, dateString) {
        //setFormData({...formData, endDate: dateString});
        setEndDate(dateString);
        //const fechaArray = endDate.split("/");
        //const fecha = new Date(fechaArray[2]+"-"+fechaArray[1]+"-"+fechaArray[0]);
        console.log(date);
    }

    const handleDashboardIndex = async () => {
        //const response = await axios.get(`${process.env.PUBLIC_URL}/credits/date/${formatoFecha(startDate)}`);
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/dashboard/${userId}`,
            {
              params: {
                fecha_inicio: startDate,
                fecha_fin: endDate,
              },
            }
          );
        setDatos(response.data.data);
        console.log(response.data.data);
    }

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
                                    format={dateFormat} 
                                    defaultValue={dayjs(startDate, dateFormat)}
                                    name='startDate'
                                    inputReadOnly={true}                                    
                                    onChange={onChangeStart}
                                    id="startDateTxt"                                    
                              
                                />
                            </div>
                            <div className="relative">
                                <DatePicker className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    format={dateFormat} 
                                    defaultValue={dayjs(endDate, dateFormat)}
                                    name='endDate'
                                    inputReadOnly={true}                                    
                                    onChange={onChangeEnd}
                                    id="endDateTxt"                                    
                              
                                />
                            </div>
                            
                            <button 
                                className="btn bg-gray-900 text-gray-100 px-2 py-2 rounded-md hover:bg-teal-600 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white flex items-center justify-center"
                                onClick={handleDashboardIndex}
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
                    <StatisticsCard key="amountPay" title="Monto Cobrado" color="teal" value={`S/. ${datos?.resultMontoCobro.total_cobros?datos?.resultMontoCobro.total_cobros:0}`}
                    icon={React.createElement(BanknotesIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                    ></StatisticsCard>

                    <StatisticsCard key="amountCreditNews" title="Créditos Nuevos" color="teal" value={`S/. ${datos?.resultMontoCredito.total_creditos?datos?.resultMontoCredito.total_creditos:0}`}
                    icon={React.createElement(ChartBarIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                    ></StatisticsCard>

                    <StatisticsCard key="totalCredit" title="Total Créditos Activos" color="teal" value={`S/. ${datos?.resultMontoTotalCredito.total_creditos?datos?.resultMontoTotalCredito.total_creditos:0}`}
                        icon={React.createElement(ChartBarIcon, {
                            className: "w-6 h-6 text-white",
                        })}
                    ></StatisticsCard>

                    <StatisticsCard key="cantClient" title="Total Clientes" color="teal" value={`S/. ${datos?.resultCantClient.total_client?datos?.resultCantClient.total_client:0}`}
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
                                    })} <strong>vencimiento</strong> dentro de la fecha de busqueda
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
                                    {
                                        datos?.clientsFinished?.map(cliente=>(
                                            <tr key={cliente.id}>
                                                <td className="py-3 px-5 border-b border-gray-50">{cliente.fullName}</td>
                                                <td className="py-3 px-5 border-b text-right border-gray-50">
                                                    <p className="block antialiased font-sans font-medium text-blue-gray-600">S/. {cliente.amounCredit}</p>
                                                </td>
                                                <td className="py-3 px-5 border-b text-right border-gray-50">
                                                    <p className="block antialiased font-sans font-medium text-blue-gray-600">S/. {cliente.amountPayment}</p>
                                                </td>
                                                <td className="py-3 px-5 border-b text-center border-gray-50">{cliente.finishedDate}</td>
                                                <td className="py-3 px-5 border-b border-gray-50">
                                                    <div className="w-10/12">
                                                        <p className="antialiased font-sans mb-1 block font-medium text-blue-gray-600">{cliente.avance}%</p>
                                                        <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full font-sans rounded-full text-xs font-medium h-1">
                                                            <div className="flex justify-center items-center h-full overflow-hidden break-all rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" style={{ width: `${cliente.avance}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    
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