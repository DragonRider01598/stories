import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const BrowseStory = () => {
   const [stories, setStories] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchStories = async () => {
         try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/story/?page=${currentPage}`);
            const data = await response.json();
            console.log(data)
            setStories(data.stories);
            setTotalPages(Math.ceil(data.totalStories / 9));
         } catch (error) {
            console.error("Error fetching stories:", error);
         }
      };
      fetchStories();
   }, [currentPage]);

   const readStory = async (id) => {
      try {
         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/story/${id}`, {
            method: 'GET',
            credentials: 'include',
         });
         const obj = await response.json();
         if (response.ok) {
            console.log(obj)
            navigate('/read', { state: { title: obj.title, nodes: obj.nodes, edges: obj.edges } });
         } else {
            alert(obj.message);
         }
      } catch (error) {
         console.error("Error fetching stories:", error);
      }
   }

   return (
      <div>
         <h2 className="text-2xl font-semibold mb-4">Browse All Stories</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
               <div key={story.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-white mb-4">{story.title}</h3>
                  <p className="text-gray-400 mb-4">{story.intro}</p>
                  <button className="px-4 py-2 bg-teal-600 rounded-md text-white hover:bg-teal-700"
                     onClick={() => readStory(story.id)}
                  >
                     Read Story
                  </button>
               </div>
            ))}
         </div>

         <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4">
               <button
                  className="px-4 py-2 rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600"
                  onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
                  disabled={currentPage === 1}
               >
                  Previous
               </button>

               {totalPages <= 10 ? (
                  Array.from({ length: totalPages }, (_, index) => (
                     <button
                        key={index + 1}
                        className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                        onClick={() => setCurrentPage(index + 1)}
                     >
                        {index + 1}
                     </button>
                  ))
               ) : (
                  <>
                     {currentPage > 3 && (
                        <>
                           <button
                              className="px-4 py-2 rounded-md bg-gray-700 text-gray-400"
                              onClick={() => setCurrentPage(1)}
                           >
                              1
                           </button>
                           <span className="text-gray-400">...</span>
                        </>
                     )}
                     {Array.from({ length: 5 }, (_, index) => {
                        const page = Math.max(1, Math.min(currentPage - 2 + index, totalPages));
                        return (
                           <button
                              key={page}
                              className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                              onClick={() => setCurrentPage(page)}
                           >
                              {page}
                           </button>
                        );
                     })}
                     {currentPage < totalPages - 2 && (
                        <>
                           <span className="text-gray-400">...</span>
                           <button
                              className="px-4 py-2 rounded-md bg-gray-700 text-gray-400"
                              onClick={() => setCurrentPage(totalPages)}
                           >
                              {totalPages}
                           </button>
                        </>
                     )}
                  </>
               )}

               <button
                  className="px-4 py-2 rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600"
                  onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))}
                  disabled={currentPage === totalPages}
               >
                  Next
               </button>
            </div>
         </div>
      </div>
   );
};

export default BrowseStory;