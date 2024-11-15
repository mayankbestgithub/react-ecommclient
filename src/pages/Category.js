import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_CATEGORIES } from '../graphqlOperations/queries'
import { Container } from '@mui/material'
import { Link } from 'react-router-dom'
const Category = () => {
    const { Category, data, error, loading } = useQuery(GET_CATEGORIES)
    if (loading) return <h1>Loading Categories</h1>
    if (error) return <h1>{error}</h1>
    if (data) console.log(data)
    return (
        <Container>
            <div>
                {data.categories.map(({ documentId, name }) => <Link key={documentId} to={`/category/${documentId}`}><p>{name}</p ></Link>)}
            </div>
        </Container >
    )
}

export default Category
