import * as React from 'react';
import { FaSearch } from "react-icons/fa";
import TableCollention from "../../partials/Collention/TableCollention";
import CollentionForm from '../../components/CollentionForm';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import axios from 'axios';
import {formatoFecha, formatoFecha2} from '../../utils/FormDate';
import Swal from 'sweetalert2';
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

function Collention() {
    const [isEdit, setIsEdit] = React.useState(false);
    const [collentions, setCollentions] = React.useState([]);
    const [formData, setFormData] = React.useState(initialValues);
    const [userId, setUserId] = React.useState(0);

    const dateFormat = 'DD/MM/YYYY';
    const date = new Date();
    const [startDate, setStartDate] = React.useState(`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`);

    React.useEffect(() => {
        if ('user' in authProvider.token && authProvider.token.user) {
            console.log(authProvider.token.user.id);
            setUserId(authProvider.token.user.id);
            //setFormData({...initialValues, userId: authProvider.token.user.id});
            //handleServicesList(authProvider.token.user.id);
            handlePayList(authProvider.token.user.id);
        }
    }, []);

    function onChange(date, dateString) {
        console.log(date);
        setStartDate(dateString);
    }

    const handleForm1Submit = async (formData) => {
        const response = await axios.put(`${process.env.PUBLIC_URL}/fees/update/${formData.id}`, formData);

        if (response.data.ok){
            setFormData({...initialValues});
            setIsEdit(false);
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                html: `<p>Se <strong>${isEdit?'Actualizó':'Registro'}</strong> correctamente los datos</p>`,
                timer: 3000,
                position: 'center'
            });

            handlePayList(userId);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!", 
                text: `No se pudo completar con ${isEdit?'la actualización':'el registro'}`, 
                timer: 3000
            });
        }
    };

    const handlePayList = async (user_id) => {
        console.log(`User ${user_id}`);
        const response = await axios.get(`${process.env.PUBLIC_URL}/fees/${user_id}?payDate=${formatoFecha(startDate)}`);
        setCollentions(response.data.data);
    };

    const handlePaySelect = (collention) => {
        setIsEdit(true);
        setFormData({...initialValues, id: collention.id, userId: collention.userId,
            creditId: collention.creditId,
            numberDocument: collention.credit.client.numberDocument,
            fullName: collention.credit.client.fullName,
            payDate: formatoFecha2(collention.payDate),
            totalpago: collention.credit.totalPago,
            totalAmount: collention.credit.totalAmount,
            restantAmount: Number(collention.credit.totalAmount) - Number(collention.credit.totalPago), 
            amount: collention.amount });
    };

    const handleDelete = async (pay) => {
        const result = await Swal.fire({
            title: 'Desea Eliminar?',
            text: `Se eliminará el pago del cliente ${pay.credit.client.fullName}`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2',
              denyButton: 'order-3',
            },
          });

          if (result.isConfirmed) {
            try {
              const response = await axios.delete(`${process.env.PUBLIC_URL}/fees/destroy/${pay.id}`);
              if (response.data.ok) {
                setCollentions((prevCollentions) => prevCollentions.filter((item) => item.id !== pay.id));
                Swal.fire('Eliminado!', `El pago ha sido eliminado.`, 'success');
              } else {
                Swal.fire('Error', 'No se pudo eliminar el pago.', 'error');
              }
            } catch (error) {
              Swal.fire('Error', 'Ocurrió un error al intentar eliminar el pago.', 'error');
              console.error(error);
            }
          }
    }

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
                                onClick={() => {handlePayList(userId)}}
                            >
                                <FaSearch className="m-3" />
                            </button>                
                        </div>
    
                        </div>
                    {/* Card (Users) */}
                    <TableCollention data={collentions} onClick={() => setIsEdit(true)} onPayClick={handlePaySelect} onDeleteClick={handleDelete} />
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