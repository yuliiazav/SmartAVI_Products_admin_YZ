import { useState, useMemo } from "react";
import "./adminPanel.css";

import { products } from "../../data/products";
import CategorySwitcher from "../CategorySwitcher/CategorySwitcher";
import SearchBar from "../SearchBar/SearchBar";
import ProductTable from "../ProductTable/ProductTable";

// Helper Functions
const getMainCategories = (data) => {
  return [...new Set(data.map((p) => p.mainCategory))];
};
const normalizePartNumber = (str) => {
  if (!str) return "";
  return String(str).toLowerCase().replace(/[-\s]/g, "");
};

export default function AdminPanel() {
  // Initial Category Setup
  const firstCategory = useMemo(() => {
    const categories = getMainCategories(products);
    return categories.length > 0 ? categories[0] : null;
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(firstCategory);
  const [searchTerm, setSearchTerm] = useState("");

  //Search and Grouping Logic
  const groupedProducts = useMemo(() => {
    if (!selectedCategory) return {};

    let result = products.filter((p) => p.mainCategory === selectedCategory);

    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();

      // If a uses pastes p# V2VD2H01S, we normilize this
      const normalizedSearchTerm = normalizePartNumber(term);

      result = result.filter((p) => {
        const normalizedPartNumber = normalizePartNumber(p.partNumber);
        const partMatch = normalizedPartNumber.includes(normalizedSearchTerm);
        const descMatch =
          p.description && String(p.description).toLowerCase().includes(term);
        return partMatch || descMatch;
      });
    }

    //  level grouping (subCategory1 -> subCategory2)

    const groups = result.reduce((acc, item) => {
      const groupKey1 = item.subCategory1 || "No Subcategories";
      // 1st level key setup
      if (!acc[groupKey1]) {
        acc[groupKey1] = {};
      }

      // 2nd level key setup
      // We use subCategory2, or key  "__products__"
      const groupKey2 = item.subCategory2 || "__products__";
      if (!acc[groupKey1][groupKey2]) {
        acc[groupKey1][groupKey2] = [];
      }
      acc[groupKey1][groupKey2].push(item);

      return acc;
    }, {});
    console.log("Grouped Products:", groups);

    return groups;
  }, [selectedCategory, searchTerm]);

  return (
    <div className="admin-wrapper">
      <h1>Products Categories</h1>

      <CategorySwitcher
        selectedCategory={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setSearchTerm("");
        }}
      />

      {selectedCategory && (
        <>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          {/* Iteration of 1st level  */}
          {Object.entries(groupedProducts).map(
            ([subCategory1Title, level2Groups]) => (
              <div key={subCategory1Title}>
                <h2 className="subcat1-title">{subCategory1Title}</h2>

                {/* Iteration of 2nd level (subCategory2) */}
                {Object.entries(level2Groups).map(
                  ([subCategory2Title, itemsList]) => (
                    <div key={subCategory2Title}>
                      {/* Show title only if it is not a help word  */}
                      {subCategory2Title !== "__products__" && (
                        <h3 className="subcat2-title">— {subCategory2Title}</h3>
                      )}

                      <ProductTable data={itemsList} />
                    </div>
                  )
                )}
              </div>
            )
          )}

          {Object.keys(groupedProducts).length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                color: "#777",
                fontSize: "1.3em",
              }}
            >
              No results for "{searchTerm}" the category "{selectedCategory}"
            </div>
          )}
        </>
      )}
    </div>
  );
}
