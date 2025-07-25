import React, { useEffect, useState } from 'react'
import BackButton from '../component/BackButton'
import { TableCard } from '../component/Tables/TableCard'
import { tables } from '../utils/localStorage'
import {keepPreviousData, useQuery} from '@tanstack/react-query'
import { getTable } from '../https/index'
import {enqueueSnackbar} from 'notistack'

const Tables = () => {
    const [status, setStatus] = useState('all');

    const { data:resData , error, isError } = useQuery({
        queryKey:["tables"],
        queryFn:async()=>{
            return await getTable();
        },
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
    if (isError) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    }
   }, [isError, error]);

    return (
        <section className='bg-[#b7efc5] h-[calc(100vh-5rem)] overflow-x-hidden scrollbar-hide'>
            <div className='flex items-center justify-between px-10 py-4'>
                <div className='flex items-center gap-4'>
                    <BackButton />
                    <h1 className='text-[#1a7431] text-2xl
           font-bold tracking-wider'>Tables</h1>
                </div>
                <div className='flex items-center justify-around gap-4'>
                    <button onClick={() => {
                        setStatus("all")
                    }} className={`text-[#1a7431] text-lg
           ${status === "all" && 'bg-[#6ede7f] rounded-lg px-5 py-2'} font-semibold`}>
                        All
                    </button>

                    <button onClick={() => {
                        setStatus("Booked")
                    }} className={`text-[#1a7431] text-lg
           ${status === "Booked" && 'bg-[#6ede7f] rounded-lg px-5 py-2'} font-semibold`}>Booked</button>
                
                    
                <button onClick={() => {
                        setStatus("Available")
                    }} className={`text-[#1a7431] text-lg
           ${status === "Available" && 'bg-[#6ede7f] rounded-lg px-5 py-2'} font-semibold`}>Available</button>
                

                </div>
            </div>

            <div className='flex flex-wrap gap-2 items-start px-10 py-4 ml-13 mb-13'>
                {resData?.data.data
                    .filter(table => status === 'all' || table.status === status)
                    .sort((a, b) => a.TableNo - b.TableNo) // Ascending order
                    .map(table => (
                        <TableCard
                            key={table.tableNo}
                            id={table._id}
                            name={table.tableNo}
                            status={table.status}
                            initials={table.status === 'Booked' ? table?.currentOrder?.customerDetails?.name : ""}
                            seats={table.seats}
                        />
                    ))}

            </div>

        </section>
    )
}

export default Tables