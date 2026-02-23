import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Calendar, Tag, ShieldCheck, Truck, ChevronRight, Share2, Heart, CheckCircle2 } from "lucide-react";
import InquiryModal from "../components/InquiryModal";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Using axios directly to match user's previous implementation if needed, but keeping it robust
        const response = await axios.get(`http://localhost:8080/api/postById/${id}`);
        
        // Defensive data extraction: handle { success: true, data: { ... } } or just { ... }
        const data = response.data.data || response.data.post || response.data;
        
        setProduct(data);
        
        // Align default image selection with gallery priority (Thumbnail first)
        const mainImg = data.thumbnail?.url || data.files?.[0]?.url || "";
        setSelectedImage(mainImg);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col justify-center items-center gap-6">
        <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-xs">Fetching Inventory...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col justify-center items-center text-white p-8">
        <h2 className="text-3xl font-bold mb-4">Product Not Located</h2>
        <button onClick={() => navigate("/products")} className="px-6 py-2 bg-zinc-800 rounded-full text-sm">Return to Catalog</button>
      </div>
    );
  }

  // Combine all possible image sources (Thumbnail + Files array)
  const gallery = [];
  if (product.thumbnail?.url) gallery.push({ url: product.thumbnail.url });
  if (product.files?.length > 0) {
    product.files.forEach(file => {
      // Add if not already present (deduplicate)
      if (file.url && !gallery.find(g => g.url === file.url)) {
        gallery.push(file);
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-24 pb-32">
      <div className="max-w-full mx-auto px-4 md:px-10 lg:px-20">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Inventory Catalog</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-white transition-colors text-sm font-bold">Share</button>
            <div className="w-px h-4 bg-zinc-800"></div>
            <button className="text-zinc-400 hover:text-white transition-colors text-sm font-bold">Watchlist</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* ─── Left: High-Impact Gallery ─────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-video bg-zinc-900/10 rounded-[32px] overflow-hidden border border-zinc-900 group">
              <img
                src={selectedImage}
                alt={product.make}
                className="w-full h-full object-contain p-4 transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Image Tags */}
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                 <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified Multi-Point Inspection</span>
                 </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent scroll-smooth">
                {gallery.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(file.url)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === file.url
                        ? "border-orange-500 ring-2 ring-orange-500/20 scale-105"
                        : "border-zinc-900 hover:border-zinc-700 hover:scale-105"
                    }`}
                  >
                    <img src={file.url} className="w-full h-full object-cover" alt={`Gallery item ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Right: Shopify-Inspired Details ──────────────────────────── */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="sticky top-28 space-y-10">
              {/* Product ID & Category */}
              <div className="flex items-center gap-4">
                 <span className="text-orange-500 text-xs font-black uppercase tracking-widest italic">{product.category || "Heavy Machinery"}</span>
                 <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
                 <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Unit ID: {id.slice(-6).toUpperCase()}</span>
              </div>

              {/* Title Section */}
              <div className="space-y-4">
                <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.9] italic">
                   {product.make} <br />
                   <span className="text-zinc-700 italic">{product.model}</span>
                </h1>
                <p className="text-zinc-500 text-sm font-medium tracking-wide">Released in {product.year} • {product.registrationNumber || "Certified Serialized Unit"}</p>
              </div>

              {/* High Contrast Pricing */}
              <div className="bg-zinc-900/30 p-8 rounded-[40px] border border-zinc-900">
                <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest block mb-1">Dealership Quotation</label>
                <div className="flex items-baseline gap-2">
                   <span className="text-5xl font-black text-white italic tracking-tighter">Rs. {product.price}</span>
                   <span className="text-green-500 text-xs font-black uppercase tracking-widest animate-pulse">• Available</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-3xl group hover:border-orange-500/30 transition-colors">
                    <Calendar className="w-5 h-5 text-zinc-600 mb-3 group-hover:text-orange-500 transition-colors" />
                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-1">Model Year</p>
                    <p className="text-sm font-bold text-white tracking-widest">{product.year}</p>
                 </div>
                 <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-3xl group hover:border-orange-500/30 transition-colors">
                    <ShieldCheck className="w-5 h-5 text-zinc-600 mb-3 group-hover:text-orange-500 transition-colors" />
                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-1">Status</p>
                    <p className="text-sm font-bold text-white tracking-widest">VERIFIED</p>
                 </div>
              </div>

              {/* Description Content */}
              <div className="space-y-4 border-t border-zinc-900 pt-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 underline decoration-zinc-800 underline-offset-8">Unit Overview</h3>
                <p className="text-zinc-400 text-base leading-relaxed line-clamp-6 hover:line-clamp-none transition-all cursor-pointer">
                  {product.description || "Our highly inspected premium unit. Guaranteed for high performance and durability in modern farming operations. Contact us for complete specifications for this model."}
                </p>
              </div>

              {/* CTA Section */}
              <div className="pt-8 space-y-4">
                 <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white h-20 rounded-[32px] font-black italic uppercase text-xl shadow-[0_30px_60px_-15px_rgba(249,115,22,0.3)] transition-all flex items-center justify-center gap-4 active:scale-95"
                 >
                    Inquire Now <ChevronRight className="w-6 h-6" />
                 </button>
                 
                 <div className="flex items-center justify-center gap-6 py-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                       <Truck className="w-4 h-4" /> Pan-India Delivery
                    </div>
                    <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                       <ShieldCheck className="w-4 h-4" /> 6-Month Support
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={id}
        productTitle={`${product.make} ${product.model}`}
        onSubmit={(data) => console.log("Inquiry for:", product.make, product.model, data)}
      />
    </div>
  );
};

export default Product;