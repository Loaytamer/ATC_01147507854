import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, Tag } from "lucide-react";
import { Event } from "../../types/event";
import { formatDate } from "../../utils/dateUtils";
import { useAuth } from "../../contexts/AuthContext";
import { DEFAULT_EVENT_IMAGE, API_URL } from "../../config/constants";

interface EventCardProps {
  event: Event;
  index: number;
  isBooked?: boolean;
}

const EventCard = ({ event, index, isBooked = false }: EventCardProps) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) return DEFAULT_EVENT_IMAGE;
    if (imagePath.startsWith("http")) return imagePath;
    // Remove /api from the base URL since static files are served at root level
    const baseUrl = API_URL.replace("/api", "");
    return `${baseUrl}${imagePath}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={getImageUrl(event.image)}
          alt={event.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_EVENT_IMAGE;
          }}
        />
        {isAuthenticated && isBooked && (
          <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {t("events.booked")}
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-lg font-bold line-clamp-2">
            {event.name}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center text-neutral-600 dark:text-neutral-300 mb-2">
          <Calendar size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="text-sm">{formatDate(event.date)}</span>
        </div>

        <div className="flex items-center text-neutral-600 dark:text-neutral-300 mb-2">
          <MapPin size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="text-sm line-clamp-1">{event.venue}</span>
        </div>

        <div className="flex items-center text-neutral-600 dark:text-neutral-300 mb-3">
          <Tag size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="text-sm">{event.category}</span>
        </div>

        <p className="text-neutral-700 dark:text-neutral-200 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
            ${event.price.toFixed(2)}
          </span>
          {isAuthenticated && isBooked ? (
            <Link
              to={`/events/${event._id}`}
              className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md transition-colors duration-200 hover:bg-green-200 dark:hover:bg-green-800 flex items-center justify-center"
            >
              {t("events.viewDetails")}
            </Link>
          ) : (
            <Link
              to={`/events/${event._id}`}
              className="px-4 py-2 bg-primary-600 text-white rounded-md transition-colors duration-200 hover:bg-primary-700 flex items-center justify-center font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              {isAuthenticated ? t("events.bookNow") : t("events.viewDetails")}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
