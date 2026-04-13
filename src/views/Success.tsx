import { ArrowLeft, Check, Download, HelpCircle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

export default function Success() {
  const navigate = useNavigate();
  const domesticRef = useRef<HTMLDivElement>(null);
  const crossBorderRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImages = async () => {
    setIsGenerating(true);
    try {
      if (domesticRef.current) {
        const canvas1 = await html2canvas(domesticRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const url1 = canvas1.toDataURL('image/png');
        const a1 = document.createElement('a');
        a1.href = url1;
        a1.download = `order_domestic.png`;
        a1.click();
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));

      if (crossBorderRef.current) {
        const canvas2 = await html2canvas(crossBorderRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const url2 = canvas2.toDataURL('image/png');
        const a2 = document.createElement('a');
        a2.href = url2;
        a2.download = `order_cross_border.png`;
        a2.click();
      }
    } catch (error) {
      console.error('Failed to generate images', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#fbfbfb] text-[#1a1c1c] min-h-screen font-inter pb-20">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md flex items-center h-16 px-6 border-b border-[#d1d1d1]/30">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="active:scale-95 duration-150 p-2 hover:bg-[#f1f1f1] rounded-full -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-manrope font-bold text-lg tracking-tight">订单已拆分并创建</h1>
        </div>
      </header>

      <main className="pt-24 px-4 max-w-lg mx-auto space-y-6">
        <div className="flex flex-col items-center text-center mb-2">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/20">
            <Check className="text-white" size={32} strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight font-manrope">拆单创建成功</h2>
          <p className="text-[#5e5e5e] mt-2 text-xs font-medium">系统已将订单拆分为2笔，请生成图片并发送给客户分别支付</p>
        </div>

        {/* Domestic Order Receipt */}
        <div className="flex justify-center">
          <div ref={domesticRef} className="bg-white w-full max-w-[340px] p-6 rounded-2xl shadow-sm border border-[#d1d1d1]/30 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
            <div className="text-center space-y-1 pt-2">
              <h2 className="font-manrope font-extrabold text-xl tracking-tight">ORDER RECEIPT</h2>
              <p className="text-[10px] text-[#5e5e5e] uppercase tracking-widest font-bold">国内现货订单 (1/2)</p>
            </div>
            
            <div className="flex justify-center py-2">
              <div className="relative w-[140px] h-[140px] bg-[#f9f9f9] rounded-xl flex items-center justify-center border border-[#d1d1d1]/30">
                <div className="absolute w-[120px] h-[120px] border-[8px] border-dotted border-black rounded-xl opacity-90"></div>
                <div className="w-10 h-10 bg-black rounded-lg z-10 flex items-center justify-center text-white text-[10px] font-extrabold">
                  PAY
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] text-[#5e5e5e] font-bold tracking-widest">长按或扫码支付 (CNY)</p>

            <div className="h-px w-full border-t border-dashed border-[#d1d1d1]"></div>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-[#f1f1f1] flex-shrink-0 border border-[#d1d1d1]/10">
                  <img alt="哑光黑 恒温水壶" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW97eu0462n52znO_Eoo8OB83ZjCfjS2nDzNI9SVeHI6bkTjUea8qKmk5Mi5VtREZttPj44lkck8hWsL1_8jMND3IWImBGvVadbRqwi4O2yU1BiwUp2OTG4ejWDq5r4hVOJCBqEkTLSU2BU9ruu_8dDDrE7feTyjcVr4t1zX8WvOlmJy5xGIK1kMTQv4GiwZpXnHZnRAGAj6KRaZHglJqpN0uEne2an4jKRQ_yPkhpQV5fPmdms8ZAOF9G4E2JtVhX4zThkhkm4Bg" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-xs text-[#1a1c1c] leading-tight">哑光黑 恒温水壶</p>
                  <p className="text-[9px] text-[#5e5e5e] mt-0.5">SKU: WTR-KTL-BLK</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] font-bold">x2</span>
                    <span className="text-xs font-bold">¥ 249.00</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-px w-full border-t border-dashed border-[#d1d1d1]"></div>
            
            <div className="bg-[#f9f9f9] p-3 rounded-lg flex justify-between items-center">
              <span className="text-xs font-bold text-[#5e5e5e]">本单应付 (人民币)</span>
              <span className="font-manrope font-extrabold text-lg">¥ 249.00</span>
            </div>
            
            <div className="text-center">
              <p className="text-[9px] text-[#5e5e5e]">订单编号: ORD-DOM-8842</p>
            </div>
          </div>
        </div>

        {/* Cross-border Order Receipt */}
        <div className="flex justify-center">
          <div ref={crossBorderRef} className="bg-white w-full max-w-[340px] p-6 rounded-2xl shadow-sm border border-[#d1d1d1]/30 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-purple-500"></div>
            <div className="text-center space-y-1 pt-2">
              <h2 className="font-manrope font-extrabold text-xl tracking-tight">ORDER RECEIPT</h2>
              <p className="text-[10px] text-[#5e5e5e] uppercase tracking-widest font-bold">跨境/境外订单 (2/2)</p>
            </div>
            
            <div className="flex justify-center py-2">
              <div className="relative w-[140px] h-[140px] bg-[#f9f9f9] rounded-xl flex items-center justify-center border border-[#d1d1d1]/30">
                <div className="absolute w-[120px] h-[120px] border-[8px] border-dotted border-black rounded-xl opacity-90"></div>
                <div className="w-10 h-10 bg-black rounded-lg z-10 flex items-center justify-center text-white text-[10px] font-extrabold">
                  PAY
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] text-[#5e5e5e] font-bold tracking-widest">长按或扫码支付 (HKD)</p>

            <div className="h-px w-full border-t border-dashed border-[#d1d1d1]"></div>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-[#f1f1f1] flex-shrink-0 border border-[#d1d1d1]/10">
                  <img alt="极光系列 运动鞋" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCVjif6fdkb1L7LKLCFbbntmn1TkgrM4jp4kmmd-ilFVy468P9epft0l91AkDuASk-mK1qjxoVfW1CiMSfpOxACnJ82sRsDuh4jeNgatEDeDnOumUlkXUILIRIqXBNwz3j5arY61g1yhwniw0o2SLL4E54Pqt4g7eV8v50cdaUNnnV3nHf17VZYTlfPwo8Wo0fDgX1uhR5mhJX3uoamks4QHBgNWsPjmqS2YJ_QESWZgEbch9oOrDPG0heCr6rWA0nxHuuBNtxb30" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-xs text-[#1a1c1c] leading-tight">极光系列 运动鞋</p>
                  <p className="text-[9px] text-[#5e5e5e] mt-0.5">SKU: AUR-092-RED</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] font-bold">x1</span>
                    <span className="text-xs font-bold">¥ 599.00</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-px w-full border-t border-dashed border-[#d1d1d1]"></div>
            
            <div className="bg-[#f9f9f9] p-3 rounded-lg flex justify-between items-center">
              <span className="text-xs font-bold text-[#5e5e5e]">本单应付 (港币)</span>
              <span className="font-manrope font-extrabold text-lg">HK$ 599.00</span>
            </div>
            
            <div className="text-center">
              <p className="text-[9px] text-[#5e5e5e]">订单编号: ORD-CRS-8843</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-[#d1d1d1]/30 z-50">
          <div className="max-w-lg mx-auto grid grid-cols-2 gap-3">
            <button 
              onClick={handleGenerateImages}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-black font-bold text-black hover:bg-[#f9f9f9] transition-all active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <span className="animate-pulse text-sm">生成中...</span>
              ) : (
                <>
                  <Download size={18} />
                  <span className="text-sm">生成2张图片</span>
                </>
              )}
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black text-white font-bold hover:bg-black/90 transition-all active:scale-95 shadow-lg shadow-black/10">
              <Send size={18} />
              <span className="text-sm">分享给客户</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
