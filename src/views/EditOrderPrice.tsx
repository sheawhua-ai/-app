import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, FileEdit, Info, Package, Store, Truck, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditOrderPrice() {
  const navigate = useNavigate();
  
  // Mock fixed order details (in a real app, this would come from a database or location.state)
  const orderInfo = {
    id: 'ORD-20230514-8761',
    type: 'cross_border', // 'domestic' or 'cross_border'
    deliveryMethod: 'express', // 'store' or 'express'
    items: [
      {
        id: 2,
        name: '极光系列 运动鞋',
        spec: 'SKU: AUR-092-RED',
        price: 599,
        qty: 1,
        tag: '香港现货',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCVjif6fdkb1L7LKLCFbbntmn1TkgrM4jp4kmmd-ilFVy468P9epft0l91AkDuASk-mK1qjxoVfW1CiMSfpOxACnJ82sRsDuh4jeNgatEDeDnOumUlkXUILIRIqXBNwz3j5arY61g1yhwniw0o2SLL4E54Pqt4g7eV8v50cdaUNnnV3nHf17VZYTlfPwo8Wo0fDgX1uhR5mhJX3uoamks4QHBgNWsPjmqS2YJ_QESWZgEbch9oOrDPG0heCr6rWA0nxHuuBNtxb30'
      }
    ],
    customer: '张三 (138****8888)',
    status: '未付款'
  };

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Price state
  const [isPriceAdjusted, setIsPriceAdjusted] = useState(false);
  const [crossBorderCurrency, setCrossBorderCurrency] = useState<'HKD' | 'CNY'>('CNY');
  const [crossBorderPrice, setCrossBorderPrice] = useState('641');
  const [domesticPriceCNY, setDomesticPriceCNY] = useState('249');

  // Constants mapped from Checkout logic
  const SUPPLY_PRICE_CROSS_BORDER = 500;
  const SUPPLY_PRICE_DOMESTIC = 200;
  const DEFAULT_RETAIL_CNY = 641;
  const EXPRESS_SHIPPING_FEE = 40;
  const EXCHANGE_RATE = 0.914;
  const CROSS_BORDER_TAX_RATE = 0.091;

  // Active calculations based on fixed orderInfo
  const activeOrderTab = orderInfo.type;
  const deliveryMethod = orderInfo.deliveryMethod;

  // Domestic calcs
  const finalDomesticCNY = isPriceAdjusted ? (parseFloat(domesticPriceCNY) || 0) : 249;
  const productPriceDomesticCNY = Math.max(0, finalDomesticCNY - (deliveryMethod === 'express' ? EXPRESS_SHIPPING_FEE / 2 : 0));
  const profitDomesticCNY = productPriceDomesticCNY - SUPPLY_PRICE_DOMESTIC;
  const isDomesticProfitNegative = profitDomesticCNY < 0;

  // Cross-border calcs
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
      productPriceCrossBorderCNY = Math.max(0, (finalCrossBorderCNY - estimatedShippingCB) / (1 + CROSS_BORDER_TAX_RATE));
      estimatedTaxCB = productPriceCrossBorderCNY * CROSS_BORDER_TAX_RATE;
    } else {
      productPriceCrossBorderCNY = finalCrossBorderCNY;
      estimatedTaxCB = productPriceCrossBorderCNY * CROSS_BORDER_TAX_RATE;
    }
    commissionDiscountCB = baseCommissionCB - (productPriceCrossBorderCNY - SUPPLY_PRICE_CROSS_BORDER);
  } else {
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

  const storeDeliveryLabel = activeOrderTab === 'cross_border' ? '本地/自提' : '门店自提';

  const handleSave = () => {
    // Navigate back to orders list or success page
    navigate(-1);
  };

  return (
    <div className="bg-[#fbfbfb] text-[#1a1c1c] min-h-screen pb-48 font-inter">
      <header className="fixed top-0 w-full z-50 flex items-center h-16 px-6 bg-white/80 backdrop-blur-md border-b border-[#d1d1d1]/30">
        <div className="flex items-center gap-4 w-full">
          <button onClick={() => navigate(-1)} className="active:scale-95 duration-150 p-2 hover:bg-[#f1f1f1] rounded-full">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-manrope font-bold text-lg tracking-tight">修改订单总价</h1>
        </div>
      </header>

      <main className="pt-20 px-4 space-y-6 max-w-lg mx-auto">
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-[#5e5e5e]">订单信息</h2>
            <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded-md">{orderInfo.status}</span>
          </div>

          <div className="bg-white rounded-xl border border-[#d1d1d1]/20 p-4 shadow-sm space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#5e5e5e]">订单编号</span>
              <span className="font-mono font-bold">{orderInfo.id}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#5e5e5e]">客户信息</span>
              <span className="font-bold">{orderInfo.customer}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#5e5e5e]">订单类型</span>
              <span className="font-bold">{orderInfo.type === 'cross_border' ? '跨境/境外订单' : '国内现货订单'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#5e5e5e]">配送方式</span>
              <span className="font-bold flex items-center gap-1">
                {deliveryMethod === 'express' ? <Truck size={14} className="text-[#0052CC]" /> : <Store size={14} className="text-[#1a1c1c]" />}
                {deliveryMethod === 'express' ? '极速快递' : storeDeliveryLabel}
              </span>
            </div>
            <div className="h-px bg-[#d1d1d1]/30 w-full"></div>
            
            <div className="space-y-3">
              {orderInfo.items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#f1f1f1] flex-shrink-0 border border-[#d1d1d1]/10">
                    <img alt={item.name} className="w-full h-full object-cover grayscale" src={item.img} referrerPolicy="no-referrer" crossOrigin="anonymous" />
                  </div>
                  <div className="flex-grow py-0.5">
                    <p className="font-bold text-sm text-[#1a1c1c]">{item.name}</p>
                    <p className="text-[10px] text-[#5e5e5e] uppercase tracking-wider mt-0.5">{item.spec}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs bg-[#f1f1f1] px-1.5 py-0.5 rounded text-[#5e5e5e]">x{item.qty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="bg-white rounded-xl border border-[#d1d1d1]/20 overflow-hidden shadow-sm transition-all">
            <div className="p-4 flex items-center justify-between border-b border-[#d1d1d1]/10">
              <div className="flex items-center gap-3">
                <FileEdit size={20} className="text-[#5e5e5e]" />
                <span className="font-bold text-sm text-[#1a1c1c]">一口价调整</span>
              </div>
              <div className="flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    checked={isPriceAdjusted}
                    onChange={(e) => setIsPriceAdjusted(e.target.checked)}
                    className="sr-only peer" 
                    type="checkbox" 
                  />
                  <div className="w-10 h-5 bg-[#e8e8e8] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>
            
            <div className="p-4 bg-[#f7f7f7] space-y-4">
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
                
              <div className="bg-white border border-[#d1d1d1]/30 rounded-lg p-3 mt-3 space-y-2 relative overflow-hidden">
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
                  deliveryMethod === 'express' ? (
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#5e5e5e]">运费</span>
                      <span className="font-bold">¥ {(EXPRESS_SHIPPING_FEE / 2).toFixed(2)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#5e5e5e]">运费 ({storeDeliveryLabel})</span>
                      <span className="font-bold text-green-600">¥ 0.00</span>
                    </div>
                  )
                ) : (
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
              <span className="text-[10px] text-[#5e5e5e] uppercase font-bold tracking-wider">调整后总价</span>
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
            onClick={handleSave} 
            disabled={isCurrentProfitNegative}
            className={`flex items-center justify-center rounded-xl px-6 py-4 w-full font-bold text-sm transition-all shadow-lg ${isCurrentProfitNegative ? 'bg-[#e5e5ea] text-[#8e8e93] shadow-none cursor-not-allowed' : 'bg-black text-white active:scale-[0.98] shadow-black/10'}`}
          >
            <CheckCircle2 size={20} className="mr-2" />
            保存改价并更新订单
          </button>
        </div>
      </footer>
    </div>
  );
}
