import "./Loading.css";
import { Box, Flex } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex gap="0.35rem" className="loading">
      <Box boxSize="10px" rounded="full" bgColor="#222165"></Box>
      <Box boxSize="10px" rounded="full" bgColor="#222165"></Box>
      <Box boxSize="10px" rounded="full" bgColor="#222165"></Box>
    </Flex>
  );
};

export default Loading;
