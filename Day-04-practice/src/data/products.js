// Note: plain .json can't call functions, so this is a JS module.
// crypto.randomUUID() generates a new id each time the app loads.
const products = [
  { id: crypto.randomUUID(), name: "Wireless Mouse", category: "Electronics", price: 799, inStock: true },
  { id: crypto.randomUUID(), name: "Mechanical Keyboard", category: "Electronics", price: 3499, inStock: true },
  { id: crypto.randomUUID(), name: "Bluetooth Speaker", category: "Electronics", price: 2299, inStock: false },
  { id: crypto.randomUUID(), name: "USB-C Hub", category: "Electronics", price: 1599, inStock: true },
  { id: crypto.randomUUID(), name: "Noise Cancelling Headphones", category: "Electronics", price: 7999, inStock: true },
  { id: crypto.randomUUID(), name: "Cotton T-Shirt", category: "Clothing", price: 499, inStock: true },
  { id: crypto.randomUUID(), name: "Denim Jeans", category: "Clothing", price: 1799, inStock: true },
  { id: crypto.randomUUID(), name: "Hooded Sweatshirt", category: "Clothing", price: 1299, inStock: false },
  { id: crypto.randomUUID(), name: "Running Shoes", category: "Clothing", price: 2999, inStock: true },
  { id: crypto.randomUUID(), name: "Leather Belt", category: "Clothing", price: 699, inStock: true },
  { id: crypto.randomUUID(), name: "JavaScript: The Good Parts", category: "Books", price: 599, inStock: true },
  { id: crypto.randomUUID(), name: "Clean Code", category: "Books", price: 899, inStock: false },
  { id: crypto.randomUUID(), name: "Atomic Habits", category: "Books", price: 499, inStock: true },
  { id: crypto.randomUUID(), name: "The Pragmatic Programmer", category: "Books", price: 1099, inStock: true },
  { id: crypto.randomUUID(), name: "Stainless Steel Bottle", category: "Home", price: 649, inStock: true },
  { id: crypto.randomUUID(), name: "Desk Lamp", category: "Home", price: 999, inStock: true },
  { id: crypto.randomUUID(), name: "Coffee Maker", category: "Home", price: 3299, inStock: false },
  { id: crypto.randomUUID(), name: "Yoga Mat", category: "Sports", price: 899, inStock: true },
  { id: crypto.randomUUID(), name: "Dumbbell Set", category: "Sports", price: 2499, inStock: true },
  { id: crypto.randomUUID(), name: "Badminton Racket", category: "Sports", price: 1399, inStock: false },
];

export default products;
