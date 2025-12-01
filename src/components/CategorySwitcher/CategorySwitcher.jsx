import "./categorySwitcher.css";
import { products } from "../../data/products";

export default function CategorySwitcher({ selectedCategory, onSelect }) {
  const mainCategories = [...new Set(products.map((p) => p.mainCategory))];

  return (
    <div className="category-switcher">
      {mainCategories.map((cat) => (
        <button
          key={cat}
          className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
