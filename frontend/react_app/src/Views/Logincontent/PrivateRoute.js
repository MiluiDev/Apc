import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = Cookies.get('token');
  if (token) {
    try {
      jwtDecode(token); // Decodificar para verificar si el token es válido
      return children; // Si el token es válido, renderizar los hijos
    } catch (error) {
      return <Navigate to="/" />; // Si el token es inválido, redirigir a la página de inicio de sesión
    }
  } else {
    return <Navigate to="/" />; // Si no hay token, redirigir a la página de inicio de sesión
  }
};

export default PrivateRoute;
