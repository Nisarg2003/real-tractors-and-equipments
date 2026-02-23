import React from "react";
import { Send, Phone, MapPin, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left Content */}
                <div className="space-y-8 relative z-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-orange-500"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Reach Out</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-white">
                            Ready to Upgrade Your <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">Fleet?</span>
                        </h2>
                        <p className="text-zinc-500 text-lg font-medium max-w-lg">
                            From expert machinery consultation to certified parts and service, our team is standing by to power your progress.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl group hover:border-orange-500/30 transition-all">
                            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-all">
                                <Phone className="w-5 h-5 text-orange-500 group-hover:text-white" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Call Desk</p>
                                <p className="text-sm font-bold text-white">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl group hover:border-orange-500/30 transition-all">
                            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-all">
                                <Mail className="w-5 h-5 text-orange-500 group-hover:text-white" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Email Support</p>
                                <p className="text-sm font-bold text-white">sales@shubham.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center gap-3 bg-white text-black px-8 py-5 rounded-2xl font-black italic uppercase text-sm tracking-widest hover:bg-orange-500 hover:text-white transition-all transform active:scale-95 group"
                        >
                            Open Transmission Desk <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Right Visual Card */}
                <div className="relative">
                    <div className="relative z-10 bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 p-10 rounded-[48px] shadow-2xl overflow-hidden group">
                        {/* Abstract Background Element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
                        
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center border border-zinc-800">
                                    <MapPin className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black italic uppercase tracking-tight text-white">Showroom Location</h4>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Visit our experience center</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <p className="text-zinc-400 font-medium leading-relaxed">
                                    Explore Gujarat's widest range of certified new and used tractors. Our experts are ready to provide live demonstrations.
                                </p>
                                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-sm font-bold text-orange-500">
                                    Main Highway Junction, Gujarat 380XXX
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div className="flex -space-x-2">
                                    {[1,2,3,4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-orange-500 flex items-center justify-center text-[10px] font-black text-white">
                                        +5k
                                    </div>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Trusted by farmers</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-zinc-900 border border-zinc-800 rounded-3xl -z-0 transform rotate-12"></div>
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-500/20 blur-[100px] rounded-full"></div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default ContactSection;
