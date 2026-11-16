import React from "react";

const ProductForm = ({ onAdd, onCancel, products }) => {
  const EMPTY_PRODUCT = {
    name: "",
    price: "",
    category: "Electronics",
  };

  const [product, setProduct] = React.useState(EMPTY_PRODUCT);
  const [errors, setErrors] = React.useState({});

  function validate() {
    const e = {};
    const { name, price } = product;
    if (!name.trim()) {
      e.name = "Name must not be empty";
    } else if (name.trim().length < 3) {
      e.name = "Name must contain atleast 3 letters";
    }

    if (!price || Number.isNaN(Number(price))) {
      e.price = "Price must not be empty";
    } else if (Number.isNaN(Number(price)) || Number(price) <= 0) {
      e.price = "Price must be a number greater than 0";
    }

    const isProductPresent = products.some(
      (p) => p.name.toLowerCase() === name.trim().toLowerCase(),
    );
    if (isProductPresent) {
      e.name = "Product already present";
    }
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    onAdd({
      ...product,
      id: crypto.randomUUID(),
      inStock: true,
      name: product.name.trim(),
      price: Number(product.price),
    });
    setProduct(EMPTY_PRODUCT);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          placeholder="e.g. Wireless Mouse"
          autoFocus
          value={product.name}
          onChange={handleChange}
        />
        {errors.name && <p className="field__error">{errors.name}</p>}
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option>Sports</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Home</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="0"
            value={product.price}
            onChange={handleChange}
          />
          {errors.price && <p className="field__error">{errors.price}</p>}
        </div>
      </div>
      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn">
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
