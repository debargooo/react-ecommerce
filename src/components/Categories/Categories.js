import React from "react";
import mens from "../../Assets/mens.jpg";
import womens from "../../Assets/womens.jpg";
import kids from "../../Assets/kids.jpg";
import { Link } from "react-router-dom";
const Categories = () => {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold text-black mt-[10rem]">
        Popular Categories
      </h1>
      <div className="mt-10 p-4 gap-4 grid sm:flex sm:gap-0 justify-evenly items-center  ">
        <Link to='/products/clo,ash,ank,edy' className="w-80 bg-white shadow border rounded sm:hover:scale-110 sm:transition-transform cursor-pointer	">
          <div
            className="h-80 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-no-repeat bg-center "
            style={{ backgroundImage: `url(${mens})` }}
          >
            <div className="flex justify-between">
              <button className="text-white hover:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <div>
              <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                available
              </span>
            </div>
          </div>
          
        </Link>
        <Link to='/products/clo,8on,zpd,9og' className="w-80 bg-white shadow border rounded sm:hover:scale-110 sm:transition-transform cursor-pointer	">
          <div
            className="h-80 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-no-repeat bg-center "
            style={{ backgroundImage: `url(${womens})` }}
          >
            <div className="flex justify-between">
              <button className="text-white hover:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <div>
              <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                available
              </span>
            </div>
          </div>
          
        </Link>
        <div className="w-80 bg-white shadow border rounded sm:hover:scale-110 sm:transition-transform	cursor-pointer">
          <div
            className="h-80 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${kids})` }}
          >
            <div className="flex justify-between">
              <button className="text-white hover:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <div>
              <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                available
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
