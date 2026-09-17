import { type FormEvent, useState } from "react";
import { Search } from "lucide-react";

type LocationSearchFieldProps = {
  initialQuery?: string;
  onSearch: (query: string) => Promise<void>;
};

export function LocationSearchField({
  initialQuery = "",
  onSearch,
}: LocationSearchFieldProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const keyword = query.trim();
    if (keyword.length < 2) {
      return;
    }

    setIsSearching(true);

    try {
      await onSearch(keyword);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form
      className="flex h-12 items-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm"
      onSubmit={handleSubmit}
    >
      <Search
        aria-hidden="true"
        className="mr-2 size-5 shrink-0 text-slate-400"
      />
      <label className="sr-only" htmlFor="location-search">
        장소 검색
      </label>
      <input
        id="location-search"
        type="search"
        minLength={2}
        autoFocus
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        placeholder="역, 주소, 장소 검색"
        className="min-w-0 flex-1 bg-transparent text-base font-medium text-slate-950 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        disabled={isSearching}
        className="ml-2 rounded-lg bg-coffit-brand px-3 py-1.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        검색
      </button>
    </form>
  );
}
