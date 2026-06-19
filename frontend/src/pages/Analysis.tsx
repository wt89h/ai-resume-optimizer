import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { analysisAPI } from '../services/api';

interface AnalysisData {
  overall_score: number;
  dimension_scores: {
    skills: number;
    experience: number;
    education: number;
    projects: number;
  };
  missing_items: string[];
  strengths: string[];
  suggestions: string[];
}

export const Analysis: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { 
    resumeFile?: File; 
    jdText?: string;
    resumeContent?: any;
    jdContent?: any;
  };
  
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const result = await analysisAPI.analyze(
          state?.resumeContent?.resume_id || 'mock_resume_001',
          state?.jdContent?.jd_id || 'mock_jd_001'
        );
        
        setAnalysisData({
          overall_score: result.overall_score,
          dimension_scores: result.dimension_scores,
          missing_items: result.missing_items,
          strengths: result.strengths,
          suggestions: result.suggestions
        });
      } catch (err) {
        console.error('分析失败:', err);
        setError('分析服务暂时不可用，显示模拟数据');
        
        setAnalysisData({
          overall_score: 75,
          dimension_scores: {
            skills: 85,
            experience: 70,
            education: 90,
            projects: 65
          },
          missing_items: [
            '缺少Python编程经验',
            '缺少数据分析项目',
            '缺少机器学习相关技能'
          ],
          strengths: [
            '教育背景优秀',
            '有相关实习经验',
            '沟通能力良好'
          ],
          suggestions: [
            '建议补充Python编程技能',
            '建议学习数据分析相关工具',
            '建议参与实际项目积累经验'
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [state]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '优秀';
    if (score >= 60) return '良好';
    return '需改进';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Card className="text-center py-12">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">正在分析您的简历</h2>
          <p className="text-slate-400">AI正在计算匹配度，请稍候...</p>
        </Card>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Card className="text-center py-12">
          <p className="text-red-400 mb-4">分析数据加载失败</p>
          <Button onClick={() => navigate('/upload')}>
            重新开始
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-white mb-8">匹配度分析结果</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm">{error}</p>
        </div>
      )}

      {/* Overall Score */}
      <Card className="mb-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white mb-4">整体匹配度</h2>
          <div className={`text-6xl font-bold ${getScoreColor(analysisData.overall_score)}`}>
            {analysisData.overall_score}%
          </div>
          <div className="mt-2 text-sm font-medium text-slate-400">
            {getScoreLabel(analysisData.overall_score)}
          </div>
          <div className="mt-4 h-3 bg-slate-700 rounded-full overflow-hidden max-w-md mx-auto">
            <div 
              className={`h-full ${getScoreBg(analysisData.overall_score)} transition-all duration-500`}
              style={{ width: `${analysisData.overall_score}%` }}
            ></div>
          </div>
          <p className="mt-4 text-slate-300">
            {analysisData.overall_score >= 80 && '您的简历与目标岗位匹配度很高！'}
            {analysisData.overall_score >= 60 && analysisData.overall_score < 80 && '您的简历与目标岗位匹配度中等，建议进行优化。'}
            {analysisData.overall_score < 60 && '您的简历与目标岗位匹配度较低，建议大幅优化。'}
          </p>
        </div>
      </Card>

      {/* Dimension Scores */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-6">各维度得分</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: 'skills', label: '技能匹配' },
            { key: 'experience', label: '经验匹配' },
            { key: 'education', label: '学历匹配' },
            { key: 'projects', label: '项目匹配' },
          ].map((item) => {
            const score = analysisData.dimension_scores[item.key as keyof typeof analysisData.dimension_scores];
            return (
              <div key={item.key} className="text-center p-4 bg-slate-700/50 rounded-xl">
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </div>
                <div className="text-sm text-slate-400 mt-1">{item.label}</div>
                <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreBg(score)}`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Missing Items & Strengths */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-lg font-semibold text-white mb-4">缺失项</h2>
          <ul className="space-y-3">
            {analysisData.missing_items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300">
                <span className="text-red-400 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-white mb-4">优势项</h2>
          <ul className="space-y-3">
            {analysisData.strengths.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300">
                <span className="text-green-400 mt-1">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Suggestions */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">改进建议</h2>
        <ul className="space-y-3">
          {analysisData.suggestions.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-slate-300">
              <span className="text-blue-400 mt-1">→</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          variant="secondary" 
          onClick={() => navigate('/upload')}
          className="cursor-target"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          重新分析
        </Button>
        <Button 
          onClick={() => navigate('/edit', { state: { 
            analysisData, 
            resumeContent: state?.resumeContent,
            jdContent: state?.jdContent
          } })}
          className="cursor-target"
        >
          AI智能修改
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
