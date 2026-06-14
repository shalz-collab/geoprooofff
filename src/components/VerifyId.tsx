import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, HelpCircle } from 'lucide-react';
import { VerificationItem } from '../types';

interface VerifyIdProps {
  captures: VerificationItem[];
  onSelectCapture: (item: VerificationItem) => void;
  onBack: () => void;
}

export default function VerifyId({ captures, onSelectCapture, onBack }: VerifyIdProps) {
  const [verificationId, setVerificationId] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanInput = verificationId.trim();
    if (!cleanInput) {
      setErrorMsg("Please enter a valid Verification ID or Hex code.");
      return;
    }

    // Match exact ID (UUID) or short hex ID (case-insensitive)
    const match = captures.find(
      x => x.id.toLowerCase() === cleanInput.toLowerCase() || 
           x.hexId.toLowerCase() === cleanInput.toLowerCase()
    );

    if (match) {
      onSelectCapture(match);
    } else {
      setErrorMsg("No cryptographically signed captures found matching that security ID. Please try another code (such as '9CA4').");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold text-slate-800 font-mono">Verify Image</span>
      </div>

      <div className="bg-white border border-slate-150 rounded-3xl p-6.5 text-center shadow-sm space-y-6">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-800 font-display">
            Enter Verification ID to check authenticity
          </h3>
          <p className="text-slate-400 text-xs mt-1.5 leading-normal max-w-sm mx-auto">
            Input the 4-character short ID or full fingerprint UUID printed on the digital certificate report sheet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
          <input
            type="text"
            value={verificationId}
            onChange={(e) => setVerificationId(e.target.value)}
            placeholder="Enter Verification ID"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center tracking-widest placeholder:tracking-normal placeholder:font-sans uppercase"
          />

          {errorMsg && (
            <p className="text-xs text-rose-600 font-medium font-sans">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-2xl text-sm transition shadow-sm active:scale-95"
          >
            Verify Now
          </button>
        </form>

        {/* How it works segment exact match to reference image 8 */}
        <div className="border-t border-slate-100/80 pt-6 max-w-sm mx-auto text-left space-y-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
            How it works?
          </h4>
          
          <div className="space-y-3 text-xs">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                1
              </div>
              <p className="text-slate-600 leading-normal font-sans font-medium">
                Enter Verification ID listed on the client index database
              </p>
            </div>
            
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                2
              </div>
              <p className="text-slate-600 leading-normal font-sans font-medium">
                We'll check the authenticity of georouted timestamps
              </p>
            </div>

            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                3
              </div>
              <p className="text-slate-600 leading-normal font-sans font-medium">
                View verification results and environmental parity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
