import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import axios, { AxiosError } from "axios";

import { API_URL } from "../config/constants";
import { Event } from "../types/event";
import { useAuth } from "../contexts/AuthContext";
import EventCard from "../components/events/EventCard";
import Loading from "../components/shared/Loading";

const HomePage = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching events from:", `${API_URL}/events`);

        const response = await axios.get(`${API_URL}/events`);
        console.log("Events response:", response.data);

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid response format: expected array of events");
        }

        setEvents(response.data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(response.data.map((event: Event) => event.category))
        );
        setCategories(uniqueCategories);
      } catch (error: any) {
        console.error("Error fetching events:", error);
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(error.response.data?.message || t("errors.fetchEvents"));
        } else if (error.request) {
          // The request was made but no response was received
          setError(t("errors.noServerResponse"));
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(error.message || t("errors.fetchEvents"));
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchUserBookings = async () => {
      if (isAuthenticated && user) {
        try {
          console.log(
            "Fetching user bookings from:",
            `${API_URL}/bookings/user`
          );
          const response = await axios.get(`${API_URL}/bookings/user`);
          console.log("Bookings response:", response.data);

          if (!response.data || !Array.isArray(response.data)) {
            console.error("Invalid bookings response format");
            return;
          }

          const bookedEventIds = response.data.map((booking: any) =>
            typeof booking.eventId === "string"
              ? booking.eventId
              : booking.eventId?._id
          );
          setBookings(bookedEventIds);
        } catch (error: any) {
          console.error("Error fetching user bookings:", error);
          console.error("Error response:", error.response);
          console.error("Error message:", error.message);
        }
      }
    };

    fetchEvents();
    if (isAuthenticated) {
      fetchUserBookings();
    }
  }, [t, isAuthenticated, user]);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? event.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loading />;

  return (
    <div>
      {/* Hero section */}
      <div className="relative bg-primary-600 text-white -mx-4 mb-8">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg')] bg-cover bg-center opacity-30"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t("home.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl mb-8">{t("home.heroSubtitle")}</p>

            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("home.searchPlaceholder")}
                className="w-full px-4 py-3 pr-12 rtl:pl-12 rtl:pr-4 rounded-lg text-neutral-800 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
              <Search
                size={20}
                className="absolute top-1/2 transform -translate-y-1/2 right-4 rtl:left-4 rtl:right-auto text-neutral-400"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Filter
            size={20}
            className="mr-2 rtl:ml-2 rtl:mr-0 text-primary-600"
          />
          <h2 className="text-xl font-semibold">
            {t("home.filterByCategory")}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === ""
                ? "bg-primary-600 text-white"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            } transition-colors duration-200`}
          >
            {t("home.allCategories")}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category
                  ? "bg-primary-600 text-white"
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              } transition-colors duration-200`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">{t("home.upcomingEvents")}</h2>

        {error && (
          <div className="bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {filteredEvents.length === 0 ? (
          <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg text-center">
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              {searchTerm || selectedCategory
                ? t("home.noEventsFound")
                : t("home.noEvents")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event._id}
                event={event}
                index={index}
                isBooked={bookings.includes(event._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
