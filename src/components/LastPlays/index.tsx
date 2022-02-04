import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Title } from "react-native-paper";

import { useData } from "../../providers/Data";
import { CardList } from "../CardList";

export const LastPlays: React.FC = memo(() => {
  const { t } = useTranslation();
  const { state: dataState } = useData();

  if (!dataState.lastPlays || dataState.lastPlays.length === 0) {
    return null;
  }

  return (
    <>
      <Title style={{ fontSize: 27 }}>{t("search.lastPlays")}</Title>
      <CardList data={dataState.lastPlays} setPlaylistFrom="lastPlays" />
    </>
  );
});
