import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PCard from '../components/PCard';
import Alert from '@mui/material/Alert';

import Grid from '@mui/material/Grid2';
import { GET_PRODUCTS } from '../graphqlOperations/queries';
import { useQuery } from '@apollo/client';
import Category from './Category';
import Search from '../components/Search';
import CustomPagination from '../components/CustomPagination';
const Home = () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(1);
    const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
        variables: {
            "pagination": {
                "page": page,
                "pageSize": pageSize
            }
        }
    })
    useEffect(() => {
        if (page !== 1)
            refetch()
    }, [page, refetch])

    const pageHandler = (page) => {
        console.log(page)
        setPage(page)
    }
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
                <Box>

                    {<Search />}
                </Box>

                <Grid container spacing={6} >

                    {data.products_connection.nodes.map(({ documentId, name, description, price, image }) => {
                        return (
                            <Grid size={6} key={documentId}>
                                <PCard id={documentId} name={name} description={description} price={price} image={image[0].url} />
                            </Grid >
                        )
                    })}

                </Grid>

                <CustomPagination page={page} pageCount={data.products_connection.pageInfo.pageCount} pageHandle={pageHandler} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <label>Size:</label>
                    <select style={{ width: 50 }}
                        value={pageSize}
                        onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option></select>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default Home
