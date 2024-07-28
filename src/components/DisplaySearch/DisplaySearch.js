import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsBySearch } from '../../redux/searchProductSlice';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DisplaySearch = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const dispatch = useDispatch();
  const { searchResults, status, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (query) {
      dispatch(fetchProductsBySearch(query));
    }
  }, [dispatch, query]);

  const calculateDiscount = (mrp, price) => {
    return ((mrp - price) / mrp * 100).toFixed(2);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars).fill(<FaStar className='text-yellow-500' />)}
        {halfStars === 1 && <FaStarHalfAlt className='text-yellow-500' />}
        {Array(emptyStars).fill(<FaRegStar className='text-gray-300' />)}
      </>
    );
  };

  return (
    <>

      <div className="p-4">
        <h1 className="text-2xl mb-4">Search Results for "{query}"</h1>
        {status === 'loading' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill().map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton height={192} />
                <div className="p-6">
                  <Skeleton height={24} width="80%" />
                  <Skeleton height={20} width="60%" />
                  <Skeleton height={20} width="50%" />
                  <Skeleton height={20} width="70%" />
                </div>
              </div>
            ))}
          </div>
        )}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && searchResults.length > 0 ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 shadow-[0_0_16px_rgba(0,0,0,0.15)] bg-gray-100">
              {searchResults.map((product) => (
                <div key={product.pid} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.images[0]} alt={product.title} className="object-cover w-full h-48" />
                  <div className="p-6">
                    <h4 className="mt-2 font-semibold text-lg leading-tight truncate">{product.title}</h4>
                    <div className="mt-1">
                      <span className='text-gray-700 line-through'>MRP: ₹{product.mrp}</span>
                      <span className="text-black font-semibold ml-2">Price: ₹{product.price}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-green-700 font-semibold">Discount: {calculateDiscount(product.mrp, product.price)}%</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="text-teal-600 font-semibold flex">
                        {renderStars(product.rating?.average)}
                      </span>
                      <span className="ml-2 text-gray-600 text-sm">{product.rating?.average} ({product.rating?.count} reviews)</span>
                    </div>
                    {product.badge && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                        {product.badge}
                      </span>
                    )}
                    <Link to={product.url} target="_blank" rel="noopener noreferrer" className="text-white bg-black w-fit p-2 rounded hover:underline mt-2 block">
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          status === 'succeeded' && <p>No results found.</p>
        )}
      </div>

    </>
  );
};

export default DisplaySearch;
