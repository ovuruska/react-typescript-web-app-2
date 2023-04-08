import React from 'react';
import '../../App.css';
import useAllProducts from '@hooks/use-all-products';
import AddOnsDumb from '@pages/addons/add-ons.dumb';
import { ProductEntity } from '@domain/types/common/product';


const AddOnsPage: React.FC = () => {
  const allProducts = useAllProducts();
  const [products, setProducts] = React.useState<ProductEntity[]>([]);
  const price = 250 + products.reduce((acc, product) => acc + product.cost, 0);


  return <AddOnsDumb products={products} allProducts={allProducts} price={price} setProducts={setProducts} />;

};

export default AddOnsPage;
