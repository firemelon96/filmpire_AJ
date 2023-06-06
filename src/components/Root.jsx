import React from 'react';
import ResponsiveDrawer from './Drawer/Drawer';
import useAlanAi from './AlanAi';

function Root() {
  useAlanAi();

  return (
    <>
      <ResponsiveDrawer />
    </>
  );
}

export default Root;
