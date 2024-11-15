import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PCard from '../components/PCard';
import Alert from '@mui/material/Alert';

import Grid from '@mui/material/Grid2';
import { GET_CATEGORY } from '../graphqlOperations/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Category from './Category';
const CategoryById = () => {
    const { documentId } = useParams();

    const { loading, error, data } = useQuery(GET_CATEGORY, {
        variables: { documentId }
    })
    if (loading) return "Loading..."

    if (error) return (<Alert variant='filled' severity="error">
        {error.message}
    </Alert>)
    return (
        <React.Fragment>
            {<CssBaseline />}
            <nav>
                <Category />
            </nav>
            <Container maxWidth="sm">

                <Grid container spacing={6} >

                    {data.category.products.map(({ documentId: id, name, description, price, image }) => {
                        return (
                            <Grid size={6} key={id}>
                                <PCard id={id} name={name} description={description} price={price} image={image[0].url} />
                            </Grid >
                        )
                    })}

                </Grid>


            </Container>
        </React.Fragment>
    )
}

export default CategoryById
