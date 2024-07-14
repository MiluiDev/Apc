import React, { useEffect, useState } from 'react';
import './LoginContent.css';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

function LoginContent() {
  const [user, setUser] = useState({});

  function handleCallBackResponse(response) {
    const userPayload = jwtDecode(response.credential);
    setUser(userPayload);
    // Guardar token en las cookies
    Cookies.set('token', response.credential, { expires: 1 }); // Expira en 1 día
    document.getElementById('signInDiv').hidden = true;
    // Recargar la página una vez
    window.location.reload();
  }

  useEffect(() => {
    // Verificar si el token está en las cookies
    const token = Cookies.get('token');
    if (token) {
      const userPayload = jwtDecode(token);
      setUser(userPayload);
      document.getElementById('signInDiv').hidden = true;
    } else {
      // Inicializar Google Sign-In
      /* global google */
      google.accounts.id.initialize({
        client_id: "335667610048-bp22v6go6j5nqn7u70460c62k5o9bvf1.apps.googleusercontent.com",
        callback: handleCallBackResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "filled_black", size: "medium", shape: 'pill' }
      );
    }
  }, []);

  return (
    <div className='login-content'>
      <div className='login-box'>
        <h2>Welcome to APC!</h2>
        <p>Please sign in to access</p>
        <p>the demo</p>
        <div id="signInDiv" className="google-signin-button"></div>
      </div>
    </div>
  );
}


export default LoginContent;
