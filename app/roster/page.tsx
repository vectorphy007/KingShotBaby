import { getSubmissions } from "@/lib/storage";
import AdminRebalanceButton from "@/components/AdminRebalanceButton";

export default async function RosterMasterPage() {
  const allMembers = await getSubmissions();
  const approved = allMembers.filter(m => m.status === "approved");

  const renderTier = (title: string, rankKeys: string[], accentColor: string, borderColor: string) => {
    const members = approved.filter(m => rankKeys.includes(m.rank));
    if (members.length === 0) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h2 className={`text-lg font-semibold tracking-tight ${accentColor}`}>
            {title}
          </h2>
          <div className={`h-px flex-1 ${borderColor} opacity-20`}></div>
          <span className={`text-sm font-medium ${accentColor} opacity-70`}>{members.length} Units</span>
        </div>

        <div className={`border-l-4 ${borderColor} rounded-r-2xl bg-secondary shadow-sm overflow-hidden border border-slate-700`}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-800/50 text-foreground uppercase font-semibold tracking-widest border-b border-slate-700 text-xs">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">TC Level</th>
                <th className="px-6 py-4 text-right">Rally Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold">{member.name}</td>
                  <td className="px-6 py-4 text-accent-muted text-xs uppercase">{member.role}</td>
                  <td className="px-6 py-4 font-mono">Lvl {member.townCenter}</td>
                  <td className="px-6 py-4 text-right font-mono">{member.rallyCap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16 md:space-y-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">Alliance Roster</h1>
          <p className="text-accent-muted text-sm">1:3:3:3+ Tactical Composition</p>
        </div>
        <AdminRebalanceButton />
      </div>

      {renderTier("High Command", ["Leadership", "Rally Host"], "text-accent-gold", "border-accent-gold")}
      {renderTier("Tactical Tier: R3", ["R3"], "text-accent-blue", "border-accent-blue")}
      {renderTier("Tactical Tier: R2", ["R2"], "text-accent-green", "border-accent-green")}
      {renderTier("Tactical Tier: R1", ["R1"], "text-accent-muted", "border-slate-700")}
    </div>
  );
}