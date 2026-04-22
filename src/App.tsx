/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator as CalcIcon, 
  FlaskConical, 
  History, 
  ArrowLeftRight, 
  Settings, 
  Info, 
  TrendingUp, 
  Star, 
  Lock, 
  X, 
  Megaphone,
  Delete,
  Hash,
  ChevronLeft
} from 'lucide-react';

// --- Types ---

type Mode = 'Basic' | 'Scientific' | 'History' | 'Converter';

interface CalcState {
  display: string;
  history: string;
  operation: string | null;
  prevValue: number | null;
  newInput: boolean;
}

// --- Components ---

const Sidebar = ({ activeMode, setMode, onUpgrade }: { activeMode: Mode, setMode: (m: Mode) => void, onUpgrade: () => void }) => {
  const navItems: { label: Mode, icon: any }[] = [
    { label: 'Basic', icon: CalcIcon },
    { label: 'Scientific', icon: FlaskConical },
    { label: 'History', icon: History },
    { label: 'Converter', icon: ArrowLeftRight },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 glass-panel border-r border-white/10 flex-col py-8 z-40">
      <div className="px-8 mb-12">
        <h1 className="text-2xl font-black text-primary font-display tracking-tight">NeonCalc Pro</h1>
        <p className="text-on-surface-variant text-sm font-medium"></p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setMode(item.label)}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-display text-sm font-medium transition-all ${
              activeMode === item.label 
                ? 'bg-primary/10 text-primary border-r-2 border-primary shadow-[inset_0_0_10px_rgba(138,235,255,0.1)]' 
                : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-6">
        <button 
          onClick={onUpgrade}
          className="w-full bg-primary-container text-on-primary-container py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          Upgrade to Premium
        </button>
      </div>
    </aside>
  );
};

const TopBar = ({ onSettings, onInfo }: { onSettings: () => void, onInfo: () => void }) => (
  <header className="flex justify-between items-center px-6 h-16 w-full fixed top-0 z-50 glass-panel border-b border-white/10 font-display tracking-tight">
    <div className="text-xl font-black text-primary drop-shadow-[0_0_8px_rgba(138,235,255,0.5)]">
      NeonCalc
    </div>
    <div className="flex items-center gap-2">
      <button onClick={onInfo} className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-white/5 rounded-full">
        <Info size={20} />
      </button>
      <button onClick={onSettings} className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-white/5 rounded-full">
        <Settings size={20} />
      </button>
    </div>
  </header>
);

const BottomNav = ({ activeMode, setMode }: { activeMode: Mode, setMode: (m: Mode) => void }) => {
  const navItems: { label: Mode, icon: any }[] = [
    { label: 'Basic', icon: CalcIcon },
    { label: 'Scientific', icon: FlaskConical },
    { label: 'History', icon: History },
    { label: 'Converter', icon: ArrowLeftRight },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 glass-panel flex justify-around items-center px-4 z-50">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setMode(item.label)}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeMode === item.label ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <item.icon size={20} className={activeMode === item.label ? 'fill-primary/20' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{item.label.substring(0, 4)}</span>
        </button>
      ))}
    </nav>
  );
};

const PaymentModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    card: '',
    expiry: '',
    cvc: ''
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start sm:items-center justify-center p-6 sm:p-0 pt-20 sm:pt-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-surface/90 backdrop-blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md glass-panel rounded-[2rem] p-8 shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface transition-colors">
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                <Star className="text-primary fill-primary/20" size={24} />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-display font-bold text-on-surface tracking-tight">Payment Details</h2>
                <p className="text-on-surface-variant text-sm font-medium">Secure Checkout via NeonCloud</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest ml-1">Cardholder Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  className="w-full bg-surface-container-highest/50 border border-white/5 rounded-xl px-5 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-colors font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest ml-1">Card Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="•••• •••• •••• ••••"
                    className="w-full bg-surface-container-highest/50 border border-white/5 rounded-xl px-5 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-colors font-medium"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40">
                    <Hash size={20} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest ml-1">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    className="w-full bg-surface-container-highest/50 border border-white/5 rounded-xl px-5 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-colors font-medium text-center"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest ml-1">CVC</label>
                  <input 
                    type="text" 
                    placeholder="•••"
                    className="w-full bg-surface-container-highest/50 border border-white/5 rounded-xl px-5 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-colors font-medium text-center"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <button 
                onClick={onConfirm}
                className="w-full py-4 bg-primary text-on-primary font-black rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
              >
                Pay $10 Securely
              </button>
              <button 
                onClick={onClose}
                className="w-full py-3 text-on-surface-variant hover:text-on-surface font-bold text-sm transition-colors"
              >
                Cancel and return
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 opacity-50">
              <Lock size={12} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">256-bit AES Encryption</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const PremiumModal = ({ isOpen, onClose, onGetStarted }: { isOpen: boolean, onClose: () => void, onGetStarted: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-6 sm:p-0 pt-20 sm:pt-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-surface/80 backdrop-blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm glass-panel rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface transition-colors">
            <X size={24} />
          </button>
          
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_30px_rgba(138,235,255,0.1)]">
            <Lock className="text-primary fill-primary/20" size={32} />
          </div>

          <h2 className="text-3xl font-display font-medium text-on-surface mb-3 tracking-tight">Unlock Premium</h2>
          <div className="mb-6">
            <span className="text-4xl font-display font-black text-primary">$10</span>
            <span className="text-on-surface-variant text-sm font-bold ml-2">/ month</span>
          </div>
          <p className="text-on-surface-variant mb-10 leading-relaxed font-medium">
            Whoa there! Basic arithmetic is a Pro feature. Upgrade now to see your results and solve life's biggest mysteries.
          </p>

          <div className="w-full space-y-3">
            <button 
              onClick={onGetStarted}
              className="w-full h-14 bg-primary-container text-on-primary-container font-bold rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:brightness-110 active:scale-95 transition-all text-lg"
            >
              Get Started Now 💳
            </button>
            <button 
              onClick={onClose}
              className="w-full h-14 text-on-surface-variant hover:bg-white/5 rounded-2xl font-bold transition-all"
            >
              Maybe Later
            </button>
          </div>

          <p className="mt-8 text-[10px] text-on-surface-variant opacity-50 font-bold uppercase tracking-widest">
            Trusted by 2M+ nerds worldwide
          </p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const AdModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(5); // Reset timer when opened
    const timer = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) {
          clearInterval(timer);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-start sm:items-center justify-center p-6 sm:p-0 pt-20 sm:pt-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-surface/95 backdrop-blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-sm glass-panel rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center overflow-hidden border-primary/20"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className="h-full bg-primary shadow-[0_0_10px_rgba(0,255,163,0.5)]"
              />
            </div>

            <div className="w-full h-40 mb-6 mt-2 rounded-xl flex items-center justify-center overflow-hidden bg-surface-container-low/50 border border-white/5 shadow-inner p-4">
              <img 
                src="https://edu.sqi.ng/wp-content/uploads/2019/01/co.jpg" 
                alt="SQI College of ICT" 
                className="max-w-full max-h-full object-contain filter brightness-110 drop-shadow-[0_0_10px_rgba(0,255,163,0.2)]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-text')) {
                    const textFallback = document.createElement('div');
                    textFallback.className = 'fallback-text text-3xl font-display font-black text-primary tracking-tighter';
                    textFallback.innerText = 'SQI COLLEGE';
                    parent.appendChild(textFallback);
                  }
                }}
              />
            </div>

            <h2 className="text-xl font-display font-bold text-on-surface mb-2 tracking-tight">📢 SQI College of ICT</h2>
            <p className="text-on-surface-variant text-xs mb-8 font-medium">Empowering your future with ICT skills.</p>

            <div className="w-full space-y-4">
              <button 
                disabled={timeLeft > 0}
                onClick={onClose}
                className={`w-full py-4 px-6 rounded-2xl font-bold transition-all border ${
                  timeLeft > 0 
                  ? 'border-white/5 text-on-surface-variant/30 cursor-not-allowed bg-white/5' 
                  : 'bg-primary text-on-primary border-primary shadow-[0_0_20px_rgba(0,255,163,0.3)] hover:brightness-110 active:scale-95'
                }`}
              >
                {timeLeft > 0 ? `Loading... ${timeLeft}s` : 'Skip Ad & See Result'}
              </button>
            </div>

            <div className="w-full mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                  <Star className="text-primary fill-primary" size={20} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">SQI ICT College</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black truncate">Ad • Join Now</p>
                </div>
                <button 
                  onClick={() => window.open('https://sqi.edu.ng/', '_blank')}
                  className="bg-white text-surface text-[10px] font-black px-4 py-2 rounded-full active:scale-90 transition-all shrink-0"
                >
                  VISIT
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [mode, setMode] = useState<Mode>('Basic');
  const [calc, setCalc] = useState<CalcState>({
    display: '0',
    history: '',
    operation: null,
    prevValue: null,
    newInput: true
  });
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  const handleNumber = (n: string) => {
    setCalc(prev => ({
      ...prev,
      display: prev.newInput || prev.display === '0' ? n : prev.display + n,
      newInput: false
    }));
  };

  const handleOperation = (op: string) => {
    // Operations are now allowed freely to build the equation
    if (calc.prevValue !== null && calc.operation && !calc.newInput) {
      handleEquals();
    } else {
      setCalc(prev => ({
        ...prev,
        prevValue: parseFloat(prev.display),
        operation: op,
        history: `${prev.display} ${op}`,
        newInput: true
      }));
    }
  };

  const handleEquals = () => {
    // The sequence starts here: First the Ad, then the Premium popup
    setIsAdModalOpen(true);
    
    // Logic below handles background state update
    if (calc.prevValue === null || !calc.operation) return;
    
    const current = parseFloat(calc.display);
    let result = 0;

    switch (calc.operation) {
      case '+': result = calc.prevValue + current; break;
      case '-': result = calc.prevValue - current; break;
      case '×': result = calc.prevValue * current; break;
      case '÷': result = calc.prevValue / current; break;
    }

    setCalc({
      display: result.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      history: `${calc.prevValue} ${calc.operation} ${current}`,
      operation: null,
      prevValue: null,
      newInput: true
    });
  };

  const handleClear = () => {
    setCalc({
      display: '0',
      history: '',
      operation: null,
      prevValue: null,
      newInput: true
    });
  };

  const handleBackspace = () => {
    setCalc(prev => ({
      ...prev,
      display: prev.display.length > 1 ? prev.display.slice(0, -1) : '0'
    }));
  };

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 selection:text-primary">
      <TopBar onSettings={() => {}} onInfo={() => {}} />
      <Sidebar activeMode={mode} setMode={setMode} onUpgrade={() => setIsPremiumModalOpen(true)} />
      
      <main className="md:ml-64 pt-24 pb-24 md:pb-12 flex flex-col items-center justify-start md:justify-center relative overflow-hidden min-h-screen">
        {/* Background Decorations */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-tertiary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[400px] px-6 relative z-10">
          {/* Mode Chips */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {['Basic', 'Scientific', 'History', 'Converter'].map(m => (
              <button
                key={m}
                onClick={() => setMode(m as Mode)}
                className={`px-4 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  mode === m 
                  ? 'bg-primary border-primary text-on-primary shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                  : 'border-white/10 text-on-surface-variant hover:bg-white/5'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {mode === 'Basic' || mode === 'Scientific' ? (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Calculator Body */}
                <div className="glass-panel p-6 rounded-[2.5rem] shadow-2xl">
                  {/* Display Screen */}
                  <div className="mb-8 text-right min-h-[140px] flex flex-col justify-end p-6 bg-surface-container-lowest/40 rounded-3xl border border-white/5">
                    <div className="text-on-surface-variant opacity-40 text-lg font-medium mb-1 truncate font-display">
                      {calc.history || '\u00A0'}
                    </div>
                    <div className="text-primary text-5xl font-display font-medium tracking-tighter neon-glow-cyan truncate">
                      {calc.display}
                    </div>
                    <p className="text-secondary text-[11px] font-bold mt-4 flex items-center justify-end gap-2 animate-pulse uppercase tracking-wider">
                      <span>⚡</span> Relax, it's free... this time
                    </p>
                  </div>

                  {/* Keypad */}
                  <div className="grid grid-cols-4 gap-3">
                    <KeyButton label="C" onClick={handleClear} variant="tertiary" />
                    <KeyButton icon={<Delete size={20} />} onClick={handleBackspace} />
                    <KeyButton label="%" onClick={() => {}} />
                    <KeyButton label="÷" onClick={() => handleOperation('÷')} variant="action" />

                    {[7, 8, 9].map(n => <KeyButton key={n} label={n.toString()} onClick={() => handleNumber(n.toString())} />)}
                    <KeyButton label="×" onClick={() => handleOperation('×')} variant="action" />

                    {[4, 5, 6].map(n => <KeyButton key={n} label={n.toString()} onClick={() => handleNumber(n.toString())} />)}
                    <KeyButton label="−" onClick={() => handleOperation('-')} variant="action" />

                    {[1, 2, 3].map(n => <KeyButton key={n} label={n.toString()} onClick={() => handleNumber(n.toString())} />)}
                    <KeyButton label="+" onClick={() => handleOperation('+')} variant="action" />

                    <KeyButton label="0" onClick={() => handleNumber('0')} />
                    <KeyButton label="." onClick={() => handleNumber('.')} />
                    <KeyButton label="=" onClick={handleEquals} variant="primary" className="col-span-2" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="other-modes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel p-12 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-center gap-6"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-primary/40 border border-white/5">
                  <Lock size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-on-surface mb-2">{mode} Mode Locked</h3>
                  <p className="text-on-surface-variant text-sm font-medium">This module is part of the Premium Elite bundle.</p>
                </div>
                <button 
                  onClick={() => setIsPremiumModalOpen(true)}
                  className="bg-primary-container text-on-primary-container px-8 py-3 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all text-sm"
                >
                  Upgrade to Access
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bento Stats (Desktop Only) */}
       
      </main>

      <BottomNav activeMode={mode} setMode={setMode} />
      
      <PremiumModal 
        isOpen={isPremiumModalOpen} 
        onClose={() => setIsPremiumModalOpen(false)} 
        onGetStarted={() => {
          setIsPremiumModalOpen(false);
          setTimeout(() => setIsPaymentModalOpen(true), 300);
        }}
      />
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={() => {
          setIsPaymentModalOpen(false);
          // Success logic could go here
        }}
      />
      
      <AdModal 
        isOpen={isAdModalOpen} 
        onClose={() => {
          setIsAdModalOpen(false);
          // Chain to premium modal after ad finishes
          setTimeout(() => setIsPremiumModalOpen(true), 300);
        }} 
      />
    </div>
  );
}

function KeyButton({ 
  label, 
  icon, 
  onClick, 
  variant = 'default',
  className = ''
}: { 
  label?: string, 
  icon?: any, 
  onClick: () => void, 
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'action',
  className?: string
}) {
  const variants = {
    default: 'bg-white/5 text-on-surface hover:bg-white/10',
    primary: 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:brightness-110',
    secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
    tertiary: 'bg-tertiary/10 text-tertiary hover:bg-tertiary/20',
    action: 'bg-white/5 text-primary hover:bg-primary/10'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`h-16 rounded-2xl flex items-center justify-center font-display text-2xl font-medium transition-all ${variants[variant]} ${className}`}
    >
      {label || icon}
    </motion.button>
  );
}
