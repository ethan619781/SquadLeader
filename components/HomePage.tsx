import { useState } from 'react';
import { ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigateToSubmitTicket: () => void;
  onNavigateToAppealList: (tab?: string) => void;
  onNavigateToTeamRecruitment: () => void;
  onNavigateToCommissionFreeCardList?: () => void;
  onNavigateToMyPage?: () => void;
  onShowDeveloping: () => void;
}

export default function HomePage({ onNavigateToSubmitTicket, onNavigateToAppealList, onNavigateToTeamRecruitment, onNavigateToCommissionFreeCardList, onNavigateToMyPage, onShowDeveloping }: HomePageProps) {
  const [currentCity, setCurrentCity] = useState('杭州');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const banners = [
    { 
      id: 1, 
      title: '接诉即办！',
      subtitle: '用心服务 极致每一站乐乘',
      color: 'linear-gradient(135deg, #FFE5B4 0%, #B8D4E8 100%)'
    },
  ];

  const articles = [
    {
      id: 1,
      title: '学一招！订单取消被罚款？一篇教你秒通道！',
      reads: 2176,
      cover: 'https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzY2NDkwMzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      title: '客服24小时在线，解决您的各类问题',
      reads: 1823,
      cover: 'https://images.unsplash.com/photo-1712159018726-4564d92f3ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBzdXBwb3J0fGVufDF8fHx8MTc2NjUyMjkyMnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 3,
      title: '如何提高接单效率？老司机教你5个技巧',
      reads: 3542,
      cover: 'https://images.unsplash.com/photo-1546228311-a6e2a2221ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkcml2aW5nJTIwY2l0eXxlbnwxfHx8fDE3NjY1NDI5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const handleAppealClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmAppeal = () => {
    setShowConfirmModal(false);
    onNavigateToSubmitTicket();
  };

  const handleCancelAppeal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#f5f5f5] page-content-with-bottom-bar">
      {/* 顶部状态栏 */}
      <div className="bg-white px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1" onClick={onShowDeveloping}>
            <span className="text-[17px]">{currentCity}</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-4">
            <MoreHorizontal className="w-5 h-5" onClick={onShowDeveloping} />
            <div className="w-6 h-6 border-2 border-black rounded-full" onClick={onShowDeveloping} />
          </div>
        </div>
      </div>

      {/* Banner轮播 */}
      <div className="px-4 pt-2 pb-3 bg-white">
        <div 
          className="relative rounded-xl overflow-hidden h-[140px]"
          style={{ background: banners[currentBannerIndex].color }}
          onClick={onShowDeveloping}
        >
          <div className="absolute inset-0 p-4 flex flex-col justify-center">
            <div className="text-[24px] mb-1" style={{ fontWeight: 700 }}>{banners[currentBannerIndex].title}</div>
            <div className="text-[14px] text-orange-600">{banners[currentBannerIndex].subtitle}</div>
          </div>
          <div className="absolute bottom-3 right-3 flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </div>
        </div>
      </div>

      {/* 通知轮播 */}
      <div className="mx-4 mt-2 bg-[#FFF9E6] rounded-lg px-3 py-2.5 flex items-center gap-2" onClick={onShowDeveloping}>
        <div className="text-orange-500 text-[18px]">📢</div>
        <div className="flex-1 text-[13px] text-gray-700">
          喜行约车客服将在48小时内核实处理您的申诉。
        </div>
      </div>

      {/* 申诉中心卡片 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[16px]" style={{ fontWeight: 600 }}>申诉中心</span>
          <button 
            onClick={() => onNavigateToAppealList('全部')}
            className="text-[13px] text-gray-500 flex items-center gap-1"
          >
            查看更多 →
          </button>
        </div>

        <div className="text-[12px] text-gray-900 mb-3 leading-relaxed">
          请先在司机端完成2次申诉，若结果不通过，方可在本小程序发起申诉申请
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center" onClick={() => onNavigateToAppealList('处理中')}>
            <div className="text-[28px] mb-1">2</div>
            <div className="text-[13px] text-gray-600">处理中</div>
          </div>
          <div className="text-center" onClick={() => onNavigateToAppealList('已完结')}>
            <div className="text-[28px] mb-1">1</div>
            <div className="text-[13px] text-gray-600">已完结</div>
          </div>
          <div className="text-center" onClick={() => onNavigateToAppealList('全部')}>
            <div className="text-[28px] mb-1">3</div>
            <div className="text-[13px] text-gray-600">全部</div>
          </div>
        </div>

        <button 
          className="w-full bg-[#FFE500] rounded-full py-3 text-[16px]"
          onClick={handleAppealClick}
          style={{ fontWeight: 500 }}
        >
          我要申诉
        </button>
      </div>

      {/* 免拥卡模块 */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="text-orange-500 text-[20px]">🎫</div>
            <span className="text-[16px]">免拥卡</span>
          </div>
          <div 
            className="flex items-center gap-1 text-[13px] text-gray-600"
            onClick={onShowDeveloping}
          >
            <span>查看更多</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2].map((item) => (
            <div 
              key={item} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
              onClick={onShowDeveloping}
            >
              <div className="w-[70px] h-[70px] bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[12px] text-green-800">免拥卡</div>
                  <div className="text-[10px] text-green-700">0抽佣</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[14px] mb-1">
                  喜行约车杭州1天免佣卡 所有通道0抽佣
                </div>
                <div className="text-orange-600 text-[16px]" style={{ fontWeight: 600 }}>¥89</div>
              </div>
              <button className="bg-[#FFE500] px-4 py-1.5 rounded-full text-[13px]">
                立即抢购
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 文章模块 */}
      <div className="mx-4 mt-3 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[16px]" style={{ fontWeight: 600 }}>推荐阅读</span>
          <div 
            className="flex items-center gap-1 text-[13px] text-gray-600"
            onClick={onShowDeveloping}
          >
            <span>查看更多</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-3">
          {articles.map((article) => (
            <div 
              key={article.id}
              className="bg-white rounded-lg overflow-hidden flex gap-3 p-3"
              onClick={onShowDeveloping}
            >
              <div className="flex-1 flex flex-col justify-between">
                <div className="text-[14px] line-clamp-2 mb-2" style={{ fontWeight: 500 }}>
                  {article.title}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[12px] text-gray-400">阅读 {article.reads}</div>
                </div>
              </div>
              <ImageWithFallback
                src={article.cover}
                alt={article.title}
                className="w-[100px] h-[75px] object-cover rounded-lg flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center py-4">
        <div className="text-center">
          <div className="text-[20px] mb-1" style={{ fontWeight: 700 }}>🚗 喜行约车</div>
          <div className="text-[12px] text-gray-400">让 每 一 程 更 安 心</div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="bottom-navigation-bar">
        <div className="w-full grid grid-cols-4 h-[60px]">
          <button className="flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-6 bg-yellow-400 rounded-lg" />
            <span className="text-[11px] text-yellow-600">首页</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1" onClick={onNavigateToCommissionFreeCardList}>
            <div className="w-6 h-6 bg-gray-300 rounded-lg" />
            <span className="text-[11px] text-gray-500">免佣卡</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1" onClick={onNavigateToTeamRecruitment}>
            <div className="w-6 h-6 bg-gray-300 rounded-lg" />
            <span className="text-[11px] text-gray-500">小队</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1" onClick={onNavigateToMyPage}>
            <div className="w-6 h-6 bg-gray-300 rounded-lg" />
            <span className="text-[11px] text-gray-500">我的</span>
          </button>
        </div>
      </div>

      {/* 二次确认弹窗 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl w-full max-w-[320px] p-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="text-[18px] mb-4" style={{ fontWeight: 600 }}>
                温馨提示
              </div>
              <div className="text-[14px] text-gray-600 leading-relaxed">
                是否完成司机端2次申诉？
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleCancelAppeal}
                className="flex-1 py-3 rounded-full border border-gray-300 text-[15px] text-gray-700"
              >
                否
              </button>
              <button
                onClick={handleConfirmAppeal}
                className="flex-1 py-3 rounded-full bg-[#FFE500] text-[15px]"
                style={{ fontWeight: 500 }}
              >
                是
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}