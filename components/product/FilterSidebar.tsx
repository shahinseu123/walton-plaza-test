"use client";

import { useDebouncedCallback } from "@/hooks/use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import ReactSlider from "react-slider";

export const FilterSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [values, setValues] = useState([0, 10000]);

  const minPrice = values[0];
  const maxPrice = values[1];

  const createQueryString = useCallback(
    (value: number[]) => {
      setValues(value)
      const params = new URLSearchParams(searchParams.toString());
      params.set("min-price", value[0].toString());
      params.set("max-price", value[1].toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams],
  );
  const debounced = useDebouncedCallback((val: number[]) => {
    createQueryString(val)
  }, 500);

  const handleFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full space-y-8 pr-4">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
          Price Range
        </h3>
        <ReactSlider
          className="v-slider-wrapper"
          thumbClassName="v-slider-thumb"
          trackClassName="v-slider-track"
          value={values}
          onChange={(newValues: any) => debounced(newValues)}
          min={0}
          max={10000}
          renderThumb={({ key, ...restProps }, state) => (
            <div key={key} {...restProps}>
              <div className="v-slider-thumb-surface">
                <span className="v-slider-label">${state.valueNow}</span>
              </div>
            </div>
          )}
        />
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
          Availability
        </h3>
        <div className="mt-4 space-y-2">
          {["in-stock", "out-of-stock"].map((status) => (
            <label
              key={status}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={searchParams.get("status") === status}
                onChange={(e) =>
                  handleFilter("status", e.target.checked ? status : "")
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {status}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
