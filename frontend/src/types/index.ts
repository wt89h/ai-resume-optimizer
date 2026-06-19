// 简历相关类型
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  start_date: string;
  end_date: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface ParsedResume {
  personal_info: PersonalInfo;
  education: Education[];
  work_experience: WorkExperience[];
  projects: Project[];
  skills: string[];
  summary: string;
}

// JD相关类型
export interface ParsedJD {
  job_title: string;
  company: string;
  responsibilities: string[];
  requirements: string[];
  keywords: string[];
  hard_requirements: {
    education: string;
    experience: string;
    skills: string[];
  };
  soft_requirements: string[];
}

// 分析结果类型
export interface DimensionScores {
  skills: number;
  experience: number;
  education: number;
  projects: number;
}

export interface AnalysisResult {
  analysis_id: string;
  overall_score: number;
  dimension_scores: DimensionScores;
  missing_items: string[];
  strengths: string[];
  suggestions: string[];
}

// AI修改类型
export interface Change {
  section: string;
  original: string;
  modified: string;
  reason: string;
  type: string;
}

export interface ModificationResult {
  modification_id: string;
  original_content: Record<string, string>;
  modified_content: Record<string, string>;
  changes: Change[];
}

// API响应类型
export interface ResumeUploadResponse {
  resume_id: string;
  filename: string;
  parsed_content: ParsedResume;
}

export interface JDParseResponse {
  jd_id: string;
  parsed_content: ParsedJD;
}

export interface AnalysisResponse extends AnalysisResult {}

export interface ModificationResponse extends ModificationResult {
  strength: string;
}
