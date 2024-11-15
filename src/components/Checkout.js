import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button, Container, FormControl, FormGroup, Input } from '@mui/material'
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart';
import { SERVER_APP_URL } from '../config';

const CheckoutForm = () => {
    const { cartTotal, items, emptyCart } = useCart()
    const elements = useElements();
    const stripe = useStripe();
    const [formData, setFormData] = useState({})
    const [validCard, setValidCard] = useState(true)
    const [error, setError] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [complete, setComplete] = useState(false)
    const makePaymentRequest = async (allFormData) => {
        try {
            const tokenn = "Bearer " + localStorage.getItem("token")
            console.log(tokenn)
            const res = await fetch(`${SERVER_APP_URL}/api/orders`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenn
                },
                body: JSON.stringify(allFormData)
            })
            return await res.json()
        } catch (err) {
            console.log(err);
            setError(true)

        }

    }
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const cardElement = elements.getElement(CardElement)
        console.log(cardElement)
        const payLoad = await stripe.createToken(cardElement)
        console.log(payLoad)
        const allFormData = {
            ...formData,
            token: payLoad?.token?.id,
            amount: cartTotal,
            items

        }
        console.log(allFormData)
        setProcessing(true)
        await makePaymentRequest(allFormData)
        setProcessing(false)
        setComplete(true);
        emptyCart();

    }
    if (processing) {
        return "Processing payment"
    }
    if (error) {
        return "Payment failed "
    }
    if (complete) {
        return "Payment successful"
    }
    return (
        <Container sx={{ maxWidth: '100' }}>
            <h4>Payment Detail</h4>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormControl>
                        <Input type="text" name="name" placeholder='Name' onChange={handleChange} required></Input>
                    </FormControl>
                    <FormControl>
                        <Input type="text" name="shippingaddress" placeholder='Shipping Address' onChange={handleChange} required></Input>
                    </FormControl>
                    <FormControl>
                        <Input type="text" name="city" placeholder='City' onChange={handleChange} required></Input>
                    </FormControl>

                    <FormControl>
                        <Input type="text" name="state" placeholder='State' onChange={handleChange} required></Input>
                    </FormControl>

                    <FormControl>
                        <Input type="text" name="country" placeholder='Country' onChange={handleChange} required></Input>
                    </FormControl>

                    <FormControl>
                        <Input type="text" name="pin" placeholder='Pin Code' onChange={handleChange} required></Input>
                    </FormControl>
                    <CardElement onChange={(e) => setValidCard(!e.complete)} />

                </FormGroup>
                <br />
                <Button type="submit" disabled={!stripe || !elements || (validCard)} Pay >Pay</Button>
            </form >
        </Container>

    )
}
const stripePromise = loadStripe('pk_test_');

const Checkout = () => {
    return (<Elements stripe={stripePromise} >
        {<CheckoutForm />}

    </Elements>)
}
export default Checkout