import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTeam } from "@/lib/team";
import TeamView from "@/components/team/TeamView";

/* ============================================================
   TEAM - the real CSAU roster: a full-circle carousel of the
   leadership, the deputy heads by domain, and a profile view
   for every member. The roster is fetched from the CMS on the
   server (revalidated hourly) and handed to the interactive
   view. See src/lib/team.ts.
   Route: /team
   ============================================================ */

export const metadata: Metadata = pageMetadata({
  title: "Team - Office Bearers, Domain Heads and Deputies",
  description:
    "The 2026-27 team behind the Computer Society of Anna University, CEG - the office bearers, domain heads and deputy heads, with their photos and profiles.",
  path: "/team",
});

export const revalidate = 3600;

export default async function TeamPage() {
  const { members, state } = await getTeam();
  return <TeamView members={members} state={state} />;
}
