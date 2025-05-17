import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusCircle, Edit, Trash2, Search, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';

import { API_URL } from '../../config/constants';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/dateUtils';
import Loading from '../../components/shared/Loading';

const AdminEvents = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(t('admin.errors.fetchEvents'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteClick = (eventId: string) => {
    setDeleteConfirmation(eventId);
  };
  
  const handleDeleteConfirm = async () => {
    if (!deleteConfirmation) return;
    
    try {
      setIsDeleting(true);
      await axios.delete(`${API_URL}/events/${deleteConfirmation}`);
      setEvents(events.filter(event => event._id !== deleteConfirmation));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      setError(t('admin.errors.deleteEvent'));
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleDeleteCancel = () => {
    setDeleteConfirmation(null);
  };
  
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) return <Loading />;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('admin.events.title')}</h1>
        <Link
          to="/admin/events/create"
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
        >
          <PlusCircle size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
          {t('admin.events.createEvent')}
        </Link>
      </div>
      
      {error && (
        <div className="bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('admin.events.searchPlaceholder')}
          className="w-full px-4 py-2 pr-10 rtl:pl-10 rtl:pr-4 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
        />
        <Search size={20} className="absolute top-1/2 transform -translate-y-1/2 right-3 rtl:left-3 rtl:right-auto text-neutral-400" />
      </div>
      
      {/* Events list */}
      {filteredEvents.length === 0 ? (
        <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg text-center">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {searchTerm
              ? t('admin.events.noEventsFound')
              : t('admin.events.noEvents')}
          </p>
          {!searchTerm && (
            <Link
              to="/admin/events/create"
              className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
            >
              <PlusCircle size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
              {t('admin.events.createFirstEvent')}
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-neutral-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    {t('admin.events.eventName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    {t('admin.events.category')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    {t('admin.events.date')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    {t('admin.events.price')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    {t('admin.events.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredEvents.map((event) => (
                  <tr key={event._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">
                        {event.name}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center mt-1">
                        <MapPin size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
                        {event.venue}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                        <Calendar size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
                        {formatDate(event.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      ${event.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                        <Link
                          to={`/admin/events/edit/${event._id}`}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                          title={t('admin.events.edit')}
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(event._id)}
                          className="text-error-600 dark:text-error-400 hover:text-error-900 dark:hover:text-error-300"
                          title={t('admin.events.delete')}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Delete confirmation modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">
              {t('admin.events.confirmDelete')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {t('admin.events.deleteWarning')}
            </p>
            <div className="flex justify-end space-x-3 rtl:space-x-reverse">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 bg-error-600 text-white rounded-md hover:bg-error-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDeleting ? t('common.deleting') : t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;