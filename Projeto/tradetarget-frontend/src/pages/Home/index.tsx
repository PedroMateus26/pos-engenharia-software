import React from 'react';
import './styles.scss'
import { ReactComponent as MainImage } from 'core/assets/images/main-image.svg'
import ButtonIcon from 'core/components/ButtonIcon';
import { Link } from 'react-router-dom';


const Home = () => (
    <div className="home-container">
        <div className="row home-content border-radius-20">
            <div className="col-6 home-text">
                <h1 className="text-title">A melhor maneira de<br />acompanhar seus ativos</h1>
                <p className="text-subtitle">Conheça o melhor buscador <br /> de ativos do mercado.</p>
                <Link to="/auth/login" className="nav-link active">
                <ButtonIcon text="VER MEIS ATIVOS"/>
                </Link>
                
            </div>
            <div className="col-6">
                <MainImage className="main-image" />
            </div>
        </div>

    </div>
)

export default Home;