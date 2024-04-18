import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { format } from 'date-fns';
// import { getAllPersons, createPerson } from '../services/Api'

const FormPaciente: React.FC = () => {
    const authService = useAuth();
    const user = authService?.user ?? null;
    //const logout = authService?.logout ?? (() => console.error("La función de cierre de sesión no está disponible"));
    const navigate = useNavigate(); // Obtiene el objeto de historial de navegación

    const [startDate, setStartDate] = useState<Date | null>(null);
    const today = new Date(); // Obtener la fecha actual

    const API_BASE_URL = 'http://localhost:3000/api';

    //Estados para los campos a ser solicitados
    const [id] = useState<string>('');
    const [sexo, setSexo] = useState<string>('');
    const [universidad, setUniversidad] = useState<string>('');
    const [carrera, setCarrera] = useState<string>('');


    useEffect(() => {
        // Verificar si el usuario no está autenticado y redirigir a la página de inicio de sesión
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    /* const handleLogout = async () => {
        try {
            await logout(); // Cerrar sesión
            navigate('/login', { replace: true });
            // Redirigir al usuario a la página de inicio de sesión y reemplazar la entrada actual en el historial
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }; */

    const handleSubmit = async () => {
        try {
            const formattedDate = formatDate(startDate); // Formatea la fecha seleccionada
            // Envía los datos del formulario al backend
            await axios.post(`${API_BASE_URL}/persons`, {
                id,
                sexo,
                fechaNacimiento: formattedDate,
                universidad,
                carrera
            });
            // Lógica adicional después de enviar los datos al backend
        } catch (error) {
            console.error('Error al enviar los datos del formulario:', error);
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return null; // Maneja el caso de una fecha nula
        return format(date, 'yyyy-MM-dd'); // Formatea la fecha como 'YYYY-MM-DD'
    };

    const handleDateChange = (date: Date | null) => {
        if (date && date > today) {
            // Si la fecha seleccionada es posterior a la fecha actual, no actualizar el estado
            return;
        }
        // Si la fecha seleccionada es válida, actualizar el estado
        setStartDate(date);
    };


    return (
        <div>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol lg='9' className='my-5'>
                        <h1 className="text-white mb-4">Paciente</h1>
                        <MDBCard>
                            <MDBCardBody className='px-4'>
                                <MDBRow className='align-items-center pt-4 pb-3'>
                                    <MDBCol md='3' className='ps-5'>
                                        <h6 className="mb-0">ID</h6>
                                        {/* Aquí irá el campo para mostrar el ID obtenido del backend */}
                                    </MDBCol>

                                    <MDBCol md='3' className='ps-5'>
                                        <h6 className="mb-0">Sexo</h6>
                                        <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Masculino">Masculino</option>
                                        </select>
                                    </MDBCol>

                                </MDBRow>

                                <MDBRow className='align-items-center pt-4 pb-3'>
                                    <MDBCol md='3' className='ps-5'>
                                        <h6 className="mb-0">Fecha de nacimiento</h6>
                                        <DatePicker
                                            selected={startDate}
                                            //onChange={(date: Date) => setStartDate(date)}
                                            showYearDropdown
                                            scrollableYearDropdown
                                            yearDropdownItemNumber={100}
                                            dateFormat="dd/MM/yyyy"
                                            onChange={handleDateChange}
                                            maxDate={today}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <hr className="mx-n3" />

                                <MDBRow className='align-items-center pt-4 pb-3'>
                                    <MDBCol md='3' className='ps-5'>
                                        <h6 className="mb-0">Universidad</h6>
                                        <select value={universidad} onChange={(e) => setUniversidad(e.target.value)}>
                                            <option value="FP-UNE">FP-UNE</option>
                                            <option value="FAFI-UNE">FAFI-UNE</option>
                                            <option value="FCE-UNE">FCE-UNE</option>
                                            <option value="FDCS-UNE">FDCS-UNE</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </MDBCol>

                                    <MDBCol md='3' className='ps-5'>
                                        <h6 className="mb-0">Carrera</h6>
                                        <select value={carrera} onChange={(e) => setCarrera(e.target.value)}>
                                            <option value="Analisis">Lic. en Análisis de Sistemas</option>
                                            <option value="Turismo">Lic. en Turismo</option>
                                            <option value="Sistemas">Ingeniería de Sistemas</option>
                                            <option value="Electrica">Ingeniería Eléctrica</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </MDBCol>
                                </MDBRow>

                                <hr className="mx-n3" />

                                <MDBBtn className='my-4' size='lg' onClick={handleSubmit}>Empezar test</MDBBtn>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default FormPaciente;
