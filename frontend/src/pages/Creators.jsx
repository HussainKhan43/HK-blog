import axios from "axios";
import React, { useEffect, useState } from "react";

function Creators() {
  const [creators, setCreators] = useState([]); // Ensure creators is always an array
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/users/admins",
          { withCredentials: true }
        );

        console.log("API Response:", data); // Debugging log

        // Ensure data.admins is an array before setting state
        if (data && Array.isArray(data.admins)) {
          setCreators(data.admins);
        } else {
          console.error("Unexpected API response structure:", data);
          setCreators([]);
        }
      } catch (error) {
        console.error("Error fetching creators:", error);
        setCreators([]);
      } finally {
        setLoading(false); // Stop loading when request completes
      }
    };

    fetchCreators();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center my-20 bg-gray-100 min-h-screen">
      {loading ? (
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      ) : creators.length === 0 ? (
        <p className="text-lg font-semibold text-gray-500">No creators available.</p>
      ) : (
        creators.map((creator) => (
          <div
            key={creator._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2"
          >
            <div className="relative">
              <img
                src={creator.photo?.url || "/default-avatar.png"} // Ensure valid URL
                alt={creator.name || "Creator"}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                <img
                  src={creator.photo?.url || "/default-avatar.png"}
                  alt={creator.name || "Creator"}
                  className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
                />
              </div>
            </div>
            <div className="px-4 py-6 mt-4">
              <h2 className="text-center text-xl font-semibold text-gray-800">
                {creator.name || "Unknown"}
              </h2>
              <p className="text-center text-gray-600 mt-2">{creator.email || "N/A"}</p>
              <p className="text-center text-gray-600 mt-2">{creator.phone || "N/A"}</p>
              <p className="text-center text-gray-600 mt-2">{creator.role || "User"}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Creators;
