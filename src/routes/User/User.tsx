import * as React from 'react';
import { FaPlus, FaSave, FaSearch, FaTimes } from "react-icons/fa";
import TableUser from "../../partials/Users/TableUser";
import UserForm from '../../components/UserForm';
import axios from 'axios';
import Swal from 'sweetalert2';
interface User {
    id: string;
    name: string;
    username: string;
    role: string;
}

const initialValues = {
    id: 0,
    userName: '',
    numberDocument: '',
    fullName: '',
    phone: '',
    password: '',
    role: '',
    isActive: true
};

function User() {
    const [isRegister, setIsRegister] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [users, setUsers] = React.useState([]);
    const [formData, setFormData] = React.useState(initialValues);

    React.useEffect(() => {
        handleUserList();
    }, []);

    const handleForm1Submit = async (formData) => {
        try {
            const response = await axios.post(`${process.env.PUBLIC_URL}/users/save`, formData);

            if (response.data.ok){
                setFormData(initialValues);
                setIsRegister(false);
                setIsEdit(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    html: `<p>Se <strong>Registro</strong> correctamente los daots</p>`,
                    timer: 3000,
                    position: 'center'
                });
                handleUserList();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!", 
                    text: "No se pudo completar con el registro", 
                    timer: 3000
                });
            }
        } catch (error){
            console.error(error);
        }
    };

    const handleUserSelect = (user) => {
        console.log(user);
        setSelectedUser(user);
        //setIsEdit(true);
    };

    const handleUserList = async () => {
        const response = await axios.get(`${process.env.PUBLIC_URL}/users`);
        setUsers(response.data.data);
    }

    return (
        <>
            {
                (!isRegister && !isEdit) && (
                    <div className="p-4">
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">

                            {/* Left: Title */}
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-teal-700 dark:text-gray-100 font-bold">Usuarios</h1>
                            </div>

                            {/* Right: Actions */}
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-8">
                            
                                {/* Add view button */}
                                <button className="btn bg-gray-900  text-gray-100 px-2 py-2 rounded-md hover:bg-teal-600 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"  
                                onClick={() => setIsRegister(true)}>
                                    <span className="max-xs:sr-only flex items-center"> <FaPlus className="pr-1"/> Agregar</span>
                                </button>                
                            </div>
                        </div>
                        {/* Card (Users) */}
                        <TableUser data={users} onClick={() => setIsEdit(true)} onUserClick={handleUserSelect} />
                    </div>
                )
            }

            {
                (isRegister && !isEdit) && (
                    <UserForm titleForm={"Registrar"} onSubmit={handleForm1Submit} formDataParams={formData} onClick={() => setIsRegister(false)} />
                )
            }

            {
                (!isRegister && isEdit) && (
                    <UserForm titleForm={"Editar"} onSubmit={handleForm1Submit} formDataParams={formData} onClick={() => setIsEdit(false)} />
                )
            }

            
        </>
    );
}

export default User;