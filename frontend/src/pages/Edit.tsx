import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import axios from 'axios';

interface Change {
  section: string;
  original: string;
  modified: string;
  reason: string;
  type: string;
}

interface ModificationResult {
  modification_id: string;
  original_content: Record<string, string>;
  modified_content: Record<string, string>;
  changes: Change[];
}

export const Edit: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { 
    analysisData?: any; 
    resumeFile?: File; 
    jdText?: string;
    resumeContent?: any;
    jdContent?: any;
  };
  
  const [strength, setStrength] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [modificationResult, setModificationResult] = useState<ModificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const strengthOptions = [
    { value: 'light', label: '轻度优化', description: '润色表达、调整语序、规范格式' },
    { value: 'medium', label: '中度改写', description: '强化相关经验、补充关键词、优化量化描述' },
    { value: 'heavy', label: '深度重构', description: '根据JD重新组织经历、调整简历侧重点' },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:8000/api/ai/modify', {
        analysis_id: state?.analysisData?.analysis_id || 'mock_analysis_001',
        strength: strength,
        resume_content: state?.resumeContent || {
          work_experience: '在公司做数据分析',
          skills: '熟练使用Office办公软件'
        },
        jd_content: state?.jdContent || {
          job_title: '高级数据分析师',
          responsibilities: ['负责数据分析工作'],
          requirements: ['熟练使用Python'],
          keywords: ['数据分析', 'Python']
        }
      });
      
      setModificationResult(response.data);
      setShowResult(true);
    } catch (err) {
      console.error('API调用失败:', err);
      setError('AI修改服务暂时不可用，显示模拟数据');
      
      const mockResult: ModificationResult = {
        modification_id: 'mock_modification_001',
        original_content: {
          work_experience: '在公司做数据分析',
          skills: '熟练使用Office办公软件'
        },
        modified_content: {
          work_experience: '负责数据分析项目，使用Python进行数据处理，通过数据挖掘优化业务流程，提升效率20%',
          skills: '精通Python数据分析（Pandas、NumPy）、SQL数据库查询、Excel高级函数与数据透视表'
        },
        changes: [
          {
            section: '工作经历',
            original: '在公司做数据分析',
            modified: '负责数据分析项目，使用Python进行数据处理，通过数据挖掘优化业务流程，提升效率20%',
            reason: '使用STAR法则重构，添加量化成果和技能关键词',
            type: 'modify'
          },
          {
            section: '技能清单',
            original: '熟练使用Office办公软件',
            modified: '精通Python数据分析（Pandas、NumPy）、SQL数据库查询、Excel高级函数与数据透视表',
            reason: '针对岗位需求，突出技术技能',
            type: 'modify'
          }
        ]
      };
      
      setModificationResult(mockResult);
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: 'pdf' | 'docx') => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/export/${modificationResult?.modification_id || 'mock_modification_001'}?format=${format}`,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('导出失败:', err);
      alert('导出功能暂时不可用，请稍后重试');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">AI智能修改</h1>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/analysis')}
          className="cursor-target"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回分析
        </Button>
      </div>

      {/* Strength Selection */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">选择修改强度</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {strengthOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setStrength(option.value as 'light' | 'medium' | 'heavy')}
              className={`
                p-4 rounded-xl border-2 text-left transition-colors
                ${strength === option.value 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                }
              `}
            >
              <div className="font-medium text-white mb-1">{option.label}</div>
              <div className="text-sm text-slate-400">{option.description}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm">{error}</p>
        </div>
      )}

      {!showResult ? (
        <div className="text-center">
          <Button 
            onClick={handleGenerate} 
            loading={loading} 
            size="lg"
            className="cursor-target"
          >
            生成修改建议
          </Button>
        </div>
      ) : (
        <>
          {/* Changes Preview */}
          <div className="space-y-6 mb-8">
            {modificationResult?.changes.map((change, index) => (
              <Card key={index}>
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded">
                    {change.section}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-xs font-medium text-slate-400 mb-2">原始内容</div>
                    <div className="text-slate-200 text-sm">{change.original}</div>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="text-xs font-medium text-green-400 mb-2">修改后</div>
                    <div className="text-slate-200 text-sm">{change.modified}</div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">💡</span>
                    <span className="text-sm text-blue-300">{change.reason}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Export Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="secondary" 
              onClick={() => setShowResult(false)}
              className="cursor-target"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              重新生成
            </Button>
            <Button 
              onClick={() => handleExport('pdf')}
              className="cursor-target"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              导出PDF
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleExport('docx')}
              className="cursor-target"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              导出Word
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
