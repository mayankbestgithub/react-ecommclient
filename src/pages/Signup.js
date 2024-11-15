import { useMutation } from '@apollo/client'
import {
    Container,
    Breadcrumbs,
    Link,
    Typography,
    FormControl,
    Button,
    InputLabel,
    Input,
    FormHelperText,
    Box,
    FormGroup,
    Alert
} from '@mui/material'
import React, { useState } from 'react'
import { SIGNUP_USER } from '../graphqlOperations/mutation'

const Signup = () => {
    const [formData, setFormData] = useState({})
    const [register, { loading, error, data }] = useMutation(SIGNUP_USER)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        register(
            {
                variables: {
                    input: formData
                }
            }
        )
    }
    if (loading) return "Loading"

    if (data) {
        console.log(data)
        localStorage.setItem("token", data.register.jwt)
    }
    return (

        <Container maxWidth="sm md">

            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>

                <Typography sx={{ color: 'text.primary' }}>Register</Typography>
            </Breadcrumbs>
            {
                data?.register && < Alert severity='success' >  {'User ' + (data.register.user.email) + ' successfully Saved'
                }</Alert>
            }
            {
                error && error?.message && <Alert severity='error' >{(error.message)}</Alert>
            }
            <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{ maxWidth: 500, alignContent: 'center' }}>
                        <FormControl>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email"
                                type="email"
                                name="email"
                                aria-describedby="email-helper-text"
                                required
                                onChange={handleChange}
                            />
                            <FormHelperText id="email-helper-text">Enter Email</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="username">UserName</InputLabel>
                            <Input id="username"
                                typ="text"
                                name="username"
                                aria-describedby="username-helper-text"
                                onChange={handleChange}
                            />
                            <FormHelperText id="username-helper-text">Enter Username</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password"
                                name="password"
                                typ="text"
                                aria-describedby="password-helper-text"
                                onChange={handleChange}
                            />
                            <FormHelperText id="password-helper-text">Enter Password</FormHelperText>
                        </FormControl>
                        <Button sx={{ bgColor: 'text.primary', color: 'text.secondary' }} type="Submit">Signup</Button>
                    </FormGroup>

                </form>
            </Box>


        </Container>
    )
}

export default Signup
