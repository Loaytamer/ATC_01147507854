import mongoose from "mongoose";
import Booking from "../models/Booking.js";

export const dropBookingIndexes = async () => {
  try {
    // Get the collection
    const collection = mongoose.connection.collection("bookings");

    // List all indexes
    const indexes = await collection.indexes();
    console.log("Current indexes:", indexes);

    // Drop all problematic indexes
    const indexesToDrop = [
      "userId_1_eventId_1",
      "event_1_user_1",
      "user_1_event_1",
    ];

    for (const indexName of indexesToDrop) {
      try {
        await collection.dropIndex(indexName);
        console.log(`Successfully dropped index: ${indexName}`);
      } catch (err) {
        console.log(`Index ${indexName} not found or already dropped`);
      }
    }

    // Drop all indexes except _id
    await collection.dropIndexes();
    console.log("Dropped all indexes except _id");

    // Create new non-unique indexes
    await Booking.collection.createIndex({ userId: 1 });
    await Booking.collection.createIndex({ eventId: 1 });
    await Booking.collection.createIndex({ userId: 1, eventId: 1 });
    console.log("Successfully created new non-unique indexes");
  } catch (error) {
    console.error("Error dropping indexes:", error);
  }
};
