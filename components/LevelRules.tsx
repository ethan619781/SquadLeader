import { ChevronLeft } from 'lucide-react';

interface LevelRulesProps {
  onNavigateBack: () => void;
}

export default function LevelRules({ onNavigateBack }: LevelRulesProps) {
  // 模拟后端返回的富文本内容
  const richTextContent = `
    <h1>一、 什么是成长值？</h1>
    <p>成长值是衡量喜行小队长贡献度的核心指标，它决定了您的等级和对应的权益。成长值越高，等级越高，享受的权益越丰富。</p>
    <p><strong class="important">注：成长值仅用于等级评定，不可用于消费或兑换商品。</strong></p>
    
    <h1>二、 如何获取成长值？</h1>
    <p>系统根据您管理的小队在自然月内的表现发放成长值。为了保证公平，各项指标均设有月度封顶上限。</p>
    
    <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>成长来源</th>
          <th>获取规则</th>
          <th>月度上限</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>小队业绩</td>
          <td>小队每完成 1 单，+1 成长值</td>
          <td>1000 分</td>
          <td>T-1 日更新</td>
        </tr>
        <tr>
          <td>流水贡献</td>
          <td>小队每产生 100元流水，+1 成长值</td>
          <td>1000 分</td>
          <td>以实付金额为准</td>
        </tr>
        <tr>
          <td>增量拉新</td>
          <td>成功邀请 1 名新司机入队，+100 成长值</td>
          <td>1000 分</td>
          <td>需新人完成首单</td>
        </tr>
        <tr>
          <td>任务</td>
          <td>每完成 1 个系统任务，+10 成长值</td>
          <td>1000 分</td>
          <td>宣发/学习/打卡等</td>
        </tr>
      </tbody>
    </table>
    </div>
    
    <p><strong>数据说明：</strong>每日成长值将于次日（T+1）上午 08:00 前更新。</p>
    
    <h1>三、 等级评定标准</h1>
    <p>系统基于您近 365 天累计获得的有效成长值总和进行等级判定：</p>
    <ul>
      <li><strong>Lv.1 初级喜宝：</strong>0 - 999 成长值（完成注册即可）</li>
      <li><strong>Lv.2 中级喜宝：</strong>1,000 - 4,999 成长值</li>
      <li><strong>Lv.3 高级喜宝：</strong>5,000 - 19,999 成长值</li>
      <li><strong>Lv.4 顶级喜宝：</strong>20,000 及以上成长值</li>
    </ul>
    
    <h1>四、 升降级与有效期机制（重要）</h1>
    
    <h3>1. 实时升级</h3>
    <p>在任意等级有效期内，若您的累计成长值达到了下一等级的门槛，系统将立即为您升级，并即时解锁对应的新权益，无需等待季度结算。</p>
    
    <h3>2. 季度定级（保级/降级）</h3>
    <p>系统将于每季度的首日（1月1日、4月1日、7月1日、10月1日）的 00:00 进行重新定级。</p>
    <p><strong>定级逻辑：</strong>计算您在定级日前 365 天内的成长值总和。</p>
    <p><strong>结果：</strong>若总分低于当前等级门槛，将触发降级；若满足条件，则继续保级。</p>
    
    <h3>3. 举例说明</h3>
    <p><strong>场景 A：</strong>王队长当前为 Lv.2，他在 2月15日 累积到了 5000 分，系统会立即将其升级为 Lv.3。</p>
    <p><strong>场景 B：</strong>李队长当前为 Lv.3（门槛 5000 分），但在 4月1日 季度定级时，他近 365 天的总分为 4800 分，则他会在 4月1日 被降级为 Lv.2。</p>
  `;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <ChevronLeft 
          className="w-6 h-6 cursor-pointer" 
          onClick={onNavigateBack}
        />
        <span className="text-[17px]" style={{ fontWeight: 600 }}>等级规则</span>
        <div className="w-6" />
      </div>

      {/* 内容容器 - 滚动区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          <div 
            className="level-rules-content"
            dangerouslySetInnerHTML={{ __html: richTextContent }}
          />
        </div>
      </div>

      {/* 富文本样式 */}
      <style>{`
        .level-rules-content {
          color: #333;
        }

        /* 标题样式 */
        .level-rules-content h1 {
          color: #333;
          font-size: 20px;
          font-weight: 700;
          margin-top: 24px;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .level-rules-content h1:first-child {
          margin-top: 0;
        }

        .level-rules-content h3 {
          color: #333;
          font-size: 16px;
          font-weight: 700;
          margin-top: 20px;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        /* 正文样式 */
        .level-rules-content p {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          margin-top: 12px;
          margin-bottom: 12px;
        }

        /* 重点文字样式 */
        .level-rules-content strong {
          color: #1890FF;
          font-weight: 600;
        }

        /* 重要提示使用深红色 - 针对单独包含 strong 的段落 */
        .level-rules-content p:has(> strong:only-child) strong {
          color: #A83636;
        }
        
        /* 兼容性方案：如果 :has() 不支持，使用类名 */
        .level-rules-content p strong.important {
          color: #A83636;
        }

        /* 列表样式 */
        .level-rules-content ul {
          margin-top: 12px;
          margin-bottom: 12px;
          padding-left: 24px;
          list-style: none;
        }

        .level-rules-content ul li {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          margin-top: 8px;
          margin-bottom: 8px;
          position: relative;
          padding-left: 16px;
        }

        .level-rules-content ul li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #999;
          font-size: 16px;
          line-height: 1.4;
        }

        .level-rules-content ol {
          margin-top: 12px;
          margin-bottom: 12px;
          padding-left: 24px;
        }

        .level-rules-content ol li {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        /* 表格外层滚动容器 */
        .level-rules-content .table-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin-top: 16px;
          margin-bottom: 16px;
          border-radius: 8px;
        }

        /* 表格样式 */
        .level-rules-content table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
          background-color: #fff;
          min-width: 600px;
        }

        .level-rules-content thead {
          background-color: #F5F7FA;
        }

        .level-rules-content th {
          color: #333;
          font-size: 13px;
          font-weight: 600;
          text-align: left;
          padding: 12px;
          border-bottom: 1px solid #E5E7EB;
        }

        .level-rules-content td {
          color: #666;
          font-size: 13px;
          padding: 12px;
          border-bottom: 1px solid #F0F0F0;
          background-color: #fff;
        }

        .level-rules-content tbody tr:last-child td {
          border-bottom: none;
        }

        /* 移动端表格横向滚动优化 */
        @media (max-width: 768px) {
          .level-rules-content .table-wrapper {
            margin-left: -16px;
            margin-right: -16px;
            padding-left: 16px;
            padding-right: 16px;
            width: calc(100% + 32px);
          }

          .level-rules-content table {
            min-width: 600px;
          }

          .level-rules-content th,
          .level-rules-content td {
            white-space: normal;
            word-wrap: break-word;
            min-width: 100px;
          }

          .level-rules-content th:first-child,
          .level-rules-content td:first-child {
            min-width: 80px;
          }
        }
      `}</style>
    </div>
  );
}
