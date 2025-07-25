import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import { updateTable } from '../../redux/slice/CustomerSlice';
import { getRandomBG } from '../../utils/localStorage';
import { getAvatarName } from '../../pages/index';

export const TableCard = ({ id, name = 'N/A', status = 'Available', initials = '', seats = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bgColor = useMemo(() => getRandomBG(id || initials), [id, initials]);

  const handleClick = () => {
    if (status === 'Booked') return;
    dispatch(updateTable({ table: { tableId: id, tableNo: name } }));
    navigate('/menu');
  };

  return (
    <div
      onClick={handleClick}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
      className="w-[300px] text-[#1a7431] hover:bg-[#80ed99] bg-[#6ede7f] p-4 rounded-lg m-4 cursor-pointer outline-none focus:ring-2 focus:ring-green-700 transition"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-xl font-semibold">Table: {name}</h1>
        <p
          className={`${
            status === 'Booked'
              ? 'text-green-400 bg-[#067d20]'
              : 'bg-[#7a5800] text-white'
          } px-3 py-2 rounded-lg text-sm font-medium`}
        >
          {status}
        </p>
      </div>

      <div className="flex items-center justify-center my-5">
        <h1
          className={`${initials ? bgColor : 'bg-[#1a7431]'} text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-semibold`}
        >
          {status === "Booked" && initials ? getAvatarName(initials) : 'N/A'}
        </h1>
      </div>

      <p className="text-xs text-[#1a7431]">
        Seats: <span className="font-medium">{seats}</span>
      </p>
    </div>
  );
};
