import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
// Image
import NotFound from "/imgs/not_found.png";

const PageNotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Flex width="100%" height="100dvh" justifyContent="center" alignItems="center" bgColor="theme.bg">
      <Flex direction="column" alignItems="center" gap={0} rounded="xl">
        <VStack>
          <Text fontSize={{ base: "4rem", sm: "4.5rem", md: "6rem" }} lineHeight={1.15} color="theme.primary">
            {t("404")}
          </Text>
          <Box borderBottom="5px solid" borderColor="theme.primary" width="70px"></Box>
        </VStack>
        <Box height={{ base: "150px", sm: "200px", md: "250px" }}>
          <Image src={NotFound} alt="not_found_image" loading="lazy" width="full" height="full" objectFit="contain" />
        </Box>
        <Flex direction="column" gap="0.5rem" alignItems="center">
          <Text fontSize={{ base: "2xl", md: "4xl" }} color="theme.text">
            {t("Oops! Page Not Found")}
          </Text>
          <Text
            color="theme.textSubtle"
            textAlign="center"
            fontSize={{ base: "sm", md: "md" }}
            paddingInline={{ base: "1rem", md: "6rem", lg: "0" }}
            width={{ lg: "75%" }}
          >
            {t("The page you were looking for doesn't exist, or might have been moved. Let's get you back on track.")}
          </Text>
        </Flex>
        <HStack marginTop={{ base: "2rem", sm: "3rem" }}>
          <Button
            onClick={() => navigate("/")}
            paddingInline="1rem"
            color="theme.textOnPrimary"
            bgColor="theme.primary"
            _hover={{ opacity: 0.85 }}
            transition="all 0.15s ease"
            rounded="sm"
          >
            {t("Back to home")}
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default PageNotFound;
