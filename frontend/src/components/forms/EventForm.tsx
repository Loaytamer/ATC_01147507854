import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';
import { Event } from '../../types/event';
import { EVENT_CATEGORIES } from '../../config/constants';

interface EventFormProps {
  initialData?: Partial<Event>;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}

const EventForm = ({ initialData, onSubmit, isSubmitting }: EventFormProps) => {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const { register, handleSubmit, formState: { errors } } = useForm<Event>({
    defaultValues: initialData || {
      name: '',
      description: '',
      category: '',
      date: '',
      venue: '',
      price: 0
    }
  });

  const handleFormSubmit = (data: Event) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('date', data.date);
    formData.append('venue', data.venue);
    formData.append('price', data.price.toString());
    
    // Add the image file if it exists
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      formData.append('image', fileInput.files[0]);
    }
    
    onSubmit(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Name */}
        <div className="col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
            {t('eventForm.name')} *
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: t('eventForm.required') as string })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
          />
          {errors.name && <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
            {t('eventForm.description')} *
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description', { required: t('eventForm.required') as string })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
            {t('eventForm.category')} *
          </label>
          <select
            id="category"
            {...register('category', { required: t('eventForm.required') as string })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
          >
            <option value="">{t('eventForm.selectCategory')}</option>
            {EVENT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-error-600">{errors.category.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
            {t('eventForm.date')} *
          </label>
          <input
            id="date"
            type="datetime-local"
            {...register('date', { required: t('eventForm.required') as string })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
          />
          {errors.date && <p className="mt-1 text-sm text-error-600">{errors.date.message}</p>}
        </div>

        {/* Venue */}
        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
            {t('eventForm.venue')} *
          </label>
          <input
            id="venue"
            type="text"
            {...register('venue', { required: t('eventForm.required') as string })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
          />
          {errors.venue && <p className="mt-1 text-sm text-error-600">{errors.venue.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
            {t('eventForm.price')} *
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register('price', { 
              required: t('eventForm.required') as string,
              min: { value: 0, message: t('eventForm.priceMin') as string },
              valueAsNumber: true 
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
          />
          {errors.price && <p className="mt-1 text-sm text-error-600">{errors.price.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="col-span-2">
          <label htmlFor="image" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
            {t('eventForm.image')} {!initialData?._id && '*'}
          </label>
          <div className="mt-1 flex items-center">
            <label className="relative cursor-pointer bg-white dark:bg-neutral-700 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2">
              <span className="flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md">
                <Upload size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {t('eventForm.uploadImage')}
              </span>
              <input 
                id="image" 
                name="image" 
                type="file" 
                className="sr-only" 
                onChange={handleImageChange}
                {...(initialData?._id ? {} : { required: true })}
                accept="image/*"
              />
            </label>
          </div>
          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('common.submitting') : t('common.submit')}
        </button>
      </div>
    </form>
  );
};

export default EventForm;