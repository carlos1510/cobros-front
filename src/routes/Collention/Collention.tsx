import * as React from 'react';
import { FaSearch } from "react-icons/fa";
import TableCollention from "../../partials/Collention/TableCollention";
import CollentionForm from '../../components/CollentionForm';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import axios from 'axios';
import {formatoFecha} from '../../utils/FormDate';
interface Collention {
    id: string;
    name: string;
    username: string;
    role: string;
}

const formData = {
    id: 0,
    numberDocument: '',
    fullName: '',
    payDate: '',
    amount: 0,
};

function Collention() {
    const [isEdit, setIsEdit] = React.useState(false);
    const [collentions, setCollentions] = React.useState([]);
    const [selectedPay, setSelectedPay] = React.useState(null);
    console.log(selectedPay);

    const dateFormat = 'DD/MM/YYYY';
    const date = new Date();
        // Crear la fecha mínima a partir del objeto Date (formato nativo)
    const [startDate, setStartDate] = React.useState(`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`);

    React.useEffect(() => {
        handlePayList();
    }, []);

    function onChange(date, dateString) {
        //setDate(date);
        console.log(date);
        setStartDate(dateString);
        //console.log(dateString);
    }

    const handleForm1Submit = (formData) => {
        console.log("Datos del primer formulario:", formData);
    };

    const handlePayList = async () => {
        const response = await axios.get(`${process.env.PUBLIC_URL}/fees/${formatoFecha(startDate)}`);
        setCollentions(response.data.data);
    };

    const handlePaySelect = (user) => {
        setSelectedPay(user);
        //setIsEdit(true);
    };
    return (
        <>
            {
                !isEdit && (
                <div className="p-4">
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
    
                        {/* Left: Title */}
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-2xl md:text-3xl text-teal-700 dark:text-gray-100 font-bold">Cobros</h1>
                        </div>
    
                        {/* Right: Actions */}
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                        {/* Datepicker built with flatpickr */}
                            <div className="relative">
                           
                                <DatePicker className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    format={dateFormat} 
                                    defaultValue={dayjs(startDate, dateFormat)}
                                    name='creditDate'
                                    inputReadOnly={true}                                    
                                    onChange={onChange}
                                />
                            </div>
                            {/* Add view button */}
                            <button className="btn bg-gray-900 w-10 text-center text-gray-100 hover:bg-gray-800 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                                onClick={handlePayList}
                            >
                                <FaSearch className="m-3" />
                            </button>                
                        </div>
    
                        </div>
                    {/* Card (Users) */}
                    <TableCollention data={collentions} onClick={() => setIsEdit(true)} onPayClick={handlePaySelect} />
                </div>)
            }

            {
                // Edit form
                isEdit && (
                    <CollentionForm titleForm={"Editar"} onSubmit={handleForm1Submit} formDataParams={formData} onClick={() => setIsEdit(false)} />
                )
            }
            
        </>
    );
}

export default Collention;