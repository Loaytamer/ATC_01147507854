import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Home, Calendar, MapPin } from 'lucide-react';
import { formatDateTime } from '../utils/dateUtils';

const ConfirmationPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { eventName, eventDate, eventVenue } = location.state || {};
  
  useEffect(() => {
    // Redirect to home if page is accessed directly without state
    if (!eventName) {
      navigate('/');
    }
  }, [eventName, navigate]);
  
  if (!eventName) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden"
      >
        <div className="bg-success-600 p-8 flex flex-col items-center justify-center text-white">
          <div className="bg-white rounded-full p-3 mb-4">
            <Check size={40} className="text-success-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {t('confirmation.bookingConfirmed')}
          </h1>
          <p className="text-center text-success-100">
            {t('confirmation.ticketReserved')}
          </p>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-bold mb-6 text-neutral-800 dark:text-white">
            {t('confirmation.eventDetails')}
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="w-1/3 font-medium text-neutral-600 dark:text-neutral-400">
                {t('confirmation.eventName')}:
              </div>
              <div className="w-2/3 font-semibold text-neutral-800 dark:text-white">
                {eventName}
              </div>
            </div>
            
            {eventDate && (
              <div className="flex items-start">
                <div className="w-1/3 font-medium text-neutral-600 dark:text-neutral-400">
                  {t('confirmation.eventDate')}:
                </div>
                <div className="w-2/3 text-neutral-800 dark:text-white flex items-center">
                  <Calendar size={16} className="mr-2 rtl:ml-2 rtl:mr-0 text-primary-600" />
                  {formatDateTime(eventDate)}
                </div>
              </div>
            )}
            
            {eventVenue && (
              <div className="flex items-start">
                <div className="w-1/3 font-medium text-neutral-600 dark:text-neutral-400">
                  {t('confirmation.venue')}:
                </div>
                <div className="w-2/3 text-neutral-800 dark:text-white flex items-center">
                  <MapPin size={16} className="mr-2 rtl:ml-2 rtl:mr-0 text-primary-600" />
                  {eventVenue}
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
              >
                <Home size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {t('confirmation.backToHome')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-8 text-center text-neutral-600 dark:text-neutral-400 text-sm">
        <p>{t('confirmation.emailNotice')}</p>
      </div>
    </div>
  );
};

export default ConfirmationPage;