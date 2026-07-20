import React from "react";
import { Box, Heading, Text, VStack, HStack, Container, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

const ComingSoon: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      // Utilizing your neutral background semantic token
      bg="theme.bg"
      backgroundImage={`
        radial-gradient(circle at 15% 25%, rgba(192, 57, 43, 0.12), transparent 45%),
        radial-gradient(circle at 85% 75%, rgba(232, 104, 26, 0.08), transparent 40%),
        linear-gradient(rgba(136, 136, 160, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(136, 136, 160, 0.04) 1px, transparent 1px)
      `}
      backgroundSize="100% 100%, 100% 100%, 45px 45px, 45px 45px"
      color="theme.text"
      px={4}
    >
      {/* Top Left Floating Back Button */}
      <Box position="absolute" top={6} left={6}>
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          size="sm"
          paddingInline="4"
          borderColor="theme.border"
          bg="theme.bgSubtle"
          backdropFilter="blur(4px)"
          color="theme.textSubtle"
          borderRadius="full"
          fontSize="xs"
          fontWeight="medium"
          letterSpacing="wider"
          _hover={{
            bg: "theme.bgHover",
            color: "theme.text",
            borderColor: "theme.borderPrimary",
          }}
        >
          <LuArrowLeft /> BACK TO HOMEPAGE
        </Button>
      </Box>

      <Container maxW="2xl" textAlign="center" py={12}>
        <VStack gap={10}>
          {/* Top Capsule Badge */}
          <Box
            border="1px solid"
            borderColor="theme.borderPrimary"
            borderRadius="full"
            px={4}
            py={1.5}
            bg="theme.primarySubtle"
            backdropFilter="blur(4px)"
          >
            <Text
              fontSize="xs"
              letterSpacing="widest"
              color="theme.primary"
              textTransform="uppercase"
              fontWeight="bold"
            >
              • Something is brewing •
            </Text>
          </Box>

          {/* Main Editorial Typography */}
          {/* Reduced vertical gap from 10 to 0 to keep text grouped beautifully */}
          <VStack gap={10} lineHeight="0.95" mt="1rem">
            <Heading
              as="h1"
              fontSize={{ base: "6xl", md: "8xl" }}
              fontWeight="800"
              letterSpacing="-0.03em"
              color="theme.text"
            >
              coming
            </Heading>
            <Text
              fontSize={{ base: "6xl", md: "8xl" }}
              fontStyle="italic"
              fontFamily="Georgia, serif"
              fontWeight="400"
              color="theme.accent"
              letterSpacing="-0.01em"
              mt={-2}
            >
              soon
            </Text>
          </VStack>

          {/* Subtle Vertical Divider */}
          <Box w="1px" h="40px" bg="theme.borderStrong" />

          {/* Tagline */}
          <Text
            color="theme.textSubtle"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="0.2em"
            textTransform="uppercase"
          >
            We're working on something great
          </Text>

          {/* Bottom Core Pillars */}
          <HStack
            gap={6}
            pt={4}
            fontSize="10px"
            fontWeight="bold"
            letterSpacing="0.2em"
            color="theme.textMuted"
            textTransform="uppercase"
          >
            <Text>Design</Text>
            <Text color="theme.border">•</Text>
            <Text>Performance</Text>
            <Text color="theme.border">•</Text>
            <Text>Innovation</Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default ComingSoon;
