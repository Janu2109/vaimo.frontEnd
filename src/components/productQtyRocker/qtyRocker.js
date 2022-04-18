import "./qtyRocker.scss";
import minus from '../../images/minus.png';
import plus from '../../images/plus.png';
import { useState } from "react";
import { useEffect } from "react";

function QtyRockerView({ responseObject, minValue, maxValue, incrementValue }) {
   var options = [];
   
    for (var i in responseObject.options) {
      options.push({
        label: responseObject.options[i].label,
        price: responseObject.options[i].price.value,
        qtySelected: 0,
        lastCorrectQty: 0
      });
   }

  function OptionPrice(price) {
    const formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(price);
  }

  function GetQtySelected(index){
    return options[index].qtySelected;
  }

  function Increase(index){
    if(options[index].qtySelected < maxValue + 1){
      options[index].qtySelected = 5
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
          {Object.keys(responseObject.options).map((option,index) => (
            <>
              <div className="rocker">
                <div className="minus" id={'minus-'+index}><img src={minus} alt='minus'/></div>
                <div className="qty"><input className='input-field' placeholder={GetQtySelected(index)}/></div>
                <div className="plus-active" id={'plus-'+index} onClick={() => Increase(index)}><img src={plus} alt='plus'/></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QtyRockerView;
