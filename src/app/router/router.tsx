import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
//? Layout
const PublicLayout = lazy(() => import("../layouts/PublicLayout"));
//? Components
import PageNotFound from "@/shared/components/ui/PageNotFound";
import LazyFallback from "@/shared/components/ui/LazyFallBack/LazyFallBack";
// Home Page
const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
// Theme Showcase
import ThemeShowCase from "@/shared/components/ui/ThemeShowCase";

export default function Router() {
  return (
    <Suspense fallback={<LazyFallback />}>
      <Routes>
        {/* Theme Showcase */}
        <Route path="/theme" element={<ThemeShowCase />} />

        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}
