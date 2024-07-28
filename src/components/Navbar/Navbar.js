import React, { useState, useEffect } from "react";
import logo from "../../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from '../../redux/cartSlice';
import { clearUser, setUser } from '../../redux/authSlice';


const Navbar = () => {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart);
  const totalItems = user ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(setUser(docSnap.data()));
        } else {
          console.log("No user data found in Firestore.");
        }
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  async function handleLogout() {
    try {
      await auth.signOut();
      dispatch(resetCart());
      dispatch(clearUser());
      navigate('/login');
      toast.success("User Logged Out Successfully!", { position: 'top-center' });
    } catch (error) {
      console.log(error.message);
      toast.error("Logout failed: " + error.message, { position: 'top-center' });
    }
  }

  return (
    <>
      <p className="flex h-10 items-center justify-center bg-gray-900 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        Get free delivery on orders over ₹300
      </p>
      <div className="flex flex-wrap">
        <section className="relative mx-auto w-screen">
          <nav className="flex justify-between bg-white text-black shadow-lg z-20">
            <div className="px-5 xl:px-10 py-6 flex w-full items-center">
              <Link to="/">
                <img className="mr-2 h-10" src={logo} alt="Logo" />
              </Link>
            <Link to="/">
            <h1 className="text-3xl font-bold font-heading">Shoppy</h1>
            </Link>
            
              <form onSubmit={handleSearch} className="hidden md:flex max-w-md mx-auto flex-1">
                <div className="relative flex items-center w-full h-12 rounded-lg bg-white shadow-lg overflow-hidden">
                  <div className="grid place-items-center h-full w-12 text-gray-300">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search something.."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </form>

              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 items-center">
              <li>
                  <Link className="hover:text-gray-500" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Dropdown />
                </li>
                <li>
                  <Link className="hover:text-gray-500" to="/contactus">
                    Contact Us
                  </Link>
                </li>
              </ul>

              <div className="hidden xl:flex items-center space-x-5">
                <Link className="mr-6" to={user ? "/cart" : "/login"}>
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {totalItems > 0 && (
                    <span className="flex absolute -mt-[2rem] ml-4">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-pink-500 text-white text-xs flex items-center justify-center">
                        {totalItems}
                      </span>
                    </span>
                  )}
                </Link>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Hello, {user.name || user.email}</span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-gray-500 hover:border-gray-500 focus:outline-none"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-gray-500 hover:border-gray-500 focus:outline-none"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            <div className="xl:hidden flex items-center space-x-2">
              <form onSubmit={handleSearch} className="flex max-w-md flex-1">
                <div className="relative flex items-center w-full h-12 rounded-lg bg-white shadow-lg overflow-hidden">
                  <div className="grid place-items-center h-full w-12 text-gray-300">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search something.."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </form>
              <button 
                className="navbar-burger self-center" 
                aria-label="Toggle menu"
                onClick={() => setMenuOpen(!menuOpen)}
              >
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="md:hidden flex flex-col items-center space-y-4 mt-4 mb-4">
              <ul className="flex flex-col items-center space-y-4">
                <li className="hover:text-gray-500">
                  <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                </li>
                <li className="hover:text-gray-500">
                  <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
                </li>
                <li>
                  <Dropdown />
                </li>
                <li className="hover:text-gray-500">
                  <Link to="/contactus" onClick={() => setMenuOpen(false)}>Contact Us</Link>
                </li>
                <li>
                  <Link className="hover:text-gray-500" to={user ? "/cart" : "/login"} onClick={() => setMenuOpen(false)}>
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {totalItems > 0 && (
                      <span className="flex absolute -mt-7 ml-4">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-pink-500 text-white text-xs flex items-center justify-center">
                          {totalItems}
                        </span>
                      </span>
                    )}
                  </Link>
                </li>
                {user ? (
                  <div className="flex flex-col items-center space-y-4">
                    <span className="text-gray-700">Hello, {user.name || user.email}</span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="flex items-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-gray-500 hover:border-gray-500 focus:outline-none"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-gray-500 hover:border-gray-500 focus:outline-none"
                  >
                    Login
                  </Link>
                )}
              </ul>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Navbar;
