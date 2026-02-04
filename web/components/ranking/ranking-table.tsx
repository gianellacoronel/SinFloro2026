"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function RankingTable() {
  const candidates = useQuery(api.candidates.getTopCandidates);

  if (candidates === undefined) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-none border-2 border-border" />
        ))}
      </div>
    );
  }

  const getRankStyles = (index: number) => {
    switch (index) {
      case 0:
        return "bg-[#FFD700]/20 hover:bg-[#FFD700]/30 border-l-[12px] border-l-[#FFD700]";
      case 1:
        return "bg-[#C0C0C0]/20 hover:bg-[#C0C0C0]/30 border-l-[12px] border-l-[#C0C0C0]";
      case 2:
        return "bg-[#CD7F32]/20 hover:bg-[#CD7F32]/30 border-l-[12px] border-l-[#CD7F32]";
      default:
        return "hover:bg-muted/50 border-l-[12px] border-l-transparent";
    }
  };

  return (
    <div className="bg-card border-4 border-border shadow-[6px_6px_0px_0px] shadow-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="border-b-4 border-border hover:bg-transparent">
              <TableHead className="w-[60px] font-black uppercase text-center text-xs sm:text-sm">#</TableHead>
              <TableHead className="font-black uppercase text-xs sm:text-sm">Candidato</TableHead>
              <TableHead className="font-black uppercase text-xs sm:text-sm hidden sm:table-cell">Partido</TableHead>
              <TableHead className="text-right font-black uppercase text-xs sm:text-sm">Pozo (INTI)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y-2 divide-border">
            {candidates.map((candidate, index) => (
              <TableRow 
                key={candidate._id} 
                className={cn(
                  "border-border transition-colors",
                  getRankStyles(index)
                )}
              >
                <TableCell className="text-center font-bold text-base sm:text-lg">
                  {index + 1}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm sm:text-base leading-tight">
                      {candidate.name}
                    </span>
                    <span className="text-[10px] sm:hidden text-muted-foreground font-medium italic">
                      {candidate.party}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground font-medium italic text-sm">
                  {candidate.party}
                </TableCell>
                <TableCell className="text-right font-black text-primary text-sm sm:text-base">
                  {Number(candidate.totalPool || 0).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
