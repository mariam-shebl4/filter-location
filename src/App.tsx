
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DataComponent from './components/DataComponent';
import CategoryDetails from './components/CategoryDetails';
import { useEffect, useState } from 'react';

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
function App() {
  const [data, setData] = useState<Category[]>([]);
 

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3009/data");
        const dataii = await res.json();
        setData(dataii);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
// console.log(data.map(e=>e.name));
// console.log(data);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <DataComponent/> } />
        <Route path="/catid/:id" element={ <CategoryDetails data={data}/> } />
        
        
      </Routes>
     
    </div>
  );
}

export default App;
