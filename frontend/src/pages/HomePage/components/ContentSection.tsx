import { useTranslation } from "react-i18next";
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
import { LuChevronLeft, LuChevronRight, LuEarthLock, LuPlus, LuSearch } from "react-icons/lu";
// Component
import SettingComponent from "@/shared/components/ui/SettingComponent";
// Constant
import { fallBackImage } from "@/app/configs/app";
import { useAddCartItem } from "@/features/hooks/cart";
import { useListCategories } from "@/features/hooks/categories";
import { useListProducts } from "@/features/hooks/products";

const ContentSection = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const { data: products = { body: [], pagination: null }, isLoading: productsLoading } = useListProducts({
    page: 1,
    rowsPerPage: 50,
    orderBy: "id DESC",
    searchText,
    categoryId: selectedCategoryId,
  });
  const { data: categories = [] } = useListCategories();
  const { mutate: addCartItem } = useAddCartItem();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Function to check the scroll position and update button states
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setHasOverflow(scrollWidth > clientWidth + 1);

      setCanScrollLeft(scrollLeft > 1);
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
  }, [categories.length]);

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
            {t("Quarantine System")}
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
              value={searchText}
              onChange={(event) => setSearchText(event.currentTarget.value)}
              bgColor="theme.bg"
              rounded="md"
              _focus={{ border: "1px solid", borderColor: "theme.borderSubtle" }}
            />
          </InputGroup>
          {/* Setting Button */}
          <SettingComponent />
        </HStack>
      </Stack>

      {/* Filter Section */}
      <HStack gap={2} width="full" alignItems="center">
        {hasOverflow && <IconButton aria-label="Previous" onClick={() => handleScroll("left")} variant="subtle" rounded="full" disabled={!canScrollLeft} border="1px solid" borderColor="theme.borderSubtle" marginTop={{ base: "0.15rem", md: "0.5rem" }}><LuChevronLeft /></IconButton>}

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
          {[{ id: null, name: "All" }, ...categories].map((category) => (
            <IconButton
              key={category.id ?? "all"}
              aria-label={`Filter by ${category.name}`}
              variant={selectedCategoryId === category.id ? "solid" : "subtle"}
              paddingInline="1rem"
              rounded="full"
              border="1px solid"
              borderColor="theme.borderSubtle"
              whiteSpace="nowrap"
              onClick={() => setSelectedCategoryId(category.id)}
            >
              {category.name}
            </IconButton>
          ))}
        </HStack>

        {hasOverflow && <IconButton aria-label="Next" onClick={() => handleScroll("right")} variant="subtle" rounded="full" disabled={!canScrollRight} border="1px solid" borderColor="theme.borderSubtle" marginTop={{ base: "0.15rem", md: "0.5rem" }}><LuChevronRight /></IconButton>}
      </HStack>

      {/* List Item Section */}
      <SimpleGrid columns={12} gap={4} height={{ base: "100%", md: "calc(100dvh - 200px)" }} overflow="auto">
        {!productsLoading && selectedCategoryId !== null && products.body.length === 0 && <GridItem colSpan={12}><Text textAlign="center" padding={8}>No item found for this type.</Text></GridItem>}
        {products.body.map((product) => (
          <GridItem colSpan={{ base: 12, md: 6, lg: 3 }} key={product.id}>
            <Stack rounded="2xl" bgColor="theme.bg" padding={3} height={{ base: "300px", md: "280px", lg: "310px" }}>
              {/* Image */}
              <Box width="full" height="70%">
                <Image
                  src={product.image || fallBackImage}
                  alt={product.name}
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
                  {product.name}
                </Heading>
                <HStack width="full" justifyContent="space-between" alignItems="flex-end">
                  {/* Price */}
                  <Text fontWeight="semibold" color="theme.error">
                    ${Number(product.priceUsd ?? product.price).toFixed(2)} / ៛{Number(product.priceKhr ?? 0).toLocaleString()}
                  </Text>
                  {/* Add to Cart */}
                  <IconButton aria-label={`Add ${product.name} to cart`} onClick={() => addCartItem({ productId: product.id })} bgColor="theme.primary" color="theme.textOnPrimary" rounded="full" size="xs">
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
