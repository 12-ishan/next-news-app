'use client';
import Link from 'next/link';
import '../../../styles/css/style.css';
import '../../../styles/css/bootstrap/bootstrap-grid.css';
import '../../../styles/css/bootstrap/bootstrap-reboot.css';
import '../../../styles/css/aos.css';
import '../../../styles/css/bootstrap.min.css';
import '../../../styles/css/magnific-popup.css';
import '../../../styles/css/owl.theme.default.min.css';
import '../../../styles/scss/style.scss';
import '../../../styles/scss/bootstrap/bootstrap.scss';
import '../../../public/assets/fonts/icomoon/style.css';
import '../../../styles/css/owl.carousel.min.css';
import NewsCategories from '../NewsCategories';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { websiteLogo } from '@/redux/slice/generalSettingsSlice';
import Image from 'next/image';



function Header({ cartData = [] }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const logo = useSelector((state) => state.generalSettings.websiteLogo);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(searchQuery);


  useEffect(() => {
      dispatch(websiteLogo());
  }, []);
 
 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <header className="site-navbar" role="banner">
      <div className="site-navbar-top">
        <div className="container">
          <div className="row align-items-center justify-content-between">

          <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
          <form onSubmit={handleSearch} className="site-block-top-search d-flex align-items-center">
            <span className="icon icon-search2"></span>
            <input  type="text" 
                  className="form-control border-0 mx-2" 
                  placeholder="Search"
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="btn btn-outline-secondary">Search</button>

          </form>
        </div>


            <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
              <div className="">
                <Link href="/" className="js-logo-clone "> <Image
                    className="img-fluid"
                    src={logo.image}
                    alt="logo"
                    width={100} 
                    height={100} 
                /></Link>
              </div>
            </div>


           

          </div>
        </div>
      </div> 
     
      <nav className="site-navigation text-right text-md-center" role="navigation">
        <div className="container">
          <ul className="site-menu js-clone-nav d-none d-md-block">
          <li>
          <Link href='/'>Home</Link></li> 
          <NewsCategories />
          <li><Link href='/contact'>Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header