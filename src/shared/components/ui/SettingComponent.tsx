import { useTranslation } from "react-i18next";
import { useColorMode } from "@/app/providers/color-mode";
import { HStack, IconButton, Menu, Portal, Separator, Text, VStack } from "@chakra-ui/react";
// Icons
import { LuSettings, LuSun, LuMoon, LuCheck } from "react-icons/lu";

const languages = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "km", label: "ខ្មែរ", flag: "🇰🇭" },
];

const SettingComponent = () => {
  const { i18n, t } = useTranslation();
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Menu.Root closeOnSelect={false}>
      <Menu.Trigger asChild outline="none">
        <IconButton variant="subtle" border="1px solid" borderColor="theme.borderSubtle" aria-label="Settings">
          <LuSettings />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="16rem" p="0.25rem">
            <VStack align="stretch" gap="0.5rem" p="0.625rem 0.75rem">
              <Text fontSize="xs" fontWeight="semibold" color="fg.muted" textTransform="uppercase" letterSpacing="wide">
                {t("Appearance")}
              </Text>
              <HStack gap="2">
                {(["light", "dark"] as const).map((mode) => (
                  <HStack
                    key={mode}
                    flex="1"
                    justify="center"
                    gap="1.5"
                    py="1.5"
                    borderRadius="md"
                    border="1px solid"
                    borderColor={colorMode === mode ? "theme.primary" : "theme.borderSubtle"}
                    bg={colorMode === mode ? "theme.primary/10" : "transparent"}
                    color={colorMode === mode ? "theme.primary" : "fg.default"}
                    cursor="pointer"
                    onClick={() => setColorMode(mode)}
                    _hover={{ borderColor: "theme.primary" }}
                  >
                    {mode === "light" ? <LuSun size={16} /> : <LuMoon size={16} />}
                    <Text fontSize="sm">{mode === "light" ? "Light" : "Dark"}</Text>
                  </HStack>
                ))}
              </HStack>
            </VStack>

            <Separator />

            <VStack align="stretch" gap="0.5rem" p="0.625rem 0.75rem">
              <Text fontSize="xs" fontWeight="semibold" color="fg.muted" textTransform="uppercase" letterSpacing="wide">
                {t("Language")}
              </Text>
              <VStack align="stretch" gap="1">
                {languages.map((lng) => (
                  <HStack
                    key={lng.value}
                    justify="space-between"
                    px="2"
                    py="1.5"
                    borderRadius="md"
                    cursor="pointer"
                    bg={i18n.language === lng.value ? "theme.primary/10" : "transparent"}
                    _hover={{ bg: i18n.language === lng.value ? "theme.primary/10" : "bg.muted" }}
                    onClick={() => i18n.changeLanguage(lng.value)}
                  >
                    <HStack gap="2">
                      <Text fontSize="sm">{lng.flag}</Text>
                      <Text fontSize="sm">{lng.label}</Text>
                    </HStack>
                    {i18n.language === lng.value && <LuCheck size={14} color="var(--chakra-colors-theme-primary)" />}
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default SettingComponent;
