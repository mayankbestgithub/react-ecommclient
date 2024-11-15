import { useQuery } from '@apollo/client'
import React from 'react'
import { Alert, Box, Breadcrumbs, Button, Container, Link } from '@mui/material'

import { useCart } from "react-use-cart";
import { GET_PRODUCT } from '../graphqlOperations/queries'
import { useParams } from 'react-router-dom'
import { SERVER_APP_URL } from '../config.js'
const Product = () => {
    const { pid } = useParams()
    const { updateItem, addItem, isEmpty, getItem } = useCart();
    console.log(pid)
    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { documentId: pid }
    });
    const addCart = (id) => {
        // TODO add to cart
        console.log(id)
        console.log(data.product)
        const product = {
            id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image,
            quantity: 1
        }
        if (isEmpty) { addItem(product, 1) }
        else {
            const myItem = getItem(id)
            console.log(myItem)
            if (myItem) {
                updateItem(myItem.id, { ...myItem, "quantity": myItem.quantity + 1 })
            } else {
                addItem(product, 1)
            }
        }

    }
    if (loading) return "Loading Product..."
    if (error) return <Alert severity='error' >{error.message}</Alert>
    if (data) console.log(data)
    return (
        <Container maxWidth="xs sm md">
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline="hover" color="inherit" href="/">
                    Product
                </Link>
            </Breadcrumbs>
            <Box sx={{ width: '100%', height: '100vh', borderRadius: 1, padding: '10px' }}>
                {data.product.image.map(({ url }, i) => {
                    return (<div key={i}>
                        <img src={`${SERVER_APP_URL + url}`} alt={data.product.name} style={{ maxWidth: "400px" }} />
                    </div>)
                })}

                <ul>
                    <li>{data.product.name}</li>
                    <li>{data.product.description}</li>
                    <li>₹ {data.product.price}</li>
                    <Button variant="outlined" onClick={() => addCart(pid)} >Add to Cart</Button>

                </ul>

            </Box >
        </Container>
    )
}

export default Product
