import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import DotField from '../components/ui/DotField';
import ScrollFloat from '../components/effects/ScrollFloat';

export const Home: React.FC = () => {
  return (
    <div className="py-16 px-4 relative overflow-hidden min-h-screen">
      {/* 背景点阵效果 */}
      <div className="absolute inset-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(59, 130, 246, 0.25)"
          gradientTo="rgba(100, 116, 139, 0.15)"
          glowColor="#0f172a"
        />
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10 pt-12">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-base font-medium mb-8 border border-blue-500/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          基于AI的智能简历优化
        </div>
        
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          containerClassName="mb-6"
          textClassName="text-white"
        >
          让您的简历精准匹配
        </ScrollFloat>
        
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          containerClassName="mb-8"
          textClassName="text-blue-400"
        >
          目标岗位
        </ScrollFloat>
        
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          上传简历，粘贴岗位JD，AI自动分析匹配度并生成优化建议，助您快速提升求职成功率
        </p>
        <Link to="/upload">
          <Button size="lg" className="cursor-target btn-glow text-lg px-8 py-4">
            开始优化简历
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mb-20 relative z-10">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          containerClassName="mb-4"
          textClassName="text-white"
        >
          核心功能
        </ScrollFloat>
        <p className="text-xl text-slate-400 text-center mb-12">
          一站式简历优化解决方案
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card hover className="text-center p-8">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">精准匹配</h3>
            <p className="text-slate-400 text-base">
              自动识别JD中的关键技能，量化简历与岗位的匹配度
            </p>
          </Card>
          
          <Card hover className="text-center p-8">
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">智能改写</h3>
            <p className="text-slate-400 text-base">
              基于岗位语境优化简历表述，突出相关经验与能力
            </p>
          </Card>
          
          <Card hover className="text-center p-8">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">专业提升</h3>
            <p className="text-slate-400 text-base">
              提供行业术语、STAR法则等专业化表达建议
            </p>
          </Card>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="max-w-4xl mx-auto mb-20 relative z-10">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          containerClassName="mb-4"
          textClassName="text-white"
        >
          使用流程
        </ScrollFloat>
        <p className="text-xl text-slate-400 text-center mb-12">
          三步完成简历优化
        </p>
        <div className="space-y-8">
          <div className="flex items-start gap-6 p-8 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">上传简历</h3>
              <p className="text-slate-400 text-base">支持PDF、Word格式，AI自动解析简历内容</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6 p-8 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">输入目标岗位JD</h3>
              <p className="text-slate-400 text-base">粘贴岗位描述，AI自动分析岗位需求与关键词</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6 p-8 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">获取优化建议</h3>
              <p className="text-slate-400 text-base">查看匹配度分析，一键生成优化版简历并导出</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto relative z-10">
        <Card className="bg-blue-600 text-white text-center border-0 p-12">
          <h2 className="text-3xl font-bold mb-4">准备好优化您的简历了吗？</h2>
          <p className="text-blue-100 text-xl mb-8">
            立即开始，让AI帮助您打造完美的求职简历
          </p>
          <Link to="/upload">
            <Button variant="primary" size="lg" className="cursor-target btn-glow bg-white/10 text-white border border-white/30 hover:bg-white/20 text-lg px-8 py-4">
              免费开始
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
