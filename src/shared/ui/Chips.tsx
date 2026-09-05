"use client";

type ChipItem<Value extends string> = {
  id: Value;
  name: string;
};

type ChipsProps<Value extends string> = {
  ariaLabel: string;
  items: readonly ChipItem<Value>[];
  selectedValues: Value[];
  onSelectedValuesChange: (values: Value[]) => void;
  selectAllLabel?: string;
};

export function Chips<Value extends string>({
  ariaLabel,
  items,
  selectedValues,
  onSelectedValuesChange,
  selectAllLabel,
}: ChipsProps<Value>) {
  const allValues = items.map(({ id }) => id);
  const isAllSelected = selectedValues.length === allValues.length;

  return (
    <div
      aria-label={ariaLabel}
      className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="group"
    >
      {selectAllLabel ? (
        <ChipButton
          label={selectAllLabel}
          selected={isAllSelected}
          onClick={() => {
            onSelectedValuesChange(isAllSelected ? [] : allValues);
          }}
        />
      ) : null}
      {items.map((item) => (
        <ChipButton
          key={item.id}
          label={item.name}
          selected={selectedValues.includes(item.id)}
          onClick={() => {
            onSelectedValuesChange(
              toggleSelectedValue(selectedValues, item.id),
            );
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
      className={`h-9 shrink-0 rounded-full border bg-white px-4 text-sm font-bold shadow-sm shadow-slate-900/5 transition-colors ${
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

function toggleSelectedValue<Value extends string>(
  selectedValues: Value[],
  targetValue: Value,
) {
  if (selectedValues.includes(targetValue)) {
    return selectedValues.filter((value) => value !== targetValue);
  }

  return [...selectedValues, targetValue];
}
