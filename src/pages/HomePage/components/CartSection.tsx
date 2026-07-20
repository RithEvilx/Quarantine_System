import { Heading, Stack } from "@chakra-ui/react";

const CartSection = () => {
  return (
    <Stack
      height="full"
      rounded="xl"
      bgColor="theme.bg"
      border="1px solid"
      borderColor="theme.borderSubtle"
      padding={{ base: "1rem", md: "0.5rem 1rem" }}
      gap={{ base: 3, md: 4 }}
    >
      <Heading>Current Order</Heading>
    </Stack>
  );
};

export default CartSection;
