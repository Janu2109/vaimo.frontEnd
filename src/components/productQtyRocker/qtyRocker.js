import "./qtyRocker.scss";
import minus from '../../images/minus.png';
import plus from '../../images/plus.png';

function QtyRockerView({ responseObject }) {
  const options = [];

  function OptionPrice(price) {
    const formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(price);
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
          {Object.keys(responseObject.options).map((option) => (
            <>
              <div className="rocker">
                <div className="minus"><img src={minus} alt='minus'/></div>
                <div className="qty"></div>
                <div className="plus-active"><img src={plus} alt='plus'/></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QtyRockerView;
