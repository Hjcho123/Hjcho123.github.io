import { useEffect, useRef, useState } from "react";

type FieldItem = {
  field: string;
};

export class FieldFilter<T extends FieldItem> {
  private readonly items: readonly T[];

  constructor(items: readonly T[]) {
    this.items = items;
  }

  get options(): string[] {
    return [...new Set(this.items.map((item) => item.field))].sort();
  }

  filter(selectedField: string): T[] {
    return selectedField === "all"
      ? [...this.items]
      : this.items.filter((item) => item.field === selectedField);
  }
}

export function useFieldFilter<T extends FieldItem>(items: readonly T[]) {
  const [selectedField, setSelectedField] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const fieldFilter = new FieldFilter(items);

  useEffect(() => {
    if (!filterOpen) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [filterOpen]);

  return {
    filterRef,
    filterOpen,
    selectedField,
    fields: ["all", ...fieldFilter.options],
    filteredItems: fieldFilter.filter(selectedField),
    setFilterOpen,
    selectField: (field: string) => {
      setSelectedField(field);
      setFilterOpen(false);
    },
  };
}

type FieldFilterMenuProps = {
  filterRef: React.RefObject<HTMLDivElement | null>;
  filterOpen: boolean;
  selectedField: string;
  fields: string[];
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectField: (field: string) => void;
  allLabel: string;
};

export function FieldFilterMenu({
  filterRef,
  filterOpen,
  selectedField,
  fields,
  setFilterOpen,
  selectField,
  allLabel,
}: FieldFilterMenuProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="label">Filter by</span>
      <div ref={filterRef} className="relative">
        <button
          type="button"
          className="border border-border bg-white px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-foreground hover:bg-foreground hover:text-white focus:border-foreground focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={filterOpen}
          onClick={() => setFilterOpen((open) => !open)}
        >
          {selectedField === "all" ? allLabel : selectedField}
        </button>
        {filterOpen ? (
          <div
            className="absolute right-0 z-20 mt-1 min-w-full border border-border bg-white p-1 shadow-sm"
            role="listbox"
            aria-label="Filter by field"
          >
            {fields.map((field) => (
              <button
                key={field}
                type="button"
                role="option"
                aria-selected={selectedField === field}
                className="block w-full whitespace-nowrap px-3 py-2 text-left font-mono text-xs uppercase tracking-[0.12em] text-foreground hover:bg-foreground hover:text-white"
                onClick={() => selectField(field)}
              >
                {field === "all" ? allLabel : field}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
