import { useState } from "react";

export function reorderArray<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/**
 * Hook for managing drag-and-drop state
 */
export function useDragAndDrop() {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragEnd,
  };
}

/**
 * Creates drag event handlers for an item
 * @param index - The index of the draggable item
 * @param onReorder - Callback when reordering occurs
 * @param dragState - The drag state from useDragAndDrop hook
 */
export function createDragHandlers<T>(
  index: number,
  onReorder: (newArray: T[]) => void,
  dragState: ReturnType<typeof useDragAndDrop>,
  currentArray: T[]
) {
  const { draggedIndex, handleDragStart, handleDragEnter, handleDragLeave, handleDragEnd } = dragState;

  return {
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      handleDragStart(index);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", index.toString());
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },
    onDragEnter: (e: React.DragEvent) => {
      e.preventDefault();
      handleDragEnter(index);
    },
    onDragLeave: handleDragLeave,
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (draggedIndex !== null && draggedIndex !== index) {
        const reordered = reorderArray(currentArray, draggedIndex, index);
        onReorder(reordered);
      }
      handleDragEnd();
    },
    onDragEnd: handleDragEnd,
  };
}

/**
 * Get drag styling for Chakra UI components
 */
export function getDragStyles(isDragging: boolean, isDragOver: boolean) {
  return {
    cursor: "move",
    transition: "all 0.2s ease",
    transform: isDragging ? "scale(0.95)" : "scale(1)",
    opacity: isDragging ? 0.4 : 1,
    outline: isDragOver && !isDragging ? "2px dashed" : "none",
    outlineColor: isDragOver && !isDragging ? "blue.500" : "transparent",
    outlineOffset: "2px",
    userSelect: "none" as const,
    _hover: {
      transform: "scale(1.02)",
      boxShadow: "md",
    },
  };
}
