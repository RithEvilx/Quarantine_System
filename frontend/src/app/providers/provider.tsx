"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { config } from "./theme";

export function Provider(props: ColorModeProviderProps) {
  const system = createSystem(defaultConfig, config);

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
