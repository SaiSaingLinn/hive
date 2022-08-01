import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import ProductCard from "src/components/card";
import { useSelector, useDispatch } from "react-redux"
import { product } from 'src/store/actions/product.action';
import { useRouter } from "next/router";

const scrollToRef = ref => window.scrollTo(0, ref.current?.offsetTop - 100)

export default function ProductLists() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(6)
  const router = useRouter();

  // get products from store
  const { product_data, isLoading } = useSelector(state => state.product)

  useEffect(() => {
    const postData = {
      size,
      page,
    }
    dispatch(product.getProduct(postData))
  }, [dispatch, page, size])

  // onChange Pagination
  const scrollRef = useRef(null)
  const onChangePaginate = (e, value) => {
    setPage(value) 
    scrollToRef(scrollRef)
    console.log('value', value)
    console.log('router', router)

    // router push value with key "page" to end of url
    let name = 'page'
    if (name in router.query) {
      router.push(`${router.pathname}?${name}=${value}`)
    } else {
      router.push(`/?page=${value}`)
    }
  }

  return (
    <Box mt={5} mb={5}>
      <Container>
        <Typography variant="h3" mb={2}>Best Seller</Typography>
        <ProductCard data={product_data} loading={isLoading} page={page} />
        {
          product_data !== null &&
          product_data?.totalElements > size &&
          <Stack spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} mt={5}>
            <Pagination 
              variant="outlined" 
              count={product_data?.totalPages} 
              onChange={onChangePaginate}
              page={page}
              boundaryCount={1}
              siblingCount={1}
            />
          </Stack>
        }
      </Container>
    </Box>
  );
}