import ButtonIcon from "core/components/ButtonIcon";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthCard from "../Card";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { makeLogin } from "core/utils/request";
import { SaveSessionData } from "core/utils/auth";

type FormSate = {
  username: string;
  password: string;
};

type LocationSate={
  from:string;
}

const Login = () => {
  const { register, handleSubmit, errors } = useForm<FormSate>();
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const location=useLocation<LocationSate>();

  const { from } = location.state || { from: { pathname: "/admin" } };

  const onSubmit = (data: FormSate) => {
    makeLogin(data)
      .then((response) => {
        setHasError(false);
        console.log(`valor da variável state ${location.state}` );
        SaveSessionData(response.data);
        history.replace(from);
      })
      .catch(() => setHasError(true));
  };

  return (
    <AuthCard title="login">
      {hasError && (
        <div className="alert alert-danger mt-5">Usuário inválido!</div>
      )}
      <form action="" className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="margin-bottom-30">
          <input
            type="email"
            className={`form-control input-base ${errors.username?'is-invalid':''}`}
            placeholder="Email"
            name="username"
            ref={register({
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.username && (
            <div className="invalid-feedback d-block">
              {errors.username.message}
              </div>
          )}
        </div>
        <div className="margin-bottom-30">
          <input
            type="password"
            className={`form-control ${errors.password?'is-invalid':''}`}
            placeholder="Senha"
            name="password"
            ref={register({ required: "Campo obrigatório", })}
          />
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}
        </div>

        <Link to="/auth/recover" className="login-link-recover">
          Esqueci a senha?
        </Link>
        <div className="login-submmit">
          <ButtonIcon text="LOGAR" />
        </div>
        <div className="text-center">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/auth/register" className="login-link-register">
            Cadastrar
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};

export default Login;
