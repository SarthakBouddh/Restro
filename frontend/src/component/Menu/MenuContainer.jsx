import React, { useState } from 'react'
import { GrRadialSelected } from 'react-icons/gr'
import { FaShoppingCart } from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import { addItems } from '../../redux/slice/CartSlice.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMenu } from '../../https/index.js';

const MenuContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemCounts, setItemCounts] = useState({});
  const dispatch = useDispatch()

  const incrementItem = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrementItem = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = itemCounts[item._id] || 0;
    if (quantity === 0) return;

    const { name, price} = item;
    const newObj = {
      id: Date.now(),
      name,
      pricePerQuantity: price,
      quantity,
      price: price * quantity,
    };

    dispatch(addItems(newObj));
    setItemCounts((prev) => ({
      ...prev,
      [item._id]: 0,
    }));
  };

  const queryClient = useQueryClient();

  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      try {
        const res = await getMenu();
        if(!res?.data?.data){
          console.log("res not load");
        }
        return res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log({ categories });

  return (
    <div className='overflow-x-scroll scrollbar-hide'>
      {/* Top menu grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 w-full'>
        {isLoading ? (
          <div className="text-[#05be30] text-center col-span-full">Loading categories...</div>
        ) : isError ? (
          <div className="text-red-500 text-center col-span-full">Error loading categories. Please try again.</div>
        ) : !categories || categories.length === 0 ? (
          <div className="text-[#05be30] text-center col-span-full">No categories available. Add some categories first.</div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className='flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer text-white'
              style={{ backgroundColor: category.bgColor }}
              onClick={() => setSelectedCategory(category)}
            >
              <div className='flex items-center justify-between w-full'>
                <h1 className='text-lg font-semibold'>
                  {category.icon} {category.name}
                </h1>
                {selectedCategory?._id === category._id && (
                  <GrRadialSelected className='text-white' size={20} />
                )}
              </div>
              <p className='text-white text-sm font-semibold px-5'>{(category.items || []).length} Items</p>
            </div>
          ))
        )}
      </div>

      <hr className='border-[#2a2a2a] border-t-2 mt-4' />

      {/* Selected category's dishes grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-4 w-full'>
        {selectedCategory ? (
          (selectedCategory.items && selectedCategory.items.length > 0) ? (
            selectedCategory.items.map((dish) => (
              <div
                key={dish._id}
                className='flex flex-col items-center justify-between \
                p-4 rounded-lg h-[100px] cursor-pointer text-[#1a7431] hover:bg-[#48cf5c] bg-[#6ede7f]'
              >
                <div className='flex items-center justify-between w-full'>
                  <h1 className='text-lg font-semibold'>{dish.name}</h1>
                  <button onClick={() => handleAddToCart(dish)} className='hover:bg-[#0b1d17] bg-[#1a4134] text-[#02ca3a] p-2 rounded-lg cursor-pointer'>
                    <FaShoppingCart size={20}/>
                  </button>
                </div>
                <div className='flex items-center justify-between w-full'>
                  <p className='text-sm'>₹{dish.price}</p>
                  <div className='flex items-center px-6 py-2 rounded-lg'>
                    <button onClick={() => decrementItem(dish._id)} className='text-yellow-500 text-4xl'>
                      &minus;
                    </button>
                    <span className='text-white px-5'>
                      {itemCounts[dish._id] || 0}
                    </span>
                    <button onClick={() => incrementItem(dish._id)} className='text-yellow-500 text-4xl'>
                      &#43;
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-center col-span-full">No dishes in this category. Add some dishes first.</div>
          )
        ) : (
          <div className="text-white text-center col-span-full">Select a category to view dishes</div>
        )}
      </div>
    </div>
  );
};

export default MenuContainer;
