import { useState } from 'react';
import { Settings, MessageCircle, Users, HelpCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MyPageProps {
  onNavigateToOrderList: (tab?: string) => void;
  onNavigateToAppealList: () => void;
  onNavigateToSubmitTicket: () => void;
  onNavigateToHome?: () => void;
  onNavigateToCommissionFreeCardList?: () => void;
  onNavigateToTeamRecruitment?: () => void;
  onShowDeveloping: () => void;
}

export default function MyPage({ onNavigateToOrderList, onNavigateToAppealList, onNavigateToSubmitTicket, onNavigateToHome, onNavigateToCommissionFreeCardList, onNavigateToTeamRecruitment, onShowDeveloping }: MyPageProps) {
  // Mock 用户数据
  const userData = {
    name: '张队长',
    phone: '188****1234',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
    badge: '车队长'
  };

  // Mock 订单统计数据
  const orderStats = {
    pendingPayment: 1,
    pendingShipment: 1,
    pendingReceipt: 1,
    completed: 0
  };

  // Mock 收入数据
  const incomeData = {
    totalIncome: 9999.99,
    withdrawable: 9999.99
  };

  // Mock 申诉数据
  const appealStats = {
    pending: 999,
    inProgress: 999,
    total: 999
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F4F4] page-content-with-bottom-bar">
      {/* 顶部导航栏 - 品牌黄 Header */}
      <div className="bg-[#FFC300] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#1A1A1A] rounded-full" />
          <Settings className="w-5 h-5 text-[#1A1A1A]" onClick={onShowDeveloping} />
        </div>
      </div>

      {/* 用户信息卡片（不展示等级进度） */}
      <div className="bg-[#FFC300] mx-4 mt-4 rounded-[12px] p-4 relative overflow-hidden -mt-4">
        <div className="flex items-center gap-4 relative z-10">
          <ImageWithFallback
            src={userData.avatar}
            alt={userData.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[18px] text-[#1A1A1A]" style={{ fontWeight: 600 }}>
                {userData.name}
              </span>
              <span className="px-2 py-0.5 bg-[#FFF8D9] text-[#FF6600] text-[11px] rounded" style={{ fontWeight: 500 }}>
                {userData.badge}
              </span>
            </div>
            <div className="text-[14px] text-[#333333]">
              {userData.phone}
            </div>
          </div>
        </div>
      </div>

      {/* 我的订单卡片 */}
      <div className="bg-white mx-4 mt-4 rounded-[12px] p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[18px] text-[#111111]" style={{ fontWeight: 600 }}>
            我的订单
          </span>
          <button
            onClick={() => onNavigateToOrderList('全部')}
            className="text-[14px] text-[#333333] flex items-center gap-1 active:opacity-80"
          >
            全部订单
            <span className="text-[#999999]">&gt;</span>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateToOrderList('待付款')}
            className="flex flex-col items-center gap-2 relative"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-red-500 rounded" />
              </div>
              {orderStats.pendingPayment > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4A26] rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-white" style={{ fontWeight: 700 }}>
                    {orderStats.pendingPayment}
                  </span>
                </div>
              )}
            </div>
            <span className="text-[12px] text-[#333333]">待付款</span>
          </button>

          <button
            onClick={() => onNavigateToOrderList('待发货')}
            className="flex flex-col items-center gap-2 relative"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-[#FAAD14] rounded" />
              </div>
              {orderStats.pendingShipment > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4A26] rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-white" style={{ fontWeight: 700 }}>
                    {orderStats.pendingShipment}
                  </span>
                </div>
              )}
            </div>
            <span className="text-[12px] text-[#333333]">待发货</span>
          </button>

          <button
            onClick={() => onNavigateToOrderList('待收货')}
            className="flex flex-col items-center gap-2 relative"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-[#1677FF] rounded" />
              </div>
              {orderStats.pendingReceipt > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4A26] rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-white" style={{ fontWeight: 700 }}>
                    {orderStats.pendingReceipt}
                  </span>
                </div>
              )}
            </div>
            <span className="text-[12px] text-[#333333]">待收货</span>
          </button>

          <button
            onClick={() => onNavigateToOrderList('已完成')}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-[#52C41A] rounded flex items-center justify-center">
                <span className="text-[10px] text-white">✓</span>
              </div>
            </div>
            <span className="text-[12px] text-[#333333]">已完成</span>
          </button>
        </div>
      </div>

      {/* 我的收入卡片 */}
      <div className="bg-white mx-4 mt-4 rounded-[12px] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FFC300] rounded-full flex items-center justify-center">
              <span className="text-[16px]">💰</span>
            </div>
            <span className="text-[18px] text-[#111111]" style={{ fontWeight: 600 }}>
              我的收入
            </span>
          </div>
          <button
            onClick={onShowDeveloping}
            className="text-[14px] text-[#333333] flex items-center gap-1 active:opacity-80"
          >
            去提现
            <span className="text-[#999999]">&gt;</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-[20px] text-[#111111] mb-1" style={{ fontWeight: 700 }}>
              {incomeData.totalIncome.toFixed(2)}
            </div>
            <div className="text-[12px] text-[#999999]">总收入 (元)</div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div className="flex-1">
            <div className="text-[20px] text-[#111111] mb-1" style={{ fontWeight: 700 }}>
              {incomeData.withdrawable.toFixed(2)}
            </div>
            <div className="text-[12px] text-[#999999]">可提现 (元)</div>
          </div>
        </div>
      </div>

      {/* 我的申诉卡片 */}
      <div className="bg-white mx-4 mt-4 rounded-[12px] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FFC300] rounded-full flex items-center justify-center">
              <span className="text-[16px]">📋</span>
            </div>
            <span className="text-[18px] text-[#111111]" style={{ fontWeight: 600 }}>
              我的申诉
            </span>
          </div>
          <button
            onClick={onNavigateToAppealList}
            className="text-[14px] text-[#333333] flex items-center gap-1 active:opacity-80"
          >
            去查看
            <span className="text-[#999999]">&gt;</span>
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div className="text-[18px] text-[#111111] mb-1" style={{ fontWeight: 700 }}>
              {appealStats.pending}
            </div>
            <div className="text-[12px] text-[#999999]">待处理</div>
          </div>
          <div>
            <div className="text-[18px] text-[#111111] mb-1" style={{ fontWeight: 700 }}>
              {appealStats.inProgress}
            </div>
            <div className="text-[12px] text-[#999999]">处理中</div>
          </div>
          <div>
            <div className="text-[18px] text-[#111111] mb-1" style={{ fontWeight: 700 }}>
              {appealStats.total}
            </div>
            <div className="text-[12px] text-[#999999]">全部</div>
          </div>
        </div>
      </div>

      {/* 功能列表 */}
      <div className="mx-4 mt-4 mb-4">
        <div className="bg-white rounded-[12px] overflow-hidden">
          <button
            onClick={onShowDeveloping}
            className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100 active:bg-gray-50 active:opacity-80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-[#2A83FE]" />
              <span className="text-[14px] text-[#111111]">我的消息</span>
            </div>
            <span className="text-[#999999]">&gt;</span>
          </button>

          <button
            onClick={onShowDeveloping}
            className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100 active:bg-gray-50 active:opacity-80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#FFC300]" />
              <span className="text-[14px] text-[#111111]">分销中心</span>
            </div>
            <span className="text-[#999999]">&gt;</span>
          </button>

          <button
            onClick={onNavigateToSubmitTicket}
            className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100 active:bg-gray-50 active:opacity-80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#00C250]" />
              <span className="text-[14px] text-[#111111]">问题反馈</span>
            </div>
            <span className="text-[#999999]">&gt;</span>
          </button>

          <button
            onClick={onShowDeveloping}
            className="w-full flex items-center justify-between px-4 py-3 active:bg-gray-50 active:opacity-80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-[#FFC300]" />
              <span className="text-[14px] text-[#111111]">设置</span>
            </div>
            <span className="text-[#999999]">&gt;</span>
          </button>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="bottom-navigation-bar">
        <div className="w-full grid grid-cols-4 h-[60px]">
          <button 
            className="flex flex-col items-center justify-center gap-1" 
            onClick={() => {
              if (onNavigateToHome) {
                onNavigateToHome();
              } else {
                onShowDeveloping();
              }
            }}
          >
            <div className="w-6 h-6 bg-gray-300 rounded-lg" />
            <span className="text-[11px] text-gray-500">首页</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center gap-1" 
            onClick={() => {
              if (onNavigateToCommissionFreeCardList) {
                onNavigateToCommissionFreeCardList();
              } else {
                onShowDeveloping();
              }
            }}
          >
            <div className="w-6 h-6 bg-gray-300 rounded-lg" />
            <span className="text-[11px] text-gray-500">免佣卡</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center gap-1" 
            onClick={() => {
              if (onNavigateToTeamRecruitment) {
                onNavigateToTeamRecruitment();
              } else {
                onShowDeveloping();
              }
            }}
          >
            <div className="w-6 h-6 bg-gray-300 rounded-lg" />
            <span className="text-[11px] text-gray-500">小队</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-6 bg-[#FFC300] rounded-lg" />
            <span className="text-[11px] text-[#1A1A1A]" style={{ fontWeight: 600 }}>我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
