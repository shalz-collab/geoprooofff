import React, { useState, useRef, useEffect } from 'react';
import { QrCode, ArrowLeft, Image as ImageIcon, AlertTriangle, CheckCircle } from 'lucide-react';
import { VerificationItem } from '../types';

interface QrScannerProps {
  captures: VerificationItem[];
  onSelectCapture: (item: VerificationItem) => void;
  onBack: () => void;
  onIncrementScanCount: () => void;
}

export default function QrScanner({ captures, onSelectCapture, onBack, onIncrementScanCount }: QrScannerProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [matchFound, setMatchFound] = useState<VerificationItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    startScannerCamera();
    return () => stopScannerCamera();
  }, []);

  const startScannerCamera = async () => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn("Scanner camera blocked, using simulated scan feed");
      setCameraError("Camera permission blocked. Use the gallery selector below to simulate scanning QR codes.");
    }
  };

  const stopScannerCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Mock processing / scanning image for verification items
  const handleSelectGallery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    // Simulate image read scan
    setTimeout(() => {
      setIsProcessing(false);
      onIncrementScanCount();
      // Match general item in the list optionally, or select first item as demo
      if (captures.length > 0) {
        const item = captures[0]; // match first dynamic item
        setMatchFound(item);
        setTimeout(() => {
          onSelectCapture(item);
        }, 1800);
      } else {
        alert("Verification Database is empty. Create a secure stamp capture first!");
      }
    }, 1500);
  };

  const handleSimulatedTrigger = () => {
    if (captures.length === 0) {
      alert("Database is currently empty. Please capture an image first so we can scan mock QR codes.");
      return;
    }
    // Simulate camera aligned scanner lock!
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onIncrementScanCount();
      const randomItem = captures[Math.floor(Math.random() * captures.length)];
      setMatchFound(randomItem);
      setTimeout(() => {
        onSelectCapture(randomItem);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Visual top blue bar matching reference image 7 */}
      <div className="bg-blue-800 text-white p-5 rounded-3xl flex items-center justify-between shadow">
        <button
          onClick={onBack}
          className="p-1.5 hover:bg-blue-700/80 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold font-mono">QR Verification Scan</span>
        <div className="w-8 h-8" />
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {/* Main Camera Scan frame container matching reference image 7 */}
        <div className="relative aspect-video rounded-3xl bg-slate-900 border-4 border-slate-950 overflow-hidden shadow-lg flex items-center justify-center">
          
          {isProcessing ? (
            <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center gap-4 text-white p-5 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                Parsing QR Signature Payload...
              </p>
            </div>
          ) : matchFound ? (
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center gap-3 text-white p-5 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
              <p className="text-xs font-mono text-emerald-400">SIGNATURE SECURE MATCH</p>
              <h4 className="text-sm font-bold max-w-xs truncate">{matchFound.locationName}</h4>
              <p className="text-[10px] text-slate-400 font-mono">ID: {matchFound.id}</p>
            </div>
          ) : cameraError ? (
            <div className="p-8 text-center text-slate-300">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
              <p className="text-xs font-sans leading-normal">{cameraError}</p>
            </div>
          ) : (
            <>
              {/* Live Web camera feeds */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Align Target Focus white pointers matching reference image 7 exactly */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[180px] h-[100px] border-2 border-dashed border-white/50 rounded-xl relative">
                  {/* Four bold target corners */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white" />
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white" />
                  
                  {/* Glowing scan horizontal line */}
                  <div className="w-full h-0.5 bg-emerald-500/80 absolute top-1/2 left-0 animate-pulse shadow-[0_0_8px_#10B981]" />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="text-center space-y-4">
          <p className="text-xs text-slate-500 font-medium">
            Align the QR code within the frame
          </p>

          <div className="flex gap-4 justify-center">
            {/* Gallery select file */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleSelectGallery}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-sm transition"
            >
              <ImageIcon className="w-4 h-4 text-blue-600" />
              Select from Gallery
            </button>

            {/* Simulated instant lock capture match test */}
            {!cameraError && captures.length > 0 && (
              <button
                onClick={handleSimulatedTrigger}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition"
              >
                <QrCode className="w-4 h-4" />
                Simulate QR Align
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
