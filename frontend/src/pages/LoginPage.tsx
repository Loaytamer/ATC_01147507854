import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { t } = useTranslation();
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  
  const onSubmit = async (data: LoginForm) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await login(data.email, data.password);
      
      // Redirect to previous page or home
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } catch (err) {
      setError(authError || t('login.genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {t('login.title')}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            {t('login.subtitle')}
          </p>
        </div>
        
        {error && (
          <div className="bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              {t('login.email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none">
                <Mail size={18} className="text-neutral-500" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', { 
                  required: t('login.emailRequired') as string,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: t('login.emailInvalid') as string
                  }
                })}
                className="pl-10 rtl:pr-10 rtl:pl-4 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.email.message}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              {t('login.password')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none">
                <Lock size={18} className="text-neutral-500" />
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password', { 
                  required: t('login.passwordRequired') as string,
                  minLength: {
                    value: 6,
                    message: t('login.passwordLength') as string
                  }
                })}
                className="pl-10 rtl:pr-10 rtl:pl-4 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.password.message}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('login.loggingIn')}
              </span>
            ) : (
              <>
                <LogIn size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {t('login.loginButton')}
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            {t('login.noAccount')} {' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline">
              {t('login.registerNow')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;