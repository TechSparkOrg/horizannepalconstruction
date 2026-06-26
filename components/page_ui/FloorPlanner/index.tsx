"use client";

import dynamic from "next/dynamic";

const FloorPlannerCanvas = dynamic(() => import("./FloorPlannerCanvas"), { ssr: false });

export default function FloorPlanner() {
  return <FloorPlannerCanvas />;
}
