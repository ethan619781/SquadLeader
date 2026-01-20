import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown, ArrowUp, ArrowUpDown, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import DiagnosticModal from './DiagnosticModal';

interface TeamDataProps {
  onNavigateBack: () => void;
  onShowDeveloping: () => void;
}

type Period = '日' | '周' | '月';
type SortType = 'orders' | 'revenue' | 'onlineHours';
type SortOrder = 'asc' | 'desc';

interface DriverData {
  id: number;
  rank: number;
  name: string;
  joinDate: string;
  avatar: string;
  orders: number;
  revenue: number;
  onlineHours: number;
  isLeader?: boolean;
}

export default function TeamData({ onNavigateBack, onShowDeveloping }: TeamDataProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('日');
  const [currentDate, setCurrentDate] = useState('2026-01-17');
  const [sortBy, setSortBy] = useState<SortType>('orders');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  // 数据汇总（包含同比环比）
  const summaryData = {
    totalOrders: 1280,
    totalOrdersMoM: -5.2, // 环比（Month over Month）
    totalOrdersYoY: 12.8, // 同比（Year over Year）
    totalRevenue: 35000,
    totalRevenueMoM: -15.0,
    totalRevenueYoY: 8.5,
    totalOnlineHours: 450.5,
    totalOnlineHoursMoM: -3.8,
    totalOnlineHoursYoY: 15.2
  };

  // 司机排行榜数据
  const driversData: DriverData[] = [
    {
      id: 1,
      rank: 1,
      name: '王师傅',
      joinDate: '2026.01.01',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      orders: 58,
      revenue: 999.00,
      onlineHours: 199.2,
      isLeader: true
    },
    {
      id: 2,
      rank: 2,
      name: '李师傅',
      joinDate: '2026.01.02',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      orders: 52,
      revenue: 880.00,
      onlineHours: 185.5
    },
    {
      id: 3,
      rank: 3,
      name: '张师傅',
      joinDate: '2026.01.03',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      orders: 48,
      revenue: 820.00,
      onlineHours: 172.8
    },
    {
      id: 4,
      rank: 4,
      name: '刘师傅',
      joinDate: '2026.01.05',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      orders: 45,
      revenue: 780.00,
      onlineHours: 165.3
    },
    {
      id: 5,
      rank: 5,
      name: '赵师傅',
      joinDate: '2026.01.06',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop',
      orders: 42,
      revenue: 720.00,
      onlineHours: 158.0
    },
    {
      id: 6,
      rank: 6,
      name: '陈师傅',
      joinDate: '2026.01.07',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      orders: 40,
      revenue: 690.00,
      onlineHours: 152.5
    },
    {
      id: 7,
      rank: 7,
      name: '杨师傅',
      joinDate: '2026.01.08',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop',
      orders: 38,
      revenue: 650.00,
      onlineHours: 145.2
    }
  ];

  // 日期导航处理
  const handleDateChange = (direction: 'prev' | 'next') => {
    // 这里可以实现实际的日期切换逻辑
    console.log('Date change:', direction);
  };

  // 获取日期显示文本
  const getDateDisplay = () => {
    if (selectedPeriod === '周') {
      return '2026-01-11 至 2026-01-17';
    } else if (selectedPeriod === '月') {
      return '2026年1月';
    }
    return currentDate;
  };

  // 排序处理
  const handleSort = (type: SortType) => {
    if (sortBy === type) {
      // 如果点击的是当前排序列，切换排序方向
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      // 如果点击的是新的排序列，设置为该列并默认倒序
      setSortBy(type);
      setSortOrder('desc');
    }
  };

  // 对司机数据进行排序
  const sortedDrivers = [...driversData].sort((a, b) => {
    let aValue = 0;
    let bValue = 0;
    
    if (sortBy === 'orders') {
      aValue = a.orders;
      bValue = b.orders;
    } else if (sortBy === 'revenue') {
      aValue = a.revenue;
      bValue = b.revenue;
    } else if (sortBy === 'onlineHours') {
      aValue = a.onlineHours;
      bValue = b.onlineHours;
    }
    
    if (sortOrder === 'desc') {
      return bValue - aValue;
    } else {
      return aValue - bValue;
    }
  });

  // 获取排名样式
  const getRankDisplay = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-sm">
            <span className="text-white text-[14px]" style={{ fontWeight: 700 }}>1</span>
          </div>
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-sm">
            <span className="text-white text-[14px]" style={{ fontWeight: 700 }}>2</span>
          </div>
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
            <span className="text-white text-[14px]" style={{ fontWeight: 700 }}>3</span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <span className="text-gray-400 text-[15px]" style={{ fontWeight: 500 }}>{rank}</span>
      </div>
    );
  };

  // 已移除未使用的函数 handleCopyText 和 handleGenerateReport

  // 获取趋势指示器
  const getTrendIndicator = (value: number, label: string) => {
    const isPositive = value > 0;
    const isNegative = value < 0;
    
    if (isPositive) {
      return (
        <div className="flex items-center justify-center gap-0.5 text-[10px] text-green-300 mt-1">
          <TrendingUp className="w-3 h-3" />
          <span>{label} +{Math.abs(value).toFixed(1)}%</span>
        </div>
      );
    } else if (isNegative) {
      return (
        <div className="flex items-center justify-center gap-0.5 text-[10px] text-red-300 mt-1">
          <TrendingDown className="w-3 h-3" />
          <span>{label} {value.toFixed(1)}%</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center gap-0.5 text-[10px] text-white/60 mt-1">
        <span>{label} 持平</span>
      </div>
    );
  };

  return (
    <div className="w-full w-full min-h-screen bg-[#F5F5F5]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <button onClick={onNavigateBack} className="p-1">
          <ChevronLeft className="w-6 h-6" strokeWidth={2} />
        </button>
        <span className="text-[17px]" style={{ fontWeight: 600 }}>小队数据</span>
        <div className="w-6" />
      </div>

      {/* 1. 顶部筛选区 */}
      <div className="bg-white px-4 pb-4">
        {/* 第一行：分段控制器 */}
        <div className="pt-4 pb-3 flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {(['日', '周', '月'] as Period[]).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-2 rounded-md text-[15px] transition-all min-w-[70px] ${
                  selectedPeriod === period
                    ? 'bg-[#1890FF] text-white shadow-sm'
                    : 'text-gray-600'
                }`}
                style={{ fontWeight: selectedPeriod === period ? 600 : 500 }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* 第二行：日期选择器 */}
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => handleDateChange('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" strokeWidth={2} />
          </button>
          <div className="text-[16px] text-gray-900 min-w-[200px] text-center" style={{ fontWeight: 500 }}>
            {getDateDisplay()}
          </div>
          <button 
            onClick={() => handleDateChange('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* 2. 数据汇总卡片 */}
      <div className="px-4 pt-4 pb-5">
        <div 
          className="rounded-xl shadow-md overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1890FF 0%, #0066CC 100%)'
          }}
        >
          {/* 数据展示区 */}
          <div className="p-5 pb-4">
            <div className="grid grid-cols-3 gap-4">
              {/* 总完单量 */}
              <div className="text-center">
                <div className="text-white text-[12px] opacity-90 mb-2">总完单量</div>
                <div className="text-white text-[28px] leading-none mb-2" style={{ fontWeight: 700, fontFamily: 'DIN, -apple-system, sans-serif' }}>
                  {summaryData.totalOrders.toLocaleString()}
                </div>
                {getTrendIndicator(summaryData.totalOrdersMoM, '环比')}
                {getTrendIndicator(summaryData.totalOrdersYoY, '同比')}
              </div>
              {/* 总流水 */}
              <div className="text-center border-l border-r border-white/20">
                <div className="text-white text-[12px] opacity-90 mb-2">总流水(元)</div>
                <div className="text-white text-[28px] leading-none mb-2" style={{ fontWeight: 700, fontFamily: 'DIN, -apple-system, sans-serif' }}>
                  {summaryData.totalRevenue.toLocaleString()}
                </div>
                {getTrendIndicator(summaryData.totalRevenueMoM, '环比')}
                {getTrendIndicator(summaryData.totalRevenueYoY, '同比')}
              </div>
              {/* 在线时长 */}
              <div className="text-center">
                <div className="text-white text-[12px] opacity-90 mb-2">在线时长(h)</div>
                <div className="text-white text-[28px] leading-none mb-2" style={{ fontWeight: 700, fontFamily: 'DIN, -apple-system, sans-serif' }}>
                  {summaryData.totalOnlineHours}
                </div>
                {getTrendIndicator(summaryData.totalOnlineHoursMoM, '环比')}
                {getTrendIndicator(summaryData.totalOnlineHoursYoY, '同比')}
              </div>
            </div>
          </div>

          {/* 智能诊断按钮 */}
          <button
            onClick={() => setShowDiagnostic(true)}
            className="w-full py-3 bg-white/15 backdrop-blur-sm border-t border-white/20 hover:bg-white/25 transition-all active:scale-[0.99] relative"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="relative">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
                {/* 红点提示 */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              </div>
              <span className="text-white text-[15px]" style={{ fontWeight: 600 }}>
                智能诊断报告
              </span>
              <ChevronRight className="w-4 h-4 text-white/80" />
            </div>
          </button>
        </div>
      </div>

      {/* 3. 排序工具栏 */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-6 px-4">
          {/* 完单量 */}
          <button 
            onClick={() => handleSort('orders')}
            className="flex items-center gap-1"
          >
            <span 
              className={`text-[15px] ${sortBy === 'orders' ? 'text-gray-900' : 'text-gray-400'}`}
              style={{ fontWeight: sortBy === 'orders' ? 700 : 500 }}
            >
              完单量
            </span>
            {sortBy === 'orders' ? (
              sortOrder === 'desc' ? (
                <ArrowDown className="w-4 h-4 text-[#1890FF]" strokeWidth={2.5} />
              ) : (
                <ArrowUp className="w-4 h-4 text-[#1890FF]" strokeWidth={2.5} />
              )
            ) : (
              <ArrowUpDown className="w-4 h-4 text-gray-400" strokeWidth={2} />
            )}
          </button>

          {/* 流水 */}
          <button 
            onClick={() => handleSort('revenue')}
            className="flex items-center gap-1"
          >
            <span 
              className={`text-[15px] ${sortBy === 'revenue' ? 'text-gray-900' : 'text-gray-400'}`}
              style={{ fontWeight: sortBy === 'revenue' ? 700 : 500 }}
            >
              流水
            </span>
            {sortBy === 'revenue' ? (
              sortOrder === 'desc' ? (
                <ArrowDown className="w-4 h-4 text-[#1890FF]" strokeWidth={2.5} />
              ) : (
                <ArrowUp className="w-4 h-4 text-[#1890FF]" strokeWidth={2.5} />
              )
            ) : (
              <ArrowUpDown className="w-4 h-4 text-gray-400" strokeWidth={2} />
            )}
          </button>

          {/* 在线时长 */}
          <button 
            onClick={() => handleSort('onlineHours')}
            className="flex items-center gap-1"
          >
            <span 
              className={`text-[15px] ${sortBy === 'onlineHours' ? 'text-gray-900' : 'text-gray-400'}`}
              style={{ fontWeight: sortBy === 'onlineHours' ? 700 : 500 }}
            >
              在线时长
            </span>
            {sortBy === 'onlineHours' ? (
              sortOrder === 'desc' ? (
                <ArrowDown className="w-4 h-4 text-[#1890FF]" strokeWidth={2.5} />
              ) : (
                <ArrowUp className="w-4 h-4 text-[#1890FF]" strokeWidth={2.5} />
              )
            ) : (
              <ArrowUpDown className="w-4 h-4 text-gray-400" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* 4. 司机排行榜列表 */}
      <div className="bg-white">
        {sortedDrivers.map((driver, index) => (
          <div 
            key={driver.id}
            className={`px-4 py-4 flex items-center gap-4 ${
              index !== sortedDrivers.length - 1 ? 'border-b border-gray-100' : ''
            }`}
            style={{ height: '72px' }}
          >
            {/* 排名区 */}
            <div className="w-8 flex-shrink-0">
              {getRankDisplay(driver.rank)}
            </div>

            {/* 头像区 */}
            <div className="relative flex-shrink-0">
              <ImageWithFallback
                src={driver.avatar}
                alt={driver.name}
                className="w-11 h-11 rounded-full object-cover"
              />
            </div>

            {/* 信息区 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[15px] text-gray-900" style={{ fontWeight: 600 }}>
                  {driver.name}
                </span>
                {driver.isLeader && (
                  <span 
                    className="px-1.5 py-0.5 bg-yellow-50 text-yellow-600 text-[10px] rounded"
                    style={{ fontWeight: 600, border: '1px solid #FDE047' }}
                  >
                    队长
                  </span>
                )}
              </div>
              <div className="text-[12px] text-gray-400">
                加入时间 {driver.joinDate}
              </div>
            </div>

            {/* 数据可视化区 */}
            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
              <div className="text-[14px] text-gray-900" style={{ fontWeight: 700 }}>
                {driver.orders}单
              </div>
              <div className="text-[13px] text-green-600" style={{ fontWeight: 600 }}>
                ¥{driver.revenue.toFixed(2)}
              </div>
              <div className="text-[12px] text-gray-500">
                {driver.onlineHours}小时
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部安全区域 */}
      <div className="h-6" />

      {/* 智能诊断弹窗 */}
      {showDiagnostic && (
        <DiagnosticModal
          onClose={() => setShowDiagnostic(false)}
        />
      )}
    </div>
  );
}