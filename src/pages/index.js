import React from 'react';
import ProductLists from 'src/views/productLists';

export default function Home() {
  return (
    <>
      <ProductLists />
    </>
  )
}

Home.requireAuth = true;
