import { fallBackImage } from "@/app/configs/app";
import { Box, Button, Heading, HStack, IconButton, Image, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";

const CartSection = () => {
  return (
    <Stack
      height="full"
      rounded="xl"
      bgColor="theme.bg"
      border="1px solid"
      borderColor="theme.borderSubtle"
      padding={{ base: "1rem", md: "0.5rem 1rem 1rem" }}
      gap={{ base: 3, md: 4 }}
    >
      <Heading>Current Order</Heading>
      <VStack justifyContent="space-between" height="full">
        {/* List Order */}
        <VStack width="full" height="calc(100dvh - 350px)" bg="green" gap={3} alignItems="flex-start" overflow="auto">
          {Array.from({ length: 10 }).map((_, index) => (
            <HStack width="full" height="80px" flexShrink="0" rounded="xl" gap={3} overflow="hidden" key={index}>
              {/* Image */}
              <Box width="70px" height="70px" flexShrink={0}>
                <Image
                  src={fallBackImage}
                  alt="testing image"
                  loading="lazy"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  rounded="md"
                />
              </Box>
              {/* Content */}
              <VStack width="full" height="full" alignItems="flex-start" justifyContent="space-between">
                <Text width="full" lineClamp={1}>
                  Vital (500ml)
                </Text>
                <HStack width="full" justifyContent="space-between">
                  <Text fontWeight="semibold">$0.25</Text>
                  <HStack gap={1}>
                    <IconButton size="2xs" rounded="full">
                      <LuMinus />
                    </IconButton>
                    <Text width="30px" textAlign="center">
                      1
                    </Text>
                    <IconButton size="2xs" rounded="full">
                      <LuPlus />
                    </IconButton>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
          ))}
        </VStack>
        <VStack width="full" gap={4}>
          {/* Booking Summary */}
          <VStack
            bg="pink"
            width="full"
            alignItems="flex-start"
            bgColor="theme.bgSubtle"
            padding="0.75rem 1rem"
            rounded="xl"
          >
            <HStack width="full" justifyContent="space-between" color="theme.textSubtle">
              <Text>Subtotal</Text>
              <Text>$10.96</Text>
            </HStack>
            <Box border="1px solid" borderColor="theme.border" width="full" marginBlock="0.25rem"></Box>
            <HStack width="full" justifyContent="space-between" color="theme.text" fontWeight="semibold">
              <Text>Total</Text>
              <Text>$10.96</Text>
            </HStack>
          </VStack>
          <Input
            type="text"
            placeholder="Please enter your name*"
            paddingInline="0.75rem"
            rounded="0.75rem"
            _focus={{ border: "1px solid", borderColor: "theme.borderSubtle" }}
          />
          {/* Payment Button */}
          <Button width="full" rounded="full" bgColor="theme.primary">
            Continue Payment
          </Button>
        </VStack>
      </VStack>
    </Stack>
  );
};

export default CartSection;
