import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Plus, Minus, ShieldCheck, Clock, MessageSquare, Check } from "lucide-react";
import { sendInquiry } from "../services/queryService";
import Footer_Contact from "../components/Footer_Contact";

const Contact = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    contactNo: "",
    query: ""
  });

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index === activeTab ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // General Inquiry (Type: General is handled by absence of postId on backend)
    const result = await sendInquiry({
        ...formData,
        post: null // This makes it a general inquiry
    });

    if (result.success) {
      setIsSuccess(true);
      setFormData({ fullName: "", emailId: "", contactNo: "", query: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      alert(result.message);
    }
    setIsSubmitting(false);
  };

  const faqs = [
    {
      id: 1,
      title: "What documents are required for tractor registration?",
      content: "Generally, you need the Sale Certificate (Form 21), Insurance Certificate, Address Proof, and ID Proof. Our team assists in the entire registration process for all purchases.",
      icon: "📄",
    },
    {
      id: 2,
      title: "Do you offer financing for second-hand tractors?",
      content: "Yes, we have tie-ups with leading banks and NBCFs to provide easy EMI options for both new and certified pre-owned tractors.",
      icon: "💰",
    },
    {
      id: 3,
      title: "How do you verify the quality of used tractors?",
      content: "Every used tractor undergoes a 40-point inspection by our certified mechanics, covering the engine, hydraulics, transmission, and tyre health before being listed.",
      icon: "🚜",
    },
    {
      id: 4,
      title: "Can I trade-in my old tractor?",
      content: "Absolutely! We offer the best market value for your old tractor through our exchange program when you upgrade to a new or better pre-owned model.",
      icon: "🔄",
    },
  ];

  return (
    <div className="bg-zinc-950 min-h-screen text-white pt-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Official Dealer Support</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                    Get in <span className="text-orange-500">Touch</span>
                </h1>
                <p className="text-zinc-500 text-lg font-medium max-w-xl">
                    Whether you're looking for expert machinery advice or browsing our certified inventory, our specialized team is here to assist you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-900/50 border border-zinc-900 rounded-3xl hover:border-orange-500/30 transition-all group">
                    <Mail className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Email Support</h3>
                    <p className="text-sm font-bold">contact@shubhamtractors.com</p>
                </div>
                <div className="p-6 bg-zinc-900/50 border border-zinc-900 rounded-3xl hover:border-orange-500/30 transition-all group">
                    <Phone className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Call Desk</h3>
                    <p className="text-sm font-bold">+91 98765 43210</p>
                </div>
                <div className="p-6 bg-zinc-900/50 border border-zinc-900 rounded-3xl hover:border-orange-500/30 transition-all group lg:col-span-2">
                    <MapPin className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Our Showroom</h3>
                    <p className="text-sm font-bold">Main Market, Near Highway Junction, Gujarat, India</p>
                </div>
            </div>
          </div>

          {/* Form Container */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-zinc-900 rounded-[40px] p-8 md:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full"></div>
                
                {isSuccess ? (
                    <div className="py-20 text-center space-y-6 animate-in zoom-in duration-500">
                        <div className="mx-auto w-24 h-24 bg-green-500/10 rounded-[32px] flex items-center justify-center border border-green-500/20">
                            <Check className="w-12 h-12 text-green-500" />
                        </div>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Message Sent</h2>
                        <p className="text-zinc-500 text-sm font-medium tracking-tight">Our team will reach out to you within 24 business hours.</p>
                        <button 
                            onClick={() => setIsSuccess(false)}
                            className="text-orange-500 font-bold uppercase text-[10px] tracking-widest border-b border-orange-500/30 pb-1"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8">
                            Transmission <span className="text-orange-500">Desk</span>
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-medium placeholder:text-zinc-700 focus:outline-none focus:border-orange-500/50 transition-all text-white"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    name="emailId"
                                    required
                                    value={formData.emailId}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-medium placeholder:text-zinc-700 focus:outline-none focus:border-orange-500/50 transition-all text-white"
                                />
                                <input
                                    type="tel"
                                    name="contactNo"
                                    required
                                    value={formData.contactNo}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-medium placeholder:text-zinc-700 focus:outline-none focus:border-orange-500/50 transition-all text-white"
                                />
                            </div>
                            <textarea
                                name="query"
                                required
                                value={formData.query}
                                onChange={handleInputChange}
                                placeholder="How can we help you?"
                                rows={4}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-medium placeholder:text-zinc-700 focus:outline-none focus:border-orange-500/50 transition-all text-white resize-none"
                            ></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white h-16 rounded-2xl font-black italic uppercase text-sm tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? <Clock className="w-5 h-5 animate-spin" /> : <>Send Inquiry <Send className="w-4 h-4" /></>}
                        </button>
                    </form>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-zinc-900/30 py-24 border-y border-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase">
                    Dealer <span className="text-orange-500">Insights</span>
                </h2>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em]">Common customer transmissions</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={faq.id}
                        className={`transition-all duration-700 delay-[${index * 100}ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div
                            onClick={() => handleTabClick(faq.id)}
                            className="group rounded-[32px] bg-zinc-950 border border-zinc-900 p-8 cursor-pointer hover:border-orange-500/30 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl group-hover:scale-125 transition-transform duration-500">{faq.icon}</span>
                                    <h3 className="text-sm font-bold tracking-tight text-white">{faq.title}</h3>
                                </div>
                                {activeTab === faq.id ? (
                                    <Minus className="w-5 h-5 text-orange-500" />
                                ) : (
                                    <Plus className="w-5 h-5 text-zinc-700" />
                                )}
                            </div>
                            <div className={`overflow-hidden transition-all duration-500 ${activeTab === faq.id ? "max-h-48 mt-6" : "max-h-0"}`}>
                                <p className="text-zinc-500 text-sm font-medium leading-relaxed border-l-2 border-orange-500 pl-4">{faq.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
             <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Certified Inventory</span>
             </div>
             <div className="flex items-center gap-3">
                <Clock className="w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">24h Support Line</span>
             </div>
             <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Expert Machinery Advice</span>
             </div>
        </div>
      </div>

      <Footer_Contact />
    </div>
  );
};

export default Contact;
