import React from 'react';
import { useSelector } from 'react-redux';

function HeadComponent() {

  const logo = useSelector((state) => state.generalSettings.websiteLogo);

  return (

    <head>
        <title>{logo.page_title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={logo.favicon} />

        {/* Google Font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter&display=optional" />

        {/* Bootstrap CSS */}
        <link 
          rel="stylesheet" 
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" 
        />
      </head>
  )
}

export default HeadComponent