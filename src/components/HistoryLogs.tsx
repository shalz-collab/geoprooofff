import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, Share2, Calendar, FileCheck2 } from 'lucide-react';
import { VerificationItem } from '../types';

interface HistoryLogsProps {
  captures: VerificationItem[];
  onSelectCapture: (item: VerificationItem) => void;
}

export default function HistoryLogs({ captures, onSelectCapture }: HistoryLogsProps) {
  const [query, setQuery] = useState("");

  const filtered = captures.filter((cap) => {
    const q = query.toLowerCase();
    return (
      cap.id.toLowerCase().includes(q) ||
      cap.hexId.toLowerCase().includes(q) ||
      cap.locationName.toLowerCase().includes(q)
    );
  });

  const triggerCopyShareUrl = (e: React.MouseEvent, item: VerificationItem) => {
    e.stopPropagation();
    const mockShareUrl = `${window.location.origin}/share/verification/${item.hexId}`;
    navigator.clipboard.writeText(mockShareUrl).then(() => {
      alert(`Successfully copied verification link for Log #${item.hexId}!`);
    }).catch(() => {
      alert("Clipboard copied: " + mockShareUrl);
    });
  };

  return (
    <div className="space-y-6">
      {/* Title Header matching image reference 6 exactly */}
      <div>
        <h2 className="text-2xl font-black font-display text-slate-800 uppercase tracking-tight">
          VERIFIED CAPTURES
        </h2>
        <p className="text-slate-400 text-xs mt-1 leading-normal font-medium">
          Historical logs stored on device and synchronized in real-time
        </p>
      </div>

      {/* Styled Search bar matching image reference 6 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by location or ID..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans shadow-sm"
        />
      </div>

      {/* Items List exactly matching the cards on reference image 6 */}
      {filtered.length === 0 ? (
        <div className="bg-slate-50 border border-dashed rounded-3xl p-12 text-center text-slate-400 text-xs space-y-2">
          <FileCheck2 className="w-10 h-10 text-slate-350 mx-auto" />
          <p>No verification logs match your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((cap) => (
            <div
              key={cap.id}
              onClick={() => onSelectCapture(cap)}
              className="bg-white border border-slate-150 p-4 rounded-2xl flex items-start gap-4 shadow-sm hover:border-blue-400 active:bg-slate-50 cursor-pointer transition-all"
            >
              {/* Left thumbnail matching image reference 6 */}
              <div className="w-18 h-18 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100 relative">
                {cap.imageUrl.startsWith("http") ? (
                  <img
                    src={cap.imageUrl}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={cap.imageUrl}
                    alt="Captured Thumb"
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Visual badge mark indicator */}
                <span className={`absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ${
                  cap.status === "VERIFIED" ? 'bg-emerald-500' : cap.status === "SUSPICIOUS" ? 'bg-amber-500' : 'bg-red-500'
                } ring-2 ring-white`} />
              </div>

              {/* Central textual info matching image reference 6 */}
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-xs font-mono font-bold text-slate-700 block truncate">
                  {cap.id}
                </span>
                
                {/* Date text */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{cap.timestamp}</span>
                </div>

                {/* Location address text matches Image Reference 6 */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5 font-medium leading-tight">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate pr-4">{cap.locationName}</span>
                </div>
              </div>

              {/* Right actions row matching image reference 6 layout */}
              <div className="flex items-center gap-3 shrink-0 self-center">
                <button
                  onClick={(e) => triggerCopyShareUrl(e, cap)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500 hover:text-blue-600"
                  title="Share verification page link"
                >
                  <Share2 className="w-4.5 h-4.5" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-400">
                  <ArrowRight className="w-4.5 h-4.5 text-slate-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
