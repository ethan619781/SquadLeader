import { useState, useRef } from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import DriverBindingModal from './DriverBindingModal';

interface TeamRecruitmentProps {
  onNavigateToHome: () => void;
  onNavigateToApplication: () => void;
  onNavigateToPending: () => void;
  onNavigateToRejected: () => void;
  onNavigateToLeader: () => void;
  onDriverBinding: () => void;
  isDriverBound: boolean;
  applicationStatus: 'none' | 'pending' | 'rejected' | 'approved';
  onShowDeveloping: () => void;
  onToggleLeaderMode?: (isLeader: boolean) => void;
}

export default function TeamRecruitment({ 
  onNavigateToHome, 
  onNavigateToApplication, 
  onNavigateToPending,
  onNavigateToRejected,
  onNavigateToLeader,
  onDriverBinding,
  isDriverBound,
  applicationStatus,
  onShowDeveloping,
  onToggleLeaderMode
}: TeamRecruitmentProps) {
  const [showBindingModal, setShowBindingModal] = useState(false);
  const [isLeaderMode, setIsLeaderMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      id: 1,
      title: '年度体检',
      image: 'https://images.unsplash.com/photo-1706777227772-629b1cdb8a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzY4NTY4MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      title: '旅游团建',
      image: 'https://images.unsplash.com/photo-1706208224221-0944db693705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB2YWNhdGlvbnxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 3,
      title: '社保补贴',
      image: 'https://images.unsplash.com/photo-1711185898083-e1f04ff38300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBiZW5lZml0c3xlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 4,
      title: '荣誉勋章',
      image: 'https://images.unsplash.com/photo-1759688983881-0742f416a4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRhbCUyMHRyb3BoeSUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc2ODYzNDY3NXww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const champions = [
    {
      id: 1,
      name: '张师傅',
      avatar: 'https://ui-avatars.com/api/?name=Zhang&background=3b82f6&color=fff&size=200'
    },
    {
      id: 2,
      name: '李队长',
      avatar: 'https://ui-avatars.com/api/?name=Li&background=10b981&color=fff&size=200'
    },
    {
      id: 3,
      name: '王师傅',
      avatar: 'https://ui-avatars.com/api/?name=Wang&background=f59e0b&color=fff&size=200'
    },
    {
      id: 4,
      name: '刘队长',
      avatar: 'https://ui-avatars.com/api/?name=Liu&background=8b5cf6&color=fff&size=200'
    }
  ];

  const handleApply = () => {
    // 如果未绑定，显示绑定弹窗
    if (!isDriverBound) {
      setShowBindingModal(true);
      return;
    }

    // 已绑定，根据申请状态决定跳转
    if (applicationStatus === 'none') {
      // 未申请，进入申请页面
      onNavigateToApplication();
    } else if (applicationStatus === 'pending') {
      // 审核中，进入审核中页面
      onNavigateToPending();
    } else if (applicationStatus === 'rejected') {
      // 已驳回，进入驳回页面
      onNavigateToRejected();
    } else if (applicationStatus === 'approved') {
      // 已通过，进入小队长页面
      onNavigateToLeader();
    }
  };

  const handleBindingConfirm = (name: string, phone: string) => {
    setShowBindingModal(false);
    onDriverBinding();
    const toast = document.createElement('div');
    toast.textContent = '绑定成功！正在处理您的申请...';
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
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5] page-content-with-bottom-action">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6" 
          onClick={onNavigateToHome}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>小队长招募</span>
        <div className="flex items-center gap-3">
          {/* 切换开关 */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-gray-500">演示模式</span>
            <button
              onClick={() => {
                const newMode = !isLeaderMode;
                setIsLeaderMode(newMode);
                if (onToggleLeaderMode) {
                  onToggleLeaderMode(newMode);
                }
              }}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                isLeaderMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  isLeaderMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 1. 顶部头图 Banner */}
      <div className="relative h-[220px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1626895684825-03b8655f26b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGJsdWV8ZW58MXx8fHwxNzY4NjM0Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="团队合作"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/60 to-blue-800/70 flex items-center justify-center">
          <h1 className="text-white text-[24px] px-8 text-center leading-relaxed" style={{ fontWeight: 700 }}>
            让优秀被看见<br />让生活更多元
          </h1>
        </div>
      </div>

      {/* 3. 权益轮播区 */}
      <div className="mt-4">
        <div className="px-4 mb-3">
          <h2 className="text-[17px]" style={{ fontWeight: 600 }}>专属权益</h2>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex-shrink-0 w-[200px] bg-white rounded-xl overflow-hidden shadow-sm"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ImageWithFallback
                src={benefit.image}
                alt={benefit.title}
                className="w-full h-[140px] object-cover"
              />
              <div className="p-3 text-center">
                <span className="text-[14px]" style={{ fontWeight: 500 }}>{benefit.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 荣誉墙 */}
      <div className="mx-4 mt-4 bg-white rounded-xl p-4">
        <h2 className="text-[17px] mb-4" style={{ fontWeight: 600 }}>金牌队长</h2>
        <div className="space-y-3">
          {champions.map((champion) => (
            <div
              key={champion.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <ImageWithFallback
                src={champion.avatar}
                alt={champion.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <span className="text-[15px]" style={{ fontWeight: 500 }}>{champion.name}</span>
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full">
                <span className="text-[12px] text-white" style={{ fontWeight: 600 }}>月度冠军</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 占位符，防止被底部悬浮栏遮挡 */}
      <div className="h-6" />

      {/* 5. 底部悬浮栏 */}
      <div className="bottom-action-bar">
        <div className="w-full px-4 py-4">
          <button
            onClick={handleApply}
            className={`w-full py-3 rounded-lg text-[16px] transition-colors shadow-md ${
              applicationStatus === 'pending' 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : applicationStatus === 'rejected'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            style={{ fontWeight: 600 }}
          >
            {applicationStatus === 'pending' 
              ? '小队长审核中' 
              : applicationStatus === 'rejected'
              ? '小队长审核驳回'
              : '立即申请成为小队长'}
          </button>
        </div>
      </div>

      {/* 司机身份绑定弹窗 */}
      {showBindingModal && (
        <DriverBindingModal
          onClose={() => setShowBindingModal(false)}
          onConfirm={handleBindingConfirm}
        />
      )}
    </div>
  );
}