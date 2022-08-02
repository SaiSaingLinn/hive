import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Box, Button, ButtonGroup, Card, CardContent, Container, IconButton, List, ListItem, Paper, Snackbar, styled, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { Add, DeleteOutline, ProductionQuantityLimits, Remove } from '@mui/icons-material';
import { ecommerce } from "src/store/actions";
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import theme from 'src/themes/theme';
import { ecommerceStore } from 'service';

const ImageWraper = styled(Box)(({ theme }) => ({
  "span": {
    borderRadius: "20px 0 0 20px",
  }
}));


export default function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { cart_data } = useSelector(state => state.ecommerce);

  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    setCartData(cart_data);
  }, [cart_data]);

  // get total of cart_data qty
  const total = cart_data?.reduce((acc, cur) => acc + cur.quantity, 0);
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(total);
  }, [total]);

  // get total price by all cartData price * qty
  const totalPrice = cartData?.reduce((acc, cur) => acc + (cur.amount * cur.quantity), 0);
  // const totalPrice = cartData?.reduce((acc, cur) => acc + cur.amount, 0);

  // qty change 
  const handleChangeQty = (i, qty) => {
    const new_cart_data = [...cartData];
    new_cart_data[i].quantity = +qty;

    //update cart data only table view
    setCartData(new_cart_data);

    //only get id and qty from new_cart_data and update cart_data array in redux store 
    const new_cart_data_id_qty = new_cart_data?.map(item => {
      return {
        productId: +item.productId,
        image: item.image,
        productName: item.productName,
        amount: +item.amount,
        quantity: +item.quantity,
        lineTotal: 0,
      }
    }
    );
    dispatch(ecommerce.setCart('ADD_TO_CART', new_cart_data_id_qty));
  }
  // const [qty, setQty] = useState(1);
  const handleQty = (key, index, quantity) => () => {
    let num;
    if (key === "add") {
      num = quantity;
      num += 1;
    } else {
      num = quantity;
      num -= 1;
    }
    // if num is less than 1 remove item from cartData with handleRemove function 
    if (num < 1) {
      handleRemove(index);
    } else {
      handleChangeQty(index, num);
    }
}

  // remove item from cart_data array
  const handleRemove = (i) => {
    const new_cart_data = [...cartData];
    new_cart_data?.splice(i, 1);
    setCartData(new_cart_data);
    // only get id and qty from new_cart_data and update cart_data array in redux store
    const new_cart_data_id_qty = new_cart_data?.map(item => {
      return {
        productId: +item.productId,
        image: item.image,
        productName: item.productName,
        amount: +item.amount,
        quantity: +item.quantity,
        lineTotal: 0,
      }
    }
    );
    dispatch(ecommerce.setCart('ADD_TO_CART', new_cart_data_id_qty));
  }

  const [loading, setLoading] = useState(false);

  // handle snackbar
  const [state, setState] = useState({
    openSnackbar: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, openSnackbar, messageSnackbar } = state;

  const handleCloseSnackbar = () => {
    setState({ ...state, openSnackbar: false });
  };

  // place order 
  const handlePlaceOrder = async () => {
    setLoading(true);
    // remove image key value from cartData array
    const new_cart_data = cartData?.map(item => {
      return {
        productId: +item.productId,
        productName: item.productName,
        amount: +item.amount,
        quantity: +item.quantity,
        lineTotal: 0,
      }
    }
    );
    
    let data = {
      orderEntries: new_cart_data,
      subTotal: totalPrice,
      tax: 0,
      total: totalPrice,
    }
    setTimeout(async () => {
      let res = await dispatch(ecommerce.placeOrder(data))
      if (res.status === 200) {
        router.push(`/success?orderNumber=${res.data.orderNumber}`);
        setTimeout(() => {
          dispatch(ecommerce.setCart('REMOVE_ALL_CART', []));
          ecommerceStore.removeAllCart();
        }, 1000);
      } else {
        setState({ ...state, openSnackbar: true, messageSnackbar: "Something went wrong, please try again!" });
      }
      setLoading(false);
    }, 1000);
  }

  return (
    <>
      <Box mt={{md: 5, xs: 3}} mb={{md: 5, xs: 3}} style={{paddingBottom: value > 0 ? '60px' : '16px'}}>
        <div>
          <Container>
            {
              cartData?.length > 0 ?
              <>
                {
                  cartData?.map((item, index) => 
                    <Card sx={{ display: 'flex', marginBottom: '16px', position: 'relative' }} key={index}>
                      <Box sx={{position: 'absolute', top: '0px', right: '0px'}}>
                        <IconButton aria-label="delete" onClick={() => handleRemove(index)}>
                          <DeleteOutline color='primary' />
                        </IconButton>
                      </Box>
                      <ImageWraper>
                        <Box sx={{position: 'relative', width: 150, height: "100%"}}>
                          <Image
                            src={item?.image}
                            alt={item?.productName}
                            layout="fill"
                            objectFit='cover'
                            priority={true}
                          />
                        </Box>
                      </ImageWraper>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto', pr: 4 }}>
                          <Typography component="div" variant="h5">
                            {item?.productName}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" component="div">
                            {item?.amount} Ks
                          </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                          <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={handleQty("sub", index, item?.quantity)}><Remove sx={{fontSize: '20px'}} /></Button>
                            <Button disabled>{item?.quantity}</Button>
                            <Button onClick={handleQty("add", index, item?.quantity)}><Add sx={{fontSize: '20px'}} /></Button>
                          </ButtonGroup>
                        </Box>
                      </Box>
                    </Card>
                  )
                }
              </>
              :
              <Box 
                sx={{
                  height: 'calc(100vh - 200px)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexDirection: 'column'
                }}
              >
                <Box>
                  <ProductionQuantityLimits sx={{ fontSize: 100, color: theme.palette.primary.main }} />
                </Box>
                <Box mt={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                  <Typography variant="h3" component="h2" mb={1}>Empty Cart</Typography>
                  <Typography variant="paragraph" component="p">Your cart is empty!</Typography>
                  <Box mt={3}>
                    <Link href="/" passHref>
                      <a>
                        <Button variant='contained'>Continue Shopping</Button>
                      </a>
                    </Link>
                  </Box>
                </Box>
              </Box>
            }
          </Container>
        </div>
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: 0,
            opacity: value > 0 ? 1 : 0,
            visibility: value > 0 ? 'visible' : 'hidden',
            zIndex: 9,
          }} 
          elevation={3}
        >
          <Container>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h3" component="p">Total</Typography>
                <Typography variant="h3" component="p" suppressHydrationWarning>
                {totalPrice} Ks
                </Typography>
              </ListItem>
            </List>
            <LoadingButton
              loading={loading}
              onClick={() => handlePlaceOrder()}
              variant="contained"  
              sx={{
                margin: '8px 0', 
                width: {md: '100%', xs: '100%'}, 
                padding: '6px 16px',
                fontSize: '1rem !important',
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                }
              }}
            >
              Place Order
            </LoadingButton>
          </Container>
        </Paper>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={5000}
        message={messageSnackbar}
        key={vertical + horizontal}
      />
    </>
  );
}

Cart.requireAuth = true;
