// @ts-nocheck
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RotatingText from '../effects/RotatingText';

export const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <RotatingText
              texts={['简历优化', 'ResumeAI']}
              mainClassName="text-lg font-semibold text-white overflow-hidden"
              splitLevelClassName="overflow-hidden pb-0.5"
              elementLevelClassName=""
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              staggerDuration={0.02}
              staggerFrom="first"
              rotationInterval={3000}
              loop={true}
              auto={true}
              splitBy="characters"
            />
          </Link>
          
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${location.pathname === '/' 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }
              `}
            >
              首页
            </Link>
            <Link
              to="/upload"
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${location.pathname === '/upload' 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }
              `}
            >
              开始使用
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
