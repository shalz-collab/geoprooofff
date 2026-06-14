import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, BarChart2, ShieldCheck, QrCode, History, Shield, Settings as SettingsIcon, 
  Menu, X, Sun, Moon, LogIn, ChevronRight, RefreshCw, AlertCircle, Info, Heart, MapPin, Award
} from 'lucide-react';
import { VerificationItem, AppTab } from './types';
import UnifiedLogo from './components/UnifiedLogo';
import LiveCapture from './components/LiveCapture';
import StatsDashboard from './components/StatsDashboard';
import VerifyId from './components/VerifyId';
import QrScanner from './components/QrScanner';
import HistoryLogs from './components/HistoryLogs';
import SecurityCenter from './components/SecurityCenter';
import VerificationDetails from './components/VerificationDetails';
// @ts-ignore
import simatsBackground from './assets/images/simats_background_new_1781373560477.jpg';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [captures, setCaptures] = useState<VerificationItem[]>([]);
  const [selectedCapture, setSelectedCapture] = useState<VerificationItem | null>(null);
  const [qrScanCount, setQrScanCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Settings
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("EN");

  // Mobile menu controller
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load captures from server database on load
  useEffect(() => {
    fetchCaptures();
  }, []);

  const fetchCaptures = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/captures");
      if (res.ok) {
        const data = await res.json();
        setCaptures(data);
      }
    } catch (e) {
      console.error("Failed to load server captures, defaulting to local cache", e);
    } finally {
      setLoading(false);
    }
  };

  // Sync dark mode style based on current tab and setting
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleCaptureCompleted = (item: VerificationItem) => {
    // Add dynamically to local state
    setCaptures(prev => [item, ...prev]);
    setSelectedCapture(item);
    setCurrentTab('details'); // take directly to details view
  };

  const handleClearAllCaptures = async () => {
    if (confirm("Are you sure you want to permanently clear all local and synced verification logs? This cannot be undone.")) {
      try {
        const res = await fetch("/api/captures", { method: "DELETE" });
        if (res.ok) {
          setCaptures([]);
          setSelectedCapture(null);
          alert("All local captures cleared successfully!");
        }
      } catch (err) {
        alert("Failed to contact verification server.");
      }
    }
  };

  const navigateTab = (tab: AppTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Nav categories mapping representing Header buttons
  const tabsConfig = [
    { id: 'capture', label: 'Capture', icon: Camera },
    { id: 'stats', label: 'Stats', icon: BarChart2 },
    { id: 'verify', label: 'Verify', icon: ShieldCheck },
    { id: 'scan', label: 'Scan', icon: QrCode },
    { id: 'history', label: 'History', icon: History },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      currentTab === 'home' 
        ? 'bg-transparent text-slate-800 dark:text-slate-100'
        : darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Immersive full-screen background representing SIMATS Engineering */}
      {currentTab === 'home' && (
        <div 
          className={`fixed inset-0 bg-cover bg-center -z-20 pointer-events-none transition-all duration-300 ${
            darkMode ? 'bg-slate-950' : 'bg-slate-50'
          }`}
          style={{ backgroundImage: `url(${simatsBackground})` }}
          referrerPolicy="no-referrer"
        >
          {darkMode ? (
            <>
              {/* Immersive dark overlays to show the beautiful dark neon atmosphere when in dark theme */}
              <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/90 pointer-events-none" />
            </>
          ) : (
            <>
              {/* Immersive light overlays for pristine text legibility in light theme */}
              <div className="absolute inset-0 bg-white/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/80 pointer-events-none" />
            </>
          )}
        </div>
      )}
      {/* 1. Header component matches layout structure in reference images */}
      <header className={`sticky top-0 z-50 border-b transition-colors duration-200 print:hidden ${
        darkMode 
          ? 'bg-slate-950/90 text-white border-white/5 backdrop-blur-md' 
          : 'bg-white/95 text-slate-800 border-slate-150 backdrop-blur-md shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo with interactive G-pin */}
          <div onClick={() => navigateTab('home')} className="cursor-pointer">
            <UnifiedLogo size={42} theme={darkMode ? 'dark' : 'header'} />
          </div>

          {/* Desktop Navigation links matching reference menu layout */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {currentTab === 'home' ? (
              <>
                <a 
                  href="#features" 
                  className={`px-4 py-2 text-sm font-semibold transition ${
                    darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >Features</a>
                <a 
                  href="#security-sec" 
                  className={`px-4 py-2 text-sm font-semibold transition ${
                    darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >Security</a>
                <a 
                  href="#contact" 
                  className={`px-4 py-2 text-sm font-semibold transition ${
                    darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >Contact</a>
                
                {/* Instant Theme Toggle button in Hero Landing Header */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`ml-3 p-2.5 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
                    darkMode 
                      ? 'bg-white/10 hover:bg-white/20 text-yellow-400 border-white/15' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-205'
                  }`}
                  title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => navigateTab('capture')}
                  className={`ml-4 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all flex items-center gap-1.5 shadow-sm ${
                    darkMode 
                      ? 'bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border-white/15'
                      : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'
                  }`}
                >
                  <LogIn className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-white'}`} />
                  Dashboard
                </button>
              </>
            ) : (
              <>
                {/* Regular platform navigation pills matches exactly */}
                {tabsConfig.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => navigateTab(t.id as AppTab)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
                        currentTab === t.id
                          ? 'bg-blue-700 text-white shadow-sm ring-1 ring-blue-600'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {t.label}
                    </button>
                  );
                })}

                {/* Instant Theme Toggle button in Platform Header */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`ml-3 p-1.5 rounded-full border transition-all flex items-center justify-center shrink-0 ${
                    darkMode 
                      ? 'bg-slate-800 border-white/10 text-yellow-400 hover:bg-slate-700' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
                >
                  {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
              </>
            )}
          </nav>

          {/* Mobile Hamburg menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-colors ${
              darkMode ? 'border-white/10 hover:bg-slate-800 text-white' : 'border-slate-250 hover:bg-slate-100 text-slate-800'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown view */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t px-4 py-4 space-y-2 flex flex-col transition-all ${
            darkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-150 shadow-lg text-slate-800'
          }`}>
            {currentTab === 'home' ? (
              <>
                <a 
                  href="#features" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`py-2.5 text-sm font-bold block transition ${
                    darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >Features</a>
                <a 
                  href="#security-sec" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`py-2.5 text-sm font-bold block transition ${
                    darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >Security</a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`py-2.5 text-sm font-bold block transition ${
                    darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >Contact</a>

                {/* Mobile Quick Theme Switcher */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-bold transition flex items-center gap-2 border ${
                    darkMode 
                      ? 'bg-slate-800/70 border-white/10 text-yellow-400' 
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {darkMode ? <Sun className="w-4 h-4 shrink-0 text-yellow-400" /> : <Moon className="w-4 h-4 shrink-0 text-slate-500" />}
                  Theme: {darkMode ? 'Dark Theme' : 'Light Theme'}
                </button>

                <button
                  onClick={() => navigateTab('capture')}
                  className="w-full text-center py-3 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-4"
                >
                  Enter Platform
                </button>
              </>
            ) : (
              <>
                {tabsConfig.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => navigateTab(t.id as AppTab)}
                    className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-bold transition flex items-center gap-2 ${
                      currentTab === t.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <t.icon className="w-4 h-4 shrink-0" />
                    {t.label}
                  </button>
                ))}

                {/* Mobile Dashboard Quick Theme Switcher */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-bold transition flex items-center gap-2 border ${
                    darkMode 
                      ? 'bg-slate-800/70 border-white/10 text-yellow-400' 
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {darkMode ? <Sun className="w-4 h-4 shrink-0 text-yellow-400" /> : <Moon className="w-4 h-4 shrink-0 text-slate-500" />}
                  Theme: {darkMode ? 'Dark Theme' : 'Light Theme'}
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* 2. Main Page views stack */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 print:py-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab + (selectedCapture?.id || '')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {/* Landing page view exactly matching image reference 3 */}
            {currentTab === 'home' && (
              <div className="space-y-20 pt-10 pb-16">
                
                {/* Hero block dynamic container with transparent background to show the full-screen SIMATS Engineering background beautifully */}
                <div className={`relative py-16 px-4 md:py-24 md:px-8 overflow-hidden flex flex-col items-center text-center transition-all ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {/* Glowing background gradient balls only in dark theme for that atmospheric aesthetic */}
                  {darkMode && (
                    <>
                      <div className="absolute top-1/4 left-1/4 w-[350px] height-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
                      <div className="absolute bottom-1/4 right-1/4 w-[350px] height-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
                    </>
                  )}

                  {/* Gigantic heading matching Reference image 3 exactly */}
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-display max-w-3xl leading-[1.1]">
                    Every image. <span className={darkMode ? "text-blue-400" : "text-blue-600"}>Proven in place.</span>
                  </h1>

                  <p className={`text-sm sm:text-base max-w-2xl mt-6 leading-relaxed font-sans ${
                    darkMode ? 'text-slate-300' : 'text-slate-600 font-medium'
                  }`}>
                    GeoProof transforms ordinary image uploads into verifiable digital evidence—combining GPS, metadata, timestamps, QR signatures, hashes, and AI tamper detection.
                  </p>

                  {/* Call to actions segment */}
                  <div className="flex flex-col sm:flex-row gap-4.5 mt-10">
                    <button
                      onClick={() => navigateTab('capture')}
                      className={`px-8 py-4 rounded-full font-black text-sm tracking-wide transition-all flex items-center justify-center gap-2 group ${
                        darkMode 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)] active:scale-95'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_20px_rgba(59,130,246,0.2)] active:scale-95'
                      }`}
                    >
                      Capture evidence
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                    <button
                      onClick={() => navigateTab('stats')}
                      className={`px-8 py-4 rounded-full font-bold text-sm transition border ${
                        darkMode 
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                          : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-200 shadow-sm'
                      }`}
                    >
                      View dashboard
                    </button>
                  </div>

                  <div className={`pt-16 uppercase tracking-widest text-[9px] font-bold font-mono flex items-center gap-3 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-slate-400' : 'bg-slate-500'}`} />
                    CAPTURE. VERIFY. TRUST.
                    <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-slate-400' : 'bg-slate-500'}`} />
                  </div>
                </div>

                {/* Features Bento cards structure matching image reference 3 */}
                <div id="features" className="space-y-12">
                  <div className="text-center space-y-2">
                    <h2 className={`text-2xl font-black font-display uppercase tracking-tight transition-colors ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>Enterprise Verification Capabilities</h2>
                    <p className={`text-xs max-w-md mx-auto transition-colors ${
                      darkMode ? 'text-slate-300' : 'text-slate-500 font-medium'
                    }`}>Providing watermarked authenticity certificates using native hardware sensors and AI</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* card 1 */}
                    <div className={`backdrop-blur-md border p-6 rounded-2xl shadow-lg text-left transition hover:border-blue-500/50 ${
                      darkMode 
                        ? 'bg-slate-900/60 border-white/10 text-white' 
                        : 'bg-white/80 border-slate-200 text-slate-800 shadow-md'
                    }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                        darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <Camera className="w-5 h-5" />
                      </div>
                      <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>Live Capture</h4>
                      <p className={`text-xs mt-1.5 leading-normal font-medium ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>Real-time GPS-stamped photo capture verifying instant physical location profiles.</p>
                    </div>
                    {/* card 2 */}
                    <div className={`backdrop-blur-md border p-6 rounded-2xl shadow-lg text-left transition hover:border-blue-500/50 ${
                      darkMode 
                        ? 'bg-slate-900/60 border-white/10 text-white' 
                        : 'bg-white/80 border-slate-200 text-slate-800 shadow-md'
                    }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                        darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>GPS Proof</h4>
                      <p className={`text-xs mt-1.5 leading-normal font-medium ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>Reverse-geocoded precision coordinates pointing exactly to regional nodes.</p>
                    </div>
                    {/* card 3 */}
                    <div className={`backdrop-blur-md border p-6 rounded-2xl shadow-lg text-left transition hover:border-blue-500/50 ${
                      darkMode 
                        ? 'bg-slate-900/60 border-white/10 text-white' 
                        : 'bg-white/80 border-slate-200 text-slate-800 shadow-md'
                    }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                        darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <QrCode className="w-5 h-5" />
                      </div>
                      <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>QR Signed</h4>
                      <p className={`text-xs mt-1.5 leading-normal font-medium ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>Tamper-evident digital signatures generating fully printable verification report QR codes.</p>
                    </div>
                    {/* card 4 */}
                    <div className={`backdrop-blur-md border p-6 rounded-2xl shadow-lg text-left transition hover:border-blue-500/50 ${
                      darkMode 
                        ? 'bg-slate-900/60 border-white/10 text-white' 
                        : 'bg-white/80 border-slate-200 text-slate-800 shadow-md'
                    }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                        darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>AI Tamper Check</h4>
                      <p className={`text-xs mt-1.5 leading-normal font-medium ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>Level EXIF structures, and multi-frequency noise check verification powered by Gemini model.</p>
                    </div>
                  </div>
                </div>

                {/* Bento Larger Cards matches details in image reference 3 */}
                <div id="security-sec" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left big card */}
                  <div className={`p-8 backdrop-blur-md rounded-3xl border space-y-4 shadow-lg blueprint-grid relative overflow-hidden transition-all ${
                    darkMode 
                      ? 'bg-slate-900/60 text-white border-white/10' 
                      : 'bg-white/80 text-slate-850 border-slate-200 shadow-md'
                  }`}>
                    <div className={`absolute right-0 bottom-x select-none font-mono font-bold text-9xl transition-colors ${
                      darkMode ? 'text-blue-400/5' : 'text-blue-600/[0.03]'
                    }`}>SEC</div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                      darkMode ? 'bg-white/10 border-white/5 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
                    }`}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <h3 className={`text-lg font-bold font-display tracking-tight ${darkMode ? 'text-white' : 'text-slate-950'}`}>Security-first architecture</h3>
                    <p className={`text-xs leading-relaxed font-sans font-medium transition-colors ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      SHA-256 fingerprints, on-device hashing, signed QR payloads and audit-ready records. Every capture is bound to its location, time and device signature.
                    </p>
                  </div>

                  {/* Right big card */}
                  <div className={`p-8 backdrop-blur-md rounded-3xl border space-y-4 shadow-lg blueprint-grid relative overflow-hidden transition-all ${
                    darkMode 
                      ? 'bg-slate-900/60 text-white border-white/10' 
                      : 'bg-white/80 text-slate-850 border-slate-200 shadow-md'
                  }`}>
                    <div className={`absolute right-0 bottom-x select-none font-mono font-bold text-9xl transition-colors ${
                      darkMode ? 'text-blue-400/5' : 'text-blue-600/[0.03]'
                    }`}>EDU</div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                      darkMode ? 'bg-white/10 border-white/5 text-white' : 'bg-blue-50 border-blue-100 text-blue-600'
                    }`}>
                      <UnifiedLogo size={32} theme={darkMode ? 'dark' : 'light'} className="p-0" />
                    </div>
                    <h3 className={`text-lg font-bold font-display tracking-tight ${darkMode ? 'text-white' : 'text-slate-950'}`}>Built at SIMATS Engineering</h3>
                    <p className={`text-xs leading-relaxed font-sans font-medium transition-colors ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      A research initiative for verifiable geo-tagged imaging. Contact the team for pilots, integrations or institutional deployments.
                    </p>
                  </div>
                </div>

                {/* Contact Section */}
                <div id="contact" className={`backdrop-blur-md border rounded-3xl p-8 max-w-xl mx-auto shadow-lg text-center space-y-4 transition-all ${
                  darkMode 
                    ? 'bg-slate-900/60 border-white/10 text-white' 
                    : 'bg-white/80 border-slate-200 text-slate-800 shadow-md'
                }`}>
                  <h4 className={`text-sm font-bold font-display uppercase tracking-wider ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>SIMATS Engineering Labs</h4>
                  <p className={`text-xs leading-normal max-w-sm mx-auto ${
                    darkMode ? 'text-slate-300' : 'text-slate-600 font-medium'
                  }`}>
                    Feel free to contact our development desk for institutional pilot coordinates, API integrations, and key deployments.
                  </p>
                  <a 
                    href="https://www.saveetha.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-mono font-bold px-4 py-2.5 rounded-full inline-block border transition-all hover:scale-105 ${
                      darkMode 
                        ? 'text-blue-400 bg-slate-950/40 border-blue-500/20 hover:border-blue-400 hover:bg-slate-950' 
                        : 'text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-300 hover:bg-blue-100/50'
                    }`}
                  >
                    www.saveetha.com
                  </a>
                </div>
              </div>
            )}

            {/* Platform Sub-modules */}
            {currentTab === 'capture' && (
              <LiveCapture 
                onCaptureCompleted={handleCaptureCompleted}
                onNavigateToTab={navigateTab}
              />
            )}

            {currentTab === 'stats' && (
              <StatsDashboard
                captures={captures}
                qrScanCount={qrScanCount}
                onSelectCapture={(item) => {
                  setSelectedCapture(item);
                  setCurrentTab('details');
                }}
              />
            )}

            {currentTab === 'verify' && (
              <VerifyId
                captures={captures}
                onSelectCapture={(item) => {
                  setSelectedCapture(item);
                  setCurrentTab('details');
                }}
                onBack={() => navigateTab('stats')}
              />
            )}

            {currentTab === 'scan' && (
              <QrScanner
                captures={captures}
                onSelectCapture={(item) => {
                  setSelectedCapture(item);
                  setCurrentTab('details');
                }}
                onBack={() => navigateTab('capture')}
                onIncrementScanCount={() => setQrScanCount(prev => prev + 1)}
              />
            )}

            {currentTab === 'history' && (
              <HistoryLogs
                captures={captures}
                onSelectCapture={(item) => {
                  setSelectedCapture(item);
                  setCurrentTab('details');
                }}
              />
            )}

            {currentTab === 'security' && (
              <SecurityCenter logsCount={captures.length} />
            )}

            {/* Details report page view matches Image Reference 10 and 11 */}
            {currentTab === 'details' && selectedCapture && (
              <VerificationDetails
                item={selectedCapture}
                onBack={() => navigateTab('history')}
              />
            )}

            {/* Settings page exact reproduction matches image reference 4 */}
            {currentTab === 'settings' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h2 className={`text-2xl font-black font-display uppercase tracking-tight transition-colors ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>Settings</h2>
                </div>

                <div className="space-y-3">
                  {/* Dark Mode toggle item layout matches Image Reference 4 */}
                  <div className={`border p-5 rounded-2xl flex items-center justify-between shadow-sm transition-all ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-150'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        darkMode ? 'bg-blue-950 text-blue-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Dark Mode</h4>
                        <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Toggle interface theme appearance</p>
                      </div>
                    </div>
                    
                    {/* Toggle switch */}
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                        darkMode ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                        darkMode ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* Notifications toggle item matches Reference */}
                  <div className={`border p-5 rounded-2xl flex items-center justify-between shadow-sm transition-all ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-150'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        darkMode ? 'bg-blue-950 text-blue-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notifications</h4>
                        <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Verification real-time alert signals</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                        notifications ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                        notifications ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* Language selection dropdown matches Reference EN box */}
                  <div className={`border p-5 rounded-2xl flex items-center justify-between shadow-sm transition-all ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-150'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        darkMode ? 'bg-blue-950 text-blue-400' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Language</h4>
                        <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>English (US)</p>
                      </div>
                    </div>

                    <span className={`text-xs font-bold font-mono px-3 py-1.5 rounded-xl uppercase border ${
                      darkMode ? 'text-slate-300 bg-slate-950 border-slate-800' : 'text-slate-500 bg-slate-50 border-slate-200'
                    }`}>
                      {language}
                    </span>
                  </div>

                  {/* Pink warning Delete All button exactly matches Mock Image Reference 4 */}
                  <div className="pt-6">
                    <button
                      onClick={handleClearAllCaptures}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs shadow-sm active:scale-95 transition-all text-center flex items-center justify-center gap-2 border ${
                        darkMode 
                          ? 'bg-rose-950/25 hover:bg-rose-900/30 border-rose-900/55 text-rose-450' 
                          : 'bg-rose-50 hover:bg-rose-100/75 border-rose-200 text-rose-600'
                      }`}
                    >
                      Clear All Local Captures
                    </button>
                  </div>

                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer Component with 2026 Simats matches Reference */}
      <footer className={`border-t py-8 px-6 print:hidden mt-12 transition-colors duration-200 text-[10px] uppercase font-mono tracking-widest ${
        currentTab === 'home'
          ? darkMode 
            ? 'bg-slate-950/80 border-white/10 text-slate-300' 
            : 'bg-white/90 border-slate-200/80 text-slate-750 font-bold shadow-[0_-4px_12px_rgba(0,0,0,0.03)]'
          : darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-150 text-slate-650'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className={`flex items-center gap-1 ${
            currentTab === 'home' && !darkMode ? 'text-slate-900 font-extrabold' : ''
          }`}>
            <span>© 2026 Mukesh G / SIMATS Engineering</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a 
              href="#privacy" 
              className={`transition-colors ${
                currentTab === 'home' && !darkMode 
                  ? 'hover:text-blue-600 text-slate-900 font-extrabold font-mono' 
                  : darkMode ? 'hover:text-blue-400 text-slate-300' : 'hover:text-blue-700 text-slate-650 font-semibold'
              }`}
            >Privacy Policy</a>
            <span className={currentTab === 'home' && !darkMode ? 'text-slate-900 font-extrabold' : darkMode ? 'text-slate-600' : 'text-slate-400'}>•</span>
            <a 
              href="#terms" 
              className={`transition-colors ${
                currentTab === 'home' && !darkMode 
                  ? 'hover:text-blue-600 text-slate-900 font-extrabold font-mono' 
                  : darkMode ? 'hover:text-blue-400 text-slate-300' : 'hover:text-blue-700 text-slate-650 font-semibold'
              }`}
            >Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
