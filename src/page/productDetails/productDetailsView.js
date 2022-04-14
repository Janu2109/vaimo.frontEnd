import "./productDetails.scss";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ProductImage from "../../components/productImage/index";
import { UilCheckCircle } from '@iconscout/react-unicons'


function ProductDetailsView() {
  const baseURL = "https://fe-assignment.vaimo.net/";

  const [responseObject, setResponseObject]=useState({
    name: '',
    tags: [],
    options: [{
      label: '',
      price: {
        value: 0,
        currency: {
          code: '',
          symbol: '',
          format: ''
        }
      },
      old_price: {
        value: 0,
        currency: {
          code: '',
          symbol: '',
          format: ''
        }
      }
    }
  ],
  discount: {
    amount: '',
    end_date: new Date()
  },
  gallery: [
    {
      main: ''
    }
  ],
  shipping: {
    method: {
      country: '',
      title: '',
      shipping_time: {
        value: '',
        info: ''
      },
      cost: {
        value: 0,
        currency: {
          code: '',
          symbol: '',
          format: ''
        }
      }
    },
    lead_time: {
      value: '',
      info: ''
    },
    props: {
      ready_to_ship: true,
      in_stock: false,
      fast_dispatch: true
    }
  },
  reviews: {
    rating: 0,
    count: 0,
    total_buyers: 0
  }
})

  const productInformation = useCallback(() => {
    axios.get(baseURL).then((res) => {
      setResponseObject(res.data.product);
    });

    console.log(responseObject);
  });

  useEffect(() => {
    productInformation();
  }, []);

  return (
    <div className="container">
      <ProductImage source={responseObject.gallery[0].main} />
      <div className='info-container'>
        <div className="badges">
          {responseObject.shipping.props.ready_to_ship === true && <div className="ready-to-ship"><span>Ready To Ship</span></div>}
          {responseObject.shipping.props.in_stock === true && <div className="in-stock"><UilCheckCircle className='badge-icon'/><span>In Stock</span></div>}
          {responseObject.shipping.props.fast_dispatch === true && <div className="fast-dispatch"><UilCheckCircle className='badge-icon'/><span>Fast Dispatch</span></div>}
        </div>
        </div>  
      <div className="add-container"></div>
    </div>
  );
}

export default ProductDetailsView;
