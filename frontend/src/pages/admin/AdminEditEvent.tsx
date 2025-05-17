import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { API_URL } from '../../config/constants';
import { Event } from '../../types/event';
import EventForm from '../../components/forms/EventForm';
import Loading from '../../components/shared/Loading';

const AdminEditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(t('admin.errors.fetchEventDetails'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id, t]);
  
  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await axios.put(`${API_URL}/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate('/admin/events');
    } catch (error: any) {
      console.error('Error updating event:', error);
      setError(error.response?.data?.message || t('admin.errors.updateEvent'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) return <Loading />;
  
  if (!event) {
    return (
      <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-300 mb-2">
          {t('admin.editEvent.notFound')}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          {t('admin.editEvent.notFoundDescription')}
        </p>
        <button
          onClick={() => navigate('/admin/events')}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
        >
          {t('admin.editEvent.backToEvents')}
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('admin.editEvent.title')}</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          {t('admin.editEvent.subtitle')}
        </p>
      </div>
      
      {error && (
        <div className="bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
        <EventForm 
          initialData={event} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
};

export default AdminEditEvent;