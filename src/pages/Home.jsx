import { useEffect, useState } from "react";
import { fetchProfiles } from "../redux/slices/ProfileSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const { profiles, status, error } = useSelector((state) => state.profiles);

  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    dispatch(fetchProfiles({ page: 1, limit: 50 })); 
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;


  const filteredProfiles = profiles.filter(profile =>
    profile.client_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const displayedProfiles = filteredProfiles.slice(0, visibleCount);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile Listing</h1>

      
      <input
        type="text"
        placeholder="Search profiles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

     
      {displayedProfiles.length === 0 ? (
        <p className="text-center text-gray-500">No profiles found.</p>
      ) : (
        <>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayedProfiles.map((profile) => (
              <motion.div 
                key={profile.client_id} 
                className="p-4 border rounded shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img src={profile.client_profile_url} alt={profile.client_name} className="w-20 h-20 rounded-full" />
                <h2 className="text-lg font-semibold">{profile.client_name}</h2>
                <Link to={`/profile/${profile.client_id}`} className="text-blue-500 mt-2 block">
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
          {filteredProfiles.length > 6 && (
            <button 
              onClick={() => setVisibleCount(visibleCount === 6 ? filteredProfiles.length : 6)} 
              className="p-2 bg-blue-500 text-black mt-4 w-1/3 rounded"
            >
              {visibleCount === 6 ? "Show More" : "Show Less"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
