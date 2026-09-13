"use client";

type ChipItem<ChipId extends string> = {
  id: ChipId;
  name: string;
};

type ChipsProps<ChipId extends string> = {
  ariaLabel: string;
  items: readonly ChipItem<ChipId>[];
  selectedValues: ChipId[];
  onSelectedValuesChange: (values: ChipId[]) => void;
  selectAllLabel?: string;
};

export function Chips<ChipId extends string>({
  ariaLabel,
  items,
  selectedValues,
  onSelectedValuesChange,
  selectAllLabel,
}: ChipsProps<ChipId>) {
  const allValues = items.map(({ id }) => id);
  const isSelectAllActive = selectedValues.length === allValues.length;
  const toggleAll = () => {
    onSelectedValuesChange(isSelectAllActive ? [] : allValues);
  };
  const toggleItem = (itemId: ChipId) => {
    const nextSelectedValues = toggleChipSelection(selectedValues, itemId);

    onSelectedValuesChange(nextSelectedValues);
  };

  return (
    <div
      aria-label={ariaLabel}
      className="flex flex-nowrap justify-start gap-1 sm:gap-2"
      role="group"
    >
      {selectAllLabel ? (
        <ChipButton
          label={selectAllLabel}
          selected={isSelectAllActive}
          onClick={toggleAll}
        />
      ) : null}
      {items.map((item) => (
        <ChipButton
          key={item.id}
          label={item.name}
          selected={selectedValues.includes(item.id)}
          onClick={() => {
            toggleItem(item.id);
          }}
        />
      ))}
    </div>
  );
}

function ChipButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`h-[clamp(1.75rem,8vw,2.25rem)] shrink-0 whitespace-nowrap rounded-full border-[1.5px] bg-white px-[clamp(0.125rem,1vw,0.5rem)] text-[clamp(0.6rem,3vw,0.875rem)] font-bold shadow-sm shadow-slate-900/5 transition-colors ${
        selected
          ? "border-coffit-brand text-coffit-brand"
          : "border-slate-200 text-slate-700 hover:bg-stone-50 hover:text-slate-950"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function toggleChipSelection<ChipId extends string>(
  selectedValues: ChipId[],
  targetValue: ChipId,
) {
  if (selectedValues.includes(targetValue)) {
    return selectedValues.filter((value) => value !== targetValue);
  }

  return [...selectedValues, targetValue];
}
