import React, { useContext, useState } from "react";

import { PopUp } from "./PopUp";
import { Vortex } from "../components/ui/vortex";


const Listnft = () => {


  return (
    <div className="overflow-hidden bg-black">
      <Vortex>
        <div className="my-20 z-10">
          <PopUp />
        </div>
   </Vortex>
    </div>
  );
};

export default Listnft;
