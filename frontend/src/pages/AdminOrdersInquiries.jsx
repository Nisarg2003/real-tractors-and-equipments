import React, { useState, useEffect } from "react";
import { Trash2, Eye, Search, CheckCircle, Clock, Package, MessageSquare, Mail, Phone, Calendar, Info, ShieldCheck, X } from "lucide-react";
import { getInquiries, updateInquiryStatus } from "../services/queryService";

const AdminOrdersInquiries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    const result = await getInquiries();
    if (result.success) {
      setInquiries(result.data);
      setError(null);
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  const handleResolve = async (id, currentStatus) => {
    const result = await updateInquiryStatus(id, !currentStatus);
    if (result.success) {
      fetchInquiries();
    } else {
      alert(result.message);
    }
  };

  const openInquiryDetails = (item) => {
    setSelectedInquiry(item);
    setIsModalOpen(true);
  };

  const filteredInquiries = inquiries.filter(
    (item) =>
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.post?.model?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (isResolved) => {
    return isResolved
      ? "bg-green-500/10 text-green-500 border-green-500/20"
      : "bg-orange-500/10 text-orange-500 border-orange-500/20";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Inquiries <span className="text-orange-500">&</span> Management
          </h2>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
            Real-time customer transmission stream
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-xl">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Total Stream
            </p>
            <p className="text-xl font-black text-white">{inquiries.length}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-xl">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Pending
            </p>
            <p className="text-xl font-black text-orange-500">
              {inquiries.filter((i) => !i.isResolved).length}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-800 p-2">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by customer, email, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-transparent border-none text-white placeholder-zinc-700 focus:outline-none text-sm font-medium"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-zinc-950 rounded-[32px] border border-zinc-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/20">
                <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                  Source
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                  Customer
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                  Contact Desk
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                  Machinery Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                  Timestamp
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((item) => (
                  <tr
                    key={item._id}
                    className="group hover:bg-zinc-900/30 transition-all duration-300"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        {item.post ? (
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-md">
                            <Package className="w-3 h-3" />
                            <span className="text-[9px] font-black uppercase tracking-tighter">
                              Product
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-md">
                            <MessageSquare className="w-3 h-3" />
                            <span className="text-[9px] font-black uppercase tracking-tighter">
                              General
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-bold text-white tracking-tight">
                        {item.fullName}
                      </p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                          <Mail className="w-3 h-3" />
                          <span className="text-xs font-medium">
                            {item.emailId}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                          <Phone className="w-3 h-3" />
                          <span className="text-xs font-medium">
                            {item.contactNo}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-bold">
                      {item.post ? (
                        <div className="space-y-1">
                          <p className="text-xs text-white uppercase tracking-tighter">
                            {item.post.make} {item.post.model} {item.post.year}
                          </p>
                          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest bg-zinc-900 inline-block px-1.5 py-0.5 rounded">
                            REG: {item.post.registrationNumber || "N/A"}
                          </p>
                        </div>
                      ) : (
                        <span className="text-zinc-700 text-xs italic">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(item.isResolved)}`}
                      >
                        {item.isResolved ? "Resolved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleResolve(item._id, item.isResolved)}
                          title={
                            item.isResolved
                              ? "Mark as Pending"
                              : "Mark as Resolved"
                          }
                          className={`p-2.5 rounded-xl transition-all duration-300 ${item.isResolved ? "bg-zinc-900 text-zinc-500 hover:text-orange-500" : "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20"}`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openInquiryDetails(item)}
                          className="p-2.5 bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white rounded-xl transition-all border border-zinc-800"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-20">
                      <Clock className="w-12 h-12 text-zinc-500" />
                      <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">
                        No transmissions found in the stream
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-zinc-950 border border-zinc-900 w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl shadow-black/50 animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-zinc-900 bg-zinc-900/20 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                    Transmission Data
                  </span>
                </div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                  Inquiry <span className="text-orange-500">Details</span>
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2.5 bg-zinc-900 text-zinc-500 hover:text-white rounded-xl transition-all border border-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8">
              {/* Customer Info Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    Full Name
                  </p>
                  <p className="text-sm font-bold text-white">
                    {selectedInquiry.fullName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    Received Date
                  </p>
                  <p className="text-sm font-bold text-white">
                    {formatDate(selectedInquiry.createdAt)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    Email Desk
                  </p>
                  <p className="text-sm font-bold text-zinc-400">
                    {selectedInquiry.emailId}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    Phone Dial
                  </p>
                  <p className="text-sm font-bold text-zinc-400">
                    {selectedInquiry.contactNo}
                  </p>
                </div>
              </div>

              {/* Product Info (if available) */}
              {selectedInquiry.post && (
                <div className="p-6 bg-zinc-900/40 rounded-3xl border border-zinc-900 space-y-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-orange-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                      Target Machinery
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-lg font-black italic uppercase tracking-tighter text-white">
                        {selectedInquiry.post.make} {selectedInquiry.post.model}{" "}
                        {selectedInquiry.post.year}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        REG: {selectedInquiry.post.registrationNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* The Information Query Field */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-zinc-600" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    Customer Message / Requirements
                  </p>
                </div>
                <div className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-3xl min-h-[120px]">
                  <p className="text-sm font-medium text-zinc-300 leading-relaxed italic">
                    "{selectedInquiry.query || "No additional requirements specified."}"
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-zinc-900/10 border-t border-zinc-900">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-4 bg-zinc-900 text-zinc-400 hover:text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all border border-zinc-800"
              >
                Close Stream Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-center gap-8 opacity-20 py-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3 h-3 text-white" />
          <span className="text-[8px] font-bold text-white uppercase tracking-[0.3em]">
            Encrypted Channel
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-white" />
          <span className="text-[8px] font-bold text-white uppercase tracking-[0.3em]">
            Stream Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersInquiries;
