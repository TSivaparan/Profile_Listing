import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfiles } from "../redux/slices/ProfileSlice.js";

const ProfileDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { profiles, status, error } = useSelector((state) => state.profiles);

  useEffect(() => {
    if (profiles.length === 0) {
      dispatch(fetchProfiles({ page: 1, limit: 10 })); 
    }
  }, [dispatch, profiles.length]);

  
  const selectedProfile = profiles.find((profile) => profile.client_id === id);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!selectedProfile) return <p>No profile found.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 ">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-lg w-full p-6 relative">
        
      
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          
          <h1 className="text-lg font-semibold text-gray-800 mb-4 text-center whitespace-nowrap">
            Profile Detail
          </h1>

       
          <img
            src={selectedProfile.client_profile_url}
            alt={selectedProfile.client_name}
            className="w-40 h-40 squared-full object-cover border-2 border-gray-300"
          />
        </div>

      
        <div className="flex flex-col justify-center md:pl-6 mt-10 md:mt-15 md:w-2/3">
          <p className="flex items-center text-gray-700 mb-3">
            <svg
                  className="w-5 h-5 mr-2 text-gray-500" 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
            {selectedProfile.client_name}
          </p>
          <p className="flex items-center text-gray-700 mb-2">
          
            <svg className="w-5 h-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
            {selectedProfile.client_city}
          </p>

          <p className="flex items-center text-gray-700">
          
            <svg className="w-5 h-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            {selectedProfile.client_mobile}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;
