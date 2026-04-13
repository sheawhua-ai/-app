import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, FileEdit, Info, MapPin, Minus, Package, Plus, Rocket, Store, Truck, Wallet, Warehouse } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    delivery: true,
    price: true,
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'store' | 'express'>('express');
  const [selectedStore, setSelectedStore] = useState('store1');
  const [finalPriceInput, setFinalPriceInput] = useState('1200');

  const SUPPLY_PRICE = 850;
  const TAX_RATE = 0.091;
  const SHIPPING_FEE = 40;
  const EXCHANGE_RATE = 0.914;

  const finalPriceHKD = parseFloat(finalPriceInput) || 0;
  const finalPriceCNY = finalPriceHKD * EXCHANGE_RATE;
  const productPriceCNY = Math.max(0, (finalPriceCNY - SHIPPING_FEE) / (1 + TAX_RATE));
  const taxCNY = productPriceCNY * TAX_RATE;
  const profitCNY = productPriceCNY - SUPPLY_PRICE;
  const isProfitNegative = profitCNY < 0;

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-[#fbfbfb] text-[#1a1c1c] min-h-screen pb-72 font-inter">
      <header className="fixed top-0 w-full z-50 flex items-center h-16 px-6 bg-white/80 backdrop-blur-md border-b border-[#d1d1d1]/30">
        <div className="flex items-center gap-4 w-full">
          <button onClick={() => navigate(-1)} className="active:scale-95 duration-150 p-2 hover:bg-[#f1f1f1] rounded-full">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-manrope font-bold text-lg tracking-tight">创建订单</h1>
        </div>
      </header>

      <main className="pt-20 px-4 space-y-8 max-w-lg mx-auto">
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-[#5e5e5e]">订单详情 (3) - 自动拆分</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Package size={16} className="text-[#5e5e5e]" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#5e5e5e]">包裹 1: 香港现货</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl border border-[#d1d1d1]/20 flex gap-4 shadow-sm">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f1f1f1] flex-shrink-0 border border-[#d1d1d1]/10">
                  <img alt="Product 1" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCVjif6fdkb1L7LKLCFbbntmn1TkgrM4jp4kmmd-ilFVy468P9epft0l91AkDuASk-mK1qjxoVfW1CiMSfpOxACnJ82sRsDuh4jeNgatEDeDnOumUlkXUILIRIqXBNwz3j5arY61g1yhwniw0o2SLL4E54Pqt4g7eV8v50cdaUNnnV3nHf17VZYTlfPwo8Wo0fDgX1uhR5mhJX3uoamks4QHBgNWsPjmqS2YJ_QESWZgEbch9oOrDPG0heCr6rWA0nxHuuBNtxb30" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-0.5">
                  <div>
                    <p className="font-bold text-sm text-[#1a1c1c]">极光系列 运动鞋</p>
                    <p className="text-[10px] text-[#5e5e5e] uppercase tracking-wider mt-0.5">SKU: AUR-092-RED</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-manrope font-bold text-lg tracking-tight">¥ 599.00</span>
                    <div className="flex items-center bg-[#f1f1f1] rounded-lg p-0.5 border border-[#d1d1d1]/20">
                      <button className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-xs font-bold">1</span>
                      <button className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1 pt-2">
              <Warehouse size={16} className="text-[#5e5e5e]" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#5e5e5e]">包裹 2: 国内现货</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl border border-[#d1d1d1]/20 flex gap-4 shadow-sm">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f1f1f1] flex-shrink-0 border border-[#d1d1d1]/10">
                  <img alt="Product 2" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW97eu0462n52znO_Eoo8OB83ZjCfjS2nDzNI9SVeHI6bkTjUea8qKmk5Mi5VtREZttPj44lkck8hWsL1_8jMND3IWImBGvVadbRqwi4O2yU1BiwUp2OTG4ejWDq5r4hVOJCBqEkTLSU2BU9ruu_8dDDrE7feTyjcVr4t1zX8WvOlmJy5xGIK1kMTQv4GiwZpXnHZnRAGAj6KRaZHglJqpN0uEne2an4jKRQ_yPkhpQV5fPmdms8ZAOF9G4E2JtVhX4zThkhkm4Bg" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-0.5">
                  <div>
                    <p className="font-bold text-sm text-[#1a1c1c]">哑光黑 恒温水壶</p>
                    <p className="text-[10px] text-[#5e5e5e] uppercase tracking-wider mt-0.5">SKU: WTR-KTL-BLK</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-manrope font-bold text-lg tracking-tight">¥ 249.00</span>
                    <div className="flex items-center bg-[#f1f1f1] rounded-lg p-0.5 border border-[#d1d1d1]/20">
                      <button className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-xs font-bold">2</span>
                      <button className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-[#5e5e5e] px-1">订单配置</h2>

          <div className="bg-white rounded-xl border border-[#d1d1d1]/20 overflow-hidden shadow-sm transition-all">
            <div 
              className="p-4 border-l-4 border-black flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('delivery')}
            >
              <div className="flex items-center gap-3">
                <Truck size={20} />
                <span className="font-bold text-sm">配送方式</span>
              </div>
              {openSections.delivery ? <ChevronUp size={20} className="text-[#5e5e5e]" /> : <ChevronDown size={20} className="text-[#5e5e5e]" />}
            </div>
            
            {openSections.delivery && (
              <div className="p-4 bg-[#f7f7f7] border-t border-[#d1d1d1]/10 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setDeliveryMethod('store')}
                    className={`py-3 px-4 rounded-lg text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${deliveryMethod === 'store' ? 'bg-white border-2 border-black shadow-sm' : 'bg-white border border-[#d1d1d1]/30 active:scale-95'}`}
                  >
                    <Store size={20} className={deliveryMethod === 'store' ? 'text-black' : 'text-[#5e5e5e]'} />
                    门店自提
                  </button>
                  <button 
                    onClick={() => setDeliveryMethod('express')}
                    className={`py-3 px-4 rounded-lg text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${deliveryMethod === 'express' ? 'bg-white border-2 border-black shadow-sm' : 'bg-white border border-[#d1d1d1]/30 active:scale-95'}`}
                  >
                    <Rocket size={20} className={deliveryMethod === 'express' ? 'text-[#0052CC]' : 'text-[#5e5e5e]'} />
                    极速快递
                  </button>
                </div>

                {deliveryMethod === 'store' && (
                  <div className="bg-white p-4 rounded-lg border border-[#d1d1d1]/20 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={18} className="text-[#0052CC]" />
                      <label className="text-xs font-bold">选择自提门店</label>
                    </div>
                    <div className="space-y-2">
                      <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedStore === 'store1' ? 'border-black bg-[#f9f9f9]' : 'border-[#d1d1d1]/30 hover:bg-[#f9f9f9]'}`}>
                        <input 
                          type="radio" 
                          name="store" 
                          className="mt-0.5 w-4 h-4 text-black focus:ring-black" 
                          checked={selectedStore === 'store1'}
                          onChange={() => setSelectedStore('store1')}
                        />
                        <div>
                          <p className="text-sm font-bold text-[#1a1c1c]">上海静安嘉里中心店</p>
                          <p className="text-xs text-[#5e5e5e] mt-1">上海市静安区南京西路1515号</p>
                        </div>
                      </label>
                      <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedStore === 'store2' ? 'border-black bg-[#f9f9f9]' : 'border-[#d1d1d1]/30 hover:bg-[#f9f9f9]'}`}>
                        <input 
                          type="radio" 
                          name="store" 
                          className="mt-0.5 w-4 h-4 text-black focus:ring-black" 
                          checked={selectedStore === 'store2'}
                          onChange={() => setSelectedStore('store2')}
                        />
                        <div>
                          <p className="text-sm font-bold text-[#1a1c1c]">北京国贸商城店</p>
                          <p className="text-xs text-[#5e5e5e] mt-1">北京市朝阳区建国门外大街1号</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {deliveryMethod === 'express' && (
                  <div className="bg-white p-4 rounded-lg border border-[#d1d1d1]/20 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#0052CC] flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-[#0052CC] rounded-full"></div>
                      </div>
                      <label className="text-xs font-bold">立即输入联系信息</label>
                    </div>
                    <div className="space-y-3 pl-8">
                      <div className="space-y-3">
                        <input className="w-full bg-[#f1f1f1] border border-[#d1d1d1]/20 rounded-lg px-4 py-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all" placeholder="收货人姓名" type="text" />
                      </div>
                      <input className="w-full bg-[#f1f1f1] border border-[#d1d1d1]/20 rounded-lg px-4 py-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all" placeholder="联系电话 (或提货人手机号)" type="tel" />
                      <div className="space-y-3">
                        <textarea className="w-full bg-[#f1f1f1] border border-[#d1d1d1]/20 rounded-lg px-4 py-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all resize-none" placeholder="详细地址信息" rows={2}></textarea>
                        <div className="space-y-1.5">
                          <input className="w-full bg-[#f1f1f1] border border-[#d1d1d1]/20 rounded-lg px-4 py-2.5 text-xs focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all" placeholder="购买人身份证实名" required type="text" />
                          <p className="text-[10px] text-[#5e5e5e]/70 italic px-1">跨境商品需实名认证</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-5 h-5 rounded-full border border-[#777777]"></div>
                      <label className="text-xs font-medium text-[#5e5e5e]">由客户填写地址</label>
                    </div>
                    <p className="text-[10px] text-[#5e5e5e] leading-relaxed pl-8">创建订单后，系统将发送链接至客户手机号，由客户自主完成信息录入。</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-[#d1d1d1]/20 overflow-hidden shadow-sm transition-all">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('price')}
            >
              <div className="flex items-center gap-3">
                <FileEdit size={20} className="text-[#5e5e5e]" />
                <span className="font-bold text-sm text-[#1a1c1c]">价格手动调整</span>
              </div>
              <div className="flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-10 h-5 bg-[#e8e8e8] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                </label>
                {openSections.price ? <ChevronUp size={20} className="text-[#5e5e5e]" /> : <ChevronDown size={20} className="text-[#5e5e5e]" />}
              </div>
            </div>
            
            {openSections.price && (
              <div className="p-4 bg-[#f7f7f7] border-t border-[#d1d1d1]/10 space-y-4">
                <div className="flex bg-[#e8e8e8] p-1 rounded-lg">
                  <button className="flex-1 py-1.5 text-[10px] font-bold rounded-md bg-white shadow-sm">调整港币 (HKD)</button>
                  <button className="flex-1 py-1.5 text-[10px] font-bold text-[#5e5e5e]">调整人民币 (CNY)</button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#5e5e5e] uppercase ml-1">最终应付一口价 (HKD)</label>
                  <div className="relative">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold ${isProfitNegative ? 'text-[#FF3B30]' : 'text-[#0052CC]'}`}>$</span>
                    <input 
                      className={`w-full bg-white border rounded-lg pl-8 pr-4 py-2.5 text-xs font-bold outline-none ring-1 transition-colors ${isProfitNegative ? 'border-[#FF3B30] text-[#FF3B30] ring-[#FF3B30]/20 focus:border-[#FF3B30] focus:ring-[#FF3B30]/40' : 'border-[#0052CC] text-[#0052CC] ring-[#0052CC]/20 focus:border-[#0052CC] focus:ring-[#0052CC]/40'}`} 
                      type="number" 
                      value={finalPriceInput}
                      onChange={(e) => setFinalPriceInput(e.target.value)}
                    />
                  </div>
                  
                  <div className="bg-white border border-[#d1d1d1]/30 rounded-lg p-3 mt-3 space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#5e5e5e]">折合人民币总价</span>
                      <span className="font-bold">¥ {finalPriceCNY.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-[#d1d1d1]/30 w-full my-1"></div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#5e5e5e]">供货价合计 (固定)</span>
                      <span className="font-bold">¥ {SUPPLY_PRICE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#5e5e5e]">倒推商品销售价</span>
                      <span className="font-bold">¥ {productPriceCNY.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#5e5e5e]">应付关税 (9.1%)</span>
                      <span className="font-bold">¥ {taxCNY.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#5e5e5e]">运费</span>
                      <span className="font-bold">¥ {SHIPPING_FEE.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-[#d1d1d1]/30 w-full my-1"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Info size={14} className={isProfitNegative ? "text-[#FF3B30]" : "text-green-600"} />
                        <span className={`text-[10px] font-bold ${isProfitNegative ? "text-[#FF3B30]" : "text-green-600"}`}>
                          {isProfitNegative ? '错误: 销售价低于供货价' : `预计分润: +¥ ${profitCNY.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-4 flex flex-col gap-4 bg-white/95 backdrop-blur-lg border-t border-[#d1d1d1]/20 z-50 rounded-t-2xl shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
        {isDetailsOpen && (
          <div className="px-2 space-y-2 border-b border-[#d1d1d1]/10 pb-4 opacity-60">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#5e5e5e]">商品销售价 </span>
              <span className="font-bold text-[#1a1c1c]">¥ {productPriceCNY.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#5e5e5e]">关税 (9.1%)</span>
              <span className="font-bold text-[#1a1c1c]">¥ {taxCNY.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#5e5e5e]">运费</span>
              <span className="font-bold text-[#1a1c1c]">¥ {SHIPPING_FEE.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
              <span className="text-[10px] text-[#5e5e5e] uppercase font-bold tracking-wider">应付总额</span>
              {isDetailsOpen ? <ChevronDown size={14} className="text-[#5e5e5e]" /> : <ChevronUp size={14} className="text-[#5e5e5e]" />}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-manrope font-extrabold text-2xl text-[#1a1c1c] tracking-tighter">¥ {finalPriceCNY.toFixed(2)}</span>
              <span className="text-[10px] text-[#5e5e5e] font-medium">(HK$ {finalPriceHKD.toFixed(2)})</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {isProfitNegative && <p className="text-[10px] text-[#FF3B30] font-bold italic">价格不可低于供货价</p>}
          </div>
        </div>

        <div className="flex flex-col">
          <button 
            onClick={() => !isProfitNegative && navigate('/success')} 
            disabled={isProfitNegative}
            className={`flex items-center justify-center rounded-xl px-6 py-4 w-full font-bold text-sm transition-all shadow-lg ${isProfitNegative ? 'bg-[#e5e5ea] text-[#8e8e93] shadow-none cursor-not-allowed' : 'bg-black text-white active:scale-[0.98] shadow-black/10'}`}
          >
            <CheckCircle2 size={20} className="mr-2" />
            确认并创建订单
          </button>
        </div>
      </footer>
    </div>
  );
}
