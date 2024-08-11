import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";

const Sign = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      setError("All fields are required.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        name: name,
        phoneNumber: phoneNumber,
      });

      console.log("User registered");
      toast.success("User Registered Successfully!", { position: 'top-center' });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhoneNumber("");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { position: 'top-center' });
    }
  };

  return (
    <>
  
      <div className="bg-grey-lighter min-h-[40rem] flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-4 py-4 rounded text-black w-full shadow-xl border-2 border-gray-200 ">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-8 text-3xl text-center font-semibold">Sign up</h1>
              {error && <p className="text-red-500">{error}</p>}
              <input
                type="text"
                className="block w-full p-3 rounded mb-4 border-2 border-gray-200 font-semibold"
                name="fullname"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="block  w-full p-3 rounded mb-4 border-2 border-gray-200 font-semibold"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="block border-2 border-gray-200 w-full p-3 rounded mb-4 font-semibold"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="block border-2 border-gray-200 w-full p-3 rounded mb-4 font-semibold"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <input
                type="number"
                className="block border-2 border-gray-200 w-full p-3 rounded mb-4 font-semibold"
                name="phonenumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1 font-semibold"
              >
                Create Account
              </button>
              <div className="text-center text-sm text-grey-dark mt-4 font-semibold">
                By signing up, you agree to the
                <a
                  className="no-underline text-blue-500 font-semibold"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and 
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </form>
          </div>
          <div className="text-grey-dark mt-6 font-semibold flex gap-1">
            Already have an account?
            <Link
              className="no-underline border-b border-blue text-blue-500"
              to='/login'
            >
              Log in
            </Link>
            .
          </div>
        </div>
      </div>

    </>
  );
};

export default Sign;
