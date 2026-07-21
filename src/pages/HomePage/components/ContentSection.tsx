import { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Input,
  Stack,
  VStack,
  HStack,
  Heading,
  GridItem,
  IconButton,
  SimpleGrid,
  InputGroup,
} from "@chakra-ui/react";
// Icons
import { LuChevronLeft, LuChevronRight, LuEarthLock, LuPlus, LuSearch, LuSettings } from "react-icons/lu";
// Constant
import { fallBackImage } from "@/app/configs/app";

const ContentSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track whether buttons should be disabled
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Function to check the scroll position and update button states
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      // Can scroll left if we aren't at the very beginning (0)
      setCanScrollLeft(scrollLeft > 1);

      // Can scroll right if we haven't reached the max scroll width minus current view width
      // Subtracted 1 to handle potential sub-pixel rounding issues in browsers
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Set up event listeners to monitor scrolling and window resizing
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check initial state
      checkScrollPosition();

      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  return (
    <Stack height="full" padding={{ md: "0.5rem 1rem" }} gap={{ base: 3, md: 4 }}>
      {/* Header Section */}
      <Stack direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 12 }}>
        {/* Branding */}
        <Heading size="2xl" flex={1}>
          <HStack whiteSpace="nowrap">
            <Box fontSize="2.25rem">
              <LuEarthLock />
            </Box>
            Quarantine System
          </HStack>
        </Heading>
        {/* Search Section */}
        <HStack flex={1}>
          {/* Search Input */}
          <InputGroup
            startElement={
              <Flex justifyContent="center" alignItems="center" boxSize="40px" fontSize="1.5rem">
                <LuSearch />
              </Flex>
            }
          >
            <Input
              type="text"
              bgColor="theme.bg"
              rounded="md"
              _focus={{ border: "1px solid", borderColor: "theme.borderSubtle" }}
            />
          </InputGroup>
          {/* Filter Button */}
          <IconButton variant="subtle" border="1px solid" borderColor="theme.borderSubtle">
            <LuSettings />
          </IconButton>
        </HStack>
      </Stack>

      {/* Filter Section */}
      <HStack gap={2} width="full" alignItems="center">
        {/* Previous Button */}
        <IconButton
          aria-label="Previous"
          onClick={() => handleScroll("left")}
          variant="subtle"
          rounded="full"
          disabled={!canScrollLeft} // Disables if cannot scroll left
          border="1px solid"
          borderColor="theme.borderSubtle"
          marginTop={{ base: "0.15rem", md: "0.5rem" }}
        >
          <LuChevronLeft />
        </IconButton>

        {/* Filter Section Container */}
        <HStack
          ref={scrollContainerRef}
          marginBlock={{ base: "0", md: "0.75rem", lg: "1.5rem 1rem" }}
          gap={{ base: 2, md: 3 }}
          overflowX="auto"
          flex={1}
          css={{
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <IconButton
              key={index}
              variant="subtle"
              paddingInline="1rem"
              rounded="full"
              border="1px solid"
              borderColor="theme.borderSubtle"
              whiteSpace="nowrap"
            >
              Beverage
            </IconButton>
          ))}
        </HStack>

        {/* Next Button */}
        <IconButton
          aria-label="Next"
          onClick={() => handleScroll("right")}
          variant="subtle"
          rounded="full"
          disabled={!canScrollRight} // Disables if cannot scroll right
          border="1px solid"
          borderColor="theme.borderSubtle"
          marginTop={{ base: "0.15rem", md: "0.5rem" }}
        >
          <LuChevronRight />
        </IconButton>
      </HStack>

      {/* List Item Section */}
      <SimpleGrid columns={12} gap={4} height={{ base: "100%", md: "calc(100dvh - 200px)" }} overflow="auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <GridItem colSpan={{ base: 12, md: 6, lg: 3 }} key={index}>
            <Stack rounded="2xl" bgColor="theme.bg" padding={3} height={{ base: "300px", md: "280px", lg: "310px" }}>
              {/* Image */}
              <Box width="full" height="70%">
                <Image
                  src={fallBackImage}
                  alt="testing image"
                  loading="lazy"
                  rounded="xl"
                  width="full"
                  height="full"
                  objectFit="cover"
                />
              </Box>
              {/* Content */}
              <VStack alignItems="flex-start" paddingInline="0.25rem" justifyContent="space-between" height="30%">
                {/* Name */}
                <Heading lineClamp={2} fontSize={{ base: "sm", md: "md" }} lineHeight={1.25}>
                  Vital (500ml)
                </Heading>
                <HStack width="full" justifyContent="space-between" alignItems="flex-end">
                  {/* Price */}
                  <Text fontWeight="semibold" color="theme.error">
                    $0.25
                  </Text>
                  {/* Add to Cart */}
                  <IconButton bgColor="theme.primary" color="theme.textOnPrimary" rounded="full" size="xs">
                    <LuPlus />
                  </IconButton>
                </HStack>
              </VStack>
            </Stack>
          </GridItem>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default ContentSection;
