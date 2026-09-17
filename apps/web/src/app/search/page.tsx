import { Suspense } from "react";

import { LocationSearchPage } from "@/features/map/components/LocationSearchPage";

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <LocationSearchPage />
    </Suspense>
  );
}
