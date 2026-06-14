export interface VerificationItem {
  id: string; // uuid
  hexId: string; // 4-char hex, e.g. "9CA4"
  imageUrl: string; // base64 data-url or static fallback
  locationName: string; // reverse geocoded text
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string; // formatted text e.g. "6/13/2026, 10:56:14 PM"
  hash: string; // sha-256 fingerprint
  status: "VERIFIED" | "SUSPICIOUS" | "TAMPERED";
  confidence: number; // 0-100
  deviceInfo: string; // device identity string
  securityMetrics: {
    antiTamper: "Enabled" | "Disabled";
    gpsSecurity: "Active" | "Failed";
    digitalSignature: "Secure" | "Unsigned";
    encryption: "Enabled" | "Disabled";
    hashValidation: "Active" | "Failed";
    cloudSync: "Active" | "Offline";
  };
  aiReport?: {
    tamperDetected: boolean;
    analysisDetails: string;
    explanation: string;
    gpsIntegrity: string;
    environmentalConsistency: string;
  };
}

export type AppTab = 'home' | 'capture' | 'stats' | 'verify' | 'scan' | 'history' | 'security' | 'settings' | 'details';
