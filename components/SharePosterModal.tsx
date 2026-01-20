import { X, Share2, Download } from 'lucide-react';

interface SharePosterModalProps {
  onClose: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export default function SharePosterModal({ onClose, onShare, onDownload }: SharePosterModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* 半透明遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 底部弹出面板 */}
      <div className="relative w-full w-full bg-white rounded-t-3xl pb-6 animate-slide-up">
        {/* 海报预览区 */}
        <div className="px-6 pt-6 pb-4">
          <div className="text-center mb-4">
            <h3 className="text-[17px] text-gray-900" style={{ fontWeight: 600 }}>
              分享海报
            </h3>
          </div>

          {/* 海报预览 */}
          <div className="flex justify-center mb-6">
            <div className="w-[280px] h-[480px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center">
              <div className="text-center text-white p-6">
                <div className="text-[24px] mb-4" style={{ fontWeight: 700 }}>
                  春节保供战
                </div>
                <div className="text-[16px] mb-6">
                  邀您一起守护城市出行
                </div>
                <div className="w-24 h-24 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="text-[12px]">二维码</div>
                </div>
                <div className="text-[13px] opacity-80">
                  长按识别二维码参与
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮组 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={onShare}
              className="flex flex-col items-center justify-center py-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-[14px] text-gray-700" style={{ fontWeight: 500 }}>
                分享到朋友圈
              </span>
            </button>

            <button
              onClick={onDownload}
              className="flex flex-col items-center justify-center py-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                <Download className="w-6 h-6 text-white" />
              </div>
              <span className="text-[14px] text-gray-700" style={{ fontWeight: 500 }}>
                保存海报
              </span>
            </button>
          </div>
        </div>

        {/* 取消按钮 */}
        <button
          onClick={onClose}
          className="w-full py-4 text-[16px] text-gray-600 hover:bg-gray-50 transition-colors"
          style={{ fontWeight: 500 }}
        >
          取消
        </button>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
