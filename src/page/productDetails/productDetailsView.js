import "./productDetails.scss";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ProductImage from "../../components/productImage/index";

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
      <div className="info-container"></div>
      <div className="add-container"></div>
    </div>
  );
}

export default ProductDetailsView;
