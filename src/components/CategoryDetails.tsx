import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Slider } from "@mui/material";

interface Listing {
  authorId: number;
  date: string;
  href: string;
  listingCategoryId: number;
  title: string;
  featuredImage: string;
  galleryImgs: string[];
  commentCount: number;
  viewCount: number;
  like: boolean;
  address: string;
  reviewStart: number;
  reviewCount: number;
  location: string;
  price: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff: string;
  isAds: string;
  map: {
    lat: number;
    lng: number;
  };
}

interface Category {
  id: number;
  name: string;
  href: string;
  count: number;
  thumbnail: string;
  desc: string;
  color: string;
  taxonomy: string;
  listingType: string;
  item: Listing[];
}

interface ItemDetailsProps {
  data: Category[]; // Pass the data from the parent component
}

function valuetext(value: number) {
  return `${value}°C`;
}
const ItemDetailsPage = ({ data }: ItemDetailsProps) => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [value, setValue] = useState<number[]>([20, 37]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const { id = "" } = useParams<{ id: string }>();

  const selectedCategory = data.find(
    (category) => category.id === parseInt(id)
  );

  if (!selectedCategory) {
    return <div>Category not found.</div>;
  }

  console.log(selectedCategory.item.map((e) => e.price));

  
  const handleLocationChange = (location: string) => {
    setSelectedLocations((prevLocations) => {
      if (prevLocations.includes(location)) {
        return prevLocations.filter((loc) => loc !== location);
      } else {
        return [...prevLocations, location];
      }
    });
  };



  // Filtered items based on selected locations
 
  const filteredItems = isFormSubmitted
  ? selectedCategory.item.filter(
      (item) =>
        selectedLocations.length === 0 ||
        selectedLocations.includes(item.location) ||
        value.length === 0 ||
        (Number(item.price) >= value[0] && Number(item.price) <= value[1])
    )
  : selectedCategory.item;

  //reset the filter
  const handleResetFilters = () => {
    setIsFormSubmitted(false);
    setSelectedLocations([]);
    setValue([20, 37]);
  };
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsFormSubmitted(!isFormSubmitted);
  };
  
  return (
    <div>
      {/* ?-------------------------------------------------------------------------------------------------------------- */}

      <div className="relative">
        <>
          <div className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
            <form  onSubmit={handleSubmit}
   className="overflow-hidden rounded-2xl shadow-xl bg-sky-400 0 border border-neutral-200 dark:border-neutral-700">
              <div className="relative flex flex-col px-5 py-6 space-y-5">
                {/* // map the filterd data here */}

                {selectedCategory.item.map((item) => (
                  <div key={item.location}>
                    <input
                      type="checkbox"
                      id={item.location}
                      name={item.location}
                      checked={selectedLocations.includes(item.location)}
                      onChange={() => handleLocationChange(item.location)}
                    />
                    <label>{item.location}</label>
                    <br />
                  </div>
                ))}
              </div>
              <button type="submit"> submit</button>
              <button onClick={handleResetFilters}>Reset Filters</button>

            </form>
          </div>
        </>
      </div>

      {/* Filter checkboxes */}
      <div className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
        <div className="overflow-hidden rounded-2xl shadow-xl bg-sky-400 0 border border-neutral-200 dark:border-neutral-700">
          <div className="relative flex flex-col px-5 py-6 space-y-5">
            {selectedCategory.item.map((item) => (
              <div key={item.location}>
                <input
                  type="checkbox"
                  id={item.location}
                  name={item.location}
                  checked={selectedLocations.includes(item.location)}
                  onChange={() => handleLocationChange(item.location)}
                />
                <label>{item.location}</label>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------------------------------------------------- */}

      {filteredItems.map((item) => (
        <div key={item.href} className="bg-slate-500 my-5">
          <h1>{item.date}</h1>
          <h1>{item.location}</h1>
          <h2>view count {item.viewCount}</h2>
          <h1>Price is ${item.price} per night</h1>
        </div>
      ))}

      {/* ?-------------------------------------------------------------------------------------------------------------- */}

      <>
        <div className="mt-12">
          <div className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-emerald-950  border border-neutral-200 dark:border-neutral-700">
              <div className="relative flex flex-col px-5 py-6 space-y-8">
                <div className="space-y-5">
                  <span className="font-medium">Price per day</span>
                  <Box sx={{ width: 300 }}>
                    <Slider
                      getAriaLabel={() => "Price range"}
                      value={value}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                    />
                  </Box>
                </div>
              </div>
              <div>
                Selected Price Range: ${value[0]} - ${value[1]}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ItemDetailsPage;
