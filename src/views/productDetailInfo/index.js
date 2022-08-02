import { Add, AddShoppingCart, Remove } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Container, Grid, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ecommerceStore } from "service";
import { ecommerce } from "src/store/actions";
import theme from "src/themes/theme";

export default function ProductDetailInfo(props) {
  const { data, loading } = props;
  const dispatch = useDispatch();

  // qty change 
  const [qty, setQty] = useState(1);
  const handleQty = (key) => () => {
    if (key === "add") {
      let num = qty;
      num += 1;
      setQty(num);
    } else {
      if (qty > 1) {
        let num = qty;
        num -= 1;
        setQty(num);
      }
    }
  }

  // add to cart 
  const handleAddToCart = (id, image, name, amount) => {
    if (!ecommerceStore.getCart()) {
      dispatch(ecommerce.setCart('ADD_TO_CART', [{
        productId: +id,
        image,
        productName: name,
        amount: +amount,
        quantity: qty,
        lineTotal: 0,
      }]))
    } else {
      let cart = ecommerceStore.getCart();
      // if cart array id is equal to id update qty else add new item to cart
      if (cart?.find(item => item?.productId === +id)) {
        cart?.map(item => {
          if (item.productId === +id) {
            item.quantity += qty;
          }
        })
        dispatch(ecommerce.setCart('ADD_TO_CART', cart))
      } else {
        cart?.push({
          productId: +id,
          image,
          productName: name,
          amount: +amount,
          quantity: qty,
          lineTotal: 0,
        })
        dispatch(ecommerce.setCart('ADD_TO_CART', cart))
      }
    }
  }

  return (
    <>
      <Box mt={{md: 4, xs: 3}}>
        <Container>
          <Grid container spacing={{md: 6, xs: 2}}>
            <Grid item md={6} sm={12} xs={12}>
              <Box sx={{position: 'relative', width: '100%', height: 300}}>
                {
                  loading ? (
                    <Skeleton variant="rectangular" width="100%" height={300} />
                  ) : (
                    <Image
                      src={data[0]?.image}
                      alt={data[0]?.name}
                      layout="fill"
                      objectFit='contain'
                      priority={true}
                    />
                  )
                }
              </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              {
                loading ? (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton width="60%" />
                    <Skeleton width="60%" />
                  </>
                ) : (
                  <>
                    <Box>
                      <Typography variant="p" component={'h2'} mb={1}>{data[0]?.name}</Typography>
                      <Typography variant="h5" component={'h5'} mb={1} sx={{color: theme.palette.primary.main}}>{data[0]?.amount} Ks</Typography>
                    </Box>
                    <Typography variant="body1" component={'p'} mb={2}>{data[0]?.description}</Typography>
                    <Box sx={{display: 'flex', alignContent: 'center' , justifyContent: 'flex-start'}}>
                      <Box mr={2}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                          <Button onClick={handleQty("sub")}><Remove sx={{fontSize: '20px'}} /></Button>
                          <Button disabled>{qty}</Button>
                          <Button onClick={handleQty("add")}><Add sx={{fontSize: '20px'}} /></Button>
                        </ButtonGroup>
                      </Box>
                      <Box>
                        <Button 
                          variant="contained" 
                          size="medium" 
                          startIcon={<AddShoppingCart />} 
                          onClick={() => handleAddToCart(data[0]?.id, data[0]?.image, data[0]?.name, data[0]?.amount)}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </Box>
                  </>
                )
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}