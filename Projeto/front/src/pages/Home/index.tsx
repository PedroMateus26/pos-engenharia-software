import React, { useEffect, useState } from "react";
import './styles.scss'
import { ReactComponent as MainImage } from 'core/assets/images/main-image.svg'
import ButtonIcon from 'core/components/ButtonIcon';
import { Link,useLocation } from 'react-router-dom';
import { getAccessTokenDecoded } from "core/utils/auth";




const Home = () => {

    const [currentUser, setCurrentUser]=useState('');
    const location=useLocation();
    useEffect(()=>{
        const currentUserData=getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name)
          },[location]);
    const conditionalLink=currentUser?"/admin":"/auth/login";

   return (
    <div className="home-container">
        <div className="row home-content border-radius-20">
            <div className="col-6 home-text">
                <h1 className="text-title">A melhor maneira de acompanhar<br /> o preço alvo seus ativos</h1>
                <p className="text-subtitle">Conheça a melhor ferramenta <br /> de ativos do mercado.</p>
                
                <Link to={conditionalLink} className="nav-link active">
                <ButtonIcon text="VER MEUS ATIVOS"/>
                </Link>

            </div>
            <div className="col-6">
                <MainImage className="main-image" />
            </div>
        </div>

    </div>
   ) 
}

   
export default Home;