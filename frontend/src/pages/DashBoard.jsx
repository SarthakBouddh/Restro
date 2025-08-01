import React, { useState } from 'react'
import { MdCategory, MdTableBar } from 'react-icons/md'
import { BiSolidDish } from 'react-icons/bi'
import { useNavigate, useLocation } from 'react-router-dom'
import RecentOrder from '../component/dashBoard/RecentOrder'
import TableModel from '../component/dashBoard/Addtable/Model'
import DishModel from '../component/dashBoard/AddDishes/Model'
import CategoryModel from '../component/dashBoard/AddCategory/Model'
import Payments from '../component/dashBoard/Payments'

const buttons = [
  {
    label: "Add Table",
    icon: <MdTableBar />,
    action: "table"
  },
  {
    label: "Add Category",
    icon: <MdCategory />,
    action: "category"
  },
  {
    label: "Add Dishes",
    icon: <BiSolidDish />,
    action: "dishes"
  }
]

const tabs = ["Current Orders", "Orders", "Payments"]

const DashBoard = () => {
  const [isTableModelOpen, setIsTableModelOpen] = useState(false);
  const [isCategoryModelOpen, setIsCategoryModelOpen] = useState(false);
  const [isDishesModelOpen, setIsDishesModelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Current Orders")
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ["Current Orders", "Orders", "Payments"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleOpenModel = (action) => {
    setIsCategoryModelOpen(false);
    setIsDishesModelOpen(false);
    setIsTableModelOpen(false);

    if (action === "table") {
      setIsTableModelOpen(true);
    }

    if(action === "category"){
      setIsCategoryModelOpen(true);
    } 

    if(action === "dishes"){
      setIsDishesModelOpen(true);
    }
  }
  return (
    <div className='bg-[#b7efc5] h-[calc(100vh-4.7rem)]'>
      <div className='container mx-auto flex items-center justify-between py-14 px-6 md:px-4'>
        <div className='flex items-center gap-3'>
          {
            buttons.map(({ label, icon, action }) => (
              <button
                key={action}
                onClick={() => handleOpenModel(action)}
                className='bg-[#80ed99] hover:bg-[#262626] px-8 py-3
                 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2'
              >
                {label} {icon}
              </button>
            ))
          }

        </div>

        <div className='flex items-center gap-3'>
          {
            tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-lg text-[#f5f5f5] 
                font-semibold text-md flex items-center gap-2 ${activeTab === tab ? 'bg-[#25ac3a]' : 'bg-[#80ed99] hover:bg-[#353434]'}`}
              >
                {tab}
              </button>
            ))
          }

        </div>
      </div>
      {activeTab === 'Current Orders' && <RecentOrder onlyCurrent={true} />}
      {activeTab === 'Orders' && <RecentOrder />}
      {activeTab === 'Payments' && <Payments />}

      {isTableModelOpen && <TableModel onClose={() => setIsTableModelOpen(false)} />}
      {isDishesModelOpen && <DishModel onClose={() => setIsDishesModelOpen(false)} />}
      {isCategoryModelOpen && <CategoryModel onClose={() => setIsCategoryModelOpen(false)} />}
    </div>
  )
}

export default DashBoard