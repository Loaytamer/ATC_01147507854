import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart, CalendarDays, Users, TicketPlus, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import Loading from '../../components/shared/Loading';

interface DashboardStats {
  totalEvents: number;
  totalBookings: number;
  totalUsers: number;
  upcomingEvents: number;
}

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/admin/dashboard`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError(t('admin.errors.fetchStats'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardStats();
  }, [t]);
  
  if (loading) return <Loading />;
  
  if (error) {
    return (
      <div className="bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200 p-4 rounded-md mb-6">
        {error}
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{t('admin.dashboard.title')}</h1>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full mr-4 rtl:ml-4 rtl:mr-0">
              <CalendarDays size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">{t('admin.dashboard.totalEvents')}</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{stats?.totalEvents}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-secondary-100 dark:bg-secondary-900 p-3 rounded-full mr-4 rtl:ml-4 rtl:mr-0">
              <TicketPlus size={24} className="text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">{t('admin.dashboard.totalBookings')}</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{stats?.totalBookings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-accent-100 dark:bg-accent-900 p-3 rounded-full mr-4 rtl:ml-4 rtl:mr-0">
              <Users size={24} className="text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">{t('admin.dashboard.totalUsers')}</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{stats?.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-success-100 dark:bg-success-900 p-3 rounded-full mr-4 rtl:ml-4 rtl:mr-0">
              <BarChart size={24} className="text-success-600 dark:text-success-400" />
            </div>
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">{t('admin.dashboard.upcomingEvents')}</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{stats?.upcomingEvents}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick links */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('admin.dashboard.quickLinks')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/admin/events" 
            className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-700 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
          >
            <span className="font-medium">{t('admin.dashboard.manageEvents')}</span>
            <ArrowRight size={20} />
          </Link>
          <Link 
            to="/admin/events/create" 
            className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-700 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
          >
            <span className="font-medium">{t('admin.dashboard.createEvent')}</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
      
      {/* Tips section */}
      <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary-800 dark:text-primary-200 mb-4">
          {t('admin.dashboard.tips')}
        </h2>
        <ul className="space-y-2 text-primary-700 dark:text-primary-300">
          <li>• {t('admin.dashboard.tip1')}</li>
          <li>• {t('admin.dashboard.tip2')}</li>
          <li>• {t('admin.dashboard.tip3')}</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;