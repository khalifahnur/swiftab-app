export type Data = {
    id: number;
    image: any;
    title: string;
    text: string;
  };
  
  export const data: Data[] = [
    {
      id: 1,
      image: require('@/assets/images/lottie/discover.json'),
      title: 'Discover Amazing Restaurants',
      text: 'Discover top-rated local and international restaurants near you.Find the perfect spot for any occassion',
    },
    {
      id: 2,
      image: require('@/assets/images/lottie/reserve2.json'),
      title: 'Easy reservation',
      text: 'Book your table in a few taps.Choose your date,time and guest size no more long awaits or uncertainty',
    },
    {
      id: 3,
      image: require('@/assets/images/lottie/favourite.json'),
      title: 'Build your favourite restaurant collection',
      text: 'Customize your wishlist best on your favourite restaurants.',
    },
  ];