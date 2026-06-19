import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileUpload } from '../components/ui/FileUpload';
import { TextArea } from '../components/ui/TextArea';
import { resumeAPI, jdAPI } from '../services/api';

export const Upload: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeContent, setResumeContent] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    setResumeFile(file);
    setError(null);
  };

  const handleNext = async () => {
    if (step === 1 && resumeFile) {
      setLoading(true);
      try {
        const result = await resumeAPI.upload(resumeFile);
        setResumeContent(result.parsed_content);
        setStep(2);
      } catch (err) {
        console.error('简历上传失败:', err);
        setError('简历上传失败，请重试');
        setResumeContent({
          work_experience: '在公司做数据分析',
          skills: '熟练使用Office办公软件'
        });
        setStep(2);
      } finally {
        setLoading(false);
      }
    } else if (step === 2 && jdText.trim()) {
      setStep(3);
      await analyzeResume();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const analyzeResume = async () => {
    setLoading(true);
    setError(null);
    
    let jdContentData: any;
    
    try {
      const jdResult = await jdAPI.parse(jdText);
      jdContentData = jdResult.parsed_content;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      navigate('/analysis', { 
        state: { 
          resumeFile, 
          jdText,
          resumeContent,
          jdContent: jdContentData
        } 
      });
    } catch (err) {
      console.error('分析失败:', err);
      setError('分析服务暂时不可用，使用模拟数据');
      
      jdContentData = {
        job_title: '高级数据分析师',
        responsibilities: ['负责数据分析工作'],
        requirements: ['熟练使用Python'],
        keywords: ['数据分析', 'Python']
      };
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      navigate('/analysis', { 
        state: { 
          resumeFile, 
          jdText,
          resumeContent,
          jdContent: jdContentData
        } 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {[
            { num: 1, label: '上传简历' },
            { num: 2, label: '输入JD' },
            { num: 3, label: '分析结果' },
          ].map((item, index) => (
            <React.Fragment key={item.num}>
              <div className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  transition-colors
                  ${step >= item.num 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-400'
                  }
                `}>
                  {step > item.num ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    item.num
                  )}
                </div>
                <span className={`
                  ml-2 text-sm font-medium hidden sm:inline
                  ${step >= item.num ? 'text-white' : 'text-slate-400'}
                `}>
                  {item.label}
                </span>
              </div>
              {index < 2 && (
                <div className={`
                  w-12 sm:w-20 h-1 mx-2 sm:mx-4 rounded-full transition-colors
                  ${step > item.num ? 'bg-blue-600' : 'bg-slate-700'}
                `} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm">{error}</p>
        </div>
      )}

      {/* Step 1: Upload Resume */}
      {step === 1 && (
        <Card>
          <h2 className="text-xl font-bold text-white mb-2">上传您的简历</h2>
          <p className="text-slate-400 mb-6">支持 PDF、Word 格式，最大 10MB</p>
          
          <FileUpload 
            onFileSelect={handleFileSelect} 
            selectedFile={resumeFile}
          />
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={!resumeFile || loading}
              loading={loading}
              className="cursor-target"
            >
              下一步
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Input JD */}
      {step === 2 && (
        <Card>
          <h2 className="text-xl font-bold text-white mb-2">粘贴岗位描述</h2>
          <p className="text-slate-400 mb-6">从招聘网站复制完整的岗位JD内容</p>
          
          <TextArea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="请粘贴目标岗位的JD内容，包括岗位职责和任职要求..."
            rows={12}
            helperText={`${jdText.length} 字符`}
          />
          
          <div className="mt-6 flex justify-between">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="cursor-target"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              上一步
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!jdText.trim() || loading}
              loading={loading}
              className="cursor-target"
            >
              开始分析
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Analyzing */}
      {step === 3 && (
        <Card className="text-center py-12">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">正在分析您的简历</h2>
          <p className="text-slate-400">AI正在解析简历和岗位需求，请稍候...</p>
        </Card>
      )}
    </div>
  );
};
