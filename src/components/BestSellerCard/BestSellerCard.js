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

  const truncateText = (text, wordLimit) => {
    if (!text || typeof text !== 'string') return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ');
  };


  const itemsToShow = bestSellers.slice(4, 12);

  return (
    <>
      <h1 className='text-center text-3xl font-bold text-black mt-[10rem]'>Best Sellers</h1>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-[1490px] m-auto">
        {itemsToShow.map((item) => (
          <div key={item.asin} className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300 w-auto p-[20px]">
            <div className="relative">
              <img className="w-full h-[15rem] object-cover" src={item.product_photo} alt={item.product_title} />
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-xs font-medium">SALE</div>
            </div>
            <div className="p-2">
            <h3 className="text-xl font-semibold mb-2">{truncateText(item.product_title, 3)}</h3>
              <p className="text-sm font-semibold mb-2">{item.product_title}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">{item.product_price}</span>
                <button className="bg-black text-white font-bold py-1 px-3 rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BestSellers;
