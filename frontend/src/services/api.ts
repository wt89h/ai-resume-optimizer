import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 简历相关API
export const resumeAPI = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

// JD相关API
export const jdAPI = {
  parse: async (text: string) => {
    const response = await api.post('/api/jd/parse', { text });
    return response.data;
  },
};

// 分析相关API
export const analysisAPI = {
  analyze: async (resumeId: string, jdId: string) => {
    const response = await api.post('/api/analysis/analyze', {
      resume_id: resumeId,
      jd_id: jdId,
    });
    return response.data;
  },
};

// AI修改相关API
export const aiAPI = {
  modify: async (analysisId: string, strength: string, resumeContent?: any, jdContent?: any) => {
    const response = await api.post('/api/ai/modify', {
      analysis_id: analysisId,
      strength,
      resume_content: resumeContent,
      jd_content: jdContent,
    });
    return response.data;
  },
};

// 导出相关API
export const exportAPI = {
  download: async (modificationId: string, format: 'pdf' | 'docx') => {
    const response = await api.get(`/api/export/${modificationId}`, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
