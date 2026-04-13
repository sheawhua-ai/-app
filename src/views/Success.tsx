import { ArrowLeft, Check, Download, HelpCircle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black min-h-screen font-inter">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md flex items-center h-16 px-6 border-b border-gray-200/30">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-black active:scale-95 duration-150">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-manrope font-bold text-lg tracking-tight">订单完成</h1>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-md mx-auto">
        <div className="bg-white border border-gray-200/50 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-4">
              <Check className="text-white" size={32} strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-black font-manrope">订单创建成功</h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">请将此页面保存或转发给客户进行支付</p>
          </div>

          <div className="flex flex-col items-center mb-10">
            <div className="relative w-[200px] h-[200px] bg-gray-50 rounded-full flex items-center justify-center border border-gray-200">
              <div className="absolute w-[180px] h-[180px] border-[12px] border-dotted border-black rounded-full opacity-90"></div>
              <div className="w-10 h-10 bg-black rounded-full z-10 flex items-center justify-center text-white text-[10px] font-extrabold">
                SHOP
              </div>
              <div className="absolute inset-0 rounded-full border-[1.5px] border-black/10 scale-90"></div>
              <div className="absolute inset-0 rounded-full border-[1.5px] border-black/5 scale-75"></div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-xs font-bold text-black/40 uppercase tracking-widest">长按或扫码支付</p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t-2 border-dashed border-gray-200/50">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200/20">
              <img alt="商品" className="w-16 h-16 object-cover rounded-xl grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApOlrDwKopwjJJPj4_4ZlpBvuW247hDKVkkxTDBzzCPg_LwFEZWcD5xe4g8CSyRv4JUs3qBKDgLh4-k-aBPZRXC9CDtZSFYk6MgghkI1L4ir_86eSTSh0Oa65FBHTGmeupPKzQLWdr2NfCDFCmIT-4Mric10Afk0eQ-XT9LsVi8tS0UO4959eIvYm9cWHasOzZcCqs6ecx0cTo6D0F9V_Gr0eGNzRAf10pE1aN4lyOZqEbJhoYzFKUO7v3k8fsPoZxAMwUOKSyUxY" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">商品明细</p>
                <p className="text-sm font-bold truncate">高级性能运动鞋 系列</p>
                <p className="text-[11px] text-gray-500 mt-1">共 3 件商品</p>
              </div>
            </div>
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200/20 flex justify-between items-end">
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">支付合计</span>
                <span className="text-2xl font-extrabold font-manrope">¥1,299.00</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">订单状态</span>
                <span className="text-xs font-bold text-black">待支付</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200/20 text-center">
            <p className="text-[10px] text-gray-500 font-medium">订单编号: ORD-20231024-8842</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-black font-bold text-black hover:bg-gray-50 transition-all active:scale-95">
            <Download size={20} />
            <span className="text-sm">保存为图片</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-black text-white font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-black/10">
            <Send size={20} />
            <span className="text-sm">分享给客户</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button className="text-xs font-bold text-gray-500 flex items-center justify-center gap-1 mx-auto hover:text-black transition-colors">
            <HelpCircle size={16} />
            查看分享教程
          </button>
        </div>
      </main>
    </div>
  );
}
