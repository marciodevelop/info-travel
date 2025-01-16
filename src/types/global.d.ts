declare namespace TravelTypes {
  interface Sugestion {
    id: string;
    name: string;
    region: string;
    type: string;
  }

  type Room = {
    roomType: {
      name: string;
    };
    price: {
      currency: string;
      amount: number;
    };
    cancellationPolicies: {
      refundable: boolean;
    };
  };
  
  interface Hotel {
    name: string;
    address: string;
    stars: number;
    image: string;
    description: string;
  };
  
  type LowestPrice = {
    currency: string;
    amount: number;
  };
  
  interface HotelData {
    id: number;
    hotel: Hotel;
    lowestPrice: LowestPrice;
    rooms: Room[];
  };
}