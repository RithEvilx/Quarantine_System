import { useTranslation } from "react-i18next";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
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
  Link,
  RadioCard,
  IconButton,
} from "@chakra-ui/react";
// Icons
import { LuMinus, LuPlus } from "react-icons/lu";
// Constant
import { fallBackImage, KHQR_QR_IMAGE } from "@/app/configs/app";
// Hook
import useCreateOrder, { useOrderPaymentStatus } from "@/features/hooks/telegram";
import { useCart, useClearCart, useDeleteCartItem, useUpdateCartItem } from "@/features/hooks/cart";

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
  image?: string | null;
};

type CartUpdateAction = "increase" | "decrease";

const CartSection = () => {
  const { t } = useTranslation();
  const { data: cart } = useCart();
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: deleteCartItem } = useDeleteCartItem();
  const { mutateAsync: clearCart } = useClearCart();
  const [updatingItem, setUpdatingItem] = useState<{ id: number; action: CartUpdateAction } | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [pendingOrderNumber, setPendingOrderNumber] = useState<string | null>(null);
  const handledPaymentOrder = useRef<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CartFormValues>({
    mode: "onChange",
    defaultValues: {
      customerName: "",
      paymentMethod: "cod",
    },
  });

  const customerName = useWatch({ control, name: "customerName" }) || "";
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const { data: paymentStatus } = useOrderPaymentStatus(pendingOrderNumber);
  const paymentComplete = paymentStatus?.body?.paymentStatus === "PAID";

  const cartItems: CartItem[] = (cart?.items ?? []).map((item) => ({
    id: item.productId,
    name: item.name,
    price: item.price,
    priceUsd: item.priceUsd,
    priceKhr: item.priceKhr,
    quantity: item.quantity,
    image: item.image,
  }));

  const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  //! Send Telegram Message
  const { mutate: createOrder, isPending } = useCreateOrder({
    onSuccess: (response) => {
      const order = (response as { body?: { orderNumber?: string; paymentMethod?: string } }).body;
      const orderNumber = order?.orderNumber;
      if (order?.paymentMethod === "khqr" && orderNumber) {
        setPendingOrderNumber(orderNumber);
        setQrOpen(true);
      } else {
        void clearCart();
        reset();
      }
    },
    onError: (error) => {
      console.error("Order error:", error);
    },
  });

  useEffect(() => {
    if (!pendingOrderNumber || !paymentComplete || handledPaymentOrder.current === pendingOrderNumber) return;
    handledPaymentOrder.current = pendingOrderNumber;
    void clearCart().then(() => {
      setQrOpen(false);
      setPendingOrderNumber(null);
      reset();
    });
  }, [clearCart, paymentComplete, pendingOrderNumber, reset]);

  //! Handle Submit
  const onHandleSubmit = (data: CartFormValues) => {
    if (!cart?.cartId || cartItems.length === 0) return;
    if (data.paymentMethod === "khqr" && !data.customerName.trim()) return;
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
              lg: "calc(100dvh - 420px)",
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
                <Box width="100px" height="75px" flexShrink={0}>
                  <Image
                    src={item.image || fallBackImage}
                    alt={item.name}
                    loading="lazy"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    roundedStart="md"
                  />
                </Box>

                {/* Content */}
                <VStack
                  width="full"
                  height="full"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  padding="0.5rem 0.75rem"
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
                        loading={updatingItem?.id === item.id && updatingItem.action === "decrease"}
                        disabled={updatingItem !== null}
                        bgColor="theme.primary"
                        onClick={() => {
                          setUpdatingItem({ id: item.id, action: "decrease" });
                          if (item.quantity <= 1) {
                            deleteCartItem(item.id, { onSettled: () => setUpdatingItem(null) });
                          } else {
                            updateCartItem(
                              { productId: item.id, quantity: item.quantity - 1 },
                              { onSettled: () => setUpdatingItem(null) },
                            );
                          }
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
                        loading={updatingItem?.id === item.id && updatingItem.action === "increase"}
                        disabled={updatingItem !== null}
                        bgColor="theme.primary"
                        onClick={() => {
                          setUpdatingItem({ id: item.id, action: "increase" });
                          updateCartItem(
                            { productId: item.id, quantity: item.quantity + 1 },
                            { onSettled: () => setUpdatingItem(null) },
                          );
                        }}
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
                      <Stack width="full">
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
                                <RadioCard.ItemText
                                  padding="0.25rem 0.5rem"
                                  fontSize="sm"
                                  whiteSpace="nowrap"
                                  textAlign="center"
                                >
                                  {item.title}
                                </RadioCard.ItemText>
                              </RadioCard.ItemControl>
                            </RadioCard.Item>
                          ))}
                        </HStack>
                        {field.value === "khqr" && (
                          <VStack width="full" gap={2} paddingTop={2}>
                            <Text fontSize="sm" textAlign="center" color="gray.400">
                              Continue to open the QR code and pay ${grandTotal.toFixed(2)}. Payment confirmation may take a moment.
                            </Text>
                          </VStack>
                        )}
                      </Stack>
                    </RadioCard.Root>
                  )}
                />

                {/* Customer Name */}
                <Field.Root invalid={!!errors.customerName}>
                  <Field.Label fontWeight="semibold">Your ABA's account name</Field.Label>
                  <Input
                    type="text"
                    placeholder="Please enter your name*"
                    textTransform="uppercase"
                    paddingInline="0.75rem"
                    rounded="0.5rem"
                    bgColor="theme.bg"
                    {...register("customerName", {
                      required: "Please enter your name",
                      setValueAs: (value: string) => value.trim().toUpperCase(),
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
            <Button
              type="submit"
              width="full"
              rounded="full"
              bgColor="theme.primary"
              loading={isPending}
              disabled={isPending || cartItems.length === 0 || Boolean(pendingOrderNumber) || paymentComplete || (paymentMethod === "khqr" && !customerName.trim())}
            >
              {paymentComplete ? "Payment confirmed" : pendingOrderNumber ? "Waiting for payment" : t("Continue Payment")}
            </Button>
          </VStack>
        </VStack>
      </Box>
      {qrOpen && (
        <Box
          role="dialog"
          aria-modal="true"
          aria-label="KHQR payment code"
          position="fixed"
          inset="0"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="1rem"
          bg="rgba(0, 0, 0, 0.7)"
          onClick={() => setQrOpen(false)}
        >
          <VStack
            gap={4}
            padding="1rem"
            rounded="xl"
            bgColor="theme.bg"
            maxWidth="min(92vw, 420px)"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={KHQR_QR_IMAGE}
              alt="ABA KHQR payment code"
              width="full"
              maxHeight="70vh"
              objectFit="contain"
              rounded="md"
            />
            <Text fontWeight="semibold">Scan to pay ${grandTotal.toFixed(2)}</Text>
            <Text fontSize="sm" textAlign="center" color="gray.400">
              Waiting for ABA payment verification...
            </Text>
            <Link
              href="https://link.payway.com.kh/ABAPAYar518612i"
              target="_blank"
              rel="noopener noreferrer"
              color="theme.primary"
              textDecoration="underline"
            >
              Pay with ABA PayWay link
            </Link>
            <Button type="button" width="full" onClick={() => setQrOpen(false)}>
              Close
            </Button>
          </VStack>
        </Box>
      )}
    </Stack>
  );
};

export default CartSection;

const items = [
  {
    value: "cod" as const,
    title: "Cash on delivery",
    disabled: false,
  },
  {
    value: "khqr" as const,
    title: "KHQR",
    disabled: false,
  },
];
