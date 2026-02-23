import React, { useState } from "react";
import { X, Check, Loader2, AlertCircle, ChevronRight, MessageSquare, Phone, Mail, ShieldCheck, Clock, User } from "lucide-react";
import { sendInquiry } from "../services/queryService";

const InquiryModal = ({ isOpen, onClose, onSubmit, productTitle, productId }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    contactNo: "",
    query: ""
  });

  if (!isOpen) return null;

  const validationPatterns = {
    emailId: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contactNo: /^(?:\+?\d{1,3}[-. ]?)?\d{10}$/
  };

  const validationMessages = {
    fullName: {
      required: "Full name is required",
      minLength: "Name is too short"
    },
    emailId: {
      required: "Email is required",
      pattern: "Please enter a valid email"
    },
    contactNo: {
      required: "Contact is required",
      pattern: "Invalid 10-digit number"
    },
    query: {
      required: "Additional info is required",
      minLength: "Min 10 chars required"
    }
  };

  const validateField = (name, value) => {
    if (name === 'query') return ''; // Optional field
    if (!value) return validationMessages[name].required;
    if (name === 'fullName' && value.length < 2) return validationMessages[name].minLength;
    if (validationPatterns[name] && !validationPatterns[name].test(value)) return validationMessages[name].pattern;
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await sendInquiry({
        fullName: formData.fullName,
        emailId: formData.emailId,
        contactNo: formData.contactNo,
        post: productId,
        query: formData.query
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      setIsSuccess(true);
      if (onSubmit) onSubmit(formData);

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ fullName: "", emailId: "", contactNo: "", query: "" });
        onClose();
      }, 3000);
    } catch (error) {
      setErrors({
        submit: error.message || "Connection failed. Please retry."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-zinc-950 rounded-[32px] w-full max-w-lg shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] transform transition-all overflow-hidden border border-zinc-900">
        
        {/* Midnight Branding Section */}
        <div className="p-8 md:p-10 border-b border-zinc-900 relative">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute right-6 top-6 p-2 bg-zinc-900 text-zinc-500 rounded-xl hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span className="text-[9px] font-bold tracking-[0.3em] text-zinc-600">Secure Dealership Portal</span>
            </div>
            <h2 className="text-4xl font-black italic tracking-tighter text-white leading-none">
               Request <br /> <span className="text-orange-500">Quotation</span>
            </h2>
            {productTitle && (
              <p className="text-zinc-500 text-xs font-bold tracking-widest border-l-2 border-orange-500 pl-3 py-1">
                Unit: {productTitle}
              </p>
            )}
          </div>
        </div>

        {/* Form Section: High Contrast Dark */}
        <div className="p-8 md:p-10 bg-zinc-950/50">
          {isSuccess ? (
            <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
               <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-[32px] flex items-center justify-center border border-green-500/20">
                  <Check className="w-10 h-10 text-green-500" />
               </div>
               <div className="space-y-2">
                  <h2 className="text-3xl font-black italic text-white">Transmission Successful</h2>
                  <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em]">Our team will contact you within 24 business hours.</p>
               </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.submit}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5">
                {/* Full Name Field */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 px-1">Customer Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={isLoading}
                      placeholder="Enter your full name"
                      className={`w-full bg-zinc-900 border ${errors.fullName ? 'border-red-500/50' : 'border-zinc-800 focus:border-orange-500/50'} rounded-2xl pl-12 pr-6 py-5 text-[13px] font-medium tracking-wide placeholder:text-zinc-700 focus:outline-none transition-all text-white shadow-inner`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[8px] font-bold text-red-500 uppercase mt-1 px-1 tracking-widest">{errors.fullName}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 px-1">Verify Email</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleChange}
                      disabled={isLoading}
                      placeholder="Enter your email"
                      className={`w-full bg-zinc-900 border ${errors.emailId ? 'border-red-500/50' : 'border-zinc-800 focus:border-orange-500/50'} rounded-2xl pl-12 pr-6 py-5 text-[13px] font-medium tracking-wide placeholder:text-zinc-700 focus:outline-none transition-all text-white shadow-inner`}
                    />
                  </div>
                  {errors.emailId && <p className="text-[8px] font-bold text-red-500 uppercase mt-1 px-1 tracking-widest">{errors.emailId}</p>}
                </div>

                {/* Contact Field */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 px-1">Primary Contact</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="tel"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      disabled={isLoading}
                      placeholder="Enter phone number"
                      className={`w-full bg-zinc-900 border ${errors.contactNo ? 'border-red-500/50' : 'border-zinc-800 focus:border-orange-500/50'} rounded-2xl pl-12 pr-6 py-5 text-[13px] font-medium tracking-wide placeholder:text-zinc-700 focus:outline-none transition-all text-white shadow-inner`}
                    />
                  </div>
                  {errors.contactNo && <p className="text-[8px] font-bold text-red-500 uppercase mt-1 px-1 tracking-widest">{errors.contactNo}</p>}
                </div>

                {/* Query Field */}
                <div className="space-y-2 group">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 px-1">Additional Requirements (Optional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-5 top-6 w-4 h-4 text-zinc-700 group-focus-within:text-orange-500 transition-colors" />
                    <textarea
                      name="query"
                      value={formData.query}
                      onChange={handleChange}
                      disabled={isLoading}
                      rows="3"
                      placeholder="Specify questions or delivery location..."
                      className={`w-full bg-zinc-900 border ${errors.query ? 'border-red-500/50' : 'border-zinc-800 focus:border-orange-500/50'} rounded-[24px] pl-12 pr-6 py-5 text-[13px] font-medium tracking-wide placeholder:text-zinc-700 focus:outline-none transition-all text-white shadow-inner resize-none`}
                    />
                  </div>
                  {errors.query && <p className="text-[8px] font-bold text-red-500 uppercase mt-1 px-1 tracking-widest">{errors.query}</p>}
                </div>
              </div>

              <div className="pt-4 space-y-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative overflow-hidden group bg-orange-500 hover:bg-orange-600 text-white h-16 rounded-[24px] font-bold italic text-lg tracking-tighter transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20 disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        Submit Quote Request <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </button>
                
                <div className="flex items-center justify-center gap-8 opacity-20">
                   <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-white" />
                      <span className="text-[8px] font-bold text-white uppercase tracking-[0.3em]">Priority Response</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3 text-white" />
                      <span className="text-[8px] font-bold text-white uppercase tracking-[0.3em]">Encrypted Data</span>
                   </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <style >{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};

export default InquiryModal;