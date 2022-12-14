import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Badge, Container, styled } from '@mui/material';
import Link from 'next/link';
import { Logout, ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'src/store/actions/auth.action';
import { ecommerce } from 'src/store/actions';
import { useRouter } from 'next/router';
import { authStore } from 'service';

const ButtonWrapper = styled(Box)(({ theme }) => ({
  "@keyframes pop": {
    "50%": {
      transform: 'scale(1.3)',
    },
    "100%": {
      transform: 'scale(1)',
    },
  },
  '& .MuiBadge-root': {
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    transform: 'translateZ(0)',
    boxShadow: '0 0 1px rgba(0, 0, 0, 0)',
  },
  '&.animate': {
    '& .MuiBadge-root': {
      animationName: 'pop',
      animationDuration: '0.3s',
      animationTimingFunction: 'linear',
      animationIterationCount: '1',
    },
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart_data } = useSelector(state => state.ecommerce);
  // get total of cart_data qty
  const total = cart_data?.reduce((acc, cur) => acc + cur?.quantity, 0);
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(total);
  }, [total]);

  // set cart animate when user click on add to cart
  const [isAnimate, setIsAnimate] = useState(false);
  useEffect(() => {
    // if cart_data had changed then setIsNewCartData to true and then set to false after 1 second
    setIsAnimate(true);
    setTimeout(() => {
      setIsAnimate(false);
    }, 1000);
  }, [value]);

  // hide logout button when user not login
  const [isHideLogout, setIsHideLogout] = useState(false);
  useEffect(() => {
    const authData = authStore.getAuth();
    authData && setIsHideLogout(true);
  }, [router])

  // handle signOut
  const handleSignOut = () => {
    dispatch(auth.signOut())
    dispatch(ecommerce.setCart('REMOVE_ALL_CART', []));
    router.push('/login');
  }

  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '999' }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography 
              variant="h2" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'flex-start', 
              }}>
                <Link href="/" passHref>
                  <a>
                    HIVE Commerce
                  </a>
                </Link>
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <ButtonWrapper className={`${isAnimate ? 'animate': ''}`}>
                <Link href="/cart" passHref>
                  <a>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                      <Badge badgeContent={value} color="error">
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                  </a>
                </Link>
              </ButtonWrapper>
              {
                isHideLogout && (
                  <IconButton
                    size="large"
                    edge="end"
                    onClick={() => handleSignOut()}
                    color="inherit"
                  >
                    <Logout />
                  </IconButton>
                )
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;