import "./LazyFallBack.css";
import { useTranslation } from "react-i18next";
import { Flex, Stack, Text } from "@chakra-ui/react";
// Icon
import { LuEarthLock } from "react-icons/lu";

const LazyFallback = () => {
  const { t } = useTranslation();
  return (
    <Flex width="100%" height="100dvh" justifyContent="center" alignItems="center" bg="theme.bgSubtle">
      <Flex direction="column" alignItems="center" gap="1rem">
        <Stack
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          fontSize={{ base: "2rem", md: "3rem", lg: "4rem" }}
          gap={{ base: 3, md: 6 }}
          className="wave_fade"
        >
          <LuEarthLock /> <Text>{t("Quarantine System")}</Text>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default LazyFallback;
