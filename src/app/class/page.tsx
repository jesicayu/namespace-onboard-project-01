import type { Metadata } from "next";
import { Suspense } from "react";
import { ClassBuilder } from "@/components/class-builder";
import { getClassCatalog } from "@/lib/glossary";

export const metadata: Metadata = { title: "Build my class" };

export default async function ClassPage() {
  const catalog = await getClassCatalog();
  return (
    <main className="relative z-10 mx-auto max-w-5xl space-y-10 px-6 pb-20 md:px-10">
      <header>
        <h1 className="font-serif text-6xl tracking-tight md:text-7xl">Build my class</h1>
        <p className="mt-3 max-w-xl text-cream/75">
          A class in the order of a Vaganova lesson, assembled from the glossary: barre, poses and adagio, turns, then allegro.
        </p>
      </header>
      <Suspense fallback={<div className="glass h-96 animate-pulse" />}>
        <ClassBuilder catalog={catalog} />
      </Suspense>
    </main>
  );
}
