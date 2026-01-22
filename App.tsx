import { useState, useEffect } from 'react';
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

type PageType =
  | 'home'
  | 'submit-ticket'
  | 'appeal-list'
  | 'appeal-detail'
  | 'team-recruitment'
  | 'team-application'
  | 'review-pending'
  | 'review-rejected'
  | 'team-leader'
  | 'task-list'
  | 'task-detail'
  | 'team-detail'
  | 'team-data'
  | 'pk-event-list'
  | 'pk-event-detail'
  | 'pk-ranking'
  | 'pk-team-detail'
  | 'level-center'
  | 'level-rules'
  | 'growth-detail'
  | 'benefit-detail'
  | 'team-chat';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedAppealId, setSelectedAppealId] = useState<number | null>(null);
  const [appealListTab, setAppealListTab] = useState<string>('全部');
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  // 记录进入小队数据页面的来源页面
  const [teamDataSource, setTeamDataSource] = useState<'team-leader' | 'team-detail'>('team-detail');
  // PK赛事相关状态
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  // 任务相关状态
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedBenefitId, setSelectedBenefitId] = useState<number | null>(null);
  const [selectedBenefitLevel, setSelectedBenefitLevel] = useState<number>(3);
  const [teamChatInfo, setTeamChatInfo] = useState<{ teamName: string; teamMemberCount: number } | null>(null);

  // 小队长申请状态：'none' | 'pending' | 'rejected' | 'approved'
  const [teamApplicationStatus, setTeamApplicationStatus] = useState<'none' | 'pending' | 'rejected' | 'approved'>('none');
  // 是否已绑定司机账号
  const [isDriverBound, setIsDriverBound] = useState(false);
  // 演示模式：是否已成为小队长
  const [isLeaderMode, setIsLeaderMode] = useState(false);

  const navigateToSubmitTicket = () => {
    setCurrentPage('submit-ticket');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  const navigateToAppealList = (tab?: string) => {
    if (tab) {
      setAppealListTab(tab);
    }
    setCurrentPage('appeal-list');
  };

  const navigateToAppealDetail = (appealId: number) => {
    setSelectedAppealId(appealId);
    setCurrentPage('appeal-detail');
  };

  const navigateBackFromDetail = () => {
    setCurrentPage('appeal-list');
  };

  const navigateToTeamRecruitment = () => {
    // 如果已经是小队长模式，直接进入小队长页面
    if (isLeaderMode) {
      setTeamApplicationStatus('approved');
      setCurrentPage('team-leader');
    } else {
      setCurrentPage('team-recruitment');
    }
  };

  const navigateToTeamApplication = () => {
    setCurrentPage('team-application');
  };

  const navigateToReviewPending = () => {
    setTeamApplicationStatus('pending');
    setCurrentPage('review-pending');
  };

  const navigateToReviewRejected = () => {
    setTeamApplicationStatus('rejected');
    setCurrentPage('review-rejected');
  };

  const navigateToTeamLeaderPage = () => {
    setTeamApplicationStatus('approved');
    setCurrentPage('team-leader');
  };

  const navigateToTaskList = () => {
    setCurrentPage('task-list');
  };

  const navigateToTaskDetail = (taskId: number) => {
    setSelectedTaskId(taskId);
    setCurrentPage('task-detail');
  };

  const navigateBackFromTaskDetail = () => {
    setCurrentPage('task-list');
  };

  const navigateToTeamDetail = (teamId: number) => {
    setSelectedTeamId(teamId);
    setCurrentPage('team-detail');
  };

  const navigateToTeamData = () => {
    setCurrentPage('team-data');
  };

  const navigateToTeamDataFromLeader = () => {
    setTeamDataSource('team-leader');
    setCurrentPage('team-data');
  };

  const navigateToTeamDataFromDetail = () => {
    setTeamDataSource('team-detail');
    setCurrentPage('team-data');
  };

  const navigateBackFromTeamData = () => {
    if (teamDataSource === 'team-leader') {
      setCurrentPage('team-leader');
    } else {
      setCurrentPage('team-detail');
    }
  };

  const navigateBackToTeamDetail = () => {
    setCurrentPage('team-detail');
  };

  const navigateToPKEventList = () => {
    setCurrentPage('pk-event-list');
  };

  const navigateToPKEventDetail = (eventId: number) => {
    setSelectedEventId(eventId);
    setCurrentPage('pk-event-detail');
  };

  const navigateToPKRanking = (eventId: number) => {
    setSelectedEventId(eventId);
    setCurrentPage('pk-ranking');
  };

  const navigateToPKTeamDetail = () => {
    setCurrentPage('pk-team-detail');
  };

  const navigateBackFromPKEventDetail = () => {
    setCurrentPage('pk-event-list');
  };

  const navigateBackFromPKRanking = () => {
    setCurrentPage('pk-event-detail');
  };

  const navigateBackFromPKTeamDetail = () => {
    setCurrentPage('pk-ranking');
  };

  const handleDriverBinding = () => {
    setIsDriverBound(true);
  };

  const handleToggleLeaderMode = (isLeader: boolean) => {
    setIsLeaderMode(isLeader);
    if (isLeader) {
      // 如果打开开关，自动设置为已审核通过状态
      setTeamApplicationStatus('approved');
      setIsDriverBound(true);
    } else {
      // 如果关闭开关，重置为未申请状态
      setTeamApplicationStatus('none');
      setIsDriverBound(false);
    }
  };

  // 监听演示测试按钮的自定义事件
  useEffect(() => {
    const handleTeamStatus = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail === 'approved') {
        navigateToTeamLeaderPage();
      } else if (customEvent.detail === 'rejected') {
        navigateToReviewRejected();
      }
    };

    window.addEventListener('team-status', handleTeamStatus);
    return () => {
      window.removeEventListener('team-status', handleTeamStatus);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDevelopingToast = () => {
    // 简单的提示实现
    const toast = document.createElement('div');
    toast.textContent = '功能开发中...';
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

  const navigateToLevelCenter = () => {
    setCurrentPage('level-center');
  };

  const navigateToLevelRules = () => {
    setCurrentPage('level-rules');
  };

  const navigateBackFromLevelCenter = () => {
    setCurrentPage('team-leader');
  };

  const navigateToGrowthDetail = () => {
    setCurrentPage('growth-detail');
  };

  const navigateBackFromGrowthDetail = () => {
    setCurrentPage('level-center');
  };

  const navigateBackFromLevelRules = () => {
    setCurrentPage('level-center');
  };

  const navigateToBenefitDetail = (benefitId: number, level: number) => {
    setSelectedBenefitId(benefitId);
    setSelectedBenefitLevel(level);
    setCurrentPage('benefit-detail');
  };

  const navigateBackFromBenefitDetail = () => {
    setCurrentPage('level-center');
  };

  const navigateToTeamChat = (teamName: string, teamMemberCount: number) => {
    setTeamChatInfo({ teamName, teamMemberCount });
    setCurrentPage('team-chat');
  };

  const navigateBackFromTeamChat = () => {
    setCurrentPage('team-leader');
  };

  return (
    <div className="phone-simulator-wrapper">
      <div className="phone-simulator">
        <div className="phone-content">
      {currentPage === 'home' && (
        <HomePage 
          onNavigateToSubmitTicket={navigateToSubmitTicket}
          onNavigateToAppealList={navigateToAppealList}
          onNavigateToTeamRecruitment={navigateToTeamRecruitment}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'submit-ticket' && (
        <SubmitTicket 
          onNavigateToHome={navigateToHome}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'appeal-list' && (
        <AppealList
          onNavigateToHome={navigateToHome}
          onNavigateToDetail={navigateToAppealDetail}
          onShowDeveloping={showDevelopingToast}
          tab={appealListTab}
        />
      )}
      {currentPage === 'appeal-detail' && selectedAppealId && (
        <AppealDetail
          appealId={selectedAppealId}
          onNavigateBack={navigateBackFromDetail}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'team-recruitment' && (
        <TeamRecruitment
          onNavigateToHome={navigateToHome}
          onNavigateToApplication={navigateToTeamApplication}
          onNavigateToPending={navigateToReviewPending}
          onNavigateToRejected={navigateToReviewRejected}
          onNavigateToLeader={navigateToTeamLeaderPage}
          onDriverBinding={handleDriverBinding}
          isDriverBound={isDriverBound}
          applicationStatus={teamApplicationStatus}
          onShowDeveloping={showDevelopingToast}
          onToggleLeaderMode={handleToggleLeaderMode}
        />
      )}
      {currentPage === 'team-application' && (
        <TeamApplication
          onNavigateBack={navigateToTeamRecruitment}
          onSubmit={navigateToReviewPending}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'review-pending' && (
        <ReviewPending
          onNavigateToHome={navigateToHome}
        />
      )}
      {currentPage === 'review-rejected' && (
        <ReviewRejected
          onNavigateToApplication={navigateToTeamApplication}
        />
      )}
      {currentPage === 'team-leader' && (
        <TeamLeaderPage
          onNavigateToHome={navigateToHome}
          onNavigateToTaskList={navigateToTaskList}
          onNavigateToTeamDetail={navigateToTeamDetail}
          onNavigateToTeamData={navigateToTeamDataFromLeader}
          onNavigateToPKList={navigateToPKEventList}
          onNavigateToLevelCenter={navigateToLevelCenter}
          onNavigateToTeamChat={navigateToTeamChat}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'task-list' && (
        <TaskList
          onNavigateBack={navigateToTeamLeaderPage}
          onNavigateToTaskDetail={navigateToTaskDetail}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'task-detail' && selectedTaskId && (
        <TaskDetail
          taskId={selectedTaskId}
          onNavigateBack={navigateBackFromTaskDetail}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'team-detail' && selectedTeamId && (
        <TeamDetail
          teamId={selectedTeamId}
          onNavigateBack={navigateToTeamLeaderPage}
          onNavigateToTeamData={navigateToTeamDataFromDetail}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'team-data' && (
        <TeamData
          onNavigateBack={navigateBackFromTeamData}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'pk-event-list' && (
        <PKEventList
          onNavigateBack={navigateToTeamLeaderPage}
          onNavigateToEventDetail={navigateToPKEventDetail}
        />
      )}
      {currentPage === 'pk-event-detail' && selectedEventId && (
        <PKEventDetail
          eventId={selectedEventId}
          onNavigateBack={navigateBackFromPKEventDetail}
          onNavigateToRanking={navigateToPKRanking}
          onShowDeveloping={showDevelopingToast}
        />
      )}
      {currentPage === 'pk-ranking' && selectedEventId && (
        <PKRanking
          eventId={selectedEventId}
          onNavigateBack={navigateBackFromPKRanking}
          onNavigateToTeamDetail={navigateToPKTeamDetail}
        />
      )}
      {currentPage === 'pk-team-detail' && (
        <PKTeamDetail
          onNavigateBack={navigateBackFromPKTeamDetail}
        />
      )}
      {currentPage === 'level-center' && (
        <LevelCenter
          onNavigateBack={navigateBackFromLevelCenter}
          onNavigateToRules={navigateToLevelRules}
          onShowDeveloping={showDevelopingToast}
          onNavigateToGrowthDetail={navigateToGrowthDetail}
          onNavigateToBenefitDetail={navigateToBenefitDetail}
        />
      )}
      {currentPage === 'level-rules' && (
        <LevelRules
          onNavigateBack={navigateBackFromLevelRules}
        />
      )}
      {currentPage === 'growth-detail' && (
        <GrowthDetail
          onNavigateBack={navigateBackFromGrowthDetail}
        />
      )}
      {currentPage === 'benefit-detail' && (
        <BenefitDetail
          onNavigateBack={navigateBackFromBenefitDetail}
          initialBenefitId={selectedBenefitId ?? undefined}
          currentLevel={selectedBenefitLevel}
        />
      )}
      {currentPage === 'team-chat' && teamChatInfo && (
        <TeamChatPage
          onNavigateBack={navigateBackFromTeamChat}
          teamName={teamChatInfo.teamName}
          teamMemberCount={teamChatInfo.teamMemberCount}
        />
      )}
        </div>
      </div>
    </div>
  );
}