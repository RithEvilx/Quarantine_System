// ThemeShowCase.tsx
import { ColorModeButton } from "@/app/providers/color-mode";
import { Box, Button, Flex, Grid, GridItem, Text, Badge, HStack } from "@chakra-ui/react";
import { LuBus, LuSearch, LuStar, LuCheck, LuInfo, LuTriangleAlert, LuX } from "react-icons/lu";
import { Link } from "react-router-dom";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box mb={8}>
    <Text fontSize="0.7rem" fontWeight={700} letterSpacing="0.08em" textTransform="uppercase" color="theme.textMuted" mb={3}>
      {title}
    </Text>
    {children}
  </Box>
);

const ThemeShowCase = () => {
  return (
    <Box bg="theme.bg" minH="100vh" p={8} fontFamily="Inter, sans-serif">
      <HStack marginBottom="1rem" justifyContent="space-between">
        <HStack>
          <Link to="/">
            <Button padding="0.5rem 1rem">Home</Button>
          </Link>
        </HStack>
        <ColorModeButton />
      </HStack>
      {/* Header */}
      <Box bg="theme.primary" px={8} py={5} borderRadius="xl" mb={8} display="flex" alignItems="center" justifyContent="space-between">
        <Flex align="center" gap={3}>
          <Box color="theme.primaryForeground" fontSize="1.5rem">
            <LuBus />
          </Box>
          <Text fontSize="1.25rem" fontWeight={700} color="theme.primaryForeground">
            Theme Show Case
          </Text>
        </Flex>
        <Flex gap={3}>
          <Text color="theme.primaryForeground" opacity={0.8} fontSize="0.875rem" cursor="pointer" _hover={{ opacity: 1 }}>
            Hotels
          </Text>
          <Text color="theme.primaryForeground" opacity={0.8} fontSize="0.875rem" cursor="pointer" _hover={{ opacity: 1 }}>
            Bus Tickets
          </Text>
          <Text color="theme.primaryForeground" opacity={0.8} fontSize="0.875rem" cursor="pointer" _hover={{ opacity: 1 }}>
            Flights
          </Text>
        </Flex>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {/* Left column */}
        <GridItem>
          {/* Colors */}
          <Section title="Brand Colors">
            <Flex gap={2} wrap="wrap">
              {[
                { label: "Primary", bg: "theme.primary", text: "theme.primaryForeground" },
                { label: "Hover", bg: "theme.primaryHover", text: "theme.primaryForeground" },
                { label: "Active", bg: "theme.primaryActive", text: "theme.primaryForeground" },
                { label: "Subtle", bg: "theme.primarySubtle", text: "theme.primary" },
                { label: "Muted", bg: "theme.primaryMuted", text: "theme.primary" },
              ].map(({ label, bg, text }) => (
                <Box key={label} bg={bg} px={3} py={2} borderRadius="md" minW="80px" textAlign="center">
                  <Text fontSize="0.75rem" fontWeight={600} color={text}>
                    {label}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Section>

          {/* Buttons */}
          <Section title="Buttons">
            <Flex gap={3} wrap="wrap" align="center">
              <Button
                bg="theme.primary"
                color="theme.primaryForeground"
                _hover={{ bg: "theme.primaryHover" }}
                _active={{ bg: "theme.primaryActive" }}
                borderRadius="full"
                px={6}
              >
                <LuSearch size={14} /> Search
              </Button>
              <Button variant="outline" borderColor="theme.primary" color="theme.primary" _hover={{ bg: "theme.primarySubtle" }} borderRadius="full" px={6}>
                View Details
              </Button>
              <Button bg="theme.bgSubtle" color="theme.textSubtle" _hover={{ bg: "theme.bgHover" }} borderRadius="full" px={6}>
                Cancel
              </Button>
              <Button bg="theme.primary" color="theme.primaryForeground" opacity={0.4} borderRadius="full" px={6} disabled>
                Disabled
              </Button>
            </Flex>
          </Section>

          {/* Input */}
          <Section title="Form Fields">
            <Flex direction="column" gap={3}>
              <Box bg="theme.bgCard" border="1px solid" borderColor="theme.border" borderRadius="lg" px={4} py={3}>
                <Text fontSize="0.65rem" fontWeight={600} color="theme.textMuted" letterSpacing="0.04em" textTransform="uppercase">
                  Location From
                </Text>
                <Text fontSize="0.9rem" fontWeight={600} color="theme.text" mt={1}>
                  Phnom Penh
                </Text>
              </Box>
              <Box
                bg="theme.bgCard"
                border="1px solid"
                borderColor="theme.borderPrimary"
                borderRadius="lg"
                px={4}
                py={3}
                boxShadow="0 0 0 3px"
                style={{ boxShadow: "0 0 0 3px rgba(34,33,101,0.15)" }}
              >
                <Text fontSize="0.65rem" fontWeight={600} color="theme.primary" letterSpacing="0.04em" textTransform="uppercase">
                  Date of Journey
                </Text>
                <Text fontSize="0.9rem" fontWeight={600} color="theme.text" mt={1}>
                  09 Mar, 2026
                </Text>
              </Box>
              <Box bg="theme.errorSubtle" border="1px solid" borderColor="theme.error" borderRadius="lg" px={4} py={3}>
                <Text fontSize="0.65rem" fontWeight={600} color="theme.error" letterSpacing="0.04em" textTransform="uppercase">
                  Location To
                </Text>
                <Text fontSize="0.875rem" color="theme.error" mt={1}>
                  Please choose your destination
                </Text>
              </Box>
            </Flex>
          </Section>
        </GridItem>

        {/* Right column */}
        <GridItem>
          {/* Badges */}
          <Section title="Badges & Tags">
            <Flex gap={2} wrap="wrap">
              <Badge bg="theme.primarySubtle" color="theme.primary" px={3} py={1} borderRadius="full" fontSize="0.75rem" fontWeight={600}>
                Active
              </Badge>
              <Badge bg="theme.successSubtle" color="theme.success" px={3} py={1} borderRadius="full" fontSize="0.75rem" fontWeight={600}>
                Confirmed
              </Badge>
              <Badge bg="theme.warningSubtle" color="theme.warning" px={3} py={1} borderRadius="full" fontSize="0.75rem" fontWeight={600}>
                Pending
              </Badge>
              <Badge bg="theme.errorSubtle" color="theme.error" px={3} py={1} borderRadius="full" fontSize="0.75rem" fontWeight={600}>
                Cancelled
              </Badge>
              <Badge bg="theme.accentSubtle" color="theme.accent" px={3} py={1} borderRadius="full" fontSize="0.75rem" fontWeight={600}>
                Featured
              </Badge>
            </Flex>
          </Section>

          {/* Alerts */}
          <Section title="Alerts">
            <Flex direction="column" gap={2}>
              {[
                {
                  icon: <LuCheck size={15} />,
                  bg: "theme.successSubtle",
                  border: "theme.success",
                  color: "theme.success",
                  label: "Booking confirmed successfully!",
                },
                {
                  icon: <LuTriangleAlert size={15} />,
                  bg: "theme.warningSubtle",
                  border: "theme.warning",
                  color: "theme.warning",
                  label: "Payment pending. Please complete.",
                },
                { icon: <LuX size={15} />, bg: "theme.errorSubtle", border: "theme.error", color: "theme.error", label: "Booking failed. Please retry." },
                { icon: <LuInfo size={15} />, bg: "theme.infoSubtle", border: "theme.info", color: "theme.info", label: "Check-in starts 2 hours before." },
              ].map(({ icon, bg, border, color, label }) => (
                <Flex key={label} bg={bg} border="1px solid" borderColor={border} borderRadius="lg" px={4} py={3} align="center" gap={3}>
                  <Box color={color}>{icon}</Box>
                  <Text fontSize="0.875rem" color={color} fontWeight={500}>
                    {label}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Section>

          {/* Card */}
          <Section title="Card">
            <Box bg="theme.bgCard" border="1px solid" borderColor="theme.border" borderRadius="xl" overflow="hidden">
              <Box bg="theme.primary" px={5} py={4}>
                <Text fontWeight={700} color="theme.primaryForeground" fontSize="1rem">
                  Phnom Penh → Siem Reap
                </Text>
                <Text fontSize="0.8rem" color="theme.primaryForeground" opacity={0.8} mt={1}>
                  Express Bus · 6h 30m
                </Text>
              </Box>
              <Box px={5} py={4}>
                <Flex justify="space-between" align="center" mb={3}>
                  <Box>
                    <Text fontSize="0.7rem" color="theme.textMuted" textTransform="uppercase" letterSpacing="0.04em">
                      Departure
                    </Text>
                    <Text fontWeight={700} color="theme.text" fontSize="1.1rem">
                      07:00 AM
                    </Text>
                  </Box>
                  <Box color="theme.textMuted" fontSize="1.25rem">
                    <LuBus />
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="0.7rem" color="theme.textMuted" textTransform="uppercase" letterSpacing="0.04em">
                      Arrival
                    </Text>
                    <Text fontWeight={700} color="theme.text" fontSize="1.1rem">
                      01:30 PM
                    </Text>
                  </Box>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Flex align="center" gap={1}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Box key={i} color="theme.warning" fontSize="0.75rem">
                        <LuStar />
                      </Box>
                    ))}
                    <Text fontSize="0.75rem" color="theme.textMuted" ml={1}>
                      4.8
                    </Text>
                  </Flex>
                  <Text fontWeight={700} color="theme.primary" fontSize="1.1rem">
                    $8.00
                  </Text>
                </Flex>
              </Box>
              <Box px={5} pb={4}>
                <Button w="full" bg="theme.primary" color="theme.primaryForeground" _hover={{ bg: "theme.primaryHover" }} borderRadius="full">
                  Book Now
                </Button>
              </Box>
            </Box>
          </Section>
        </GridItem>
      </Grid>

      {/* Text scale */}
      <Section title="Typography">
        <Box bg="theme.bgCard" border="1px solid" borderColor="theme.border" borderRadius="xl" p={5}>
          <Text fontSize="1.5rem" fontWeight={700} color="theme.text" mb={1}>
            Heading Text
          </Text>
          <Text fontSize="1rem" color="theme.textSubtle" mb={1}>
            Subtitle or secondary information goes here.
          </Text>
          <Text fontSize="0.875rem" color="theme.textMuted" mb={3}>
            Muted caption or label text.
          </Text>
          <Text as="a" color="theme.textLink" _hover={{ color: "theme.textLinkHover" }} fontSize="0.875rem" textDecoration="underline" cursor="pointer">
            Clickable link →
          </Text>
        </Box>
      </Section>
    </Box>
  );
};

export default ThemeShowCase;
