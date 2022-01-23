import React from 'react';
import Header from '../../presentation/header/Header';

function withHeader<T>(Component: React.FC<T>): React.FC<T> {
  return (props: T) => (
    <>
      <Header />
      <Component {...props} />
    </>
  ); 
}

export default withHeader;
