import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Copy, Check, TrendingUp, Zap, ShieldCheck, Mail, MessageCircle, Instagram, Linkedin } from 'lucide-react';
import { PITCH_DATA } from '../../data/pitchData';
import { useCart } from '../../context/CartContext';

export const PitchDeckModal = () => {
  const { isPitchOpen, setIsPitchOpen, addToast } = useCart();
  const [activeTab, setActiveTab] = useState('audit');
  const [selectedScriptId, setSelectedScriptId] = useState('email');
  const [copiedId, setCopiedId] = useState(null);

  if (!isPitchOpen) return null;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('Pitch script copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const selectedScript = PITCH_DATA.outreachScripts.find((s) => s.id === selectedScriptId) || PITCH_DATA.outreachScripts[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsPitchOpen(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-5xl bg-black border border-zinc-700 rounded-sm shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-mono font-black text-xs">
                —
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    CLIENT ACQUISITION & PITCH SUITE
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-900 text-[10px] font-mono text-zinc-400 rounded border border-zinc-800">
                    TARGET: OFFCOMFRT.IN
                  </span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                  OFFCOMFRT Strategy & Outreach Pitch
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsPitchOpen(false)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-zinc-900 bg-zinc-950 px-6 gap-2 sm:gap-6 overflow-x-auto text-xs font-mono">
            {[
              { id: 'audit', label: '1. Storefront Audit & Visual Gap' },
              { id: 'roi', label: '2. Conversion & Performance Lift' },
              { id: 'outreach', label: '3. 1-Click Outreach Templates' },
              { id: 'tech', label: '4. Headless Shopify Architecture' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-2 font-bold uppercase tracking-wider border-b-2 transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? 'border-white text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            
            {/* TAB 1: STOREFRONT AUDIT */}
            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-xl text-white uppercase">
                    The Contrast: 42K Instagram Aesthetic vs. Current Shopify Theme
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    Analysis of where <a href="https://offcomfrt.in/" target="_blank" rel="noreferrer" className="text-white underline">offcomfrt.in</a> falls short of the brand's true luxury positioning.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PITCH_DATA.auditFindings.map((item, idx) => (
                    <div key={idx} className="p-5 bg-zinc-950 border border-zinc-800 rounded-sm space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-white font-bold uppercase">{item.metric}</span>
                        <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-200 text-[11px] font-bold rounded">
                          {item.impact}
                        </span>
                      </div>
                      
                      <div className="text-xs font-mono space-y-1 pt-1 border-t border-zinc-900">
                        <div className="text-zinc-500">
                          <strong className="text-zinc-400">Current Site:</strong> {item.current}
                        </div>
                        <div className="text-zinc-300">
                          <strong className="text-white">Our Redesign:</strong> {item.redesign}
                        </div>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed pt-1 font-mono">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: ROI */}
            {activeTab === 'roi' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-xl text-white uppercase">
                    Performance & User Experience Lift
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    High-speed headless architectures boost user engagement and eliminate bounce rates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm text-center">
                    <TrendingUp className="w-7 h-7 text-white mx-auto mb-2" />
                    <span className="text-xs text-zinc-400 block uppercase">Conversion Potential</span>
                    <span className="font-display font-black text-3xl text-white">+140%</span>
                    <span className="text-[11px] text-zinc-500 mt-1 block">Friction-free UX</span>
                  </div>

                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm text-center">
                    <Zap className="w-7 h-7 text-white mx-auto mb-2" />
                    <span className="text-xs text-zinc-400 block uppercase">Load Time</span>
                    <span className="font-display font-black text-3xl text-white">&lt; 0.8s</span>
                    <span className="text-[11px] text-zinc-500 mt-1 block">Sub-second hydration</span>
                  </div>

                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm text-center">
                    <ShieldCheck className="w-7 h-7 text-white mx-auto mb-2" />
                    <span className="text-xs text-zinc-400 block uppercase">Size Return Rate</span>
                    <span className="font-display font-black text-3xl text-white">-35%</span>
                    <span className="text-[11px] text-zinc-500 mt-1 block">Via Biometric Fit Advisor</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: OUTREACH TEMPLATES */}
            {activeTab === 'outreach' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-xl text-white uppercase">
                    Direct Outreach Templates
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    Select a channel below, click copy, paste your deployed preview link, and send directly to OFFCOMFRT.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                  {PITCH_DATA.outreachScripts.map((script) => (
                    <button
                      key={script.id}
                      onClick={() => setSelectedScriptId(script.id)}
                      className={`p-3 border rounded-sm flex items-center justify-center gap-2 font-bold uppercase transition-colors ${
                        selectedScriptId === script.id
                          ? 'border-white bg-white text-black'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {script.id === 'email' && <Mail className="w-3.5 h-3.5" />}
                      {script.id === 'instagram' && <Instagram className="w-3.5 h-3.5" />}
                      {script.id === 'whatsapp' && <MessageCircle className="w-3.5 h-3.5" />}
                      {script.id === 'linkedin' && <Linkedin className="w-3.5 h-3.5" />}
                      <span>{script.id}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-900 font-mono text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">SUBJECT:</span>
                      <span className="font-bold text-white">{selectedScript.subject}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedScript.content, selectedScript.id)}
                      className="px-4 py-2 bg-white hover:bg-zinc-200 text-black font-bold uppercase rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      {copiedId === selectedScript.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === selectedScript.id ? 'COPIED!' : 'COPY SCRIPT'}</span>
                    </button>
                  </div>

                  <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed bg-black p-4 border border-zinc-900 rounded max-h-72 overflow-y-auto">
                    {selectedScript.content}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 4: TECH */}
            {activeTab === 'tech' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-xl text-white uppercase">
                    Headless Architecture Integration
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    Seamless integration with OFFCOMFRT's existing Shopify backend & payments.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-sm space-y-2">
                    <h5 className="font-bold text-white uppercase text-sm">Shopify Storefront GraphQL API</h5>
                    <p className="text-zinc-400 leading-relaxed">
                      All products, variants, inventory counts, and customer databases stay inside Shopify admin. The React frontend fetches real-time catalog data.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-sm space-y-2">
                    <h5 className="font-bold text-white uppercase text-sm">GoKwik & Fastrr 1-Click Checkout</h5>
                    <p className="text-zinc-400 leading-relaxed">
                      Compatible with GoKwik headless SDK and Shiprocket APIs for instant address auto-fill, OTP login, and COD verification.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-500">
              Monochrome pitch deck ready for client closing.
            </span>
            <button
              onClick={() => handleCopy(selectedScript.content, 'footer-copy')}
              className="px-5 py-2 bg-white hover:bg-zinc-200 text-black font-bold uppercase rounded-sm transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Active Template</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
