import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTable } from '../../../https/index.js';
import { enqueueSnackbar } from 'notistack'

const Model = ({ onClose }) => {

    const [tableData, setTableData] = useState({
        tableNo: "",
        seats: ""
    });

    const queryClient = useQueryClient();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTableData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tableData);
        tableMutation.mutate({
            tableNo: Number(tableData.tableNo),
            seats: Number(tableData.seats)
        });

    };

    const tableMutation = useMutation({
        mutationFn: (reqData) => addTable(reqData),
        onSuccess: (data) => {
            // Invalidate and refetch tables data
            queryClient.invalidateQueries(["tables"]);
            onClose();
            enqueueSnackbar("Table is created successfully", { variant: "success" });
        },
        onError: (error) => {
            const { data } = error.response;
            enqueueSnackbar(data.message, { variant: "error" });
            console.log(error);
        }
    })

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
                        Add Table
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
                        <label className="block m-2 text-sm font-medium">Table Number</label>
                        <div className="flex items-center rounded-lg p-4 bg-[#6ede7f]">
                            <input
                                type="number"
                                name="tableNo"
                                value={tableData.tableNo}
                                onChange={handleInputChange}
                                className="bg-transparent flex-1 text-[#1a7431] focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block m-2 text-sm font-medium">Number of Seats</label>
                        <div className="flex items-center rounded-lg p-4 bg-[#6ede7f]">
                            <input
                                type="number"
                                name="seats"
                                value={tableData.seats}
                                onChange={handleInputChange}
                                className="bg-transparent flex-1 text-[#1a7431] focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 py-2 text-lg bg-yellow-400 text-gray-900 font-bold rounded-lg"
                    >
                        Add Table
                    </button>
                </form>


            </motion.div>
        </div>
    );
};

export default Model;
