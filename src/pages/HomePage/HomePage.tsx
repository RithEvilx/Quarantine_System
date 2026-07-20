import { GridItem, SimpleGrid } from "@chakra-ui/react";
import CartSection from "./components/CartSection";
import ContentSection from "./components/ContentSection";

const HomePage = () => {
  return (
    <SimpleGrid
      columns={12}
      width={{ base: "100%", md: "100dvw" }}
      height={{ base: "100%", md: "100dvh" }}
      gap={{ base: 4, lg: 6 }}
      padding={{ base: "1rem",md: "1.25rem 1rem" }}
    >
      <GridItem colSpan={{ base: 12, md: 8, lg: 9 }}>
        <ContentSection />
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 4, lg: 3 }}>
        <CartSection />
      </GridItem>
    </SimpleGrid>
  );
};

export default HomePage;
