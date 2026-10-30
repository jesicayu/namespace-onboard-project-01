"use client";

import { useSearchParams } from "next/navigation";
import { buildClass, choicesQuery, parseChoices, type CatalogStep } from "@/lib/class-builder";
import { ClassForm } from "./class-form";
import { ClassResult } from "./class-result";

/**
 * The choices and the class they build both live in the URL, so a class can be bookmarked or shared.
 * The class is built in the browser, so the page also works as a static export (GitHub Pages).
 */
export function ClassBuilder({ catalog }: { catalog: CatalogStep[] }) {
  const choices = parseChoices(Object.fromEntries(useSearchParams()));
  return (
    <>
      <ClassForm key={choices ? JSON.stringify(choices) : "new"} catalog={catalog} initial={choices} />
      {/* A new class (not a swap) mounts afresh, so it plays its entrance again. */}
      {choices && <ClassResult key={choicesQuery({ ...choices, alts: {} })} sections={buildClass(catalog, choices)} choices={choices} />}
    </>
  );
}
