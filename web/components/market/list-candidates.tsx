"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { CandidateCard } from "./candidate-card";
import { api } from "@/convex/_generated/api";

export function ListCandidates(props: {
  preloadedCandidates: Preloaded<typeof api.candidates.getCandidates>;
}) {
  const candidates = usePreloadedQuery(props.preloadedCandidates);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates?.map((candidate) => {
        return (
          <CandidateCard
            key={candidate.name}
            name={candidate.name}
            party={candidate.party}
            imageQuery={candidate.photoUrl}
            odds={candidate.currentOdds}
            partyColorClass={candidate.color}
            probability={0.0}
            totalPool={candidate.totalPool}
          />
        );
      })}
    </div>
  );
}
