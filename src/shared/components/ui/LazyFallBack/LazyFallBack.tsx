import "./LazyFallBack.css";
import { Flex, Stack, Text } from "@chakra-ui/react";
// Image
// import Logo from "/imgs/fallback_image.webp";
// Icon
import { LuEarthLock } from "react-icons/lu";

const LazyFallback = () => {
  return (
    <Flex width="100%" height="100dvh" justifyContent="center" alignItems="center" bg="theme.bgSubtle">
      <Flex direction="column" alignItems="center" gap="1rem">
        {/* <Box height={{ base: "90px", md: "100px", lg: "130px" }}>
          <Image
            src={Logo}
            alt="logo"
            loading="lazy"
            width="100%"
            height="100%"
            objectFit="contain"
            className="wave_fade"
          />
        </Box> */}
        <Stack
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          fontSize="4rem"
          gap={6}
          className="wave_fade"
        >
          <LuEarthLock /> <Text>Quarantine System</Text>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default LazyFallback;
