import React from "react";
import { memo } from "react";

import Instance from "../../components/Instance";
import { useAppSettings } from "../../providers/App";

export const InstanceContainer = memo((props) => {
  const { settings } = useAppSettings();

  return <Instance instance={settings.instance} {...props} />;
});
