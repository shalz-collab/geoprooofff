// @ts-ignore
import geoproofLogo from '../assets/images/geoproof_logo_1781373094570.jpg';

interface UnifiedLogoProps {
  className?: string;
  size?: number; // width / height of outer container
  theme?: 'light' | 'dark' | 'header';
}

export default function UnifiedLogo({ className = "", size = 48, theme = 'header' }: UnifiedLogoProps) {
  const isHeader = theme === 'header';
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Generated high-fidelity GeoProof logo image matching original request */}
      <img
        src={geoproofLogo}
        alt="GeoProof Logo"
        width={size}
        height={size}
        className="rounded-lg object-cover shadow-md border border-slate-200/40 select-none pointer-events-none"
        style={{ width: `${size}px`, height: `${size}px` }}
        referrerPolicy="no-referrer"
      />

      <div className="flex flex-col justify-center leading-none">
        <span className={`font-display text-xl font-bold tracking-tight ${
          isHeader ? 'text-slate-800' : isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Geo<span className="text-blue-600 dark:text-blue-400 font-extrabold">Proof</span>
        </span>
        <span className={`text-[8px] font-mono tracking-widest uppercase mt-0.5 ${
          isHeader ? 'text-blue-700/80 font-semibold' : isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Capture. Verify. Trust.
        </span>
      </div>
    </div>
  );
}
