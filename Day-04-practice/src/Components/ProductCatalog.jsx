import React from "react";
import PRODUCTS from "../data/products";
import Product from "./Product";
import ProductForm from "./ProductForm";

// key -> label shown in the <select>
const SORTING_ORDER = {
  DEFAULT: "Default",
  PRICE_LOW_TO_HIGH: "Price: Low to High",
  PRICE_HIGH_TO_LOW: "Price: High to Low",
  NAME_ASC: "Name: A to Z",
  NAME_DESC: "Name: Z to A",
};

// key -> compare function used by .sort()
const SORT_FUNCTIONS = {
  DEFAULT: () => 0,
  PRICE_LOW_TO_HIGH: (a, b) => a.price - b.price,
  PRICE_HIGH_TO_LOW: (a, b) => b.price - a.price,
  NAME_ASC: (a, b) => a.name.localeCompare(b.name),
  NAME_DESC: (a, b) => b.name.localeCompare(a.name),
};

const ProductCatalog = () => {
  const [products, setProducts] = React.useState(PRODUCTS);
  const [category, setCategory] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [order, setOrder] = React.useState("DEFAULT");
  const [isInstockEnabled, setIsInstockEnabled] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // close the modal when Escape is pressed
  React.useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsModalOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  function handleSetDefaultFilters() {
    setCategory("all");
    setQuery("");
    setOrder("DEFAULT");
    setIsInstockEnabled(false);
  }

  function handleAddProduct(item) {
    setProducts((prev) => [...prev, item]);
    setIsModalOpen(false);
  }

  const visibleProducts = [...products]
    .sort(SORT_FUNCTIONS[order])
    .filter((p) => p.category.toLowerCase() === category || category === "all")
    .filter((p) => p.name.toLocaleLowerCase().includes(query))
    .filter((p) => p.inStock || !isInstockEnabled);

  return (
    <main className="shop">
      <header className="shop__header">
        <p className="shop__eyebrow">Product Catalog</p>
        <h1 className="shop__title">
          Everything you need,
          <br />
          <span>one clean shelf.</span>
        </h1>
        <p className="shop__summary">
          Showing <strong>{visibleProducts.length}</strong> of {products.length}{" "}
          products
        </p>
        <button className="btn btn--add" onClick={() => setIsModalOpen(true)}>
          + Add Product
        </button>
      </header>

      {isModalOpen && (
        <div className="overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal__head">
              <h2 id="modal-title">Add a product</h2>
              <button
                className="modal__close"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <ProductForm
              onAdd={handleAddProduct}
              onCancel={() => setIsModalOpen(false)}
              products={products}
            />
          </div>
        </div>
      )}

      <section className="toolbar">
        <label className="toggle">
          <input
            type="checkbox"
            value="In Stock Only"
            checked={isInstockEnabled}
            onChange={(e) => setIsInstockEnabled(e.target.checked)}
          />
          <span className="toggle__box" />
          In stock only
        </label>
        <input
          className="toolbar__search"
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase().trim())}
        />
        <select
          className="toolbar__select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="home">Home</option>
          <option value="sports">Sports</option>
        </select>
        <select
          className="toolbar__select"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          {Object.entries(SORTING_ORDER).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </section>

      <section className="grid">
        {visibleProducts.length === 0 ? (
          <div className="empty">
            <p className="empty__title">No products to show</p>
            <p className="empty__hint">
              Try changing or clearing your filters.
            </p>
            <button className="btn" onClick={handleSetDefaultFilters}>
              Clear all filters
            </button>
          </div>
        ) : (
          visibleProducts.map((p) => {
            return <Product key={p.id} product={p} />;
          })
        )}
      </section>
    </main>
  );
};

export default ProductCatalog;
