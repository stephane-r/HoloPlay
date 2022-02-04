import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Button, Text, Title } from "react-native-paper";

import { Spacer } from "../../Spacer";

const SearchError: React.FC = memo(() => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  return (
    <>
      <Spacer height={10} />
      <Text>{t("search.error")}</Text>
      <Spacer height={20} />
      <Button mode="contained" onPress={() => navigate("InvidiousInstances")}>
        {t("search.buttonChangeInstance")}
      </Button>
      <Spacer height={20} />
    </>
  );
});

export default SearchError;
