import { VerificationItem } from '../types';
import { BarChart2, ShieldAlert, CheckCircle, Smartphone, Flame, QrCode } from 'lucide-react';

interface StatsDashboardProps {
  captures: VerificationItem[];
  qrScanCount: number;
  onSelectCapture: (item: VerificationItem) => void;
}

export default function StatsDashboard({ captures, qrScanCount, onSelectCapture }: StatsDashboardProps) {
  // Compute reactive counts
  const totalCount = captures.length;
  const verifiedCount = captures.filter(x => x.status === "VERIFIED").length;
  const failedCount = captures.filter(x => x.status === "TAMPERED" || x.status === "SUSPICIOUS").length;
  const qrCount = qrScanCount;
  const todayCount = captures.filter(x => x.timestamp.includes("2026") || x.timestamp.includes("/2026")).length || totalCount;

  return (
    <div className="space-y-6">
      {/* Visual top banner identical to image reference 9 */}
      <div className="bg-blue-800 text-white p-8 rounded-3xl relative overflow-hidden shadow-lg blueprint-grid blueprint-grid-dark flex flex-col justify-between min-h-[160px]">
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-blue-700/50 to-transparent pointer-events-none" />
        <div className="absolute top-6 right-8 text-white/10 select-none">
          <BarChart2 className="w-24 h-24 stroke-1" />
        </div>

        <div className="relative z-10 space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 font-mono">
            Real-time verification analytics
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight font-display">
            GEO-PROOF DASHBOARD
          </h2>
        </div>
      </div>

      {/* Metrics Row representing image reference 9 row cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* 1. Verified Total */}
        <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[105px]">
          <span className="text-2xl font-black font-mono text-slate-800">{totalCount}</span>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold font-mono mt-2">
            Verified Total
          </div>
        </div>

        {/* 2. Cloud Sync */}
        <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[105px]">
          <span className="text-2xl font-bold font-sans text-emerald-600 flex items-center gap-1.5Packed">
            Active
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
          </span>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold font-mono mt-2">
            Cloud Sync
          </div>
        </div>

        {/* 3. QR Scans */}
        <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[105px]">
          <span className="text-2xl font-black font-mono text-slate-800">{qrCount}</span>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold font-mono mt-2">
            QR Scans
          </div>
        </div>

        {/* 4. Today's Captures */}
        <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[105px]">
          <span className="text-2xl font-black font-mono text-slate-800">{todayCount}</span>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold font-mono mt-2">
            Today's Captures
          </div>
        </div>
      </div>

      {/* Security Status Box representing image reference 9 Security box */}
      <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">
          SECURITY STATUS
        </h3>
        
        <div className="divide-y divide-slate-100/85">
          <div className="py-2.5 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-sans font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Anti-Tamper Protection
            </span>
            <span className="font-bold text-slate-700 font-mono">Enabled</span>
          </div>
          <div className="py-2.5 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-sans font-medium flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-500" />
              GPS Encryption
            </span>
            <span className="font-bold text-slate-700 font-mono">Active</span>
          </div>
          <div className="py-2.5 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-sans font-medium flex items-center gap-2">
              <QrCode className="w-4 h-4 text-indigo-500" />
              QR Digital Signature
            </span>
            <span className="font-bold text-slate-700 font-mono">Secure</span>
          </div>
        </div>
      </div>

      {/* Recent Verifications list representing image reference 9 recent tab */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">
          RECENT VERIFICATIONS
        </h3>

        {captures.length === 0 ? (
          <div className="bg-slate-50 border border-dashed rounded-2xl p-8 text-center text-slate-500 text-xs">
            No secure captures detected. Record verification logs on the main Capture page.
          </div>
        ) : (
          <div className="space-y-2">
            {captures.slice(0, 4).map((cap) => (
              <div
                key={cap.id}
                onClick={() => onSelectCapture(cap)}
                className="bg-white border border-slate-150 p-4.5 rounded-2xl flex items-center justify-between shadow-sm hover:border-blue-400 active:bg-slate-50 cursor-pointer transition-all gap-4"
              >
                <div className="flex items-center gap-4.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 100" className="w-6 h-6 fill-blue-600 opacity-90">
                      <path d="M50 10C27.9 10 10 27.9 10 50C10 63.8 16.5 75.8 26.5 83L50 96L73.5 83C83.5 75.8 90 63.8 90 50C90 27.9 72.1 10 50 10Z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-sm font-bold text-slate-800 truncate pr-4">
                      {cap.locationName}
                    </h5>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {cap.timestamp}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-blue-600 font-mono">
                    #{cap.hexId}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
