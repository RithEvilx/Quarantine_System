import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
// Components
// import Navbar from "@/widgets/Navbar";
// import Footer from "@/widgets/Footer";

const PublicLayout = () => {
  // const { pathname } = useLocation();

  // const hideLayout = pathname === "/theme";

  return (
    <>
      {/* {!hideLayout && <Navbar />} */}
      <Box bgColor="theme.bgSubtle">
        <Outlet />
      </Box>
      {/* {!hideLayout && <Footer />} */}
    </>
  );
};

export default PublicLayout;
