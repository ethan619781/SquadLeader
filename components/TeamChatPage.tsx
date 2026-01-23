import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, MoreVertical, Mic, Smile, Plus, Send, Image as ImageIcon, Video, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TeamChatPageProps {
  onNavigateBack: () => void;
  teamName: string;
  teamMemberCount: number;
}

interface Message {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  senderName: string;
  senderAvatar: string;
  isMe: boolean;
  timestamp: string;
  timeLabel?: string;
}

export default function TeamChatPage({ onNavigateBack, teamName, teamMemberCount }: TeamChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'text',
      content: '兄弟们，今天下午 2 点老地方集合！',
      senderName: '张队长',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      isMe: false,
      timestamp: '10:00',
      timeLabel: '10:00'
    },
    {
      id: '2',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      senderName: '李师傅',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      isMe: false,
      timestamp: '10:02'
    },
    {
      id: '3',
      type: 'text',
      content: '收到，准时到。',
      senderName: '我',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      isMe: true,
      timestamp: '10:05'
    },
    {
      id: '4',
      type: 'video',
      content: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      senderName: '我',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      isMe: true,
      timestamp: '10:06'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [showMorePanel, setShowMorePanel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendText = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: inputText,
      senderName: '我',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      isMe: true,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setShowMorePanel(false);
  };

  const handleSendMedia = (type: 'image' | 'video', label: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content: type === 'image' 
        ? 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200'
        : 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Njg2MzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
      senderName: '我',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2MzQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=200',
      isMe: true,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      content: label
    };

    setMessages([...messages, newMessage]);
    setShowMorePanel(false);
  };

  const shouldShowTimeLabel = (index: number) => {
    if (index === 0) return true;
    const current = messages[index];
    const prev = messages[index - 1];
    // 如果时间差超过5分钟，显示时间标签
    const timeDiff = Math.abs(
      new Date(`2000-01-01 ${current.timestamp}`).getTime() - 
      new Date(`2000-01-01 ${prev.timestamp}`).getTime()
    );
    return timeDiff > 5 * 60 * 1000 || current.isMe !== prev.isMe;
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F4F4] flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-[#FFC300] px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <ChevronLeft 
          className="w-6 h-6 cursor-pointer text-[#1A1A1A]" 
          onClick={onNavigateBack}
        />
        <span className="text-[18px] flex-1 text-center text-[#1A1A1A]" style={{ fontWeight: 600 }}>
          {teamName} ({teamMemberCount})
        </span>
        <MoreVertical className="w-5 h-5 text-[#1A1A1A] cursor-pointer" />
      </div>

      {/* 消息列表区 */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {messages.map((message, index) => (
          <div key={message.id}>
            {/* 时间戳 */}
            {shouldShowTimeLabel(index) && (
              <div className="flex justify-center my-2">
                <span className="bg-gray-200 text-gray-500 text-[11px] px-2 py-0.5 rounded-full">
                  {message.timestamp}
                </span>
              </div>
            )}

            {/* 消息气泡 */}
            <div className={`flex items-start gap-2 mb-3 ${message.isMe ? 'flex-row-reverse' : ''}`}>
              {/* 头像 */}
              <ImageWithFallback
                src={message.senderAvatar}
                alt={message.senderName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />

              {/* 消息内容区 */}
              <div className={`flex flex-col max-w-[70%] ${message.isMe ? 'items-end' : 'items-start'}`}>
                {/* 昵称（仅他人消息显示） */}
                {!message.isMe && (
                  <span className="text-[11px] text-gray-500 mb-1 px-1">
                    {message.senderName}
                  </span>
                )}

                {/* 消息气泡 */}
                <div
                  className={`rounded-lg px-3 py-2 ${
                    message.isMe
                      ? 'bg-[#95EC69] text-gray-900'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  {message.type === 'text' && (
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                  )}

                  {message.type === 'image' && (
                    <div 
                      className="w-48 h-48 rounded-lg overflow-hidden cursor-pointer active:opacity-80"
                      onClick={() => {
                        // 模拟查看大图
                        alert('查看大图（模拟）');
                      }}
                    >
                      <ImageWithFallback
                        src={message.content}
                        alt="图片"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {message.type === 'video' && (
                    <div className="relative w-48 h-32 rounded-lg overflow-hidden bg-gray-800">
                      <ImageWithFallback
                        src={message.content}
                        alt="视频封面"
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 底部输入栏 */}
      <div className="bg-white border-t border-gray-200 px-3 py-2">
        <div className="flex items-center gap-2">
          {/* 语音按钮 */}
          <button
            type="button"
            className="p-2 text-gray-600 active:scale-95 transition-transform"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* 输入框 */}
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendText();
              }
            }}
            placeholder="输入消息..."
            className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-[15px] outline-none focus:bg-white focus:ring-1 focus:ring-[#95EC69]"
          />

          {/* 表情按钮 */}
          <button
            type="button"
            className="p-2 text-gray-600 active:scale-95 transition-transform"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* 更多/发送按钮 */}
          {inputText.trim() ? (
            <button
              type="button"
              onClick={handleSendText}
              className="p-2 bg-[#95EC69] rounded-lg active:scale-95 transition-transform"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowMorePanel(!showMorePanel)}
              className="p-2 text-gray-600 active:scale-95 transition-transform"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 底部功能面板 */}
        {showMorePanel && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSendMedia('image', '相册')}
                className="flex flex-col items-center gap-2 py-3 active:scale-95 transition-transform"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-7 h-7 text-blue-600" />
                </div>
                <span className="text-[12px] text-gray-600">相册</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMedia('text', '位置')}
                className="flex flex-col items-center gap-2 py-3 active:scale-95 transition-transform"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-orange-600" />
                </div>
                <span className="text-[12px] text-gray-600">位置</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
