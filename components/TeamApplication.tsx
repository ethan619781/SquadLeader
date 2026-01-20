import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface TeamApplicationProps {
  onNavigateBack: () => void;
  onSubmit: () => void;
  onShowDeveloping: () => void;
}

export default function TeamApplication({ onNavigateBack, onSubmit, onShowDeveloping }: TeamApplicationProps) {
  const [contactPhone, setContactPhone] = useState('138****0000');
  const [reason, setReason] = useState('');
  const maxLength = 200;

  const handleSubmit = () => {
    if (!reason.trim()) {
      const toast = document.createElement('div');
      toast.textContent = '请填写申请理由';
      toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 2000);
      return;
    }
    onSubmit();
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>小队长申请</span>
        <div className="w-6" />
      </div>

      {/* 主体内容 */}
      <div className="p-4">
        {/* 白色卡片容器 */}
        <div className="bg-white rounded-xl p-5">
          {/* 联系电话 */}
          <div className="mb-5">
            <label className="block text-[14px] text-gray-700 mb-2" style={{ fontWeight: 500 }}>
              联系电话
            </label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* 接单手机号 - 只读 */}
          <div className="mb-5">
            <label className="block text-[14px] text-gray-700 mb-2" style={{ fontWeight: 500 }}>
              接单手机号
            </label>
            <input
              type="text"
              value="139****8888"
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-[15px] text-gray-500"
            />
          </div>

          {/* 申请理由 - 多行文本域 */}
          <div>
            <label className="block text-[14px] text-gray-700 mb-2" style={{ fontWeight: 500 }}>
              申请理由
            </label>
            <div className="relative">
              <textarea
                value={reason}
                onChange={(e) => {
                  if (e.target.value.length <= maxLength) {
                    setReason(e.target.value);
                  }
                }}
                placeholder="请简述您的优势，如：有车队管理经验、人脉广等..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-blue-400 resize-none"
                rows={6}
              />
              <div className="absolute bottom-3 right-3 text-[12px] text-gray-400">
                {reason.length}/{maxLength}
              </div>
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg text-[16px] hover:bg-blue-600 transition-colors shadow-sm"
          style={{ fontWeight: 600 }}
        >
          提交申请
        </button>
      </div>
    </div>
  );
}
