export interface Event {
  _id: string;
  name: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  price: number;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  _id: string;
  userId: string;
  eventId: string;
  event?: Event;
  createdAt: string;
}