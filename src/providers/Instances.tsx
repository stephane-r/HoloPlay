import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";

import fetchInvidiousInstances from "../utils/fetchInvidiousInstances";
import { useAppSettings } from "./App";

const InstanceContext = createContext(null);

export const InstancesProvider = ({ children }) => {
  const { settings } = useAppSettings();
  const { data } = useQuery("invidious-instances", fetchInvidiousInstances);

  return (
    <InstanceContext.Provider
      value={{ data, custom: settings.customInstances }}
    >
      {children}
    </InstanceContext.Provider>
  );
};

export const useInvidiousInstances = () => {
  return useContext(InstanceContext);
};
