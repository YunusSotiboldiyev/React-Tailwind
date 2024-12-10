import React, { useEffect, useState } from "react";
import "./style.css"
function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://picsum.photos/v2/list?page=1&limit=12");
      const data = await response.json();
      setImages(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to load images.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Image Gallery</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white shadow-md rounded-lg overflow-hidden max-w-[120px] mx-auto"
            >
              <img
                src={image.download_url}
                alt={image.author}
                className="w-[120px] h-[120px] object-cover"
              />
              <div className="p-2">
                <h2 className="text-xs font-semibold text-gray-700 truncate text-center">
                  {image.author}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
