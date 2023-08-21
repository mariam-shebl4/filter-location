// types.d.ts

interface Coordinates {
    lat: number;
    lng: number;
  }
  
  interface GalleryImage {
    [index: number]: string;
  }
  
  interface Item {
    authorId: number;
    date: string;
    href: string;
    listingCategoryId: number;
    title: string;
    featuredImage: string;
    galleryImgs: GalleryImage;
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
    map: Coordinates;
  }
  
  interface Category {
    name: string;
    href: string;
    count: number;
    thumbnail: string;
    desc: string;
    color: string;
    taxonomy: string;
    listingType: string;
    item: Item[];
  }
  
  interface Data {
    data: Category[];
  }
  