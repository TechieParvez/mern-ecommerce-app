const categories = [
  "All",
  "Clothing",
  "Footwear",
  "Electronics",
  "Accessories",
];

function CategoryBar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="bg-white shadow px-4 py-2 flex gap-6 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`whitespace-nowrap font-medium ${
            selectedCategory === cat
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;