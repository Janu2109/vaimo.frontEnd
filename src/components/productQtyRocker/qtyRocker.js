import "./qtyRocker.scss";
import minus from "../../images/minus.png";
import plus from "../../images/plus.png";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

function QtyRockerView({ responseObject, minValue, maxValue, incrementValue, setProductList }) {
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
      setProductList(options);
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
              setProductList(options);
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
        setProductList(options);
      }
    }
  }

  function DecreaseItem(option) {
    if (options.length > 0) {
      for (var item in options) {
        if (options[item].label === responseObject.options[option].label) {
          if (options[item].qtySelected - incrementValue > minValue - 1) {
            options[item].qtySelected =
              options[item].qtySelected - incrementValue;
            options[item].totalPrice =
              options[item].value * options[item].qtySelected;
              setProductList(options);
          }
        }
      }
      console.log(options);
    }
  }

  function InputChange(input, option) {
    if (options.length === 0) {
      if (input > minValue - 1 && input < maxValue + 1) {
        const newItem = {
          label: responseObject.options[option].label,
          value: responseObject.options[option].price.value,
          qtySelected: input,
          lastCorrectQty: input,
          totalPrice: responseObject.options[option].price.value * input,
        };
        const newItems = [...options, newItem];
        setOptions(newItems);
        setProductList(options);
      } else {
        const newItem = {
          label: responseObject.options[option].label,
          value: responseObject.options[option].price.value,
          qtySelected: minValue,
          lastCorrectQty: minValue,
          totalPrice:
            responseObject.options[option].price.value *
            options[item].qtySelected,
        };
        const newItems = [...options, newItem];
        setOptions(newItems);
        setProductList(options);
      }
    } else if (options.length > 0) {
      var containsItem = false;
      for (var item in options) {
        if (options[item].label === responseObject.options[option].label) {
          containsItem = true;
          if (input > minValue - 1 && input < maxValue + 1) {
            options[item].qtySelected = input;
            options[item].lastCorrectQty = input;
            options[item].totalPrice =
              options[item].value * options[item].qtySelected;
              setProductList(options);
          }
        }
      }
      if (containsItem === false) {
        if (input > minValue - 1 && input < maxValue + 1) {
          const newItem = {
            label: responseObject.options[option].label,
            value: responseObject.options[option].price.value,
            qtySelected: input,
            lastCorrectQty: input,
            totalPrice: responseObject.options[option].price.value * input,
          };
          const newItems = [...options, newItem];
          setOptions(newItems);
          setProductList(options);
        } else {
          const newItem = {
            label: responseObject.options[option].label,
            value: responseObject.options[option].price.value,
            qtySelected: minValue,
            lastCorrectQty: minValue,
            totalPrice:
              responseObject.options[option].price.value *
              options[item].qtySelected,
          };
          const newItems = [...options, newItem];
          setOptions(newItems);
          setProductList(options);
        }
      }
    }
  }

  function GetQuantitySelected(option){
    var itemInOptions = false;
    if(options.length > 0){
      for(var item in options){
        if(options[item].label === responseObject.options[option].label){
          itemInOptions = true;
          console.log()
          return options[item].qtySelected;
        }
      }
     
    }
    if(itemInOptions === false){
      return 0;
    }
  }

  function BlurEvent(id, value, option){
    var input = document.getElementById(id);
    if(value < minValue || value > maxValue){
      if(options.length < 1){
        toast.warning('Value not accepted', {
          position: "top-right",
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }else if(options.length > 0){
        for(var item in options){
          if(options[item].label === responseObject.options[option].label){
            input.value = options[item].lastCorrectQty;
            toast.warning('Value not accepted', {
              position: "top-right",
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
          }
        }
      }else{
        input.value = 0;
      }
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
                <div
                  className='minus-active'
                  id={"minus-" + index}
                  onClick={() => DecreaseItem(option)}
                >
                  <img src={minus} alt="minus" />
                </div>
                <div className="qty">
                  <input
                    id={'input' + index}
                    className="input-field"
                    placeholder={GetQuantitySelected(option)}
                    onChange={(e) => InputChange(e.currentTarget.value, option)}
                    onBlur={(e) => BlurEvent(e.currentTarget.id, e.currentTarget.value, option)}
                  />
                </div>
                <div
                  className='plus-active'
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
