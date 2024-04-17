import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav } from 'mdb-react-ui-kit';

interface NavbarProps {
    user: any; // Puedes definir el tipo de usuario aquí
    handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, handleLogout }) => {
    return (
        <MDBNavbar expand='lg' dark bgColor='primary'>
            <MDBContainer fluid>
                <MDBNavbarBrand className="text-white mx-auto">
                    <Link to="/home" className="text-white">ANSIEDAAAAAAAAD</Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler>
                    <MenuIcon />
                </MDBNavbarToggler>
                <MDBCollapse id="navbarCollapse" navbar>
                    <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                        {/* Aquí puedes agregar tus elementos de navegación */}
                    </MDBNavbarNav>
                    <MDBNavbarNav className="d-flex align-items-center">
                        {user ? (
                            <div className="d-flex align-items-center">
                                <p className="mb-0 me-3 text-white">Usuario autenticado como: {user.email}</p>
                                <IconButton onClick={handleLogout} color="inherit">
                                    <ExitToAppIcon />
                                </IconButton>
                            </div>
                        ) : (
                            <p className="mb-0 text-white">No hay usuario autenticado</p>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Navbar;
