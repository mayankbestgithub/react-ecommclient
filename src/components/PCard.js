import React from 'react'
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';



const PCard = ({ id, name, description, price, image }) => {

    return (<Card sx={{ maxWidth: 345 }} >
        <CardMedia
            component="img"
            alt={description}
            height="140"
            image={`http://localhost:1337/${image}`}
        />
        <CardContent>
            <Link to={`/product/${id}`}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ₹   {price}
                </Typography>
            </Link>
        </CardContent>

    </Card>)
}

export default PCard
