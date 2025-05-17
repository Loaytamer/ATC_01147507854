import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, MapPin, Tag, Clock, DollarSign, Users } from "lucide-react";
import axios from "axios";

import { API_URL, DEFAULT_EVENT_IMAGE } from "../config/constants";
import { Event } from "../types/event";
import { useAuth } from "../contexts/AuthContext";
import { formatDateTime } from "../utils/dateUtils";
import Loading from "../components/shared/Loading";

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) return DEFAULT_EVENT_IMAGE;
    if (imagePath.startsWith("http")) return imagePath;
    // Remove /api from the base URL since static files are served at root level
    const baseUrl = API_URL.replace("/api", "");
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) {
        setError(t("errors.invalidEventId"));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("Fetching event details for ID:", id);
        console.log("API URL:", `${API_URL}/events/${id}`);

        const response = await axios.get(`${API_URL}/events/${id}`);
        console.log("Event details response:", response.data);

        if (!response.data) {
          throw new Error("No event data received");
        }

        setEvent(response.data);
      } catch (error: any) {
        console.error("Error fetching event details:", error);
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(
            error.response.data?.message || t("errors.fetchEventDetails")
          );
        } else if (error.request) {
          // The request was made but no response was received
          setError(t("errors.noServerResponse"));
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(error.message || t("errors.fetchEventDetails"));
        }
      } finally {
        setLoading(false);
      }
    };

    const checkBookingStatus = async () => {
      if (isAuthenticated && id) {
        try {
          const response = await axios.get(`${API_URL}/bookings/check/${id}`);
          setIsBooked(response.data.isBooked);
        } catch (error) {
          console.error("Error checking booking status:", error);
        }
      }
    };

    fetchEventDetails();
    if (isAuthenticated) {
      checkBookingStatus();
    }
  }, [id, t, isAuthenticated]);

  const handleBookEvent = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setBookingLoading(true);
      await axios.post(`${API_URL}/bookings`, { eventId: id });
      // Navigate to confirmation page
      navigate("/confirmation", {
        state: {
          eventName: event?.name,
          eventDate: event?.date,
          eventVenue: event?.venue,
        },
      });
    } catch (error: any) {
      console.error("Error booking event:", error);
      setError(error.response?.data?.message || t("errors.bookEvent"));
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!event) {
    return (
      <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-300 mb-2">
          {t("eventDetails.notFound")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          {t("eventDetails.notFoundDescription")}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
        >
          {t("common.backToHome")}
        </button>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
        >
          ← {t("common.back")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event image */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={getImageUrl(event.image)}
              alt={event.name}
              className="w-full h-auto rounded-lg object-cover shadow-md max-h-[500px]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = DEFAULT_EVENT_IMAGE;
              }}
            />
          </motion.div>
        </div>

        {/* Event details */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md sticky top-6"
          >
            <h1 className="text-2xl font-bold mb-4">{event.name}</h1>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                <Calendar
                  size={20}
                  className="mr-3 rtl:ml-3 rtl:mr-0 text-primary-600 dark:text-primary-400 flex-shrink-0"
                />
                <span>{formatDateTime(event.date)}</span>
              </div>

              <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                <MapPin
                  size={20}
                  className="mr-3 rtl:ml-3 rtl:mr-0 text-primary-600 dark:text-primary-400 flex-shrink-0"
                />
                <span>{event.venue}</span>
              </div>

              <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                <Tag
                  size={20}
                  className="mr-3 rtl:ml-3 rtl:mr-0 text-primary-600 dark:text-primary-400 flex-shrink-0"
                />
                <span>{event.category}</span>
              </div>

              <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                <DollarSign
                  size={20}
                  className="mr-3 rtl:ml-3 rtl:mr-0 text-primary-600 dark:text-primary-400 flex-shrink-0"
                />
                <span className="font-semibold">${event.price.toFixed(2)}</span>
              </div>
            </div>

            {isBooked ? (
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-md mb-4">
                <p className="font-medium">{t("eventDetails.alreadyBooked")}</p>
              </div>
            ) : (
              <button
                onClick={handleBookEvent}
                disabled={bookingLoading}
                className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {bookingLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("eventDetails.processing")}
                  </span>
                ) : isAuthenticated ? (
                  t("eventDetails.bookNow")
                ) : (
                  t("eventDetails.loginToBook")
                )}
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Event description */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          {t("eventDetails.aboutEvent")}
        </h2>
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
          <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
