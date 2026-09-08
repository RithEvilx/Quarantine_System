import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Text,
  Image,
  Input,
  Stack,
  Field,
  Button,
  HStack,
  VStack,
  Heading,
  RadioCard,
  IconButton,
} from "@chakra-ui/react";
// Icons
import { LuMinus, LuPlus } from "react-icons/lu";
// Constant
import { fallBackImage } from "@/app/configs/app";
// Hook
import useCreateOrder from "@/features/hooks/telegram";
import { useCart, useDeleteCartItem, useUpdateCartItem } from "@/features/hooks/cart";

type PaymentMethod = "cod" | "khqr";

type CartFormValues = {
  customerName: string;
  paymentMethod: PaymentMethod;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  priceUsd: number;
  priceKhr: number;
  quantity: number;
};

const CartSection = () => {
  const { t } = useTranslation();
  const { data: cart } = useCart();
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: deleteCartItem } = useDeleteCartItem();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CartFormValues>({
    mode: "onChange",
    defaultValues: {
      customerName: "",
      paymentMethod: "cod",
    },
  });

  const cartItems: CartItem[] = (cart?.items ?? []).map((item) => ({
    id: item.productId,
    name: item.name,
    price: item.price,
    priceUsd: item.priceUsd,
    priceKhr: item.priceKhr,
    quantity: item.quantity,
  }));

  const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  //! Send Telegram Message
  const { mutate: createOrder, isPending } = useCreateOrder({
    onSuccess: () => {
      console.log("Order created successfully.");
    },
    onError: (error) => {
      console.error("Order error:", error);
    },
  });

  //! Handle Submit
  const onHandleSubmit = (data: CartFormValues) => {
    createOrder({
      cartId: cart?.cartId ?? "",
      customerName: data.customerName,
      paymentMethod: data.paymentMethod,
    });
  };

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
      <Heading>{t("Current Order")}</Heading>

      {/* Form */}
      <Box as="form" onSubmit={handleSubmit(onHandleSubmit)} height="full">
        <VStack justifyContent="space-between" height="full">
          {/* List Order */}
          <VStack
            width="full"
            height={{
              md: "calc(100dvh - 370px)",
              lg: "calc(100dvh - 350px)",
            }}
            gap={3}
            alignItems="flex-start"
            overflow="auto"
          >
            {cartItems.map((item) => (
              <HStack
                width="full"
                flexShrink="0"
                rounded="xl"
                gap={0}
                overflow="hidden"
                key={item.id}
                border="1px solid"
                borderColor="theme.borderSubtle"
              >
                {/* Image */}
                <Box boxSize="80px" flexShrink={0}>
                  <Image
                    src={fallBackImage}
                    alt={item.name}
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
                    {item.name}
                  </Text>

                  <HStack width="full" alignItems="flex-end" justifyContent="space-between">
                    <Text fontWeight="semibold" color="theme.error" lineHeight={1.25}>
                      ៛{item.priceKhr.toLocaleString()} / ${item.priceUsd.toFixed(2)}
                    </Text>

                    <HStack gap={1}>
                      <IconButton
                        type="button"
                        size="2xs"
                        rounded="full"
                        bgColor="theme.primary"
                        onClick={() => {
                          if (item.quantity <= 1) deleteCartItem(item.id);
                          else updateCartItem({ productId: item.id, quantity: item.quantity - 1 });
                        }}
                      >
                        <LuMinus />
                      </IconButton>

                      <Text width="30px" textAlign="center">
                        {item.quantity}
                      </Text>

                      <IconButton
                        type="button"
                        size="2xs"
                        rounded="full"
                        bgColor="theme.primary"
                        onClick={() => updateCartItem({ productId: item.id, quantity: item.quantity + 1 })}
                      >
                        <LuPlus />
                      </IconButton>
                    </HStack>
                  </HStack>
                </VStack>
              </HStack>
            ))}
          </VStack>

          <VStack width="full" gap={4}>
            {/* Customer Detail + Grand Total */}
            <VStack width="full" alignItems="flex-start" bgColor="theme.bgSubtle" padding="0.75rem 1rem" rounded="xl">
              {/* Customer Detail */}
              <VStack width="full" gap={{ base: 3, lg: 4 }}>
                {/* Way to Pay */}
                <Controller
                  name="paymentMethod"
                  control={control}
                  rules={{
                    required: "Please choose a payment method",
                  }}
                  render={({ field }) => (
                    <RadioCard.Root
                      value={field.value}
                      onValueChange={(details) => field.onChange(details.value)}
                      width="full"
                    >
                      <Stack
                        direction={{
                          base: "column",
                          lg: "row",
                        }}
                        width="full"
                        alignItems={{
                          lg: "flex-end",
                        }}
                      >
                        <RadioCard.Label fontWeight="semibold">{t("Choose way to pay")}:</RadioCard.Label>

                        <HStack align="stretch">
                          {items.map((item) => (
                            <RadioCard.Item
                              key={item.value}
                              value={item.value}
                              disabled={item.disabled}
                              cursor="pointer"
                              bgColor="theme.bg"
                              _checked={{
                                border: "1px solid",
                                borderColor: "theme.borderSubtle",
                              }}
                            >
                              <RadioCard.ItemHiddenInput />

                              <RadioCard.ItemControl>
                                <RadioCard.ItemText padding="0.15rem 0.5rem" fontSize="sm" whiteSpace="nowrap">
                                  {item.title}
                                </RadioCard.ItemText>
                              </RadioCard.ItemControl>
                            </RadioCard.Item>
                          ))}
                        </HStack>
                      </Stack>
                    </RadioCard.Root>
                  )}
                />

                {/* Customer Name */}
                <Field.Root invalid={!!errors.customerName}>
                  <Input
                    type="text"
                    placeholder="Please enter your name*"
                    paddingInline="0.75rem"
                    rounded="0.5rem"
                    bgColor="theme.bg"
                    {...register("customerName", {
                      required: "Please enter your name",
                    })}
                    _focus={{
                      border: "1px solid",
                      borderColor: "theme.borderSubtle",
                    }}
                  />
                  {errors.customerName && (
                    <Field.ErrorText color="theme.error" fontSize="sm">
                      {errors.customerName.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
              </VStack>

              <Box border="1px solid" borderColor="theme.border" width="full" marginBlock="0.5rem" />

              {/* Grand Total */}
              <HStack width="full" justifyContent="space-between" color="theme.text" fontWeight="semibold">
                <Text>{t("Total")}</Text>

                <Text>${grandTotal.toFixed(2)}</Text>
              </HStack>
            </VStack>

            {/* Payment Button */}
            <Button type="submit" width="full" rounded="full" bgColor="theme.primary" loading={isPending}>
              {t("Continue Payment")}
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Stack>
  );
};

export default CartSection;

const items = [
  {
    value: "cod" as const,
    title: "Cash on delivery",
  },
  {
    value: "khqr" as const,
    title: "KHQR (Coming soon)",
    disabled: true,
  },
];
