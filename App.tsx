import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import SubmitTicket from './components/SubmitTicket';
import AppealList from './components/AppealList';
import AppealDetail from './components/AppealDetail';
import TeamRecruitment from './components/TeamRecruitment';
import TeamApplication from './components/TeamApplication';
import ReviewPending from './components/ReviewPending';
import ReviewRejected from './components/ReviewRejected';
import TeamLeaderPage from './components/TeamLeaderPage';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TeamDetail from './components/TeamDetail';
import TeamData from './components/TeamData';
import PKEventList from './components/PKEventList';
import PKEventDetail from './components/PKEventDetail';
import PKRanking from './components/PKRanking';
import PKTeamDetail from './components/PKTeamDetail';
import LevelCenter from './components/LevelCenter';
import LevelRules from './components/LevelRules';
import GrowthDetail from './components/GrowthDetail';
import BenefitDetail from './components/BenefitDetail';
import TeamChatPage from './components/TeamChatPage';
import CommissionFreeCardList from './components/CommissionFreeCardList';
import CommissionFreeCardDetail from './components/CommissionFreeCardDetail';
import OrderConfirm from './components/OrderConfirm';
import PaymentSuccess from './components/PaymentSuccess';
import OrderDetail from './components/OrderDetail';
import MyPage from './components/MyPage';
import MyOrderList from './components/MyOrderList';
import DriverBindingPage from './components/DriverBindingPage';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Tab / 列表状态（与 URL searchParams 可后续同步）
  const [appealListTab, setAppealListTab] = useState<string>('全部');
  const [orderListTab, setOrderListTab] = useState<string>('全部');
  // 记录进入小队数据页面的来源页面
  const [teamDataSource, setTeamDataSource] = useState<'team-leader' | 'team-detail'>('team-detail');
  const [orderData, setOrderData] = useState<any>(null);

  // 小队长申请状态：'none' | 'pending' | 'rejected' | 'approved'
  const [teamApplicationStatus, setTeamApplicationStatus] = useState<'none' | 'pending' | 'rejected' | 'approved'>('none');
  const [isDriverBound, setIsDriverBound] = useState(false);
  const [isLeaderMode, setIsLeaderMode] = useState(false);
  // 是否具备“小队”入口（司机或小队长）
  const canShowTeamTab = isDriverBound || isLeaderMode;

  const navigateToSubmitTicket = () => navigate('/submit-ticket');
  const navigateToHome = () => navigate('/');
  const navigateToAppealList = (tab?: string) => {
    if (tab) setAppealListTab(tab);
    navigate('/appeal-list');
  };
  const navigateToAppealDetail = (appealId: number) => navigate(`/appeal-detail/${appealId}`);
  const navigateBackFromDetail = () => navigate('/appeal-list');
  const navigateToTeamRecruitment = () => {
    if (isLeaderMode) {
      setTeamApplicationStatus('approved');
      navigate('/team-leader');
    } else {
      navigate('/team-recruitment');
    }
  };
  const navigateToTeamApplication = () => navigate('/team-application');
  const navigateToReviewPending = () => {
    setTeamApplicationStatus('pending');
    navigate('/review-pending');
  };
  const navigateToReviewRejected = () => {
    setTeamApplicationStatus('rejected');
    navigate('/review-rejected');
  };
  const navigateToTeamLeaderPage = () => {
    setTeamApplicationStatus('approved');
    navigate('/team-leader');
  };
  const navigateToTaskList = () => navigate('/task-list');
  const navigateToTaskDetail = (taskId: number) => navigate(`/task-detail/${taskId}`);
  const navigateBackFromTaskDetail = () => navigate('/task-list');
  const navigateToTeamDetail = (teamId: number) => navigate(`/team-detail/${teamId}`);
  const navigateToTeamData = () => navigate('/team-data');
  const navigateToTeamDataFromLeader = () => {
    setTeamDataSource('team-leader');
    navigate('/team-data');
  };
  const navigateToTeamDataFromDetail = () => {
    setTeamDataSource('team-detail');
    navigate('/team-data');
  };
  const navigateBackFromTeamData = () => {
    if (teamDataSource === 'team-leader') navigate('/team-leader');
    else navigate('/team-detail');
  };
  const navigateBackToTeamDetail = () => navigate('/team-detail');
  const navigateToPKEventList = () => navigate('/pk-event-list');
  const navigateToPKEventDetail = (eventId: number) => navigate(`/pk-event-detail/${eventId}`);
  const navigateToPKRanking = (eventId: number) => navigate(`/pk-ranking/${eventId}`);
  const navigateToPKTeamDetail = () => navigate('/pk-team-detail');
  const navigateBackFromPKEventDetail = () => navigate('/pk-event-list');
  const navigateBackFromPKRanking = (eventId: number) => navigate(`/pk-event-detail/${eventId}`);
  const navigateBackFromPKTeamDetail = () => navigate('/pk-ranking');
  const handleDriverBinding = () => setIsDriverBound(true);
  const navigateToDriverBinding = () => navigate('/driver-binding');
  const handleToggleLeaderMode = (isLeader: boolean) => {
    setIsLeaderMode(isLeader);
    if (isLeader) {
      setTeamApplicationStatus('approved');
      setIsDriverBound(true);
    } else {
      setTeamApplicationStatus('none');
      setIsDriverBound(false);
    }
  };

  // 每次重启/刷新应用时重置「每日绑定尝试次数」，便于开发模拟
  useEffect(() => {
    const prefix = 'driver_binding_attempt_';
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) keysToRemove.push(key);
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }, []);

  useEffect(() => {
    const handleTeamStatus = (event: Event) => {
      const e = event as CustomEvent;
      if (e.detail === 'approved') navigateToTeamLeaderPage();
      else if (e.detail === 'rejected') navigateToReviewRejected();
    };
    window.addEventListener('team-status', handleTeamStatus);
    return () => window.removeEventListener('team-status', handleTeamStatus);
  }, []);

  const showDevelopingToast = () => {
    const toast = document.createElement('div');
    toast.textContent = '功能开发中...';
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);color:white;padding:12px 24px;border-radius:8px;z-index:9999;font-size:14px;';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 2000);
  };

  const navigateToLevelCenter = () => navigate('/level-center');
  const navigateToLevelRules = () => navigate('/level-rules');
  const navigateBackFromLevelCenter = () => navigate('/team-leader');
  const navigateToGrowthDetail = () => navigate('/growth-detail');
  const navigateBackFromGrowthDetail = () => navigate('/level-center');
  const navigateBackFromLevelRules = () => navigate('/level-center');
  const navigateToBenefitDetail = (benefitId: number, level: number) => navigate(`/benefit-detail/${benefitId}?level=${level}`);
  const navigateBackFromBenefitDetail = () => navigate('/level-center');
  const navigateToTeamChat = (teamName: string, teamMemberCount: number) => {
    navigate('/team-chat', { state: { teamName, teamMemberCount } });
  };
  const navigateBackFromTeamChat = () => navigate('/team-leader');
  const navigateToCommissionFreeCardList = () => navigate('/commission-free-card-list');
  const navigateBackFromCardList = () => navigate('/');
  const navigateToCardDetail = (cardId: number) => navigate(`/commission-free-card-detail/${cardId}`);
  const navigateBackFromCardDetail = () => navigate('/commission-free-card-list');
  const navigateToOrderConfirm = (cardId: number) => navigate(`/order-confirm/${cardId}`);
  const navigateBackFromOrderConfirm = (cardId: number) => navigate(`/commission-free-card-detail/${cardId}`);
  const navigateToPayment = (orderData: any) => {
    setOrderData(orderData);
    const newOrderId = Date.now().toString();
    navigate(`/payment-success/${newOrderId}`);
  };
  const navigateToOrderDetail = (orderId: string) => navigate(`/order-detail/${orderId}`);
  const navigateBackFromOrderDetail = () => navigate('/my-order-list');
  const navigateToMyPage = () => navigate('/my-page');
  const navigateToMyOrderList = (tab?: string) => {
    if (tab) setOrderListTab(tab);
    navigate('/my-order-list');
  };
  const navigateBackFromMyOrderList = () => navigate('/my-page');
  const navigateToOrderDetailFromList = (orderId: string) => navigate(`/order-detail/${orderId}`);
  const navigateBackFromPaymentSuccess = () => navigate('/commission-free-card-list');

  const AppealDetailRoute = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) return <Navigate to="/appeal-list" replace />;
    return <AppealDetail appealId={+id} onNavigateBack={navigateBackFromDetail} onShowDeveloping={showDevelopingToast} />;
  };
  const TaskDetailRoute = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) return <Navigate to="/task-list" replace />;
    return <TaskDetail taskId={+id} onNavigateBack={navigateBackFromTaskDetail} onShowDeveloping={showDevelopingToast} />;
  };
  const TeamDetailRoute = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) return <Navigate to="/team-leader" replace />;
    return <TeamDetail teamId={+id} onNavigateBack={navigateToTeamLeaderPage} onNavigateToTeamData={navigateToTeamDataFromDetail} onShowDeveloping={showDevelopingToast} />;
  };
  const PKEventDetailRoute = () => {
    const { eventId } = useParams<{ eventId: string }>();
    if (!eventId) return <Navigate to="/pk-event-list" replace />;
    return <PKEventDetail eventId={+eventId} onNavigateBack={navigateBackFromPKEventDetail} onNavigateToRanking={navigateToPKRanking} onShowDeveloping={showDevelopingToast} />;
  };
  const PKRankingRoute = () => {
    const { eventId } = useParams<{ eventId: string }>();
    if (!eventId) return <Navigate to="/pk-event-list" replace />;
    return <PKRanking eventId={+eventId} onNavigateBack={() => navigate(`/pk-event-detail/${eventId}`)} onNavigateToTeamDetail={navigateToPKTeamDetail} />;
  };
  const PKTeamDetailRoute = () => {
    const { eventId } = useParams<{ eventId: string }>();
    return <PKTeamDetail onNavigateBack={() => (eventId ? navigate(`/pk-ranking/${eventId}`) : navigate('/pk-event-list'))} />;
  };
  const BenefitDetailRoute = () => {
    const { benefitId } = useParams<{ benefitId: string }>();
    const level = new URLSearchParams(location.search).get('level');
    if (!benefitId) return <Navigate to="/level-center" replace />;
    return <BenefitDetail onNavigateBack={navigateBackFromBenefitDetail} initialBenefitId={+benefitId} currentLevel={level ? +level : 3} />;
  };
  const TeamChatRoute = () => {
    const state = location.state as { teamName?: string; teamMemberCount?: number } | null;
    if (!state?.teamName) return <Navigate to="/team-leader" replace />;
    return <TeamChatPage onNavigateBack={navigateBackFromTeamChat} teamName={state.teamName} teamMemberCount={state.teamMemberCount ?? 0} />;
  };
  const CommissionFreeCardDetailRoute = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) return <Navigate to="/commission-free-card-list" replace />;
    return <CommissionFreeCardDetail onNavigateBack={navigateBackFromCardDetail} onNavigateToOrderConfirm={navigateToOrderConfirm} cardId={+id} />;
  };
  const OrderConfirmRoute = () => {
    const { cardId } = useParams<{ cardId: string }>();
    if (!cardId) return <Navigate to="/commission-free-card-list" replace />;
    return <OrderConfirm onNavigateBack={() => navigate(`/commission-free-card-detail/${cardId}`)} onNavigateToPayment={navigateToPayment} cardId={+cardId} />;
  };
  const PaymentSuccessRoute = () => {
    const { orderId } = useParams<{ orderId: string }>();
    if (!orderId) return <Navigate to="/commission-free-card-list" replace />;
    return <PaymentSuccess onNavigateToCardList={navigateBackFromPaymentSuccess} onNavigateToOrderDetail={navigateToOrderDetail} orderId={orderId} />;
  };
  const OrderDetailRoute = () => {
    const { orderId } = useParams<{ orderId: string }>();
    if (!orderId) return <Navigate to="/my-order-list" replace />;
    return <OrderDetail onNavigateBack={navigateBackFromOrderDetail} onNavigateToPayment={(id) => navigate(`/payment-success/${id}`)} onShowCancelModal={showDevelopingToast} onShowConfirmReceipt={showDevelopingToast} orderId={orderId} />;
  };

  return (
    <div className="phone-simulator-wrapper">
      <div className="phone-simulator">
        <div className="phone-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onNavigateToSubmitTicket={navigateToSubmitTicket}
                  onNavigateToAppealList={navigateToAppealList}
                  onNavigateToTeamRecruitment={navigateToTeamRecruitment}
                  onNavigateToCommissionFreeCardList={navigateToCommissionFreeCardList}
                  onNavigateToMyPage={navigateToMyPage}
                  onShowDeveloping={showDevelopingToast}
                  canShowTeamTab={canShowTeamTab}
                />
              }
            />
            <Route path="/submit-ticket" element={<SubmitTicket onNavigateToHome={navigateToHome} onShowDeveloping={showDevelopingToast} />} />
            <Route path="/appeal-list" element={<AppealList onNavigateToHome={navigateToHome} onNavigateToDetail={navigateToAppealDetail} onShowDeveloping={showDevelopingToast} tab={appealListTab} />} />
            <Route path="/appeal-detail/:id" element={<AppealDetailRoute />} />
            <Route path="/team-recruitment" element={<TeamRecruitment onNavigateToHome={navigateToHome} onNavigateToApplication={navigateToTeamApplication} onNavigateToPending={navigateToReviewPending} onNavigateToRejected={navigateToReviewRejected} onNavigateToLeader={navigateToTeamLeaderPage} onDriverBinding={handleDriverBinding} isDriverBound={isDriverBound} applicationStatus={teamApplicationStatus} onShowDeveloping={showDevelopingToast} onToggleLeaderMode={handleToggleLeaderMode} />} />
            <Route path="/team-application" element={<TeamApplication onNavigateBack={navigateToTeamRecruitment} onSubmit={navigateToReviewPending} onShowDeveloping={showDevelopingToast} />} />
            <Route path="/review-pending" element={<ReviewPending onNavigateToHome={navigateToHome} />} />
            <Route path="/review-rejected" element={<ReviewRejected onNavigateToApplication={navigateToTeamApplication} />} />
            <Route path="/team-leader" element={<TeamLeaderPage onNavigateToHome={navigateToHome} onNavigateToTaskList={navigateToTaskList} onNavigateToTeamDetail={navigateToTeamDetail} onNavigateToTeamData={navigateToTeamDataFromLeader} onNavigateToPKList={navigateToPKEventList} onNavigateToLevelCenter={navigateToLevelCenter} onNavigateToTeamChat={navigateToTeamChat} onShowDeveloping={showDevelopingToast} />} />
            <Route path="/task-list" element={<TaskList onNavigateBack={navigateToTeamLeaderPage} onNavigateToTaskDetail={navigateToTaskDetail} onShowDeveloping={showDevelopingToast} />} />
            <Route path="/task-detail/:id" element={<TaskDetailRoute />} />
            <Route path="/team-detail/:id" element={<TeamDetailRoute />} />
            <Route path="/team-data" element={<TeamData onNavigateBack={navigateBackFromTeamData} onShowDeveloping={showDevelopingToast} />} />
            <Route path="/pk-event-list" element={<PKEventList onNavigateBack={navigateToTeamLeaderPage} onNavigateToEventDetail={navigateToPKEventDetail} />} />
            <Route path="/pk-event-detail/:eventId" element={<PKEventDetailRoute />} />
            <Route path="/pk-ranking/:eventId" element={<PKRankingRoute />} />
            <Route path="/pk-team-detail/:eventId" element={<PKTeamDetailRoute />} />
            <Route path="/level-center" element={<LevelCenter onNavigateBack={navigateBackFromLevelCenter} onNavigateToRules={navigateToLevelRules} onShowDeveloping={showDevelopingToast} onNavigateToGrowthDetail={navigateToGrowthDetail} onNavigateToBenefitDetail={navigateToBenefitDetail} />} />
            <Route path="/level-rules" element={<LevelRules onNavigateBack={navigateBackFromLevelRules} />} />
            <Route path="/growth-detail" element={<GrowthDetail onNavigateBack={navigateBackFromGrowthDetail} />} />
            <Route path="/benefit-detail/:benefitId" element={<BenefitDetailRoute />} />
            <Route path="/team-chat" element={<TeamChatRoute />} />
            <Route
              path="/commission-free-card-list"
              element={
                <CommissionFreeCardList
                  onNavigateBack={navigateBackFromCardList}
                  onNavigateToDetail={navigateToCardDetail}
                  onNavigateToHome={navigateToHome}
                  onNavigateToTeamRecruitment={navigateToTeamRecruitment}
                  onNavigateToMyPage={navigateToMyPage}
                  onShowDeveloping={showDevelopingToast}
                  canShowTeamTab={canShowTeamTab}
                />
              }
            />
            <Route path="/commission-free-card-detail/:id" element={<CommissionFreeCardDetailRoute />} />
            <Route path="/order-confirm/:cardId" element={<OrderConfirmRoute />} />
            <Route path="/payment-success/:orderId" element={<PaymentSuccessRoute />} />
            <Route path="/order-detail/:orderId" element={<OrderDetailRoute />} />
            <Route
              path="/my-page"
              element={
                <MyPage
                  onNavigateToOrderList={navigateToMyOrderList}
                  onNavigateToAppealList={navigateToAppealList}
                  onNavigateToSubmitTicket={navigateToSubmitTicket}
                  onNavigateToHome={navigateToHome}
                  onNavigateToCommissionFreeCardList={navigateToCommissionFreeCardList}
                  onNavigateToTeamRecruitment={navigateToTeamRecruitment}
                  onNavigateToDriverBinding={navigateToDriverBinding}
                  onShowDeveloping={showDevelopingToast}
                  isDriverBound={isDriverBound}
                  isLeaderMode={isLeaderMode}
                  onDriverBindingSuccess={handleDriverBinding}
                  loginPhone="13812340000"
                  matchedDriverNameHint={!isDriverBound ? '张*' : null}
                />
              }
            />
            <Route path="/driver-binding" element={<DriverBindingPage onNavigateBack={() => navigate('/my-page')} onBindingSuccess={handleDriverBinding} />} />
            <Route path="/my-order-list" element={<MyOrderList onNavigateBack={navigateBackFromMyOrderList} onNavigateToOrderDetail={navigateToOrderDetailFromList} initialTab={orderListTab} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}