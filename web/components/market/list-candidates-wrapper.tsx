import { ListCandidates } from "@/components/market/list-candidates";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";

export async function ListCandidatesWrapper() {
  const preloadedCandidates = await preloadQuery(api.candidates.getCandidates);
  return <ListCandidates preloadedCandidates={preloadedCandidates} />;
}
