import { CandidateCard } from "./candidate-card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export async function ListCandidates() {
  // const candidates = usePreloadedQuery(props.preloadedCandidates);
  const candidates = await fetchQuery(api.candidates.getCandidates);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => {
        return (
          <CandidateCard
            key={candidate._id}
            id={candidate._id}
            contractId={candidate.contractId}
            name={candidate.name}
            party={candidate.party}
            imageQuery={candidate.photoUrl}
            odds={candidate.currentOdds}
            partyColorClass={candidate.color}
            probability={0.0}
          />
        );
      })}
    </div>
  );
}
