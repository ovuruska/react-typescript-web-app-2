import React from 'react';
import WeakBtn from '@components/buttons/weak-btn/weak-btn';
import style from './add-ons.module.scss';
import AddOnsDescription from '@pages/addons/add-ons-description';
import PageCard from '@components/cards/page-card/page-card';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import { ProductEntity } from '@domain/types/common/product';
import StruckCard from '@components/cards/struck-card/struck-card';
import ServiceHeader from '@features/service-header/service-header';

export interface AddOnsDumbProps {
  products: any[];
  allProducts: any[];
  setProducts?: (products: any[]) => void;
  onNextBooking?: () => void;
  price?: number;
}

const text = 'Browse through our carefully curated selection of shampoos, ' +
  'conditioners, brushes, and grooming tools to ensure your dog looks and feels its best.';


const AddOnsDumb = ({
                      products = [], allProducts = [], setProducts, onNextBooking, price = 0,

                    }: AddOnsDumbProps) => {

  const productsWithCategories: {
    [key: string]: ProductEntity[];
  } = {};
  allProducts.forEach((product) => {
    if (!productsWithCategories[product.category]) {
      productsWithCategories[product.category] = [];
    }
    productsWithCategories[product.category].push(product);
  });

  const handleProductClick = (product: ProductEntity) => (checked : boolean) => {
    if(!setProducts) return;
    else if(checked) {
      setProducts([...products, product])
    }
    else {
      setProducts(products.filter((p) => p.id !== product.id))
    }
  }

  const handleClick = () => {
    onNextBooking && onNextBooking();
  };

  const handleClickNoThanks = () => {
    setProducts && setProducts([]);
    onNextBooking && onNextBooking();
  }

  return <div className={style.addOnsPage}>
      <h2>
        Add-ons
      </h2>
      <AddOnsDescription text={text} />
      <div className={style.addOns__products}>
        {Object.keys(productsWithCategories).map((category) => {

          return <div key={category} className={style.addOns__productCategory}>
            <h3>{category}</h3>
              {productsWithCategories[category].map((product) => {
                const { cost, name, id } = product;
                const checked = !!products.find((p) => p.id === product.id);
                return <StruckCard
                  checked={checked}
                  onClick={handleProductClick(product)}
                  price={cost} key={id} content={name} />;
              })}
          </div>;
        })}

        <div>

          <WeakBtn  onClick={handleClickNoThanks} content={'No thanks, I don\'t want any extra'} />
          <div className={style.row}>
            {price && <div className={style.addOns__priceTag}>{'$' + price?.toFixed(2)}</div>}
            <CtaPrimary  content={'Book'} onClick={handleClick} />
          </div>

        </div>
      </div>
    </div>;

};

export default AddOnsDumb;