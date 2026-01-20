import { X, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface DriverBindingModalProps {
  onClose: () => void;
  onConfirm: (name: string, phone: string) => void;
}

export default function DriverBindingModal({ onClose, onConfirm }: DriverBindingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if (!name || !phone) {
      const toast = document.createElement('div');
      toast.textContent = '请填写完整信息';
      toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 2000);
      return;
    }

    if (phone.length !== 11) {
      const toast = document.createElement('div');
      toast.textContent = '请输入正确的11位手机号';
      toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 2000);
      return;
    }

    onConfirm(name, phone);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-xl w-full max-w-[360px] overflow-hidden animate-fade-in">
        {/* 头部 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-[17px]" style={{ fontWeight: 600 }}>绑定喜行司机档案</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 主体内容 */}
        <div className="p-5">
          {/* 说明文字 */}
          <div className="text-[13px] text-gray-500 mb-6">
            为了同步您的运营数据，请先验证您的司机身份。
          </div>

          {/* 输入框1 - 真实姓名 */}
          <div className="mb-5">
            <label className="block text-[14px] text-gray-700 mb-2" style={{ fontWeight: 500 }}>
              真实姓名
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入喜行司机端注册姓名"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* 输入框2 - 司机手机号 */}
          <div className="mb-6">
            <label className="block text-[14px] text-gray-700 mb-2" style={{ fontWeight: 500 }}>
              司机手机号
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                placeholder="请输入11位手机号"
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-blue-400"
              />
              <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* 底部按钮 */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-500 text-white rounded-lg text-[16px] hover:bg-blue-600 transition-colors"
            style={{ fontWeight: 500 }}
          >
            立即绑定
          </button>
        </div>
      </div>
    </div>
  );
}