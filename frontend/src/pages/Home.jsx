import React from 'react'
import BottomNav from '../component/BottomNav'
import Greetings from '../component/Home/Greetings'
import MiniCard from '../component/Home/MiniCard'
import { BsCashCoin } from 'react-icons/bs'
import { GrInProgress } from 'react-icons/gr'
import RecentOrder from '../component/Home/RecentOrder'
import PopularDish from '../component/Home/PopularDish'
import { useQuery } from '@tanstack/react-query'
import { getOrder } from '../https/index'

function isToday(date) {
  const d = new Date(date);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function isYesterday(date) {
  const d = new Date(date);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  return d.getDate() === yesterday.getDate() && d.getMonth() === yesterday.getMonth() && d.getFullYear() === yesterday.getFullYear();
}

const Home = () => {
  const { data: resData } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrder
  });

  const orders = resData?.data?.data || [];

  // Calculate today's and yesterday's earnings
  const todayEarnings = orders
    .filter(order => isToday(order.orderDate))
    .reduce((sum, order) => sum + (order.bills?.totalWithTax || 0), 0);

  const yesterdayEarnings = orders
    .filter(order => isYesterday(order.orderDate))
    .reduce((sum, order) => sum + (order.bills?.totalWithTax || 0), 0);

  // Calculate progress percentage
  let progress = 0;
  if (yesterdayEarnings > 0) {
    progress = (((todayEarnings - yesterdayEarnings) / yesterdayEarnings) * 100).toFixed(1);
  } else if (todayEarnings > 0) {
    progress = 100;
  }

  return (
    <>
      <section className='flex bg-[#b7efc5] text-[#f5f5f5] min-h-screen gap-3'>
        {/* Left Portion */}
        <div className='flex-[3]'>
          <Greetings />
          <div className='flex items-center w-full gap-3 px-8 mt-8'>
            <MiniCard title="Total Earning" icon={<BsCashCoin />} number={todayEarnings.toFixed(2)} footerNum={progress + '%'} />
            <MiniCard title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6} />
          </div>
          <RecentOrder />
        </div>

        {/* Right Portion */}
        <div className='flex-[2] bg-[#80ed99] rounded-xl p-5 h-[75vh] mt-5'>
          <PopularDish />
        </div>

      </section>

      {/* <BottomNav /> */}
    </>
  )
}

export default Home
