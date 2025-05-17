import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Calendar, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">EventHub</h3>
            <p className="text-neutral-300 mb-4">
              {t('footer.companyDescription')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-white hover:text-primary-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  {t('navbar.home')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-300 hover:text-white transition-colors">
                  {t('navbar.login')}
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-neutral-300 hover:text-white transition-colors">
                  {t('navbar.register')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <MapPin size={18} className="text-primary-400" />
                <span className="text-neutral-300">123 Event Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone size={18} className="text-primary-400" />
                <span className="text-neutral-300">+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail size={18} className="text-primary-400" />
                <span className="text-neutral-300">info@eventhub.com</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Calendar size={18} className="text-primary-400" />
                <span className="text-neutral-300">{t('footer.businessHours')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-6 text-center text-neutral-400">
          <p>© {currentYear} EventHub. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;