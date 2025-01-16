import * as React from 'react';
import { FaPlus, FaSearch } from "react-icons/fa";
import TableLoan from "../../partials/Loans/TableLoan";
import LoanForm from '../../components/LoanForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { formatoFecha, formatoFecha2 } from '../../utils/FormDate';
import { authProvider } from '../../auth';

const initialValues = {
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
    const [loans, setLoans] = React.useState([]);
    const [formData, setFormData] = React.useState(initialValues);
    const [servicios, setServicios] = React.useState([]);
    const [userId, setUserId] = React.useState(0);

    const dateFormat = 'DD/MM/YYYY';
    const date = new Date();
        // Crear la fecha mínima a partir del objeto Date (formato nativo)
    const [startDate, setStartDate] = React.useState(`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`);

    React.useEffect(() => {
        handleCreditList();
        if ('user' in authProvider.token && authProvider.token.user) {
            setUserId(authProvider.token.user.id);
            setFormData({...initialValues, userId: authProvider.token.user.id});
            getServices(authProvider.token.user.id);
        }
    }, []);

    function onChange(date, dateString) {
        setStartDate(dateString);
        console.log(date);
    }

    // Maneja el envío de datos del primer formulario
    const handleForm1Submit = async (formData) => {
        try {
            let response = null;
            if (isEdit) {
                response = await axios.put(`${process.env.PUBLIC_URL}/credits/update/${formData.id}`, formData);
            } else {
                response = await axios.post(`${process.env.PUBLIC_URL}/credits/save`, formData);
            }

            if (response.data.ok){
                const updatedLoan = response.data.data;
                setLoans((prevList) => {
                    if (isEdit) {
                        return prevList.map((loan) =>
                            loan.id === updatedLoan.id ? updatedLoan : loan
                        );
                    } else {
                        return [...prevList, updatedLoan];
                    }
                });
                setFormData({...initialValues, userId: userId});
                setIsRegister(false);
                setIsEdit(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    html: `<p>Se <strong>${isEdit?'Actualizó':'Registro'}</strong> correctamente los datos</p>`,
                    timer: 3000,
                    position: 'center'
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!", 
                    text: `No se pudo completar con ${isEdit?'la actualización':'el registro'}`, 
                    timer: 3000,
                position: 'center'
                });
            }
        } catch (error){
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error!", 
                text: "No se pudo completar con el registro", 
                timer: 3000
            });
        }
    };

    const handleCreditList = async () => {
        const response = await axios.get(`${process.env.PUBLIC_URL}/credits/date/${formatoFecha(startDate)}`);
        setLoans(response.data.data);
    };

    const getServices = async (user_id) => {
        const response = await axios.get(`${process.env.PUBLIC_URL}/services/${user_id}`);

        if(response.data.ok === true) {
            setServicios(response.data.data);
        }
    }

    const handleLoanSelect = (loan) => {
        console.log(loan);
        
        setFormData({...initialValues, id: loan.id, numberDocument: loan.client.numberDocument, 
        fullName: loan.client.fullName, address: loan.client.address, reference: loan.client.reference, 
        phone: loan.client.phone, creditDate: formatoFecha2(loan.creditDate), amount: loan.amount, 
        endDate: formatoFecha2(loan.endDate), interestAmount: loan.interestAmount,
        totalAmount: loan.totalAmount, serviceId: loan.serviceId,
        clientId: loan.clientId, userId: loan.userId});

        //setStartDate(loan.creditDate);
    };

    const handleDelete = async (loan) => {
        const result = await Swal.fire({
            title: 'Desea Eliminar?',
            text: `Se eliminará el crédito de ${loan.client.fullName}`,
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
              const response = await axios.delete(`${process.env.PUBLIC_URL}/credits/destroy/${loan.id}`);
              if (response.data.ok) {
                setLoans((prevLoans) => prevLoans.filter((item) => item.id !== loan.id));
                Swal.fire('Eliminado!', `El crédito de ${loan.client.fullName} ha sido eliminado.`, 'success');
              } else {
                Swal.fire('Error', 'No se pudo eliminar el crédito.', 'error');
              }
            } catch (error) {
              Swal.fire('Error', 'Ocurrió un error al intentar eliminar el crédito.', 'error');
              console.error(error);
            }
          }
    }

    return (
        <>
            {
                (!isRegister && !isEdit) && (
                    <div className="p-4">
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-teal-700 dark:text-gray-100 font-bold">Prestamos</h1>
                            </div>

                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-8">
                                <button className="btn bg-gray-900  text-gray-100 px-2 py-2 rounded-md hover:bg-teal-600 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" 
                                    onClick={() => setIsRegister(true)}>
                                    <span className="max-xs:sr-only flex items-center"> <FaPlus className="pr-1"/> Nuevo</span>
                                </button>                
                            </div>
                        </div>
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                            <div className="relative">
                                <DatePicker className="appearance-none block w-full border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    format={dateFormat} 
                                    defaultValue={dayjs(startDate, dateFormat)}
                                    name='creditDate'
                                    inputReadOnly={true}                                    
                                    onChange={onChange}
                                />
                            </div>
                            
                            <button className="btn bg-gray-900 w-10 text-center text-gray-100 hover:bg-gray-800 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                                onClick={handleCreditList}
                            >
                                <FaSearch className="m-3" />
                            </button>                
                        </div>
                        
                        <TableLoan data={loans} onClick={() => setIsEdit(true)} onLoanClick={handleLoanSelect} onDeleteClick={handleDelete} />
                    </div>
                )
            }

            {
                (isRegister && !isEdit) && (
                    <LoanForm titleForm={"Registrar"} onSubmit={handleForm1Submit} formDataParams={formData} services={servicios} onClick={() => setIsRegister(false)} />
                )
            }

            {
                (!isRegister && isEdit) && (
                    <LoanForm titleForm={"Editar"} onSubmit={handleForm1Submit} formDataParams={formData} services={servicios} onClick={() => setIsEdit(false)} />
                )
            }
        </>
    );
}

export default Loan;