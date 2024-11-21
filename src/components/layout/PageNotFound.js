import React from 'react';

function PageNotFound() {
  return (
    <main style={{
      fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      height: '100vh',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>
        <h1 style={{
          display: 'inline-block',
          margin: '0px 20px 0px 0px',
          padding: '0px 23px 0px 0px',
          fontSize: '24px',
          fontWeight: '500',
          verticalAlign: 'top',
          lineHeight: '49px',
          borderRight: '1px solid rgba(0,0,0,.3)'
        }}>
          404
        </h1>
        <div style={{ display: 'inline-block' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '49px',
            margin: '0px'
          }}>
            This page could not be found.
          </h2>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
