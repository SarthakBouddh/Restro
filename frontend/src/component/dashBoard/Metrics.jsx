import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory, getTable } from "../../https/index.js";

const Metrics = () => {
  // Fetch categories and tables
  const { data: categoriesData = null, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory
  });

  const { data: tables = [], isLoading: tablesLoading, error: tablesError } = useQuery({
    queryKey: ["tables"],
    queryFn: getTable
  });

  // Safely extract categories from API response
  const categories = (() => {
    if (!categoriesData) return [];
    if (categoriesData.data && Array.isArray(categoriesData.data)) {
      return categoriesData.data;
    }
    if (Array.isArray(categoriesData)) {
      return categoriesData;
    }
    return [];
  })();

  // Safely handle tables
  const safeTables = Array.isArray(tables) ? tables : [];

  if (categoriesLoading || tablesLoading) {
    return (
      <div className="container mx-auto py-2 px-6 md:px-4">
        <div className="text-white text-center">Loading details...</div>
      </div>
    );
  }

  if (categoriesError || tablesError) {
    return (
      <div className="container mx-auto py-2 px-6 md:px-4">
        <div className="text-red-500 text-center">
          Error loading details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-6 md:px-4">
      {/* Tables Section */}
      <div className="mb-10">
        <h2 className="font-bold text-2xl text-[#f5f5f5] mb-2">Tables</h2>
        <p className="text-[#ababab] mb-2">Total Tables: <span className="font-semibold text-[#f5f5f5]">{safeTables.length}</span></p>
        <ul className="list-disc ml-6 text-[#f5f5f5]">
          {safeTables.map((table, idx) => (
            <li key={table._id || idx}>Table No: {table.tableNo}</li>
          ))}
        </ul>
      </div>

      {/* Categories and Dishes Section */}
      <div>
        <h2 className="font-bold text-2xl text-[#f5f5f5] mb-2">Categories</h2>
        <p className="text-[#ababab] mb-2">Total Categories: <span className="font-semibold text-[#f5f5f5]">{categories.length}</span></p>
        <ul className="ml-2">
          {categories.map((cat, idx) => (
            <li key={cat._id || idx} className="mb-4">
              <div className="font-semibold text-lg text-[#f5f5f5]">{cat.name}</div>
              <ul className="list-disc ml-6 text-[#f5f5f5]">
                {(cat.items || []).length === 0 && <li>No dishes</li>}
                {(cat.items || []).map((dish, dIdx) => (
                  <li key={dish._id || dIdx}>
                    {dish.name} - ₹{dish.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Metrics;