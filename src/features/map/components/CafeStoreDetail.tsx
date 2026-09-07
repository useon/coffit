import { ChevronLeft } from "lucide-react";

import { formatDistanceText } from "@/features/map/domain/distanceText";
import type { CafePlace } from "@/features/map/domain/types";

type CafeStoreDetailProps = {
  place: CafePlace;
  onBackToList: () => void;
};

export function CafeStoreDetail({ place, onBackToList }: CafeStoreDetailProps) {
  const address = place.roadAddress || place.address;

  return (
    <article className="px-5 pb-5">
      <button
        type="button"
        aria-label="매장 목록으로 돌아가기"
        className="-ml-2 mb-4 flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-950"
        onClick={onBackToList}
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      <div className="space-y-5">
        <header>
          <h2 className="text-xl font-bold tracking-normal text-slate-950">
            {place.name}
          </h2>
        </header>

        <dl className="space-y-3 text-sm">
          <DetailRow label="주소" value={address || "주소 정보 없음"} />
          <DetailRow
            label="거리"
            value={formatDistanceText(place.distanceMeters)}
          />
          <DetailRow label="전화번호" value={place.phone || "전화번호 없음"} />
        </dl>

        <a
          href={place.placeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center justify-center rounded-lg bg-coffit-brand px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          카카오 장소 보기
        </a>
      </div>
    </article>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[4rem_1fr] gap-3">
      <dt className="font-bold text-slate-400">{label}</dt>
      <dd className="min-w-0 font-medium leading-5 text-slate-700">{value}</dd>
    </div>
  );
}
