import React from "react";

import loginBG from '../../../images/bg/loginBG.jpg'

const LoginLayout = props => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `linear-gradient(rgba(47,73,209, 0.50), rgba(47,73,209, 0.50)), url(${loginBG})` }}
    >
      {props.children}
    </div>
  );
}

export default LoginLayout;