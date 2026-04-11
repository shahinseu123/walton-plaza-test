"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  useCallback,
  useState,
} from "react";
import ReactSlider from "react-slider";

export const FilterSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [values, setValues] = useState([0, 100]);

  const minPrice = values[0];
  const maxPrice = values[1];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.set("skip", "0");
      return params.toString();
    },
    [searchParams],
  );

  const handleFilter = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value), {
      scroll: false,
    });
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
          // Link the state
          value={values}
          onChange={(newValues:any) => setValues(newValues)}
          min={0}
          max={100000}
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
          {["In Stock", "Out of Stock"].map((status) => (
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
