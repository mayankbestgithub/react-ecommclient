import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
export default function BasicMenu() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const jwt = localStorage.getItem('token')
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login")
    }
    return (
        <div>

            <Box sx={{ width: '100%' }}>

                <Link style={{ margin: 10 }} to="/">Home</Link>
                <Link style={{ margin: 10 }} to="/cart">Cart</Link>
                {
                    !jwt && <>
                        <Link style={{ margin: 10 }} to="/signup">SignUp</Link>
                        <Link style={{ margin: 10 }} to="/login">Login</Link>

                    </>
                }
                {jwt && <>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Dashboard
                    </Button>
                    <Menu

                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>

                    <Button onClick={() => handleLogout()}>Logout</Button>
                </>}
            </Box>

        </div>)
}
