import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Products=()=>{
    return (
        <div>
            <Link to="/admin/products" className="mr-5">
                Listar produtos
            </Link>
            <Link to="/admin/products/create" className="mr-5">
                Criar produto
            </Link>
            <Link to="/admin/products/:productId" className="mr-5">
                Editar produtos
            </Link>
            <Switch>
                <Route path="/admin/products" exact>
                    <List/>
                </Route>
                <Route path="/admin/products/create">
                    <Form/>
                </Route>
                <Route path="/admin/products/:productId">
                    
                </Route>
            </Switch>
        </div>
    )
}

export default Products;