import "./productDetails.scss";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ProductImage from "../../components/productImage/index";
import { UilCheckCircle } from "@iconscout/react-unicons";
import ReactStars from "react-rating-stars-component";
import marchExpo from "../../images/marchexpo.png";
import arrow from "../../images/arrow.png";
import clock from "../../images/clock.png";
import moment from "moment";
import securityLock from "../../images/securityLock.png";
import visa from "../../images/visa.svg";
import master from "../../images/master.svg";
import apple from "../../images/apple.svg";
import info from '../../images/info.png';
import envelope from '../../images/envelope.png';
import QtyRocker from "../../components/productQtyRocker/index";

function ProductDetailsView() {
  const baseURL = "https://fe-assignment.vaimo.net/";

  var oldMinPrice = 0;

  var oldMaxPrice = 0;

  var newMinPrice = 0;

  var newMaxPrice = 0;

  const maxValue = 10;

  const minValue = 0;

  const increment = 1;

  const [productList, setProductList] = useState([]);

  console.log(productList);

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
          },
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
    });
  });

  const rating = parseInt(responseObject.reviews.rating);

  useEffect(() => {
    productInformation();
  }, []);

  function OldMinPrice() {
    var oldPrices = [];
    for (var i in responseObject.options) {
      oldPrices.push(responseObject.options[i].old_price.value);
    }

    oldMinPrice = Math.min.apply(Math, oldPrices);
    const formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
    });

    return formatter.format(oldMinPrice);

    
  }

  function OldMaxPrice() {
    var oldPrices = [];
    for (var i in responseObject.options) {
      oldPrices.push(responseObject.options[i].old_price.value);
    }

    oldMaxPrice = Math.max.apply(Math, oldPrices);
    const formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
    });

    return formatter.format(oldMaxPrice);
  }

  function ShippingPrice() {
    const formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(responseObject.shipping.method.cost.value);
  }

  function NewMinPrice() {
    var newPrices = [];
    for (var i in responseObject.options) {
      newPrices.push(responseObject.options[i].price.value);
    }

    newMinPrice = Math.min.apply(Math, newPrices);
    const formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
    });

    return formatter.format(newMinPrice);
  }

  function NewMaxPrice() {
    var newPrices = [];
    for (var i in responseObject.options) {
      newPrices.push(responseObject.options[i].price.value);
    }

    newMaxPrice = Math.max.apply(Math, newPrices);
    const formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
    });

    return formatter.format(newMaxPrice);
  }

  var endDate = moment(responseObject.discount.end_date).format(
    "YYYY-MM-DD HH:m:s"
  );

  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span className="countdown-clock">
        {timeLeft[interval]}
        {interval}{" "}
      </span>
    );
  });

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
          {rating > 0 && (
            <ReactStars
              count={5}
              value={rating}
              edit={false}
              size={14}
              isHalf={true}
              activeColor="#FF6600"
            />
          )}
          <span className="rating-number">{responseObject.reviews.rating}</span>
          <span className="total-reviews">
            {responseObject.reviews.count} Reviews
          </span>
          <span className="total-buyers">
            {responseObject.reviews.total_buyers} buyers
          </span>
        </div>
        <div className="price-box">
          <span className="new-price">
            {NewMinPrice()} - {NewMaxPrice()}
          </span>
          <span className="per-option">/ option</span>
          <span className="options">2 Options</span>
          <span className="min-order">(Min. Order)</span>
          <p className="old-price">
            <s>
              {OldMinPrice()} - {OldMaxPrice()}
            </s>
          </p>
        </div>
        <div className="march-expo">
          <img alt="march expo" src={marchExpo} className="logo" />
          <span className="free-shipping">• Free shipping (up to $40)</span>
          <span className="delivery">• On-time delivery guaranteed</span>
          <img alt="arrow" src={arrow} className="arrow" />
        </div>
        <div className="countdown-timer">
          <span className="discount-amount">
            {responseObject.discount.amount} OFF
          </span>
          <span className="discount-text">Discount ends in</span>
          <img className="discount-clock" src={clock} alt="Discount clock" />
          {timerComponents}
        </div>
          <QtyRocker responseObject={responseObject} minValue={minValue} maxValue={maxValue} incrementValue={increment} setProductList={setProductList}/>
        <div className="trade-assurance">
          <img src={securityLock} alt="Security lock" />
          <span className="main-text">Trade Assurance</span>
          <span className="sub-text">protects your Alibaba.com orders</span>
        </div>
        <div className="payments">
          <span>Payments:</span>
          <img src={visa} alt="visa" />
          <img src={master} alt="master" />
          <img src={apple} alt="apple" />
        </div>
        <div className="links">
          <span className="link">Alibaba.com Logistics</span>
          <span className="link">Inspection Solutions</span>
        </div>
      </div>
      <div className="add-container">
        <div className="product-list"></div>
        <div className="left-top">
          {" "}
          <span className="ship-title">
            Ship to{" "}
            <u>South Africa by {responseObject.shipping.method.title}</u>
          </span>
        </div>
        <div className="right-top">
          <span className="ship-total">{ShippingPrice()}</span>
        </div>
        <div className="lead-shipping-times">
            <span className="sub-text">Lead Time <b>{responseObject.shipping.lead_time.value}</b></span>
            <img className="lead-icon"  src={info} alt='info icon'/>
            <span class="tooltiptext">{responseObject.shipping.lead_time.info} {responseObject.shipping.lead_time.value}</span><br />
            <span className="sub-text-shipping">Shipping time <b>{responseObject.shipping.method.shipping_time.value}</b></span>
            <img className="shipping-icon"  src={info} alt='info icon'/>
            <span class="shipping-tooltip">{responseObject.shipping.method.shipping_time.info}</span><br />
        </div>
        <div className="right-btn-container">
        <button className="login-btn">Login to Purchase</button>
        <button className="contact-btn"><img className="envelope" src={envelope}/><b>Contact the Supplier</b></button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsView;
