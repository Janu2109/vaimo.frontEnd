import "./productDetails.scss";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ProductImage from "../../components/productImage/index";
import { UilCheckCircle } from '@iconscout/react-unicons'


function ProductDetailsView() {
  const baseURL = "https://fe-assignment.vaimo.net/";

  const [imgSource, setImgSource] = useState([]);

  const productInformation = useCallback(() => {
    axios.get(baseURL).then((res) => {
      setImgSource(res.data.product.gallery[0].main);
    });
  });

  useEffect(() => {
    productInformation();
  }, []);

  return (
    <div className="container">
      <ProductImage source={imgSource} />
      <div className='info-container'>
        <div className="badges">
          <div className="ready-to-ship"><span>Ready To Ship</span></div>
          <div className="in-stock"><UilCheckCircle className='badge-icon'/><span>In Stock</span></div>
          <div className="fast-dispatch"><UilCheckCircle className='badge-icon'/><span>Fast Dispatch</span></div>
        </div>
        </div>  
      <div className="add-container"></div>
    </div>
  );
}

export default ProductDetailsView;
