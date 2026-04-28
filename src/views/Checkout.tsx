import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, FileEdit, Info, MapPin, Minus, Package, Plus, Rocket, Store, Truck, Users, Warehouse } from 'lucide-react';
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
  const [storeDeliveryType, setStoreDeliveryType] = useState<'pickup' | 'hkmacau'>('pickup');
  
  const [activeOrderTab, setActiveOrderTab] = useState<'domestic' | 'cross_border'>('domestic');
  
  const [isPriceAdjusted, setIsPriceAdjusted] = useState(false);
  const [domesticPriceCNY, setDomesticPriceCNY] = useState('249');
  
  // Cross-border price state
  const [crossBorderCurrency, setCrossBorderCurrency] = useState<'HKD' | 'CNY'>('CNY');
  const [crossBorderPrice, setCrossBorderPrice] = useState('641');

  const domesticItems = [
    {
      id: 1,
      name: '哑光黑 恒温水壶',
      spec: 'SKU: WTR-KTL-BLK',
      price: 249,
      qty: 2,
      tag: '国内现货',
      tagClass: 'bg-blue-100 text-blue-700',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW97eu0462n52znO_Eoo8OB83ZjCfjS2nDzNI9SVeHI6bkTjUea8qKmk5Mi5VtREZttPj44lkck8hWsL1_8jMND3IWImBGvVadbRqwi4O2yU1BiwUp2OTG4ejWDq5r4hVOJCBqEkTLSU2BU9ruu_8dDDrE7feTyjcVr4t1zX8WvOlmJy5xGIK1kMTQv4GiwZpXnHZnRAGAj6KRaZHglJqpN0uEne2an4jKRQ_yPkhpQV5fPmdms8ZAOF9G4E2JtVhX4zThkhkm4Bg'
    }
  ];

  const crossBorderItems = [
    {
      id: 2,
      name: '极光系列 运动鞋',
      spec: 'SKU: AUR-092-RED',
      price: 599,
      qty: 1,
      tag: '香港现货',
      tagClass: 'bg-purple-100 text-purple-700',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCVjif6fdkb1L7LKLCFbbntmn1TkgrM4jp4kmmd-ilFVy468P9epft0l91AkDuASk-mK1qjxoVfW1CiMSfpOxACnJ82sRsDuh4jeNgatEDeDnOumUlkXUILIRIqXBNwz3j5arY61g1yhwniw0o2SLL4E54Pqt4g7eV8v50cdaUNnnV3nHf17VZYTlfPwo8Wo0fDgX1uhR5mhJX3uoamks4QHBgNWsPjmqS2YJ_QESWZgEbch9oOrDPG0heCr6rWA0nxHuuBNtxb30'
    }
  ];

  const currentItems = activeOrderTab === 'domestic' ? domesticItems : crossBorderItems;

  const SUPPLY_PRICE_DOMESTIC = 200;
  const SUPPLY_PRICE_CROSS_BORDER = 500;
  const DEFAULT_RETAIL_CNY = 641;
  const EXCHANGE_RATE = 0.914;

  const EXPRESS_SHIPPING_FEE = 40;
  const CROSS_BORDER_TAX_RATE = 0.091; // 9.1% comprehensive tax

  // Domestic calculations
  const finalDomesticCNY = isPriceAdjusted ? (parseFloat(domesticPriceCNY) || 0) : 249;
  const productPriceDomesticCNY = Math.max(0, finalDomesticCNY - (deliveryMethod === 'express' ? EXPRESS_SHIPPING_FEE / 2 : 0));
  const profitDomesticCNY = productPriceDomesticCNY - SUPPLY_PRICE_DOMESTIC;
  const isDomesticProfitNegative = profitDomesticCNY < 0;

  // Cross-border calculations
  const finalCrossBorder = isPriceAdjusted ? (parseFloat(crossBorderPrice) || 0) : (crossBorderCurrency === 'HKD' ? DEFAULT_RETAIL_CNY / EXCHANGE_RATE : DEFAULT_RETAIL_CNY);
  const finalCrossBorderHKD = crossBorderCurrency === 'HKD' ? finalCrossBorder : finalCrossBorder / EXCHANGE_RATE;
  const finalCrossBorderCNY = crossBorderCurrency === 'CNY' ? finalCrossBorder : finalCrossBorder * EXCHANGE_RATE;
  
  let productPriceCrossBorderCNY = 0;
  let estimatedTaxCB = 0;
  let estimatedShippingCB = 0;
  let commissionDiscountCB = 0;
  const baseCommissionCB = DEFAULT_RETAIL_CNY - SUPPLY_PRICE_CROSS_BORDER;
  
  if (deliveryMethod === 'express') {
    estimatedShippingCB = EXPRESS_SHIPPING_FEE;
    if (isPriceAdjusted) {
      // Inclusive of tax and shipping in the final display price
      productPriceCrossBorderCNY = Math.max(0, (finalCrossBorderCNY - estimatedShippingCB) / (1 + CROSS_BORDER_TAX_RATE));
      estimatedTaxCB = productPriceCrossBorderCNY * CROSS_BORDER_TAX_RATE;
    } else {
      // Not adjusted: Customer pays tax and shipping separately later
      productPriceCrossBorderCNY = finalCrossBorderCNY;
      estimatedTaxCB = productPriceCrossBorderCNY * CROSS_BORDER_TAX_RATE;
    }
    commissionDiscountCB = baseCommissionCB - (productPriceCrossBorderCNY - SUPPLY_PRICE_CROSS_BORDER);
  } else {
    // Store pickup
    productPriceCrossBorderCNY = finalCrossBorderCNY;
    commissionDiscountCB = baseCommissionCB - (productPriceCrossBorderCNY - SUPPLY_PRICE_CROSS_BORDER);
  }

  const profitCrossBorderCNY = productPriceCrossBorderCNY - SUPPLY_PRICE_CROSS_BORDER;
  const isCrossBorderProfitNegative = profitCrossBorderCNY < 0;

  // Aggregate current values for display
  const currentTotalCNY = activeOrderTab === 'domestic' ? finalDomesticCNY : finalCrossBorderCNY;
  const currentTotalHKD = activeOrderTab === 'domestic' ? finalDomesticCNY / EXCHANGE_RATE : finalCrossBorderHKD;
  const isCurrentProfitNegative = activeOrderTab === 'domestic' ? isDomesticProfitNegative : isCrossBorderProfitNegative;
  const currentProfitCNY = activeOrderTab === 'domestic' ? profitDomesticCNY : profitCrossBorderCNY;
  const currentProductPriceCNY = activeOrderTab === 'domestic' ? productPriceDomesticCNY : productPriceCrossBorderCNY;
  const currentSupplyPrice = activeOrderTab === 'domestic' ? SUPPLY_PRICE_DOMESTIC : SUPPLY_PRICE_CROSS_BORDER;

  const displayTotal = activeOrderTab === 'domestic' 
    ? `¥ ${finalDomesticCNY.toFixed(2)}` 
    : (crossBorderCurrency === 'HKD' ? `HK$ ${finalCrossBorderHKD.toFixed(2)}` : `¥ ${finalCrossBorderCNY.toFixed(2)}`);
  
  const displaySubTotal = activeOrderTab === 'domestic'
    ? null
    : (crossBorderCurrency === 'HKD' ? `(¥ ${finalCrossBorderCNY.toFixed(2)})` : `(HK$ ${finalCrossBorderHKD.toFixed(2)})`);

  // Dynamic Delivery Labels
  const storeDeliveryLabel = activeOrderTab === 'cross_border' ? '本地/自提' : '门店自提';
  const expressDeliveryLabel = activeOrderTab === 'cross_border' ? '跨境快递' : '极速快递';

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

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2 shadow-sm">
            <Info size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-orange-700 leading-relaxed">
              <strong>注意：</strong>当前订单包含跨境商品（香港现货）和非跨境商品（国内现货）。由于支付和报关要求不同，系统将自动拆分为 <strong>2笔独立订单</strong> 进行支付。
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveOrderTab('domestic')} 
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all ${activeOrderTab === 'domestic' ? 'border-black bg-black text-white shadow-md' : 'border-[#d1d1d1]/30 bg-white text-[#5e5e5e] hover:bg-[#f9f9f9]'}`}
              >
                国内现货订单 (1)
              </button>
              <button 
                onClick={() => setActiveOrderTab('cross_border')} 
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all ${activeOrderTab === 'cross_border' ? 'border-black bg-black text-white shadow-md' : 'border-[#d1d1d1]/30 bg-white text-[#5e5e5e] hover:bg-[#f9f9f9]'}`}
              >
                跨境/境外订单 (1)
              </button>
            </div>

            <div className="space-y-3">
              {currentItems.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-xl border border-[#d1d1d1]/20 flex gap-4 shadow-sm">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f1f1f1] flex-shrink-0 border border-[#d1d1d1]/10">
                    <img alt={item.name} className="w-full h-full object-cover grayscale" src={item.img} referrerPolicy="no-referrer" crossOrigin="anonymous" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-0.5">
                    <div>
                      <p className="font-bold text-sm text-[#1a1c1c]">{item.name}</p>
                      <p className="text-[10px] text-[#5e5e5e] uppercase tracking-wider mt-0.5">{item.spec}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-manrope font-bold text-lg tracking-tight">¥ {item.price.toFixed(2)}</span>
                      <div className="flex items-center bg-[#f1f1f1] rounded-lg p-0.5 border border-[#d1d1d1]/20">
                        <button className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs font-bold">{item.qty}</span>
                        <button className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                    {storeDeliveryLabel}
                  </button>
                  <button 
                    onClick={() => setDeliveryMethod('express')}
                    className={`py-3 px-4 rounded-lg text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${deliveryMethod === 'express' ? 'bg-white border-2 border-black shadow-sm' : 'bg-white border border-[#d1d1d1]/30 active:scale-95'}`}
                  >
                    <Rocket size={20} className={deliveryMethod === 'express' ? 'text-[#0052CC]' : 'text-[#5e5e5e]'} />
                    {expressDeliveryLabel}
                  </button>
                </div>

                {deliveryMethod === 'store' && (
                  <div className="bg-white p-4 rounded-lg border border-[#d1d1d1]/20 space-y-4">
                    {activeOrderTab === 'cross_border' && (
                      <div className="flex bg-[#f1f1f1] p-1 rounded-lg">
                        <button 
                          onClick={() => setStoreDeliveryType('pickup')}
                          className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-all ${storeDeliveryType === 'pickup' ? 'bg-white shadow-sm text-black' : 'text-[#5e5e5e] hover:text-black'}`}
                        >
                          自提门店
                        </button>
                        <button 
                          onClick={() => setStoreDeliveryType('hkmacau')}
                          className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-all ${storeDeliveryType === 'hkmacau' ? 'bg-white shadow-sm text-black' : 'text-[#5e5e5e] hover:text-black'}`}
                        >
                          配送港澳地址
                        </button>
                      </div>
                    )}

                    {(activeOrderTab === 'domestic' || storeDeliveryType === 'pickup') && (
                      <>
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
                              <div className="flex items-center gap-2">
                                <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold leading-none">本店</span>
                                <p className="text-sm font-bold text-[#1a1c1c]">上海静安嘉里中心店</p>
                              </div>
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
                      </>
                    )}

                    {activeOrderTab === 'cross_border' && storeDeliveryType === 'hkmacau' && (
                      <div className="bg-[#f7f7f7] rounded-lg p-4 border border-[#d1d1d1]/20">
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full border-4 border-black bg-white mt-0.5 flex-shrink-0"></div>
                          <div>
                            <label className="text-xs font-bold text-[#1a1c1c]">默认转发给客户填写</label>
                            <p className="text-[10px] text-[#5e5e5e] leading-relaxed mt-1.5">创建订单后，系统将自动生成订单链接。可通过微信等方式转发，由客户自主完成收信地址（港澳地区）及联系方式的填写。</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {deliveryMethod === 'express' && (
                  <div className="bg-white p-4 rounded-lg border border-[#d1d1d1]/20 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={18} className="text-[#0052CC]" />
                      <label className="text-xs font-bold">配送信息收集</label>
                    </div>
                    
                    <div className="bg-[#f7f7f7] rounded-lg p-4 border border-[#d1d1d1]/20 ml-8">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-4 border-black bg-white mt-0.5 flex-shrink-0"></div>
                        <div>
                          <label className="text-xs font-bold text-[#1a1c1c]">默认转发给客户填写</label>
                          <p className="text-[10px] text-[#5e5e5e] leading-relaxed mt-1.5">创建订单后，系统将自动生成订单链接。可通过微信等方式转发，由客户自主完成收信地址、联系方式及跨境清关所需实名信息的填写。</p>
                        </div>
                      </div>
                    </div>
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
                  <input 
                    checked={isPriceAdjusted}
                    onChange={(e) => setIsPriceAdjusted(e.target.checked)}
                    className="sr-only peer" 
                    type="checkbox" 
                  />
                  <div className="w-10 h-5 bg-[#e8e8e8] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                </label>
                {openSections.price ? <ChevronUp size={20} className="text-[#5e5e5e]" /> : <ChevronDown size={20} className="text-[#5e5e5e]" />}
              </div>
            </div>
            
            {openSections.price && (
              <div className="p-4 bg-[#f7f7f7] border-t border-[#d1d1d1]/10 space-y-4">
                {activeOrderTab === 'domestic' ? (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#5e5e5e] uppercase ml-1">最终应付一口价 (CNY)</label>
                    <div className="relative">
                      <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold ${isDomesticProfitNegative ? 'text-[#FF3B30]' : 'text-[#0052CC]'}`}>¥</span>
                      <input 
                        className={`w-full bg-white border rounded-lg pl-8 pr-4 py-2.5 text-xs font-bold outline-none ring-1 transition-colors ${!isPriceAdjusted ? 'border-[#d1d1d1]/30 text-[#1a1c1c] ring-transparent bg-[#f9f9f9]' : (isDomesticProfitNegative ? 'border-[#FF3B30] text-[#FF3B30] ring-[#FF3B30]/20 focus:border-[#FF3B30] focus:ring-[#FF3B30]/40' : 'border-[#0052CC] text-[#0052CC] ring-[#0052CC]/20 focus:border-[#0052CC] focus:ring-[#0052CC]/40')}`} 
                        type="number" 
                        value={isPriceAdjusted ? domesticPriceCNY : '249'}
                        onChange={(e) => setDomesticPriceCNY(e.target.value)}
                        disabled={!isPriceAdjusted}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex bg-[#e8e8e8] p-1 rounded-lg">
                      <button 
                        onClick={() => setCrossBorderCurrency('HKD')}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-md ${crossBorderCurrency === 'HKD' ? 'bg-white shadow-sm' : 'text-[#5e5e5e]'}`}
                      >
                        调整港币 (HKD)
                      </button>
                      <button 
                        onClick={() => setCrossBorderCurrency('CNY')}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-md ${crossBorderCurrency === 'CNY' ? 'bg-white shadow-sm' : 'text-[#5e5e5e]'}`}
                      >
                        调整人民币 (CNY)
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-[#5e5e5e] uppercase ml-1">最终应付一口价 ({crossBorderCurrency})</label>
                      <div className="relative">
                        <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold ${isCrossBorderProfitNegative ? 'text-[#FF3B30]' : 'text-[#0052CC]'}`}>
                          {crossBorderCurrency === 'HKD' ? '$' : '¥'}
                        </span>
                        <input 
                          className={`w-full bg-white border rounded-lg pl-8 pr-4 py-2.5 text-xs font-bold outline-none ring-1 transition-colors ${!isPriceAdjusted ? 'border-[#d1d1d1]/30 text-[#1a1c1c] ring-transparent bg-[#f9f9f9]' : (isCrossBorderProfitNegative ? 'border-[#FF3B30] text-[#FF3B30] ring-[#FF3B30]/20 focus:border-[#FF3B30] focus:ring-[#FF3B30]/40' : 'border-[#0052CC] text-[#0052CC] ring-[#0052CC]/20 focus:border-[#0052CC] focus:ring-[#0052CC]/40')}`} 
                          type="number" 
                          value={isPriceAdjusted ? crossBorderPrice : (crossBorderCurrency === 'HKD' ? (DEFAULT_RETAIL_CNY / EXCHANGE_RATE).toFixed(2) : DEFAULT_RETAIL_CNY)}
                          onChange={(e) => setCrossBorderPrice(e.target.value)}
                          disabled={!isPriceAdjusted}
                        />
                      </div>
                      {activeOrderTab === 'cross_border' && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] text-[#5e5e5e]">官方指导售价: CNY ¥{DEFAULT_RETAIL_CNY}</span>
                          {deliveryMethod === 'express' && (
                            isPriceAdjusted ? (
                              <span className="text-[9px] bg-[#0052CC]/10 text-[#0052CC] px-2 py-0.5 rounded-sm font-bold">一口价包税运模式</span>
                            ) : (
                              <span className="text-[9px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-sm font-bold">客户支付税运模式</span>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                  
                <div className="bg-white border border-[#d1d1d1]/30 rounded-lg p-3 mt-3 space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#5e5e5e]">折合人民币总价</span>
                    <span className="font-bold">¥ {currentTotalCNY.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-[#d1d1d1]/30 w-full my-1"></div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#5e5e5e]">供货价合计</span>
                    <span className="font-bold">¥ {currentSupplyPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#5e5e5e]">零售价</span>
                    <span className="font-bold">¥ {currentProductPriceCNY.toFixed(2)}</span>
                  </div>

                  {activeOrderTab === 'domestic' ? (
                    // Domestic info
                    deliveryMethod === 'express' ? (
                      <>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-[#5e5e5e]">运费</span>
                          <span className="font-bold">¥ {(EXPRESS_SHIPPING_FEE / 2).toFixed(2)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#5e5e5e]">运费 ({storeDeliveryLabel})</span>
                        <span className="font-bold text-green-600">¥ 0.00</span>
                      </div>
                    )
                  ) : (
                    // CrossBorder info
                    deliveryMethod === 'express' ? (
                      isPriceAdjusted ? (
                        <div className="bg-green-50 p-2 rounded border border-green-100 mt-1 shadow-sm">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-green-700 font-bold">佣金优惠让利 (涵盖已代付税运):</span>
                            <span className="font-bold text-green-700">¥ {commissionDiscountCB.toFixed(2)}</span>
                          </div>
                          <p className="text-[9px] text-green-600/80 mt-1">
                            已用佣金代付跨境税¥{estimatedTaxCB.toFixed(2)}及运费¥{estimatedShippingCB.toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-orange-50 p-2 rounded border border-orange-100 mt-1 shadow-sm">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-orange-700 font-bold">不含税运 (由客户扫码后支付):</span>
                            <span className="font-bold text-orange-700">¥ {(estimatedTaxCB + estimatedShippingCB).toFixed(2)}</span>
                          </div>
                          <p className="text-[9px] text-orange-600/80 mt-1">
                            仅含商品款，后续客户需补交税金¥{estimatedTaxCB.toFixed(2)}及运费¥{estimatedShippingCB.toFixed(2)}
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#5e5e5e]">关税及运费 ({storeDeliveryLabel})</span>
                        <span className="font-bold text-green-600">¥ 0.00</span>
                      </div>
                    )
                  )}
                  <div className="h-px bg-[#d1d1d1]/30 w-full my-1"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Info size={14} className={isCurrentProfitNegative ? "text-[#FF3B30]" : "text-green-600"} />
                      <span className={`text-[10px] font-bold ${isCurrentProfitNegative ? "text-[#FF3B30]" : "text-green-600"}`}>
                        {isCurrentProfitNegative ? '错误: 不可低于货主价及税运成本' : `预计分销佣金: +¥ ${currentProfitCNY.toFixed(2)}`}
                      </span>
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
              <span className="font-bold text-[#1a1c1c]">¥ {currentProductPriceCNY.toFixed(2)}</span>
            </div>
            
            {activeOrderTab === 'domestic' ? (
              deliveryMethod === 'express' ? (
                <>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#5e5e5e]">运费</span>
                    <span className="font-bold text-[#1a1c1c]">¥ {(EXPRESS_SHIPPING_FEE / 2).toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#5e5e5e]">运费</span>
                  <span className="font-bold text-green-600">¥ 0.00 ({storeDeliveryLabel})</span>
                </div>
              )
            ) : (
              deliveryMethod === 'express' ? (
                isPriceAdjusted ? (
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#5e5e5e]">已含税运费 (包税包邮)</span>
                    <span className="font-bold text-green-600">包含 ¥ {(estimatedTaxCB + estimatedShippingCB).toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-[#5e5e5e]">税金</span>
                      <span className="font-bold text-orange-600">+ ¥ {estimatedTaxCB.toFixed(2)} (由客户自付)</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-[#5e5e5e]">运费</span>
                      <span className="font-bold text-orange-600">+ ¥ {estimatedShippingCB.toFixed(2)} (由客户自付)</span>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#5e5e5e]">关税及运费</span>
                  <span className="font-bold text-green-600">¥ 0.00 ({storeDeliveryLabel})</span>
                </div>
              )
            )}
          </div>
        )}

        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
              <span className="text-[10px] text-[#5e5e5e] uppercase font-bold tracking-wider">当前订单应付</span>
              {isDetailsOpen ? <ChevronDown size={14} className="text-[#5e5e5e]" /> : <ChevronUp size={14} className="text-[#5e5e5e]" />}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-manrope font-extrabold text-2xl text-[#1a1c1c] tracking-tighter">{displayTotal}</span>
              {displaySubTotal && <span className="text-[10px] text-[#5e5e5e] font-medium">{displaySubTotal}</span>}
            </div>
          </div>
          <div className="flex flex-col items-end">
            {isCurrentProfitNegative && <p className="text-[10px] text-[#FF3B30] font-bold italic">价格不可低于供货价</p>}
          </div>
        </div>

        <div className="flex flex-col">
          <button 
            onClick={() => !isCurrentProfitNegative && navigate('/success')} 
            disabled={isCurrentProfitNegative}
            className={`flex items-center justify-center rounded-xl px-6 py-4 w-full font-bold text-sm transition-all shadow-lg ${isCurrentProfitNegative ? 'bg-[#e5e5ea] text-[#8e8e93] shadow-none cursor-not-allowed' : 'bg-black text-white active:scale-[0.98] shadow-black/10'}`}
          >
            <CheckCircle2 size={20} className="mr-2" />
            确认并拆单支付 (2笔)
          </button>
        </div>
      </footer>
    </div>
  );
}
