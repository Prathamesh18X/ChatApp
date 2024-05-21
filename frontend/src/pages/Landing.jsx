import React from "react";
import {Link} from "react-router-dom"
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { MdKeyboardArrowDown, MdHistory } from "react-icons/md";
import { SiAdblock } from "react-icons/si";

const Landing = () => {
  return (
    <div className="h-screen w-screen">
      <header className="flex justify-between w-full h-[15vh] p-4  text-white">
        <div>
          <img
            src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716113819/Logo/rn4ihnpiptrahzc4pwg9.svg"
            alt="not found"
            className="w-14"
          />
        </div>
        <div className="flex items-center">
          <Link to="/login">
          <button className="btn btn-ghost rounded-full hover:bg-slate-700 dark:bg-indigo-600 text-white btn-primary mx-2">
            Login
          </button>
          </Link>
          <Link to="/signup">
          <button className="btn btn-ghost rounded-full hover:bg-slate-700 dark:bg-indigo-600 text-white btn-primary mx-2">
            Signup
          </button>
          </Link>
        </div>
      </header>

      <div className="flex h-[70vh] text-white ">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-8xl w-full flex justify-center items-center font-bold m-2">
            <span className="text-[#0086cd]">Chat</span>
            <span>App</span>
          </h1>
          <p className="m-2">Socialize, Connect and Chat with conversations</p>
          <Link to="/signup">
          <button className="btn btn-lg text-white rounded-full bg-[#0086cd] border-none hover:bg-slate-700">
            Get started <FaArrowRight />
          </button>
          </Link>
          
        </div>
        <div className="flex justify-center items-center w-full">
          <img
            src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716266104/Logo/e0s40h5yoypkhuprrkb6.svg"
            alt="logo not found"
            className="w-90 h-80"
          />
        </div>
      </div>

      <div className="bg-[#0086cd] flex h-[80vh] text-white">
        <div className="flex justify-center items-center w-full">
          <img
            src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716290420/Landing%20Page%20Assets/rgqdmacovheyaxgossvn.svg"
            alt="logo not found"
            className="w-85 h-80"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-2xl w-[80vh] font-bold m-2">
            <span className="text-gray-700">ChatApp</span> is a best way to
            build network with your friends, and{" "}
            <span className="text-gray-700">Assistant</span> helps you to solve
            your questions.
          </h1>
          <p className="m-2">Know More </p>
          <MdKeyboardArrowDown />
        </div>
      </div>

      <div className="flex flex-col items-center h-[70vh] text-black py-16">
        <h2 className="text-3xl font-bold mb-8">What this ChatApp has?</h2>
        <div className="flex flex-col  text-2xl">
          <div className="flex justify-around w-full max-w-4xl gap-10">
            <div className="flex flex-col items-center">
              <img
                src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716293459/Landing%20Page%20Assets/rj5op5fgapawuaxtf5n2.svg"
                alt="App"
                className="w-60 h-70"
              />
            </div>
            <div className="flex justify-center items-center text-white ">
              <FaPlus/>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716293311/Landing%20Page%20Assets/pzqlccg5cdml6gmowll3.svg"
                alt="AI"
                className="w-60 h-60"
              />
            </div>
          </div>
          <div className="flex justify-around w-full gap-28 text-white font-bold max-w-4xl">
            <p className="mt-4">Messaging</p>
            <p className="mt-4">Assistant</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-gray-400 text-black py-16">
        <h2 className="text-3xl font-bold mb-8">ChatApp Supports!</h2>
        <div className="flex justify-around w-full max-w-4xl gap-10 font-bold text-lg">
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716290418/Landing%20Page%20Assets/b1emxkxjdrbb6u2xzqaf.svg"
              alt="Authentication"
              className="w-60 h-60"
            />
            <p className="mt-4">Authentication</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716290416/Landing%20Page%20Assets/xxanhn9pkjwr9wchx6ji.svg"
              alt="Groups and Messaging"
              className="w-60 h-60"
            />
            <p className="mt-4">Groups & Messaging</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716290417/Landing%20Page%20Assets/ozhqpkssl4mogmfzmovw.svg"
              alt="Chatbot"
              className="w-60 h-60"
            />
            <p className="mt-4">AI Assistant</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white text-black py-16">
        <h2 className="text-3xl font-bold mb-8">Features of the App</h2>
        <div className="flex flex-col justify-around w-full max-w-4xl">
          <div className="flex gap-4 items-center">
            <img
              src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716290416/Landing%20Page%20Assets/exrrep1zwermli3vvt1b.svg"
              alt="Create Group"
              className="w-20 h-20"
            />
            <p className="mt-4">Create Group with all your friends</p>
          </div>
          <div className="flex gap-4 items-center">
            <MdHistory className="w-20 h-20"/>
            <p className="mt-4">Get History of questions asked to Assistant</p>
          </div>
          <div className="flex gap-4 items-center">
            <img
              src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716290416/Landing%20Page%20Assets/ksqr2svlc9fnqcjtzsot.svg"
              alt="View Profile"
              className="w-20 h-20"
            />
            <p className="mt-4">View Profile of users and message them, get to know there bio </p>
          </div>
          <div className="flex gap-4 items-center">
          <SiAdblock className="w-20 h-16"/>
            <p className="mt-4">Block User if not interested in messaging </p>
          </div>
        </div>
        <h2 className="my-8 font-bold"> +  Much more</h2>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">Thank you for visiting!</h2>
          <p className="mt-4">Created by Prathmesh Patil</p>
          <p className="mt-4 link"><a target="_blank" href="https://github.com/Prathamesh18X/ChatApp">Source Code 🔗</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
