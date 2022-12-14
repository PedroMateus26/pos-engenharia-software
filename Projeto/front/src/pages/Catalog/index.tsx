import React, { useEffect, useState } from 'react';
import './styles.scss';
import ProductCard from './components/ProductCard'
import ProductCardLoader from './components/Loader/ProductCardLoader'
import { Link } from 'react-router-dom';
import { makeRequest } from 'core/utils/request';
import { ProductResponse } from 'core/types/Product';
import Pagination from 'core/components/Pagination';



const Catalog=()=>{

    
    const [productResponse, setProductResponse]=useState<ProductResponse>()
    const[isLoading, setIsLoading]=useState(false);
    const [activePage, setActivePage]=useState(0)

    
    useEffect(()=>{

        const params={
            page:activePage,
            linesPerPage:10
        };
        setIsLoading(true)
        makeRequest({url:"/products",params})
        .then(response=>setProductResponse(response.data))
        .finally(()=>{
            setIsLoading(false)
        })
    },[activePage])

    return (
    <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de ativos</h1>
        <div className="catalog-products product-card">
           {isLoading?<ProductCardLoader/>:
            productResponse?.content.map(product=>(
            <Link to={`/products/${product.id}`} key={product.id}><ProductCard product={product}/></Link>
            ))}
           
        </div>
        {productResponse&&<Pagination 
        totalPages={productResponse.totalPages}
        activePage={activePage}
        onChange={page=>setActivePage(page)}
        />}
    </div>
)}; 

export default Catalog;