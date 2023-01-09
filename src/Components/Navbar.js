import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import RedeemIcon from '@mui/icons-material/Redeem';
import { useContext } from "react";
import { InputField } from './InputField';
import {useNavigate }from 'react-router-dom';
import { Tabs,Tab} from "@mui/material";
import UserContext from '../context/UserContext';





function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if (page==="Issue NFT") {
        console.log("click")
        console.log(page)
        navigate("/issue")
      } else if (page==="View NFT") {
        navigate("/viewnft")
      } else {
        navigate("updatenft")
      }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const user = useContext(UserContext)

  const pages=["Issue NFT","View NFT","Update NFT"]

 

  return (
    <>
    <AppBar position="absolute"
    sx={{background:"#A3A6FA"}}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RedeemIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            dNFT Reward
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
          <RedeemIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            dNFT Reward
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } ,justifyContent:"center"}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' ,marginLeft:"20px",fontWeight:"700"}}
              >
                {page}
              </Button>
            ))}
          </Box>

           <Box sx={{ flexGrow: 0 }}>
            {user.iswalletAvailable ? (
          user.isConnected ? (
            <Button color='success' variant='contained'>Connected</Button>
          ) : (
            <Button color="warning" variant="contained"
              onClick={() =>{
                user.login();
              }}
              >Connect</Button>
          )
        ) : (
          <Button variant='contained'
          onClick={() => {
            window.open("https://metamask.io");
          }}>
            GET WALLET
          </Button>
        )}
          </Box> 
        </Toolbar>
      </Container>
    </AppBar>
    

    </>
  );
}
export default Navbar;


