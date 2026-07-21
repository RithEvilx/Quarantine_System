import { fallBackImage } from "@/app/configs/app";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  RadioCard,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
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
        <VStack width="full" height="calc(100dvh - 350px)" gap={3} alignItems="flex-start" overflow="auto">
          {Array.from({ length: 10 }).map((_, index) => (
            <HStack
              width="full"
              flexShrink="0"
              rounded="xl"
              gap={0}
              overflow="hidden"
              key={index}
              border="1px solid"
              borderColor="theme.borderSubtle"
            >
              {/* Image */}
              <Box boxSize="80px" flexShrink={0}>
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
              <VStack
                width="full"
                height="full"
                alignItems="flex-start"
                justifyContent="space-between"
                padding="0.15rem 0.5rem 0.45rem"
              >
                <Text width="full" lineClamp={2} lineHeight={1.25}>
                  Vital (500ml)
                </Text>
                <HStack width="full" alignItems="flex-end" justifyContent="space-between">
                  <Text fontWeight="semibold" color="theme.error" lineHeight={1.25}>
                    $0.25
                  </Text>
                  <HStack gap={1}>
                    <IconButton size="2xs" rounded="full" bgColor="theme.primary">
                      <LuMinus />
                    </IconButton>
                    <Text width="30px" textAlign="center">
                      1
                    </Text>
                    <IconButton size="2xs" rounded="full" bgColor="theme.primary">
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
            {/* Customer Detail */}
            <VStack width="full" gap={4}>
              {/* Way to Pay */}
              <RadioCard.Root defaultValue="next" width="full">
                <HStack width="full" alignItems="flex-end">
                  <RadioCard.Label fontWeight="semibold">Choose way to pay:</RadioCard.Label>
                  <HStack align="stretch">
                    {items.map((item) => (
                      <RadioCard.Item key={item.value} value={item.value} cursor="pointer" bgColor="theme.bg">
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl _checked={{ borderColor: "theme.primary" }}>
                          <RadioCard.ItemText padding="0.15rem 0.5rem" fontSize="sm" whiteSpace="nowrap">
                            {item.title}
                          </RadioCard.ItemText>
                        </RadioCard.ItemControl>
                      </RadioCard.Item>
                    ))}
                  </HStack>
                </HStack>
              </RadioCard.Root>
              {/* Customer Name  */}
              <Input
                type="text"
                placeholder="Please enter your name*"
                paddingInline="0.75rem"
                rounded="0.75rem"
                bgColor="theme.bg"
                _focus={{ border: "1px solid", borderColor: "theme.borderSubtle" }}
              />
            </VStack>
            <Box border="1px solid" borderColor="theme.border" width="full" marginBlock="0.5rem"></Box>
            <HStack width="full" justifyContent="space-between" color="theme.text" fontWeight="semibold">
              <Text>Total</Text>
              <Text>$10.96</Text>
            </HStack>
          </VStack>

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

const items = [
  { value: "cod", title: "Cash on delivery" },
  { value: "khqr", title: "KHQR" },
];
