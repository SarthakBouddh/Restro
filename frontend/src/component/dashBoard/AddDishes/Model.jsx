import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addDish, getAllCategory } from '../../../https/index.js';
import { enqueueSnackbar } from 'notistack'

const Model = ({ onClose }) => {

    const [dishData, setDishData] = useState({
        name: "",
        price: "",
        categoryId: ""
    });

    const queryClient = useQueryClient();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDishData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dishData);
        dishMutation.mutate({
            name: dishData.name,
            price: Number(dishData.price),
            categoryId: dishData.categoryId
        });
    };

    const dishMutation = useMutation({
        mutationFn: (reqData) => addDish(reqData),
        onSuccess: (data) => {
            // Invalidate and refetch categories and dishes data
            queryClient.invalidateQueries(["categories"]);
            queryClient.invalidateQueries(["dishes"]);
            onClose();
            enqueueSnackbar("Dish is created successfully", { variant: "success" });
        },
        onError: (error) => {
            const { data } = error.response;
            enqueueSnackbar(data.message, { variant: "error" });
            console.log(error);
        }
    })

    // Fetch categories for dropdown
    const { data: categoriesData} = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategory
    });

    console.log(categoriesData);
    
    // Extract categories from API response
    const categories = categoriesData?.data.data || [];

    return (
        <div className='fixed inset-0 text-[#1a7431] bg-black/40 flex items-center justify-center z-50'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='bg-[#80ed99] p-6 rounded-lg shadow-lg w-96 relative z-50'
            >
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-[#1a7431] text-xl font-semibold'>
                        Add Dish
                    </h2>
                    <button
                        onClick={onClose}
                        className='text-[#1a7431] hover:text-red-500 transition-colors'
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>
                {/* Modal content goes here */}
                <form onSubmit={handleSubmit} className='space-y-4 mt-10'>
                    <div>
                        <label className="block m-2 text-sm font-medium">Dish Name</label>
                        <div className="flex items-center rounded-lg p-4 bg-[#6ede7f]">
                            <input
                                type="text"
                                name="name"
                                value={dishData.name}
                                onChange={handleInputChange}
                                className="bg-transparent flex-1 text-[#1a7431] focus:outline-none"
                                placeholder="Enter dish name"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block m-2 text-sm font-medium">Price</label>
                        <div className="flex items-center rounded-lg p-4 bg-[#6ede7f]">
                            <input
                                type="number"
                                name="price"
                                value={dishData.price}
                                onChange={handleInputChange}
                                className="bg-transparent flex-1 text-[#1a7431] focus:outline-none"
                                placeholder="Enter price"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block m-2 text-sm font-medium">Category</label>
                        <div className="flex items-center rounded-lg p-4 bg-[#6ede7f]">
                            <select
                                name="categoryId"
                                value={dishData.categoryId}
                                onChange={handleInputChange}
                                className="bg-transparent flex-1 text-[#1a7431] focus:outline-none"
                                required
                            >
                                <option className='bg-[#6ede7f]' value="">Select a category</option>
                                {categories.map((category) => (
                                    <option className='bg-[#6ede7f]' key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 py-2 text-lg bg-yellow-400 text-gray-900 font-bold rounded-lg"
                    >
                        Add Dish
                    </button>
                </form>


            </motion.div>
        </div>
    );
};

export default Model;
