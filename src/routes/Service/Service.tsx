import * as React from 'react';
import { FaPlus } from "react-icons/fa";
import TableService from "../../partials/Service/TableService";
import ServiceForm from '../../partials/Service/ServiceForm';
import axios from 'axios';
import { authProvider } from '../../auth';
import Swal from 'sweetalert2';

const initialValues = {
    id: 0,
    serviceName: '',
    period: '',
    numberPeriod: '',
    porcentage: '',
    userId: 0,
};

function Service() {
    const [services, setServices] = React.useState([]);
    const [isRegister, setIsRegister] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [formData, setFormData] = React.useState(initialValues);
    const [userId, setUserId] = React.useState(0);

    React.useEffect(() => {
        if ('user' in authProvider.token && authProvider.token.user) {
            setUserId(authProvider.token.user.id);
            setFormData({...initialValues, userId: authProvider.token.user.id});
            handleServicesList(authProvider.token.user.id);
        }
    }, []);

    const handleServiceSelect = (service) => {
        setFormData({...initialValues, id: service.id, serviceName: service.serviceName, period: service.period, numberPeriod: service.numberPeriod, porcentage: service.porcentage});
    };

    const handleFormSubmit = async (formData) => {
        try {
            let response = null;
            if (isEdit) {
                response = await axios.put(`${process.env.PUBLIC_URL}/services/update/${formData.id}`, formData);
            } else {
                response = await axios.post(`${process.env.PUBLIC_URL}/services/save`, formData);
            }

            if (response.data.ok){
                const updatedService = response.data.data;
                setServices((prevList) => {
                    if (isEdit) {
                        return prevList.map((service) =>
                            service.id === updatedService.id ? updatedService : service
                        );
                    } else {
                        return [...prevList, updatedService];
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
                    timer: 3000
                });
            }
        } catch (error){
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error!", 
                text: `No se pudo completar con ${isEdit?'la actualización':'el registro'}`, 
                timer: 3000
            });
        }
    };

    const handleServicesList = async (user_id) => {
        const response = await axios.get(`${process.env.PUBLIC_URL}/services/${user_id}`);
        setServices(response.data.data);
    }
    return (
        <>
            {
                (!isRegister && !isEdit) && (
                <div className="p-4">
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">

                        {/* Left: Title */}
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-2xl md:text-3xl text-teal-700 dark:text-gray-100 font-bold">Servicios</h1>
                        </div>

                        {/* Right: Actions */}
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-8">
                        
                            {/* Add view button */}
                            <button className="btn bg-gray-900  text-gray-100 px-2 py-2 rounded-md hover:bg-teal-600 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"  
                            onClick={() => setIsRegister(true)} >
                                <span className="max-xs:sr-only flex items-center"> <FaPlus className="pr-1"/> Agregar</span>
                            </button>                
                        </div>
                    </div>
                    {/* Card (Users) */}
                    <TableService data={services} onClick={() => setIsEdit(true)} onServiceClick={handleServiceSelect} />
                </div>)
            }

            {
                (isRegister && !isEdit) && (
                    <ServiceForm titleForm={"Registrar"} onSubmit={handleFormSubmit} formDataParams={formData} onClick={() => setIsRegister(false)} />
                )
            }

            {
                (!isRegister && isEdit) && (
                    <ServiceForm titleForm={"Editar"} onSubmit={handleFormSubmit} formDataParams={formData} onClick={() => setIsEdit(false)} />
                )
            }
        </>
    );
}

export default Service;