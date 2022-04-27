import "./qtyRocker.scss";
import minus from "../../images/minus.png";
import plus from "../../images/plus.png";
import { useState } from "react";
import { useEffect } from "react";

function QtyRockerView({ responseObject, minValue, maxValue, incrementValue }) {
  const [options, setOptions] = useState([]);

  function OptionPrice(price) {
    const formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(price);
  }

  function AddItem(option) {
    if (options.length === 0) {
      const newItem = {
        label: responseObject.options[option].label,
        value: responseObject.options[option].price.value,
        qtySelected: incrementValue,
        lastCorrectQty: incrementValue,
        totalPrice: responseObject.options[option].price.value,
      };
      const newItems = [...options, newItem];
      setOptions(newItems);
    } else if (options.length > 0) {
      var containsItem = false;
      for (var item in options) {
        if (options[item].label === responseObject.options[option].label) {
          containsItem = true;
          if (options[item].qtySelected + incrementValue < maxValue + 1) {
            options[item].qtySelected =
              options[item].qtySelected + incrementValue;
            options[item].totalPrice =
              options[item].value * options[item].qtySelected;
          }
        }
      }
      if (containsItem === false) {
        const newItem = {
          label: responseObject.options[option].label,
          value: responseObject.options[option].price.value,
          qtySelected: incrementValue,
          lastCorrectQty: incrementValue,
          totalPrice: responseObject.options[option].price.value,
        };
        const newItems = [...options, newItem];
        setOptions(newItems);
      }
    }
    console.log('New Price', options);
  } 

  function DecreaseItem(option) {
    if(options.length > 0){
      for (var item in options) {
        if (options[item].label === responseObject.options[option].label) {
          if (options[item].qtySelected - incrementValue > minValue - 1) {
            options[item].qtySelected = options[item].qtySelected - incrementValue;
            options[item].totalPrice = options[item].value * options[item].qtySelected;
          }
        }
      }
      console.log(options);
    }
  }

  return (
    <div className="qty-rocker">
      <div className="options">
        <p>Options:</p>
      </div>
      <div className="rocker">
        <div className="option-container">
          {Object.keys(responseObject.options).map((option) => (
            <>
              <span className="option-label">
                {responseObject.options[option].label}
              </span>
              <br />
            </>
          ))}
        </div>
        <div className="price-container">
          {Object.keys(responseObject.options).map((option) => (
            <>
              <span className="price-label">
                {OptionPrice(responseObject.options[option].price.value)}
              </span>
              <br />
            </>
          ))}
        </div>
        <div className="rocker-container">
          {Object.keys(responseObject.options).map((option, index) => (
            <>
              <div className="rocker">
                <div className="minus" id={"minus-" + index} onClick={() => DecreaseItem(option)}>
                  <img src={minus} alt="minus" />
                </div>
                <div className="qty">
                  <input className="input-field" placeholder={0} />
                </div>
                <div
                  className="plus-active"
                  id={"plus-" + index}
                  onClick={() => AddItem(option)}
                >
                  <img src={plus} alt="plus" />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QtyRockerView;
