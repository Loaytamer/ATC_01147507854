import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { API_URL } from '../../config/constants';
import EventForm from '../../components/forms/EventForm';

const AdminCreateEvent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await axios.post(`${API_URL}/events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate('/admin/events');
    } catch (error: any) {
      console.error('Error creating event:', error);
      setError(error.response?.data?.message || t('admin.errors.createEvent'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('admin.createEvent.title')}</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          {t('admin.createEvent.subtitle')}
        </p>
      </div>
      
      {error && (
        <div className="bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
        <EventForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
};

export default AdminCreateEvent;