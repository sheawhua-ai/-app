import { ArrowLeft, Camera, ChevronRight, Package, Search as SearchIcon, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const results = [
    {
      id: 1,
      name: '高端真皮商务公文包',
      spu: 'PC-BR-00192',
      brand: 'Valextra',
      category: '配饰',
      match: '99%',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcfzSEzJI-5801QTgSLglstZsWWB6UNRvEMF8gaWzOCnakkR5SGUSuJjmiqbCc5wFui-qmaBIP4usx7vF3HVl1zCCe736OaDFvf1_JPT_3Pyx3cyJL_yFPhlNSleDF67o_geWYc-KVygS09Z9WF15CMqdeaJHh2nnsiDs-pvaYe7ns4Najhwqpvph41lrW9hZfgWvb-B_ajvhwecs_H360E5yQLuR3ZiOL_0lDgCUeGgbQWHN4BUesxlv3xldi0_otmg8gEsfm488',
    },
    {
      id: 2,
      name: '手工全粒面真皮板鞋',
      spu: 'PC-FW-00843',
      brand: 'Commoner',
      category: '鞋履',
      match: '92%',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClX_i8LgdGvHrhMomNJ1KWbDgcF12_vX2KE6d_Xm6MvQUAto0FM5LOxrUTHN3VD8nljZJxnya159PH5TXXpfpk_k3AvVypMEXMSSKU0EFNwNsf5d2rZ2_11kS65UvKkxKaXQKglFHfEYDAPorvq0C-6vFrM2mdSUpWI8kmPb3GhHZWViVMqjI37rWpAdDDxXzDaA3PqoDapy5y4RdsVde5clRFmZ5e58DccgUqgIe3JrQ_jbXaicPGF-k0dun8QcmSh9QVlQkxk0M',
    },
    {
      id: 3,
      name: '意大利真皮替换表带',
      spu: 'PC-AC-01102',
      brand: 'Heritage',
      category: '钟表配饰',
      match: '87%',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASJnsBfdouxBcF32cekbFlzAEWVFLgshhef4U484F1XNLXMhjuPiQirjsE7seX5KCwaYnPVU_5Ccry4-tgZ02N0hgiTS2S_nkJB0WvCjGtFYrlXaai6i6jlp6vsHHcVQXcZoYIb2Ajd8riSTFwPSW15HrNQLI_XNx77MY071GPhl3Rq37CpJ5RBm7a4D5bSSflvfGMb7n9OoD1m2Ut-pR8DMb2P-mPeyjIYwGuQZre3RGzbcVMIfRf3R6K8splZW0OYNhsFW_wc2c',
    },
    {
      id: 4,
      name: '真皮护理套装 (专业版)',
      spu: 'PC-MT-09210',
      brand: 'CarePro',
      category: '维护',
      match: '85%',
      image: null,
    },
    {
      id: 5,
      name: '奢华真皮长款钱夹',
      spu: 'PC-BR-00552',
      brand: 'Valextra',
      category: '配饰',
      match: '79%',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfxAdIFbk2X3LzNa-jJyiNuNwI0ddzwK1-fK4qq1T-btM5cFXXuoOxfVuWq-RGYfFo_6CzVYJ74oSnZ7zimpoRs7VYLEZ3Jzp5VLdZQD7_mJs0y-q-zZEnR34s5cUAV7faUeHLPD_L0KWMmwSBilkQnKTHZkxgBNtIYWl8S0hBJ-phSEB_rULKgrG147e4pYVh2DcvGZ7Bt-oeV105OJ22jcTrO3hSHnuWLH5JPRv65T-S_Ebgr05VNXFIFkV-6JpINNstvB80jfQ',
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen overflow-x-hidden font-public-sans">
      <header className="sticky top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4">
            <button className="active:scale-95 duration-200 hover:opacity-70 transition-opacity text-blue-700">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-blue-900 font-black tracking-tighter font-manrope text-xl">货品智能查找</h1>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 md:px-6 pt-4 pb-20">
        <div className="relative w-full max-w-3xl mx-auto mb-10 group">
          <div className="relative flex items-center bg-white rounded-full shadow-lg border border-indigo-200/60 overflow-hidden focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-400 transition-all duration-300 py-1.5 px-2">
            <Sparkles className="ml-4 text-indigo-500" size={24} />
            <input
              autoFocus
              className="w-full py-3 px-3 bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 font-medium text-lg outline-none"
              placeholder="AI 智能搜索产品名称、SKU 或品牌..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center gap-1 pr-1">
              <button className="p-2.5 text-white rounded-full shadow-md active:scale-95 transition-all bg-indigo-600 hover:bg-indigo-700">
                <Camera size={22} />
              </button>
            </div>
          </div>
        </div>

        {searchQuery.trim().length > 0 ? (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">最相关的搜索结果 (10)</h2>
            </div>

            <div className="space-y-3">
              {results.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="group flex items-center p-3 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img
                        alt={item.name}
                        className="w-full h-full object-cover"
                        src={item.image}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Package className="text-slate-300" size={32} />
                    )}
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{item.name}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">SPU: {item.spu}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">品牌: {item.brand}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">类目: {item.category}</span>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center pt-20 text-slate-400">
            <Sparkles size={48} className="text-indigo-200 mb-4" />
            <p className="text-sm font-medium">输入关键词，AI 将为您智能匹配相关货品</p>
          </div>
        )}
      </main>
    </div>
  );
}
