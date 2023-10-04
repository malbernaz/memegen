"use client";

import React from "react";
import useSwr from "swr";
import { useDebounce } from "usehooks-ts";
import Image from "next/image";

import { getPopularMemes } from "@/api/imgflip";
import { useDesigner } from "@/stores/designer";
import { Meme } from "./Meme";

export function SearchBar() {
  const { setTemplate } = useDesigner();
  const [filter, setFilter] = React.useState("");
  const debouncedFilter = useDebounce(filter, 300);
  const { data, isLoading } = useSwr("memes", getPopularMemes);
  const searchData = React.useMemo(
    () =>
      data?.memes.filter((meme) =>
        meme.name.toLowerCase().includes(debouncedFilter.toLowerCase()),
      ) ?? [],
    [data?.memes, debouncedFilter],
  );

  return (
    <aside className="h-full overflow-y-auto border-r border-r-neutral-600 bg-neutral-900">
      <div className="sticky top-0 border-b border-neutral-700 bg-neutral-900 p-4">
        <label htmlFor="search">
          <span className="sr-only">Search for popular memes</span>
          <input
            id="search"
            className="w-full rounded border border-neutral-700 bg-transparent px-2 py-1 text-sm outline-0"
            placeholder="One does not simply..."
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </label>
      </div>
      {isLoading && !data ? (
        <div className="p-4">Loading templates...</div>
      ) : searchData.length ? (
        <div className="columns-2 gap-3 p-4">
          {searchData.map((meme) => (
            <div
              className="mb-3 cursor-pointer break-inside-avoid"
              key={meme.id}
              onClick={() => setTemplate(meme)}
            >
              <Image
                className="rounded border border-neutral-700 shadow"
                src={meme.url}
                alt={meme.name}
                width={meme.width}
                height={meme.height}
                style={{ aspectRatio: meme.width / meme.height }}
              />
              <p className="mt-1 w-full truncate text-center text-xs">
                {meme.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid place-items-center gap-4 p-4">
          <Meme className="fill-neutral-600" />
          <p className="text-center text-sm text-neutral-600">
            No matches found for: {filter}...
          </p>
        </div>
      )}
    </aside>
  );
}
