import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { format } from 'date-fns';

const FormPaciente: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const today = new Date();
  const API_BASE_URL = 'http://localhost:3001/api';
  const [sexo, setSexo] = useState<string>('');
  const [universidad, setUniversidad] = useState<string>('');
  const [carrera, setCarrera] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit: React.MouseEventHandler = async (event) => {
    event.preventDefault();
    if (!user) {
      setError('No hay un usuario autenticado.');
      return;
    }
    if (!startDate) {
      setError('Por favor, selecciona una fecha de nacimiento válida.');
      return;
    }

    setError('');
    setLoading(true);

    const formattedDate = format(startDate, 'yyyy-MM-dd');
    try {
      await axios.post(`${API_BASE_URL}/persons`, {
        id: user.uid,
        // Uid que viene del firebase 
        sexo,
        fecha_nacimiento: formattedDate,
        universidad,
        carrera,
        tipo_persona_role: "Usuario", // Este valor es fijo para todos los registros
      });
      // Redirección o mensaje de éxito
      navigate('/success'); // Ejemplo de redirección
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Error al enviar los datos: ${error.response?.status} ${error.response?.data?.message}`);
      } else {
        setError('Error al enviar los datos del formulario.');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date && date > today) {
      setError('La fecha de nacimiento no puede ser en el futuro.');
      return;
    }
    setError('');
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
                  <MDBCol md='6' className='ps-5'>
                    <h6 className="mb-0">Sexo</h6>
                    <select className="form-select" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                      <option value="">Seleccione...</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                    </select>
                  </MDBCol>
                  <MDBCol md='6' className='ps-5'>
                    <h6 className="mb-0">Fecha de nacimiento</h6>
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      dateFormat="dd/MM/yyyy"
                      maxDate={today}
                      className="form-control"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className='align-items-center pt-4 pb-3'>
                  <MDBCol md='6' className='ps-5'>
                    <h6 className="mb-0">Universidad</h6>
                    <select className="form-select" value={universidad} onChange={(e) => setUniversidad(e.target.value)}>
                      <option value="">Seleccione...</option>
                      <option value="FP-UNE">FP-UNE</option>
                      <option value="FAFI-UNE">FAFI-UNE</option>
                      <option value="FCE-UNE">FCE-UNE</option>
                      <option value="FDCS-UNE">FDCS-UNE</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </MDBCol>
                  <MDBCol md='6' className='ps-5'>
                    <h6 className="mb-0">Carrera</h6>
                    <select className="form-select" value={carrera} onChange={(e) => setCarrera(e.target.value)}>
                      <option value="">Seleccione...</option>
                      <option value="Lic. en Análisis de Sistemas">Lic. en Análisis de Sistemas</option>
                      <option value="Lic. en Turismo">Lic. en Turismo</option>
                      <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                      <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </MDBCol>
                </MDBRow>

                <MDBRow className='align-items-center pt-4'>
                  <MDBCol md='12' className='text-center'>
                    <MDBBtn className='my-4' size='lg' onClick={handleSubmit}>
                      {loading ? 'Cargando...' : 'Empezar test'}
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );


};

export default FormPaciente;
