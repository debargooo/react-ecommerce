import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../redux/productSlice'; 
import { CiGrid41, CiCircleList } from "react-icons/ci";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Search from '../components/Search/Search';

const ProductList = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState({
    minCost: '',
    maxCost: '',
    rating: ''
  });

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = (products) => {
    return products.filter(product => {
      const minCost = parseFloat(filter.minCost) || 0;
      const maxCost = parseFloat(filter.maxCost) || Infinity;
      const rating = parseFloat(filter.rating) || 0;

      return (
        (product.price >= minCost && product.price <= maxCost) &&
        (product.rating?.average >= rating) &&
        (product.stock !== 'COMING_SOON') 
      );
    });
  };

  const calculateDiscount = (mrp, price) => {
    return ((mrp - price) / mrp * 100).toFixed(2);
  };

  const filteredProducts = applyFilters(products);

  const renderStars = (rating) => {
    if (rating == null) return null;
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars).fill(null).map((_, index) => <FaStar key={`full-${index}`} className='text-yellow-500' />)}
        {halfStars === 1 && <FaStarHalfAlt className='text-yellow-500' />}
        {Array(emptyStars).fill(null).map((_, index) => <FaRegStar key={`empty-${index}`} className='text-gray-300' />)}
      </>
    );
  };

  const renderSkeletons = () => {
    return Array(8).fill(null).map((_, index) => (
      <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden ${viewMode === 'grid' ? '' : 'flex'}`}>
        <Skeleton height={viewMode === 'grid' ? 192 : 192} width={viewMode === 'grid' ? '100%' : 192} />
        <div className="p-6">
          <Skeleton count={3} />
          <Skeleton width="60%" />
        </div>
      </div>
    ));
  };

  return (
    <>
     <Search/>
      <div className="flex justify-end p-2">
        <button 
          onClick={() => setViewMode('grid')} 
          className={`mr-2 px-4 py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          <CiGrid41 />
        </button>
        <button 
          onClick={() => setViewMode('list')} 
          className={`px-4 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          <CiCircleList />
        </button>
      </div>
      <div className="p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col gap-2 shadow-[0_0_16px_rgba(0,0,0,0.15)] p-6 bg-gray-100">
          <label>
            Min Cost:
            <input 
              type="number" 
              name="minCost" 
              value={filter.minCost} 
              onChange={handleFilterChange} 
              className="border p-2 ml-2"
            />
          </label>
          <span>to</span>
          <label>
            Max Cost:
            <input 
              type="number" 
              name="maxCost" 
              value={filter.maxCost} 
              onChange={handleFilterChange} 
              className="border p-2 ml-2"
            />
          </label>
          <label>
            Rating:
            <div className="flex flex-col">
              <label className='flex gap-2'>
                <input 
                  type="radio" 
                  name="rating" 
                  value="2" 
                  checked={filter.rating === '2'} 
                  onChange={handleFilterChange} 
                />
                <div className='flex gap-1 items-center'>
                  <span>2</span> <FaStar className='text-green-600'/><FaStar className='text-green-600' />
                </div>
              </label>
              <label className='flex gap-2'>
                <input 
                  type="radio" 
                  name="rating" 
                  value="3" 
                  checked={filter.rating === '3'} 
                  onChange={handleFilterChange} 
                />
                <div className='flex gap-1 items-center'>
                  <span>3</span> <FaStar className='text-green-600'/><FaStar className='text-green-600' /> <FaStar className='text-green-600'/>
                </div>
              </label>
              <label className='flex gap-2'>
                <input 
                  type="radio" 
                  name="rating" 
                  value="4" 
                  checked={filter.rating === '4'} 
                  onChange={handleFilterChange} 
                />
                <div className='flex gap-1 items-center'>
                  <span>4</span> <FaStar className='text-green-600'/><FaStar className='text-green-600' /> <FaStar className='text-green-600' /><FaStar className='text-green-600' />
                </div>
              </label>
            </div>
          </label>
        </div>
        <div className={`flex-1 flex flex-col gap-4 p-0 sm:p-4 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-4'} shadow-[0_0_16px_rgba(0,0,0,0.15)] bg-gray-100`}>
          {status === 'loading' ? renderSkeletons() : filteredProducts.map((product) => (
            <Link key={product.pid} to={`/product/${categoryId}/${product.pid}`}>
              <div className={`rounded-lg shadow-2xl overflow-hidden cursor-pointer ${viewMode === 'grid' ? '' : 'flex'}`}>
                <img src={product.images[0]} alt={product.title} className={`object-cover ${viewMode === 'grid' ? 'w-full h-48' : 'w-48 h-auto sm:h-48'}`} />
                <div className=" p-4 sm:p-6">
                  <div className="flex items-baseline">
                    <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">New</span>
                    <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                      {product.category}
                    </div>
                  </div>
                  <h4 className="mt-2 font-bold text-lg text-gray-500">{product.brand}</h4>
                  <h4 className="mt-2 font-semibold text-sm sm:text-lg leading-tight sm:truncate">{product.title}</h4>
                  <p className="mt-2 font-semibold  text-sm sm:text-lg leading-tight sm:truncate">{product.subTitle}</p>
                  <div className="mt-1">
                    <span className='text-gray-700 line-through'>MRP: ₹{product.mrp}</span>
                    <span className="text-black font-semibold ml-2">Price: ₹{product.price}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-green-700 font-semibold">Discount: {calculateDiscount(product.mrp, product.price)}%</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {renderStars(product.rating?.average)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {status === 'failed' && <div>Error: {error}</div>}
        </div>
      </div>

    </>
  );
};

export default ProductList;
