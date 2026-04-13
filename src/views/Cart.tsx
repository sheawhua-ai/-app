import { ArrowLeft, ChevronRight, Minus, MoreHorizontal, Plus, Search, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f2f2f7] text-[#1c1c1e] min-h-screen pb-32 font-inter">
      {/* 
        WeChat Mini Program Header Simulation
        Added pt-14 to account for the system status bar and the capsule button on the right
      */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#e5e5ea] pt-12">
        <div className="flex items-center justify-between px-4 h-11 relative">
          <div className="flex items-center gap-1">
            <button onClick={() => navigate(-1)} className="active:bg-[#e5e5ea] p-2 -ml-2 rounded-full duration-200 text-[#1c1c1e] flex items-center">
              <ArrowLeft size={24} />
            </button>
          </div>
          <h1 className="text-[#1c1c1e] font-semibold text-[17px] absolute left-1/2 -translate-x-1/2">开单簿 (3)</h1>
          {/* Empty div to balance the flex layout, actual capsule is rendered by WeChat */}
          <div className="w-20"></div>
        </div>
      </header>

      <main className="pt-28 px-4 space-y-4 max-w-lg mx-auto">
        {/* Search Bar in Cart */}
        <div className="relative flex items-center bg-white rounded-xl h-10 px-3 gap-2 shadow-sm border border-[#e5e5ea]/50">
          <Search className="text-[#8e8e93]" size={20} />
          <input className="bg-transparent border-none focus:ring-0 flex-1 text-sm text-[#1c1c1e] placeholder:text-[#8e8e93] p-0 outline-none" placeholder="在开单簿中搜索..." type="text" />
        </div>

        {/* Cart Items Grouped by Location */}
        <div className="space-y-4">
          
          {/* Group 1: 国内现货 */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5ea]/50 overflow-hidden">
            <div className="bg-[#f0f4ff] px-4 py-3 flex items-center justify-between border-b border-[#e5e5ea]/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-sm text-blue-900">国内现货</span>
              </div>
              <span className="text-xs text-blue-600/70 font-medium">共 2 件</span>
            </div>
            
            <div className="p-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f9f9f9] shrink-0 border border-[#e5e5ea]/50">
                  <img alt="Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCgrMxP7Jph63dvoI8QyxQYNEZWSWwIJlERfsycetA3r3O5P7CCg1LdSWOgS1M8NbaCMkhYgkHC7mOvn4SorKKo3DaSBf-cUP1ca0pJ-e5aJZqfKm738i0ddH2aM7MOE0cMLxhLvfHB9kfFZIJtzOb0SnrAHnDv45M75EUu6f9UpyHirzu4heyWN58HJ57QNQigrh38FySps5AtPDXlWbm1e5D0-djxdAD2ksSrMTpH_nqJmzp2juO2g8ZuIhXwlbHzJFZJ4Pen5s" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#1c1c1e] leading-tight">Velocity Pro X1 - 曜石黑限定版</h3>
                    <p className="text-[11px] text-[#8e8e93] mt-1">42码</p>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="font-manrope font-extrabold text-base">¥1,299.00</span>
                    <div className="flex items-center bg-[#f2f2f7] rounded-lg p-0.5 h-7">
                      <button className="w-7 h-6 active:opacity-40 transition-opacity flex items-center justify-center text-black"><Minus size={14} /></button>
                      <input className="w-8 h-6 border-none text-center text-xs font-semibold p-0 bg-transparent focus:ring-0 outline-none" type="number" defaultValue="2" />
                      <button className="w-7 h-6 active:opacity-40 transition-opacity flex items-center justify-center text-black"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Group 2: 香港现货 */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5ea]/50 overflow-hidden">
            <div className="bg-[#fff4ed] px-4 py-3 flex items-center justify-between border-b border-[#e5e5ea]/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="font-bold text-sm text-orange-900">香港现货</span>
              </div>
              <span className="text-xs text-orange-600/70 font-medium">共 1 件</span>
            </div>
            
            <div className="p-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f9f9f9] shrink-0 border border-[#e5e5ea]/50">
                  <img alt="Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCVjif6fdkb1L7LKLCFbbntmn1TkgrM4jp4kmmd-ilFVy468P9epft0l91AkDuASk-mK1qjxoVfW1CiMSfpOxACnJ82sRsDuh4jeNgatEDeDnOumUlkXUILIRIqXBNwz3j5arY61g1yhwniw0o2SLL4E54Pqt4g7eV8v50cdaUNnnV3nHf17VZYTlfPwo8Wo0fDgX1uhR5mhJX3uoamks4QHBgNWsPjmqS2YJ_QESWZgEbch9oOrDPG0heCr6rWA0nxHuuBNtxb30" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#1c1c1e] leading-tight">极光系列 运动鞋</h3>
                    <p className="text-[11px] text-[#8e8e93] mt-1">39码</p>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="font-manrope font-extrabold text-base">¥599.00</span>
                    <div className="flex items-center bg-[#f2f2f7] rounded-lg p-0.5 h-7">
                      <button className="w-7 h-6 active:opacity-40 transition-opacity flex items-center justify-center text-black"><Minus size={14} /></button>
                      <input className="w-8 h-6 border-none text-center text-xs font-semibold p-0 bg-transparent focus:ring-0 outline-none" type="number" defaultValue="1" />
                      <button className="w-7 h-6 active:opacity-40 transition-opacity flex items-center justify-center text-black"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-[#e5e5ea] pb-safe">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#8e8e93] font-medium">合计 (不含税费)</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-manrope font-extrabold text-[#1c1c1e]">¥3,197.00</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="bg-black text-white px-8 py-3.5 rounded-xl font-bold text-[15px] active:scale-95 transition-transform shadow-lg shadow-black/20"
          >
            去结算 (3)
          </button>
        </div>
      </div>
    </div>
  );
}
