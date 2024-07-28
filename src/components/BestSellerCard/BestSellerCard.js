import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellers } from '../../redux/bestSellersSlice';


const BestSellers = () => {
  const dispatch = useDispatch();
  const { bestSellers, status, error } = useSelector((state) => state.best_sellers);
  

  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const itemsToShow = bestSellers.slice(4, 12);

  return (
    <>
      <h1 className='text-center text-3xl font-bold text-black mt-10'>Best Sellers</h1>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-100">
      
        {itemsToShow.map((item) => (
          <div key={item.asin} className="w-80 bg-white shadow border rounded">
            <div
              className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.product_photo})` }}
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
            <div className="p-4 flex flex-col items-center">
              <h4 className="text-gray-800 text-center mt-1 text-xl font-semibold ">{truncateText(item.product_title, 30)}</h4>
              <p className="text-center text-gray-800 mt-1">{item.product_price}</p>
              <div className="inline-flex items-center mt-2">
                <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                  2
                </div>
                <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
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
              <button className="py-2 px-4 bg-black border text-white rounded hover:bg-white active:bg-white hover:text-black active:text-black hover:border-black transition duration-300 ease-in-out disabled:opacity-50 mt-4 w-full flex items-center justify-center">
                Add to order
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default BestSellers;
