import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Sun, Moon, Globe, LogOut, UserCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".user-dropdown")) {
      setIsDropdownOpen(false);
    }
  };

  // Add click outside listener
  useState(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <nav className="bg-white dark:bg-neutral-800 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <span className="text-primary-600 dark:text-primary-400 text-2xl font-bold">
              EventHub
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Link
              to="/"
              className="text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {t("navbar.home")}
            </Link>

            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {t("navbar.admin")}
              </Link>
            )}

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                aria-label={
                  theme === "dark"
                    ? t("navbar.lightMode")
                    : t("navbar.darkMode")
                }
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                aria-label={t("navbar.switchLanguage")}
              >
                <Globe size={20} />
              </button>

              {isAuthenticated ? (
                <div className="relative user-dropdown">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1 rtl:space-x-reverse text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <UserCircle size={20} />
                    <span>{user?.name}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-10">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        <LogOut size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                        {t("navbar.logout")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                  >
                    {t("navbar.login")}
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
                  >
                    {t("navbar.register")}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-800 shadow-inner py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {t("navbar.home")}
            </Link>

            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {t("navbar.admin")}
              </Link>
            )}

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                aria-label={
                  theme === "dark"
                    ? t("navbar.lightMode")
                    : t("navbar.darkMode")
                }
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                aria-label={t("navbar.switchLanguage")}
              >
                <Globe size={20} />
              </button>
            </div>

            {isAuthenticated ? (
              <>
                <div className="text-neutral-700 dark:text-neutral-200">
                  {user?.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <LogOut size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                  {t("navbar.logout")}
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-md text-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  {t("navbar.login")}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-md text-center bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
                >
                  {t("navbar.register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
