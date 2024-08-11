import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/productDetailsSlice';
import { addToCart } from '../redux/cartSlice';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase'; 
import parse from 'html-react-parser';
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, status, error } = useSelector((state) => state.productDetails);
  const [user, setUser] = useState(null); 
  const [selectedImage, setSelectedImage] = useState('');
  const [showAllOffers, setShowAllOffers] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); 
    });

    return () => unsubscribe(); 
  }, []);

  const renderStars = (rating) => {
    if (rating == null || isNaN(rating) || rating < 0) return null;

    const validRating = Math.min(Math.max(rating, 0), 5);
    const fullStars = Math.floor(validRating);
    const halfStars = validRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={`full-${index}`} className='text-yellow-500' />
        ))}
        {halfStars === 1 && <FaStarHalfAlt className='text-yellow-500' />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <FaRegStar key={`empty-${index}`} className='text-gray-300' />
        ))}
      </>
    );
  };

  if (status === 'loading') {
    return (
      <>
        <div className='p-4 flex flex-col md:flex-row gap-4'>
          <div className='md:w-1/2'>
            <Skeleton height={400} />
            <div className='flex gap-2 mt-2'>
              <Skeleton width={96} height={96} circle />
              <Skeleton width={96} height={96} circle />
              <Skeleton width={96} height={96} circle />
            </div>
            <div className='mt-4 flex gap-4'>
              <Skeleton width={120} height={40} />
              <Skeleton width={120} height={40} />
            </div>
          </div>
          <div className='md:w-1/2 p-4'>
            <Skeleton height={32} width={200} />
            <Skeleton height={20} width={150} />
            <div className='mt-4'>
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={200} />
            </div>
            <div className='mt-4'>
              <Skeleton height={20} width={150} />
            </div>
            <Skeleton count={3} />
            <Skeleton count={1} height={20} />
            <Skeleton count={1} height={20} width={120} />
          </div>
        </div>
      </>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const handleShowMore = () => {
    setShowAllOffers(!showAllOffers);
  };

  const offersToDisplay = (product.offers || []).slice(0, showAllOffers ? undefined : 5);

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product));
      toast.success("Added to Cart!");
    } else {
      navigate('/login'); 
    }
  };

  const handleBuyNow = () => {
    if (user) {
      alert('Proceed to Checkout!');
    } else {
      navigate('/login'); 
    }
  };

  

  return (
    <>
      <div className='container m-auto p-4 flex flex-col md:flex-row gap-4'>
        <div className='md:w-1/2 bg-white'>
          <img
            src={selectedImage}
            alt={product.title}
            className=' w-[35rem] h-[35rem] object-contain '
            onError={(e) => <div className='bg-white'></div>}
          />
          <div className='flex gap-2 mt-2'>
            {(product.images || []).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} thumbnail ${index}`}
                className={` w-24 h-24 object-contain cursor-pointer ${image === selectedImage ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setSelectedImage(image)}
                onError={(e) => <div className='bg-white'></div>}
              />
            ))}
          </div>
          <div className='mt-4 flex gap-4 '>
            <button
              onClick={handleAddToCart}
              className='w-full bg-gray-900  text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 '
            >
              Add to Cart
            </button>
            <ToastContainer />
            <button
              onClick={handleBuyNow}
              className='w-full bg-gray-900  text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 '
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className='md:w-1/2 p-4 bg-white'>
          <h1 className='text-2xl font-bold text-gray-800  mb-2'>{product.title}</h1>
          <p className='text-lg font-semibold text-gray-600 mt-2'>{product.brand}</p>
          <div className='mt-4'>
            <span className='text-gray-700 line-through'>MRP: ₹{product.mrp}</span>
            <span className='text-black font-semibold ml-2'>Price: ₹{product.price}</span>
            <div className='mt-2'>
              <span className='text-green-700 font-semibold'>Special Price: ₹{product.specialPrice}</span>
            </div>
          </div>
          <div className='mt-4'>
            {renderStars(product.rating?.average)}
            <span className='ml-2 text-gray-600 text-sm'>
              {product.rating?.overall?.average} ({product.rating?.overall?.count} reviews)
            </span>
          </div>
          <div class="mb-4">
                    <span class="font-bold text-gray-700 ">Select Color:</span>
                    <div class="flex items-center mt-2">
                        <button class="w-6 h-6 rounded-full bg-gray-800  mr-2"></button>
                        <button class="w-6 h-6 rounded-full bg-red-500  mr-2"></button>
                        <button class="w-6 h-6 rounded-full bg-blue-500  mr-2"></button>
                        <button class="w-6 h-6 rounded-full bg-yellow-500  mr-2"></button>
                    </div>
                </div>
                <div class="mb-4">
                    <span class="font-bold text-gray-700 ">Select Size:</span>
                    <div class="flex items-center mt-2">
                        <button class="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">S</button>
                        <button class="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">M</button>
                        <button class="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">L</button>
                        <button class="bg-gray-300  text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">XL</button>
                        <button class="bg-gray-300  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 ">XXL</button>
                    </div>
                </div>
        
          <ul className='mt-8 list-disc pl-5'>
            {(offersToDisplay || []).map((offer, index) => (
              <li key={index} className='text-sm text-gray-700'>{offer}</li>
            ))}
            {(product.offers || []).length === 0 && (
              <li className='text-sm text-gray-700'>No offers available</li>
            )}
          </ul>
          {(product.offers || []).length > 5 && (
            <button
              onClick={handleShowMore}
              className='mt-4 text-blue-500 hover:underline'
            >
              {showAllOffers ? 'Show Less' : 'Show More'}
            </button>
          )}
          {(product.reviews || []).map((review, index) => (
            <div key={index} className='mt-4 border-t pt-4'>
              <div className='flex items-center'>
                {renderStars(review.rating)}
                <span className='ml-2 text-gray-600 text-sm'>{review.rating}</span>
              </div>
              <p className='mt-2 text-lg font-semibold'>{review.title}</p>
              <p className='mt-2 text-gray-700'>{review.review}</p>
              <p className='mt-2 text-gray-600'>{`Reviewed by ${review.reviewer}`}</p>
              <p className='text-gray-600'>{`Location: ${review.location}`}</p>
              {review.images && review.images.length > 0 && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {review.images.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`Review image ${imgIndex}`}
                      className='w-24 h-24 object-cover'
                      onError={(e) => e.target.src = 'default-image-url'}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
