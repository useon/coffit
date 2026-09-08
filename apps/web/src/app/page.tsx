import { Suspense } from "react";

import { KakaoMap } from "@/features/map/components/KakaoMap";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <KakaoMap />
    </Suspense>
  );
}
