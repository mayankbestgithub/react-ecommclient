import React, { useState } from 'react'
import { Alert, Box, Breadcrumbs, Button, Container, Link as MLink, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "react-use-cart";
import { SERVER_APP_URL } from '../config';
import Checkout from '../components/Checkout';

const Cart = () => {
    const [checkout, setcheckout] = useState(false);
    const navigate = useNavigate();
    const { items, totalItems, totalUniqueItems, removeItem, cartTotal, isEmpty } = useCart();
    const jwt = localStorage.getItem('token');
    const handleRemove = (id) => {
        console.log(id)
        removeItem(id);

    }

    if (checkout) {
        return (<div>

            <Checkout />
            <Button onClick={() => setcheckout(false)}>Cancel</Button>
        </div>)
    }
    if (isEmpty) return <div><h2 style={{ textAlign: 'center' }}> Your Cart is Empty!<p><Link to="/">Add Items</Link></p></h2> </div>

    return (
        <div style={{ display: 'flex' }}>

            <Breadcrumbs aria-label="breadcrumbs">
                {["Home", "Cart"].map((item) => (
                    <MLink key={item} href={"/" + item.toLowerCase()}>
                        {item}
                    </MLink>
                ))}

            </Breadcrumbs>

            <div style={{ width: '70%' }}>
                <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>

                    <li>Item</li>
                    <li>Price</li>
                    <li>Quantity</li>
                    <li>-</li>
                    <li>Action</li>
                </ul>
                {items.map(({ id, name, price, quantity, image }) => {
                    return (<ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }} key={id}>


                        <li>{name}</li>
                        <li >₹ {price}</li>
                        <li >{quantity}</li>
                        <li ><img src={SERVER_APP_URL + image[0].url} style={{ maxWidth: 100, maxHeight: 100 }} /></li>
                        <li>{<button onClick={() => handleRemove(id)}>X</button>}</li>
                    </ul>)
                })}
            </div >
            <div style={{ width: '30%' }}>
                <h4 style={{ textAlign: 'center' }}>Summary:</h4>
                <ul style={{ listStyleType: 'none' }}>
                    <li style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Item count</span><span>{totalItems}</span></li>
                    <li style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Total Unique</span><span>{totalUniqueItems}</span></li>
                    <li style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Total</span><span>{cartTotal}</span></li>
                </ul>
                {jwt ? <Button onClick={() => setcheckout(true)}>Checkout</Button> : <Button onClick={() => navigate("/login")}>Please Login!</Button>}





            </div >

        </div >
    )
}

export default Cart
