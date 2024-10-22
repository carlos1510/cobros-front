import * as React from 'react';
import { FaPlus, FaSave, FaTimes } from "react-icons/fa";
import TableLoan from "../../partials/Loans/TableLoan";
import LoanForm from '../../components/LoanForm';

interface User {
    id: string;
    name: string;
    username: string;
    role: string;
}

const loans = [
    {
      id: '0',
      name: 'Alex Shatov',
      username: 'alexshatov@gmail.com',
      role: '🇺🇸',
    },
    {
      id: '1',
      name: 'Philip Harbach',
      username: 'philip.h@gmail.com',
      role: '🇩🇪',
    },
    {
      id: '2',
      name: 'Mirko Fisuk',
      username: 'mirkofisuk@gmail.com',
      role: '🇫🇷',
    },
    {
      id: '3',
      name: 'Olga Semklo',
      username: 'olga.s@cool.design',
      role: '🇮🇹',
    },
    {
      id: '4',
      name: 'Burak Long',
      username: 'longburak@gmail.com',
      role: '🇬🇧',
    },
  ];

const formData = {
    id: 0,
    numberDocument: '',
    fullName: '',
    address: '',
    reference: '',
    phone: '',
    creditDate: '',
    amount: 0,
    endDate: '',
    interestAmount: '',
    totalAmount: 0,
    serviceId: 0,
    clientId: 0,
    userId: 0
};

function Loan() {
    const [isRegister, setIsRegister] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);

    // Maneja el envío de datos del primer formulario
    const handleForm1Submit = (formData) => {
        console.log("Datos del primer formulario:", formData);
    };
    return (
        <>
            {
                (!isRegister && !isEdit) && (
                    <div className="p-4">
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">

                            {/* Left: Title */}
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-teal-700 dark:text-gray-100 font-bold">Prestamos</h1>
                            </div>

                            {/* Right: Actions */}
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-8">
                            
                                {/* Add view button */}
                                <button className="btn bg-gray-900  text-gray-100 px-2 py-2 rounded-md hover:bg-teal-600 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" 
                                    onClick={() => setIsRegister(true)}>
                                    <span className="max-xs:sr-only flex items-center"> <FaPlus className="pr-1"/> Nuevo</span>
                                </button>                
                            </div>
                        </div>
                        {/* Card (Users) */}
                        <TableLoan data={loans} onClick={() => setIsEdit(true)} />
                    </div>
                )
            }

            {
                (isRegister && !isEdit) && (
                    <LoanForm titleForm={"Registrar"} onSubmit={handleForm1Submit} formDataParams={formData} onClick={() => setIsRegister(false)} />
                )
            }

            {
                (!isRegister && isEdit) && (
                    <LoanForm titleForm={"Editar"} onSubmit={handleForm1Submit} formDataParams={formData} onClick={() => setIsEdit(false)} />
                )
            }
        </>
    );
}

export default Loan;