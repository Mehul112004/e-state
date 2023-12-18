import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="shadow-md bg-gray-300 w-full justify-center flex">
      <div className="flex justify-between items-center w-[90vw]">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-800">E-</span>
            <span className="text-slate-500">State</span>
          </h1>
        </Link>
        <div className="py-1 h-full">
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-200 hover:text-slate-500 hover:cursor-pointer " />
          </form>
        </div>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-500 hover:text-black hover:cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-500 hover:text-black hover:cursor-pointer">
              About
            </li>
          </Link>
          {currentUser ? null : (<Link to="/sign-up">
            <li className="sm:inline text-slate-500 hover:text-black hover:cursor-pointer">
              Sign Up
            </li>
          </Link>)}
          
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.rest.avatar}
                alt="profile"
                className="rounded-full h-7 w-7 object-cover"
              />
            ) : (
              <li className="sm:inline text-slate-500 hover:text-black hover:cursor-pointer">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
