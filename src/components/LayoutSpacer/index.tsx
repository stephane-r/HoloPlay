import React from "react";

import useKeyboard from "../../hooks/useKeyboard";
import { Video } from "../../types";
import Spacer from "../Spacer";

interface Props {
  video: null | Video;
}

const LayoutSpacer: React.FC<Props> = ({ video }) => {
  const [visible] = useKeyboard();

  const height = visible || video === null ? 0 : 50;

  return <Spacer height={height} />;
};

export default LayoutSpacer;
