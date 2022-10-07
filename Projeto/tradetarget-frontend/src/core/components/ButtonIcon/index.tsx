import React from 'react';
import './styles.scss'
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg'

type Propps = {
    text:string;
}

const ButtonIcon = ({text}:Propps) => (
    <div className="d-flex">
        <button className="btn btn-primary btn-icon">
            <h5>{text}</h5>
        </button>
        <div className="btn-icon-conten">
            <ArrowIcon />
        </div>
    </div>




)

export default ButtonIcon;