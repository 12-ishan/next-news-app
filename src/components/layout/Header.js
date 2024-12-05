'use client';
import Link from 'next/link';
import '../../../styles/css/style.css';
import styles from '../../../styles/Header.module.css';

//import '../../../styles/css/bootstrap/bootstrap-grid.css';
//import '../../../styles/css/bootstrap/bootstrap-reboot.css';
//import '../../../styles/css/aos.css';
//import '../../../styles/css/bootstrap.min.css';
// /import '../../../styles/css/magnific-popup.css';
//import '../../../styles/css/owl.theme.default.min.css';
// import '../../../styles/scss/style.scss';
// import '../../../styles/scss/bootstrap/bootstrap.scss';
// import '../../../public/assets/fonts/icomoon/style.css';
// import '../../../styles/css/owl.carousel.min.css';
import NewsCategories from '../NewsCategories';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { websiteLogo } from '@/redux/slice/generalSettingsSlice';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const logo = useSelector((state) => state.generalSettings.websiteLogo);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(websiteLogo()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <header className={`${styles.navbar} site-navbar`} role="banner">
      <div>
        <div className="container">

          <div className={`${styles.row}`}>

            <div className={styles.menuContainer}>
              <div className={styles.menuIcon} onClick={toggleMenu}>
                <span className={`${styles.bar} ${isOpen ? styles.bar1 : ""}`}></span>
                <span className={`${styles.bar} ${isOpen ? styles.bar2 : ""}`}></span>
                <span className={`${styles.bar} ${isOpen ? styles.bar3 : ""}`}></span>
              </div>
              <nav className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <NewsCategories />
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className={`${styles.navWidth} order-1`}>
              <Link href="/" className="js-logo-clone">
                {isLoading ? (
                  <Skeleton width={150} height={60} />
                ) : (
                  <Image
                    className="img-fluid"
                    src={logo.image}
                    alt="logo"
                    width={150}
                    height={60}
                  />
                )}
              </Link>
             
            </div>

            <div className={`${styles.searchBox} order-1`}>
              <form
                onSubmit={handleSearch}
                className="site-block-top-search d-flex align-items-center"
              >
                <input
                  type="text"
                  className={`${styles.searchInput} form-control`}
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button type="submit" className="btn btn-dark">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`${styles.mainMenu} site-navigation text-right text-md-center`}
        role="navigation"
      >
        <div className="container">
          <ul className="site-menu js-clone-nav d-none d-md-block">
            <li>
              <Link href="/">Home</Link>
            </li>
            <NewsCategories />
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
