import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss'

type Props={
      title:string,
      children:React.ReactNode 
};

const BaseForm=({title,children}:Props)=>{
    const history=useHistory();

    const cancelHandle=()=>{
        history.push('../');
    }
  
    return (
        <div className="admin-base-form card-base">
            <h1 className="base-form-title">
                {title}
            </h1>
            {children}
           <div className="base-form-actions">
           <button className="btn btn-danger border-radius-10 mr-3" onClick={cancelHandle}>
                CANCELAR
            </button>
            <button className="btn btn-primary border-radius-10 mr-3">
                CADASTRAR
            </button>
           </div>

        </div>
    )
}

export default BaseForm;