import { MapPin } from 'lucide-react';

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  address?: string;
  zoom?: number;
}

export default function LeafletMap({ latitude, longitude, address, zoom = 15 }: LeafletMapProps) {
  // OpenStreetMap embed coordinates bounding box calculator
  const offset = 0.006;
  const minLng = longitude - offset;
  const maxLng = longitude + offset;
  const minLat = latitude - offset / 2;
  const maxLat = latitude + offset / 2;

  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <div className="rounded-2xl border border-slate-200/80 shadow-md bg-white overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-150 px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-800 font-sans flex items-center gap-1.5Packed">
          <MapPin className="w-4 h-4 text-emerald-500" />
          Location Map ({latitude.toFixed(6)}, {longitude.toFixed(6)})
        </span>
        {address && (
          <span className="text-xs text-slate-500 truncate max-w-[250px] font-mono">
            {address}
          </span>
        )}
      </div>
      <div className="relative w-full h-[320px] bg-slate-100 flex items-center justify-center">
        {/* Real Leaflet OpenStreetMap iframe */}
        <iframe
          title="Leaflet OpenStreetMap View"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={osmUrl}
          className="border-0 opacity-90 hover:opacity-100 transition-opacity"
        />
        
        {/* Subtle decorative indicator info */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-600 font-mono scale-95 border shadow">
          Leaflet Tile Engine • OpenStreetMap Contributors
        </div>
      </div>
    </div>
  );
}
