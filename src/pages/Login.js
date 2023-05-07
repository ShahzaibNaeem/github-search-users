import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-img.svg";
const Login = () => {
  return (
    <>
      <Wrapper>
        <div className="container">
          <img src={loginImg} alt="GitHub User" />
          <h1>github user</h1>
          <button className="btn">login</button>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  display: grid;
  place-items: center;
  min-height: 100vh;
  .container {
    max-width: 600px;
    width: 90vw;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;

export default Login;
