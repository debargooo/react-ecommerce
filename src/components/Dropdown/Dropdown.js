import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    navigate(`/products/${category}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-20">
      <button
        onClick={toggleDropdown}
        className="py-2 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200  text-black shadow-sm hover:bg-gray-50"
      >
        Select Category
        <svg
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg outline-none dark:bg-neutral-800 dark:border-neutral-700">
          <div
            onClick={() => handleSelect('clo,ash,ank,edy')}
            className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            Men's T-Shirts
          </div>
          <div
            onClick={() => handleSelect('ash,axc,mmk,kp7')}
            className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            Men's Shirts
          </div>
          <div
            onClick={() => handleSelect('clo,vua,k58,i51')}
            className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            Men's Jeans
          </div>
          <div
            onClick={() => handleSelect('clo,cfv,cib,jks')}
            className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            Kurtas
          </div>
          <div
            onClick={() => handleSelect('clo,8on,zpd,9og')}
            className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            Sarees
          </div>
          <div
            onClick={() => handleSelect('clo,cfv,cib,rkt&q')}
            className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            Women's Kurtas
          </div>
          <div
            onClick={() => handleSelect('clo,vua,k58,4hp')}
            className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            Women's Jeans
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
