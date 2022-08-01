import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomBreadcrumbs from "src/components/breadcrumbs";
import { product } from "src/store/actions/product.action";
import ProductDetailInfo from "src/views/productDetailInfo";

export default function ProductDetail() {
  const size = 6;
  const dispatch = useDispatch();
  const router = useRouter();
  // get products from store
  const { product_data, isLoading } = useSelector(state => state.product)

  useEffect(() => {
    // if router is ready or not
    if (!router.isReady) {
      return;
    }
    // get page from router query
    const page = router.query.page ? +router.query.page : 1;
    const postData = {
      size,
      page,
    }
    dispatch(product.getProduct(postData))
  }, [dispatch, router])

  // get product_data filter by id
  const id = router.query.id;
  const product_data_filter = product_data?.content?.filter(item => item.id === +id);

  return (
    <>
      <CustomBreadcrumbs 
        breadcrumbs={[
          {
            name: "Home",
            href: "/"
          },
          {
            name: product_data_filter?.length > 0 ? product_data_filter[0].name : "Product Detail",
          }
        ]}
      />
      {
        product_data_filter?.length > 0 &&
        <ProductDetailInfo data={product_data_filter} loading={isLoading} />
      }
    </>
  );
}

ProductDetail.requireAuth = true;