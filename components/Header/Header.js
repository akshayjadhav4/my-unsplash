import React from "react";
import AddPhotoModal from "../AddPhotoModal/AddPhotoModal";
import { useAuth } from "../../utils/auth";

const Header = ({ searchTerm, setSearchTerm }) => {
  const { user, signout } = useAuth();

  return (
    <div className="flex items-center pt-4 flex-wrap">
      {/* account */}
      <div className="account flex items-center mr-12">
        <svg
          className="w-7"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
        <div className="account-details flex flex-col items-start ml-1">
          <h4 className="font-bold">My Unsplash</h4>
          <p className="font-normal text-black">
            {user?.email ? user?.email : "devchallenges.io(Guest)"}
          </p>
        </div>
        {user?.uid && (
          <span
            className="ml-2 cursor-pointer border border-gray-400 p-1 rounded-lg hover:bg-gray-400 hover:text-white"
            onClick={() => {
              signout();
            }}
          >
            Sign Out
          </span>
        )}
      </div>
      {/* account end */}

      {/* search */}
      <div className="search-form">
        <form className="relative">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
          />
        </form>
      </div>
      {/* search end */}

      {/* add photo / login button */}
      <div className="actions-button ml-auto">
        <AddPhotoModal />
      </div>
      {/* add photo / login button end */}
    </div>
  );
};

export default Header;
