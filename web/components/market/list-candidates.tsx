"use client";
import { useQuery } from "convex/react";
import { CandidateCard } from "./candidate-card";
import { api } from "@/convex/_generated/api";

export function ListCandidates() {
  const candidates = useQuery(api.candidates.getCandidates);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates?.map((candidate) => (
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
      ))}
    </div>
  );
}
