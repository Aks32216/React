const Product = ({ product }) => {
  return (
    <article className={`card ${product.inStock ? "" : "card--out"}`}>
      <div className="card__top">
        <span className="card__category">{product.category}</span>
        <span
          className={`card__stock ${
            product.inStock ? "card__stock--in" : "card__stock--out"
          }`}
        >
          {product.inStock ? "In stock" : "Sold out"}
        </span>
      </div>
      <h2 className="card__name">{product.name}</h2>
      <p className="card__price">₹{product.price.toLocaleString("en-IN")}</p>
    </article>
  );
};

export default Product;
