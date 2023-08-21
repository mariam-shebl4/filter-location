import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  price: string;
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
    id:number;
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

interface DataResponse {
  data: Category[];
}

const DataComponent: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3009/data");
        const dataii = await res.json();
        setData(dataii);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  console.log(data.map(e=>e.id && e.name),'mmmm');
  
// console.log(data.map(e=>e.name));
// console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        hallo
      {data.map((category, index) => (
        <div key={index}>
          <h2>{category.name}</h2>
          
            <div >
             
              <Link to={`/catid/${category.id}`}>llll</Link>
            </div>
       
        </div>
      ))}
    </div>
  );
};

export default DataComponent;
