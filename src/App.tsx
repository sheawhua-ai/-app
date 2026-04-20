/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Route, Routes } from 'react-router-dom';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Cart from './views/Cart';
import Checkout from './views/Checkout';
import ProductDetail from './views/ProductDetail';
import Search from './views/Search';
import Success from './views/Success';

function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download-build');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'store_app.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        alert('下载失败，请稍后重试');
      }
    } catch (error) {
      console.error(error);
      alert('网络错误，请稍后重试');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={isDownloading}
      className="fixed bottom-6 right-6 z-[100] bg-black text-white px-4 py-3 rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
    >
      {isDownloading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Download size={18} />
      )}
      <span className="text-xs">{isDownloading ? '打包下载中...' : '打包单HTML下载'}</span>
    </button>
  );
}

export default function App() {
  return (
    <HashRouter>
      <DownloadButton />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </HashRouter>
  );
}
