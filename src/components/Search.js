import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_BY_NAME } from '../graphqlOperations/queries';


export default function Search() {
    const [nameQuery, setNameQuery] = useState("");

    const [getProduct, { loading, error, data }] = useLazyQuery(GET_PRODUCT_BY_NAME, {
        "filters": {
            "name": {
                "startsWith": nameQuery || ""
            }
        }
    })
    useEffect(() => {
        if (nameQuery.length !== 0) { getProduct() }


    }, [nameQuery, getProduct])
    if (loading) return <h3>{"Searching in Progress"}</h3>
    if (error) return <h3>{error}</h3>
    let products = [];
    if (data) {
        products = [...data.products].map((option) => option)
    }
    const handleChange = e => {
        setTimeout(() => {
            setNameQuery(e.target.value);
        }, 1000)


    }
    return (
        <Stack spacing={2} sx={{ width: 500, margin: 5 }} >
            <Autocomplete
                id="search"
                getOptionLabel={(option) => option.name}
                options={products}
                onChange={(e, opt) => {
                    console.log(opt)
                    // window.location.href = `/product/${opt.documentId}`
                }}
                renderInput={(params) => <TextField value={nameQuery} onChange={handleChange} {...params} label="Search" />}
            />

        </Stack>

    );
}
