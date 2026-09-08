/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from "i18next";
import { type TableColumn } from "react-data-table-component";
import { HStack, Box, Image } from "@chakra-ui/react";
// Components
import { Tooltip } from "../components/ui/tooltip";
// Image
import FallbackImage from "@/assets/img/fallback_image.webp";
// Import Icons
import IconView from "@/assets/icons/icon_view.png";
import IconEdit from "@/assets/icons/icon_edit.png";
import IconReset from "@/assets/icons/icon_reset.png";
import IconDelete from "@/assets/icons/icon_delete.png";
// Util
import { resolveImageUrl } from "./resolveImageUrl";

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function generateTableHeader<T>(
  headersArray: Array<{
    label: string;
    width?: string;
    center?: boolean;
    value: string;
  }>,
  actions: string[] = [],
  events: ((row: T) => void)[] = [],
): Partial<TableColumn<T>>[] {
  const columns: Array<Partial<TableColumn<T>>> = [];

  headersArray.map((header, index) => {
    const column: Partial<TableColumn<T>> = {
      name: t(header.label).toUpperCase(),
      width: header.width,
      center: header.center,
    };

    if (header.value === "image") {
      column.cell = (row: any) => {
        const raw = row?.[header.value];

        const filename = typeof raw === "string" ? raw.trim() : "";
        const hasImage = filename.length > 0;

        const src = hasImage ? resolveImageUrl(filename) : FallbackImage;

        return (
          <Tooltip
            positioning={{ placement: "bottom" }}
            content={
              <Image
                src={src}
                aspectRatio={16 / 9}
                alt="image"
                width="200px"
                height="150px"
                rounded="sm"
                objectFit="contain"
                loading="lazy"
              />
            }
          >
            <Box boxSize="40px">
              <Image
                src={src}
                aspectRatio={16 / 9}
                alt="image"
                width="100%"
                height="100%"
                objectFit="cover"
                rounded="sm"
                border="1px solid"
                borderColor="theme.border"
                loading="lazy"
              />
            </Box>
          </Tooltip>
        );
      };
    } else if (header.value === "images") {
      column.cell = (row: any) => {
        const value = row[header.value];

        // Pick the first non-empty string from the array
        const firstValid: string | null = Array.isArray(value)
          ? (value.find((v: any) => typeof v === "string" && v.trim() !== "")?.trim() ?? null)
          : null;

        // fallback to FallbackImage if nothing valid
        const src = firstValid ? resolveImageUrl(firstValid) : FallbackImage;

        return (
          <Tooltip
            positioning={{ placement: "bottom" }}
            content={
              <Image
                src={src}
                aspectRatio={16 / 9}
                alt="image"
                width="200px"
                height="150px"
                rounded="sm"
                objectFit="contain"
                loading="lazy"
              />
            }
          >
            <Box boxSize="40px">
              <Image
                src={src}
                aspectRatio={16 / 9}
                alt="image"
                width="100%"
                height="100%"
                objectFit="cover"
                rounded="sm"
                border="1px solid"
                borderColor="theme.border"
                loading="lazy"
              />
            </Box>
          </Tooltip>
        );
      };
    } else if (header.value === "action") {
      // 1) This is the UI display order for actions (NOT the original actions array order)
      const ACTION_DISPLAY_ORDER = ["view", "edit", "delete", "reset_password"] as const;
      type ActionKey = (typeof ACTION_DISPLAY_ORDER)[number];

      // 2) Each action key maps to its icon asset
      const ACTION_ICON: Record<ActionKey, string> = {
        view: IconView,
        edit: IconEdit,
        delete: IconDelete,
        reset_password: IconReset,
      };

      // 3) Fallback icon if an icon is missing/broken
      const getIconOrFallback = (icon?: string) => (icon && icon.trim() !== "" ? icon : FallbackImage);

      // 4) Build a stable map: action -> handler (prevents relying on index math)
      const actionHandlerMap = Object.fromEntries(actions.map((action, idx) => [action, events[idx]])) as Partial<
        Record<ActionKey, ((row: T) => void) | undefined>
      >;

      column.cell = (row: T) => (
        <HStack key={index}>
          {ACTION_DISPLAY_ORDER
            // Only show actions that are enabled
            .filter((action) => actions.includes(action))
            .map((action) => {
              const iconSrc = getIconOrFallback(ACTION_ICON[action]);
              const onActionClick = actionHandlerMap[action];

              return (
                <Tooltip key={action} content={t(action)} positioning={{ placement: "bottom" }} openDelay={500}>
                  <Box boxSize="25px" rounded="sm" overflow="hidden" bg="theme.bgSubtle">
                    <Image
                      w="100%"
                      height="100%"
                      objectFit="contain"
                      cursor="pointer"
                      src={iconSrc}
                      onClick={() => onActionClick?.(row)}
                      loading="lazy"
                    />
                  </Box>
                </Tooltip>
              );
            })}
        </HStack>
      );
    } else {
      column.cell = (row: any) => {
        const value = getNestedValue(row, header.value);
        return (
          <Tooltip content={value ? value : "-"} positioning={{ placement: "bottom" }} openDelay={500}>
            <span>{value ? value : "-"}</span>
          </Tooltip>
        );
      };
    }

    columns.push(column);
    return null;
  });

  return columns;
}

export {
  getDataTableCustomStyles,
  getDataTableThemeName,
  getDataTableContainerCss,
  getDataTableWrapperCss,
  dataTablePalette,
  getThemeDataTablePalette,
} from "./dataTableTheme";
export type { DataTablePalette } from "./dataTableTheme";
