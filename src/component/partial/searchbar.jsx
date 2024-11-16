"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholder-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
   "Search for products, brands, or shops" , 
"What’s trending in fashion?" , 
"Find the latest styles for you" , 
"Search for your favorite products" , 
"Discover top-rated items and reviews" , 
"Looking for something special? Search here" ,
"Search by brand, category, or trend" ,
"Find what you're looking for in a snap" ,
"Explore new arrivals and exclusive deals" ,
"What’s your next must-have?"
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    (<div className="">
     
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>)
  );
}
