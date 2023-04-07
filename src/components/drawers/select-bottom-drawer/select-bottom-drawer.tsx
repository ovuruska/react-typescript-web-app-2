import React, { useState } from "react";
import {Box,  Drawer} from "@mui/material";

interface SelectBottomDrawerProps {
  open: boolean;
  children: React.ReactNode;
}

const SelectBottomDrawer : React.FC<SelectBottomDrawerProps> = ({
  open,
children
                      }) => {

  const list = () => (
    <Box
      sx={{
        width: "100%",
        height: "50%",
        padding: "16px",
        backgroundColor: "background.paper",
      }}
    >
      {
        children
      }
    </Box>
  );

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };


  return (
    <div onClick={stopPropagation}>
      <Drawer
        anchor="bottom"
        open={open}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default SelectBottomDrawer;