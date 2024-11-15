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
import { LOGIN_USER } from '../graphqlOperations/mutation'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [login, { loading, error, data }] = useMutation(LOGIN_USER)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login(
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
        localStorage.setItem("token", data.login.jwt)
        navigate("/");
    }
    return (

        <Container maxWidth="sm md">

            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>

                <Typography sx={{ color: 'text.primary' }}>Login</Typography>
            </Breadcrumbs>
            {
                data?.login && < Alert severity='success' >  {'User ' + (data.login.user.email) + ' successfully logged In'
                }</Alert>
            }
            {
                error && error?.message && <Alert severity='error' >{(error.message)}</Alert>
            }
            <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{ maxWidth: 500, alignContent: 'center' }}>


                        <FormControl>
                            <InputLabel htmlFor="identifier">UserName or Email</InputLabel>
                            <Input id="identifier"
                                typ="text"
                                name="identifier"
                                aria-describedby="identifier-helper-text"
                                onChange={handleChange}
                            />
                            <FormHelperText id="identifier-helper-text">Enter Username or Email</FormHelperText>
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
                        <Button sx={{ bgColor: 'text.primary', color: 'text.secondary' }} type="Submit">Login</Button>
                    </FormGroup>

                </form>
            </Box>


        </Container>
    )
}

export default Login
