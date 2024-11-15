import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const CustomPagination = ({ page, pageCount, pageHandle }) => {

    return (
        <Stack spacing={2}>
            <Pagination page={page} count={pageCount} color="primary" onChange={(event, value) => pageHandle(value)} />
        </Stack>
    );

}

export default CustomPagination
