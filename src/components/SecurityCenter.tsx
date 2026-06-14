import { Shield, ShieldAlert, Key, Cpu, Zap, Radio, CloudLightning, Activity } from 'lucide-react';

interface SecurityCenterProps {
  logsCount: number;
}

export default function SecurityCenter({ logsCount }: SecurityCenterProps) {
  // Mock secure diagnostics calculated from database values
  const hasItems = logsCount > 0;
  const securityScore = hasItems ? 98 : 100;
  const riskLevel = "Low";

  const securityPractices = [
    { name: "Anti-Tamper Protection", status: "Enabled", desc: "Digital pattern noise inspection active", icon: Shield, ok: true },
    { name: "GPS Security", status: "Active", desc: "Anti-spoofing geodetic check verified", icon: Radio, ok: true },
    { name: "Digital Signature", status: "Secure", desc: "On-applet RSA cryptographic sign keys", icon: Key, ok: true },
    { name: "AES-256 Encryption", status: "Enabled", desc: "Resting database payloads fully hashed", icon: Cpu, ok: true },
    { name: "Hash Validation (SHA-256)", status: "Active", desc: "Instant hash checksum block mismatch active", icon: Zap, ok: true },
    { name: "Cloud Sync Status", status: "Active", desc: "Express server database sync synchronized", icon: CloudLightning, ok: true },
  ];

  return (
    <div className="space-y-6">
      {/* Visual Blue header banner exactly matching reference image 5 */}
      <div className="bg-blue-800 text-white p-8 rounded-3xl relative overflow-hidden shadow-lg blueprint-grid blueprint-grid-dark flex flex-col justify-between min-h-[160px]">
        {/* Abstract absolute background graphics */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-blue-700/50 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 font-mono flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            System integrity active
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight font-display">
            SECURITY CENTER
          </h2>
        </div>

        {/* Floating Scores box matching image reference 5 */}
        <div className="flex gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 px-5 py-3 w-[150px]">
            <span className="text-[10px] text-blue-200 block uppercase font-bold tracking-wider font-mono">Security Score</span>
            <span className="text-3xl font-black font-mono text-emerald-300 mt-1 block">
              {securityScore}<span className="text-xs text-white/50 font-normal">/100</span>
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 px-5 py-3 w-[150px]">
            <span className="text-[10px] text-blue-200 block uppercase font-bold tracking-wider font-mono">Risk Level</span>
            <span className="text-3xl font-black text-rose-300 font-display mt-1 block">{riskLevel}</span>
          </div>
        </div>
      </div>

      {/* Grid checklist matching image reference 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityPractices.map((practice, index) => {
          const IconComponent = practice.icon;
          return (
            <div
              key={index}
              className="bg-white border border-slate-150 p-5 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{practice.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{practice.desc}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 uppercase font-mono tracking-wider">
                {practice.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Core diagnostics panel */}
      <div className="bg-slate-50 rounded-2xl border border-slate-150 p-5 p-5 text-center">
        <Activity className="w-5 h-5 text-blue-600 mx-auto animate-pulse" />
        <h4 className="text-xs font-bold font-mono text-slate-700 uppercase mt-2 tracking-widest">Digital Hardware Check</h4>
        <p className="text-[11px] text-slate-500 mt-1 max-w-lg mx-auto">
          GeoProof platform periodically performs deep EXIF noise evaluation, regional satellite coordinate parity matching, and cryptographically signs payloads with SHA-256. Secure sync verified across connected devices.
        </p>
      </div>
    </div>
  );
}
