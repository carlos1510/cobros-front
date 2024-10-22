import * as React from 'react';
import { FaSave, FaSearch, FaTimes } from "react-icons/fa";
import TableCollention from "../../partials/Collention/TableCollention";
import CollentionForm from '../../components/CollentionForm';
interface Collention {
    id: string;
    name: string;
    username: string;
    role: string;
}

const collentions = [
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
    payDate: '',
    amount: 0,
};

function Collention() {
    const [isEdit, setIsEdit] = React.useState(false);
    const handleForm1Submit = (formData) => {
        console.log("Datos del primer formulario:", formData);
    };
    return (
        <>
            {
                !isEdit && (
                <div className="p-4">
                
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
    
                        {/* Left: Title */}
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-2xl md:text-3xl text-teal-600 dark:text-gray-100 font-bold">Cobros</h1>
                        </div>
    
                        {/* Right: Actions */}
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                        {/* Datepicker built with flatpickr */}
                        <div className="relative">
                            <input type="text" className="form-input pl-9 dark:bg-gray-800 text-gray-600 rounded-md hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 font-medium w-[15.5rem]" />
                            <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                                <svg className="fill-current text-gray-400 dark:text-gray-500 ml-3" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                                <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                                </svg>
                            </div>
                            </div>
                        {/* Add view button */}
                        <button className="btn bg-gray-900 w-10 text-center text-gray-100 hover:bg-gray-800 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                            <FaSearch className="m-3" />
                        </button>                
                        </div>
    
                        </div>
                    {/* Card (Users) */}
                    <TableCollention data={collentions} onClick={() => setIsEdit(true)} />
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