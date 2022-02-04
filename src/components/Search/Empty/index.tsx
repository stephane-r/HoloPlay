import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

import { Spacer } from "../../Spacer";

interface Props {
  value: string;
}

export const SearchEmpty: React.FC<Props> = memo(({ value }) => {
  const { t } = useTranslation();

  return (
    <>
      <Spacer height={10} />
      <Text>
        {t("search.empty")} <Text style={{ fontWeight: "bold" }}>{value}</Text>.
      </Text>
    </>
  );
});
