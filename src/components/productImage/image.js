import "./image.scss";

function ProductImageView({ source }) {
  return (
    <div className="image-container">
      <img className="product-image" src={source} alt="Product Image" />
    </div>
  );
}

export default ProductImageView;
