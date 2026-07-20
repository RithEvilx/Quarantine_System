import "./LazyFallBack.css";
import { Box, Flex, Image } from "@chakra-ui/react";
// Image
import Logo from "/imgs/fallback_image.webp";

const LazyFallback = () => {
  return (
    <Flex width="100%" height="100dvh" justifyContent="center" alignItems="center" bg="#edf2f7">
      <Flex direction="column" alignItems="center" gap="1rem">
        <Box height={{ base: "90px", md: "100px", lg: "130px" }}>
          <Image
            src={Logo}
            alt="logo"
            loading="lazy"
            width="100%"
            height="100%"
            objectFit="contain"
            className="wave_fade"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LazyFallback;
