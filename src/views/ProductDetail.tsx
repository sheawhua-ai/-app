import { ChevronLeft, ChevronUp, Minus, MoreHorizontal, Plus, Scan, Search, ShoppingBag, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="text-[#1c1c1e] flex flex-col h-screen overflow-hidden antialiased bg-[#f2f2f7] font-inter">
      <nav className="shrink-0 w-full z-50 bg-white border-b border-[#e5e5ea]">
        <div className="flex items-center justify-between px-4 h-11 max-w-screen-xl mx-auto relative">
          <div className="flex items-center gap-1">
            <button onClick={() => navigate(-1)} className="active:bg-[#e5e5ea] p-2 -ml-2 rounded-full duration-200 text-[#1c1c1e] flex items-center">
              <ChevronLeft size={28} />
            </button>
          </div>
          <h1 className="text-[#1c1c1e] font-semibold text-[17px] absolute left-1/2 -translate-x-1/2">精准选货</h1>
          <div className="flex items-center gap-1">
            <div className="relative">
              <button onClick={() => navigate('/cart')} className="active:bg-[#e5e5ea] p-2 rounded-full text-[#1c1c1e]">
                <ShoppingBag size={24} />
              </button>
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full border-2 border-white">3</span>
            </div>
            <button className="active:bg-[#e5e5ea] p-2 -mr-2 rounded-full text-[#1c1c1e]">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>
      </nav>

      <section className="bg-white px-4 py-2 border-b border-[#e5e5ea]/30 shrink-0">
        <div className="relative flex items-center bg-[#f2f2f7] rounded-xl h-10 px-3 gap-2">
          <Search className="text-[#8e8e93]" size={20} />
          <input className="bg-transparent border-none focus:ring-0 flex-1 text-sm text-[#1c1c1e] placeholder:text-[#8e8e93] p-0 outline-none" placeholder="输入货号/名称/条码快速查货" type="text" />
          <Scan className="text-[#8e8e93]" size={20} />
        </div>
      </section>

      <main className="flex-1 overflow-hidden flex flex-col">
        <section className="bg-white p-4 flex gap-4 border-b border-[#e5e5ea]/50 shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f9f9f9] shrink-0 border border-[#e5e5ea]/30">
            <img alt="Velocity Pro X1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCgrMxP7Jph63dvoI8QyxQYNEZWSWwIJlERfsycetA3r3O5P7CCg1LdSWOgS1M8NbaCMkhYgkHC7mOvn4SorKKo3DaSBf-cUP1ca0pJ-e5aJZqfKm738i0ddH2aM7MOE0cMLxhLvfHB9kfFZIJtzOb0SnrAHnDv45M75EUu6f9UpyHirzu4heyWN58HJ57QNQigrh38FySps5AtPDXlWbm1e5D0-djxdAD2ksSrMTpH_nqJmzp2juO2g8ZuIhXwlbHzJFZJ4Pen5s" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <h2 className="text-base font-manrope font-bold text-[#1c1c1e] truncate">Velocity Pro X1 - 曜石黑限定版</h2>
            <p className="text-[11px] text-[#636366] font-mono mt-0.5 opacity-60">SPU: SPR-9920-VPRO-BLK</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-manrope font-extrabold text-[#1c1c1e]">¥1,299.00</span>
            </div>
          </div>
        </section>

        <div className="flex-1 flex overflow-hidden">
          <aside className="w-20 bg-[#f2f2f7] border-r border-[#e5e5ea]/30 overflow-y-auto shrink-0 scrollbar-hide">
            <div className="flex flex-col">
              <button className="py-5 px-1 text-center text-sm font-bold bg-white text-[#1c1c1e] border-r-2 border-black relative">42码<span className="absolute top-2 right-2 w-1.5 h-1.5 bg-black rounded-full"></span></button>
              <button className="py-5 px-1 text-center text-sm font-medium text-[#636366] active:bg-[#e5e5ea] transition-colors relative">40码<span className="absolute top-2 right-2 w-1.5 h-1.5 bg-black rounded-full"></span></button>
              <button className="py-5 px-1 text-center text-sm font-medium text-[#636366] active:bg-[#e5e5ea] transition-colors">44码</button>
              <button className="py-5 px-1 text-center text-sm font-medium text-[#636366] active:bg-[#e5e5ea] transition-colors">39码</button>
              <button className="py-5 px-1 text-center text-sm font-medium text-[#636366] active:bg-[#e5e5ea] transition-colors">38码</button>
            </div>
          </aside>

          <section className="flex-1 overflow-y-auto bg-[#f9f9f9]">
            {/* Card 1: 国内现货 */}
            <div className="mx-3 mt-3 bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
              <div className="bg-blue-50 px-3 py-2 border-b border-blue-100 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className="text-blue-900 font-bold text-xs">国内现货</span>
                  <span className="text-blue-600/70 text-[10px] font-medium ml-1">官方自营</span>
                </div>
                <span className="text-[10px] text-blue-600 font-medium">1-2天</span>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[10px] text-[#636366] mb-0.5">销售价</div>
                    <div className="text-sm font-bold text-[#1c1c1e] leading-none">¥1,299.00</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#636366] mb-0.5">最终含税价</div>
                    <div className="text-sm font-bold text-[#1c1c1e] leading-none">¥1,299.00</div>
                    <div className="text-[9px] text-[#636366] mt-0.5">+ 国内税费: ¥0.00 (已含)</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#e5e5ea]/50">
                  <div className="text-[11px] text-[#636366]">库存 <span className="font-bold text-[#1c1c1e]">42</span></div>
                  <div className="flex items-center bg-[#f2f2f7] rounded-lg p-0.5 h-7">
                    <button className="w-7 h-6 active:opacity-40 transition-opacity flex items-center justify-center text-black"><Minus size={14} /></button>
                    <input className="w-8 h-6 border-none text-center text-xs font-semibold p-0 bg-transparent focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" defaultValue="2" />
                    <button className="w-7 h-6 active:opacity-40 transition-opacity flex items-center justify-center text-black"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: 保税仓 */}
            <div className="mx-3 mt-3 bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
              <div className="bg-purple-50 px-3 py-2 border-b border-purple-100 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span className="text-purple-900 font-bold text-xs">保税仓</span>
                  <span className="text-purple-600/70 text-[10px] font-medium ml-1">极速达</span>
                </div>
                <span className="text-[10px] text-purple-600 font-medium">2-4天</span>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[10px] text-[#636366] mb-0.5">销售价</div>
                    <div className="text-sm font-bold text-[#1c1c1e] leading-none">¥1,049.50</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#636366] mb-0.5">最终含税价</div>
                    <div className="text-sm font-bold text-[#1c1c1e] leading-none">¥1,145.00</div>
                    <div className="text-[9px] text-[#636366] mt-0.5">+ 跨境税: ¥95.50</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#e5e5ea]/50">
                  <div className="text-[11px] text-[#636366]">库存 <span className="font-bold text-[#1c1c1e]">120+</span></div>
                  <div className="flex items-center bg-[#f2f2f7] rounded-lg p-0.5 h-7">
                    <button className="w-7 h-6 active:opacity-40 transition-opacity flex items-center justify-center text-black"><Minus size={14} /></button>
                    <input className="w-8 h-6 border-none text-center text-xs font-semibold p-0 bg-transparent focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" defaultValue="1" />
                    <button className="w-7 h-6 active:opacity-40 transition-opacity flex items-center justify-center text-black"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: 香港现货 */}
            <div className="mx-3 mt-3 bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="bg-orange-50 px-3 py-2 border-b border-orange-100 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className="text-orange-900 font-bold text-xs">香港现货</span>
                  <span className="text-orange-600/70 text-[10px] font-medium ml-1">需清关</span>
                </div>
                <span className="text-[10px] text-orange-600 font-medium">5-7天</span>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[10px] text-[#636366] mb-0.5">销售价</div>
                    <div className="text-sm font-bold text-[#1c1c1e] leading-none">¥1,089.00</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#636366] mb-0.5">最终含税价</div>
                    <div className="text-sm font-bold text-[#1c1c1e] leading-none">¥1,190.00</div>
                    <div className="text-[9px] text-[#636366] mt-0.5">+ 税费: ¥101.00</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#e5e5ea]/50">
                  <div className="text-[11px] text-[#636366]">库存 <span className="font-bold text-[#1c1c1e]">15</span></div>
                  <div className="flex items-center bg-[#f2f2f7] rounded-lg p-0.5 h-7">
                    <button className="w-7 h-6 opacity-20 flex items-center justify-center text-black"><Minus size={14} /></button>
                    <input className="w-8 h-6 border-none text-center text-xs font-semibold p-0 bg-transparent focus:ring-0 text-[#636366] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" defaultValue="0" />
                    <button className="w-7 h-6 active:opacity-40 flex items-center justify-center text-black"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: 欧洲现货 */}
            <div className="mx-3 mt-3 bg-white rounded-xl shadow-sm border border-teal-100 overflow-hidden">
              <div className="bg-teal-50 px-3 py-2 border-b border-teal-100 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span className="text-teal-900 font-bold text-xs">欧洲现货</span>
                  <span className="text-teal-600/70 text-[10px] font-medium ml-1">海外直邮</span>
                </div>
                <span className="text-[10px] text-teal-600 font-medium">10-15天</span>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[10px] text-[#636366] mb-0.5">销售价</div>
                    <div className="text-sm font-bold text-[#1c1c1e] leading-none">¥999.00</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#636366] mb-0.5">最终含税价</div>
                    <div className="text-sm font-bold text-[#1c1c1e] leading-none">¥1,119.00</div>
                    <div className="text-[9px] text-[#636366] mt-0.5">+ 税费: ¥120.00</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#e5e5ea]/50">
                  <div className="text-[11px] text-[#636366]">库存 <span className="font-bold text-[#1c1c1e]">8</span></div>
                  <div className="flex items-center bg-[#f2f2f7] rounded-lg p-0.5 h-7">
                    <button className="w-7 h-6 opacity-20 flex items-center justify-center text-black"><Minus size={14} /></button>
                    <input className="w-8 h-6 border-none text-center text-xs font-semibold p-0 bg-transparent focus:ring-0 text-[#636366] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" defaultValue="0" />
                    <button className="w-7 h-6 active:opacity-40 flex items-center justify-center text-black"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-40"></div>
          </section>
        </div>
      </main>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
      )}

      {/* Cart Drawer Bottom Sheet */}
      <div className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl z-50 transition-transform duration-300 ease-out transform ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-4 border-b border-[#e5e5ea]/50 flex justify-between items-center">
          <h3 className="font-bold text-base">已选商品 (3)</h3>
          <button className="text-xs text-[#8e8e93] flex items-center gap-1 active:opacity-60"><Trash2 size={14} /> 清空</button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-4 space-y-4">
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#f9f9f9] shrink-0 border border-[#e5e5ea]/50">
              <img alt="Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCgrMxP7Jph63dvoI8QyxQYNEZWSWwIJlERfsycetA3r3O5P7CCg1LdSWOgS1M8NbaCMkhYgkHC7mOvn4SorKKo3DaSBf-cUP1ca0pJ-e5aJZqfKm738i0ddH2aM7MOE0cMLxhLvfHB9kfFZIJtzOb0SnrAHnDv45M75EUu6f9UpyHirzu4heyWN58HJ57QNQigrh38FySps5AtPDXlWbm1e5D0-djxdAD2ksSrMTpH_nqJmzp2juO2g8ZuIhXwlbHzJFZJ4Pen5s" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-[#1c1c1e] leading-tight">Velocity Pro X1 - 曜石黑限定版</h4>
                  <p className="text-[10px] text-[#8e8e93] mt-0.5">42码 · 国内现货</p>
                </div>
                <span className="font-manrope font-bold text-sm">¥1,299.00</span>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center bg-[#f2f2f7] rounded-lg p-0.5 h-6">
                  <button className="w-6 h-5 active:opacity-40 flex items-center justify-center text-black"><Minus size={12} /></button>
                  <input className="w-6 h-5 border-none text-center text-[11px] font-semibold p-0 bg-transparent focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" defaultValue="2" />
                  <button className="w-6 h-5 active:opacity-40 flex items-center justify-center text-black"><Plus size={12} /></button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#f9f9f9] shrink-0 border border-[#e5e5ea]/50">
              <img alt="Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCVjif6fdkb1L7LKLCFbbntmn1TkgrM4jp4kmmd-ilFVy468P9epft0l91AkDuASk-mK1qjxoVfW1CiMSfpOxACnJ82sRsDuh4jeNgatEDeDnOumUlkXUILIRIqXBNwz3j5arY61g1yhwniw0o2SLL4E54Pqt4g7eV8v50cdaUNnnV3nHf17VZYTlfPwo8Wo0fDgX1uhR5mhJX3uoamks4QHBgNWsPjmqS2YJ_QESWZgEbch9oOrDPG0heCr6rWA0nxHuuBNtxb30" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-[#1c1c1e] leading-tight">极光系列 运动鞋</h4>
                  <p className="text-[10px] text-[#8e8e93] mt-0.5">39码 · 香港现货</p>
                </div>
                <span className="font-manrope font-bold text-sm">¥599.00</span>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center bg-[#f2f2f7] rounded-lg p-0.5 h-6">
                  <button className="w-6 h-5 active:opacity-40 flex items-center justify-center text-black"><Minus size={12} /></button>
                  <input className="w-6 h-5 border-none text-center text-[11px] font-semibold p-0 bg-transparent focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" defaultValue="1" />
                  <button className="w-6 h-5 active:opacity-40 flex items-center justify-center text-black"><Plus size={12} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 pb-8 border-t border-[#e5e5ea]/50 flex gap-2.5 bg-white">
          <button onClick={() => navigate('/cart')} className="flex-1 bg-[#f2f2f7] text-[#1c1c1e] py-3 rounded-xl font-bold text-[15px] active:opacity-60 transition-opacity border border-[#e5e5ea]/30">
            查看开单簿
          </button>
          <button onClick={() => navigate('/checkout')} className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-[15px] active:opacity-80 transition-opacity shadow-lg shadow-black/20">
            立即开单
          </button>
        </div>
      </div>

      <div className="shrink-0 fixed bottom-0 left-0 w-full z-40">
        <div className="bg-white/95 backdrop-blur-xl px-4 py-3 border-t border-[#e5e5ea] flex gap-3 items-center pb-8 shadow-2xl">
          <div className="flex flex-col min-w-[100px]" onClick={() => setIsCartOpen(true)}>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-[11px] text-[#636366] font-medium">已选 3 件</span>
              <ChevronUp size={14} className="text-[#636366]" />
            </div>
            <span className="text-xl font-manrope font-extrabold text-[#1c1c1e] leading-tight cursor-pointer">¥3,743.00</span>
          </div>
          <div className="flex-1 flex gap-2.5">
            <button onClick={() => navigate('/cart')} className="flex-1 bg-[#f2f2f7] text-[#1c1c1e] py-3 rounded-xl font-bold text-[15px] active:opacity-60 transition-opacity border border-[#e5e5ea]/30">
              开单簿
            </button>
            <button onClick={() => navigate('/checkout')} className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-[15px] active:opacity-80 transition-opacity shadow-lg shadow-black/20">
              立即开单
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
