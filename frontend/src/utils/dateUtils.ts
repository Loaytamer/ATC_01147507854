import { format, parseISO } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
import i18n from 'i18next';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    const locale = i18n.language === 'ar' ? ar : enUS;
    
    return format(date, 'PPP', { locale });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    const locale = i18n.language === 'ar' ? ar : enUS;
    
    return format(date, 'PPp', { locale });
  } catch (error) {
    console.error('Error formatting date-time:', error);
    return dateString;
  }
};