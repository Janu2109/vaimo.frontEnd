import "./productDetails.scss";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ProductImage from "../../components/productImage/index";
import { UilCheckCircle } from "@iconscout/react-unicons";
import ReactStars from "react-rating-stars-component";

function ProductDetailsView() {
  const baseURL = "https://fe-assignment.vaimo.net/";

  var oldMinPrice = 0;

  var oldMaxPrice = 0;
  
  var newMinPrice = 0;

  var newMaxPrice = 0;



  const [responseObject, setResponseObject] = useState({
    name: "",
    tags: [],
    options: [
      {
        label: "",
        price: {
          value: 0,
          currency: {
            code: "",
            symbol: "",
            format: "",
          }
        },
        old_price: {
          value: 0,
          currency: {
            code: "",
            symbol: "",
            format: "",
          },
        },
      },
    ],
    discount: {
      amount: "",
      end_date: new Date(),
    },
    gallery: [
      {
        main: "",
      },
    ],
    shipping: {
      method: {
        country: "",
        title: "",
        shipping_time: {
          value: "",
          info: "",
        },
        cost: {
          value: 0,
          currency: {
            code: "",
            symbol: "",
            format: "",
          },
        },
      },
      lead_time: {
        value: "",
        info: "",
      },
      props: {
        ready_to_ship: true,
        in_stock: false,
        fast_dispatch: true,
      },
    },
    reviews: {
      rating: 0,
      count: 0,
      total_buyers: 0,
    },
  });

  const productInformation = useCallback(() => {
    axios.get(baseURL).then((res) => {
      setResponseObject(res.data.product);
      console.log(res.data.product);
      OldMinPrice();
      OldMaxPrice();
    });
  });

  const rating = parseInt(responseObject.reviews.rating);

  useEffect(() => {
    productInformation();
  }, []);

  function OldMinPrice(){
    var oldPrices = [];
      for(var i in responseObject.options){
        oldPrices.push(responseObject.options[i].old_price.value);
      }
      
      oldMinPrice  = Math.min.apply(Math, oldPrices);
      const formatter = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2
      })

      // return newMinPrice;
      return formatter.format(oldMinPrice)
  }

  function OldMaxPrice(){
    var oldPrices = [];
    for(var i in responseObject.options){
      oldPrices.push(responseObject.options[i].old_price.value);
    }
    
    oldMaxPrice  = Math.max.apply(Math, oldPrices);
    const formatter = new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    })

    // return newMinPrice;
    return formatter.format(oldMaxPrice);
  }

  function NewMinPrice(){
    var newPrices = [];
      for(var i in responseObject.options){
        newPrices.push(responseObject.options[i].price.value);
      }
      
      newMinPrice  = Math.min.apply(Math, newPrices);
      const formatter = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2
      })

      // return newMinPrice;
      return formatter.format(newMinPrice)
  }

  function NewMaxPrice(){
    var newPrices = [];
    for(var i in responseObject.options){
      newPrices.push(responseObject.options[i].price.value);
    }
    
    newMaxPrice  = Math.max.apply(Math, newPrices);
    const formatter = new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    })

    // return newMinPrice;
    return formatter.format(newMaxPrice)
  }

  return (
    <div className="container">
      <ProductImage source={responseObject.gallery[0].main} />
      <div className="info-container">
        <div className="badges">
          {responseObject.shipping.props.ready_to_ship === true && (
            <div className="ready-to-ship">
              <span>Ready To Ship</span>
            </div>
          )}
          {responseObject.shipping.props.in_stock === true && (
            <div className="in-stock">
              <UilCheckCircle className="badge-icon" />
              <span>In Stock</span>
            </div>
          )}
          {responseObject.shipping.props.fast_dispatch === true && (
            <div className="fast-dispatch">
              <UilCheckCircle className="badge-icon" />
              <span>Fast Dispatch</span>
            </div>
          )}
        </div>
        <div className="product-title">
          {responseObject.name}{" "}
          {responseObject.tags.indexOf("Hot sale products") > -1 && (
            <span className="hot-sale-products">Hot sale products</span>
          )}
        </div>
        <div className="ratings-box">
          {rating > 0 && <ReactStars count={5} value={rating} edit={false} size={14} isHalf={true} activeColor="#FF6600"/>}
          <span className="rating-number">{responseObject.reviews.rating}</span>
          <span className="total-reviews">{responseObject.reviews.count} Reviews</span>
          <span className="total-buyers">{responseObject.reviews.total_buyers} buyers</span>
        </div>
        <div className="price-box">
          <span className="new-price">{NewMinPrice()} - {NewMaxPrice()}</span>
          <span className="per-option">/ option</span>
          <span className="options">2 Options</span>
          <span className="min-order">(Min. Order)</span>
          <p className="old-price"><s>{OldMinPrice()} - {OldMaxPrice()}</s></p>
        </div>
      </div>
      <div className="add-container"></div>
    </div>
  );
}

export default ProductDetailsView;
