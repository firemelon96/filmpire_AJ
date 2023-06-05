import React, { useRef } from 'react';
import ResponsiveDrawer from './Drawer/Drawer';
import useAlanAi from './AlanAi';

function Root() {
  const alanBtnRef = useRef();

  useAlanAi();

  return (
    <>
      <ResponsiveDrawer />
      <div ref={alanBtnRef} />
    </>
  );
}

export default Root;
