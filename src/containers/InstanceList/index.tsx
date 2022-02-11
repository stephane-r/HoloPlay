import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";

import InstanceList from "../../components/InstanceList";
import { useAppSettings } from "../../providers/App";
import fetchInvidiousInstances from "../../utils/fetchInvidiousInstances";

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

const InstanceListContainer = () => {
  return <InstanceList />;
};

export default InstanceListContainer;
