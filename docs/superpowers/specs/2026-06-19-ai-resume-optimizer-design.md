# AI简历智能修改系统设计文档

## 1. 产品概述

### 1.1 产品定位
基于大语言模型的智能简历优化工具，通过解析岗位JD与用户简历，自动匹配岗位需求并生成针对性修改建议，帮助求职者快速提升简历与目标岗位的契合度。

### 1.2 核心价值
- **精准匹配**：自动识别JD中的关键技能、资质要求，量化简历匹配度
- **智能改写**：基于岗位语境优化简历表述，突出相关经验与能力
- **高效迭代**：一键生成多版本简历，适配不同岗位投递需求
- **专业提升**：提供行业术语、STAR法则等专业化表达建议

### 1.3 目标用户
- 校招/社招求职者（尤其是转行、跨领域投递人群）
- 求职辅导机构与HR
- 高校就业指导中心

## 2. 技术架构

### 2.1 技术栈选择
- **前端**：React + TypeScript + Tailwind CSS
- **后端**：Python FastAPI
- **AI模型**：DeepSeek-V4pro（OpenAI兼容API）
- **部署**：Vercel（前端）+ Render（后端）

### 2.2 系统架构图
```
┌─────────────────────────────────────────────────────┐
│                    前端 (React)                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  首页   │ │ 上传页  │ │ 分析页  │ │ 编辑页  │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/HTTPS
                       ▼
┌─────────────────────────────────────────────────────┐
│                 后端 (FastAPI)                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │简历解析 │ │JD解析   │ │匹配分析 │ │AI修改   │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS
                       ▼
┌─────────────────────────────────────────────────────┐
│              AI服务 (DeepSeek API)                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │文本分析 │ │关键词   │ │匹配计算 │ │内容生成 │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────────────────┘
```

## 3. 功能模块设计

### 3.1 简历上传与解析模块

**功能描述**：
- 支持PDF、Word格式简历上传
- 自动解析简历内容，提取结构化信息
- 检测简历完整性

**技术实现**：
- 文件上传：React + react-dropzone
- PDF解析：PyPDF2
- Word解析：python-docx
- 数据验证：Pydantic

**数据模型**：
```python
class Resume:
    id: str                    # 唯一标识
    original_file: str         # 原始文件路径
    parsed_content: dict       # 解析后的内容
    created_at: datetime       # 创建时间

class ParsedResume:
    personal_info: PersonalInfo    # 个人信息
    education: List[Education]     # 教育背景
    work_experience: List[WorkExperience]  # 工作经历
    projects: List[Project]        # 项目经验
    skills: List[str]              # 技能列表
    certificates: List[str]        # 证书
    summary: str                   # 自我评价
```

### 3.2 JD输入与解析模块

**功能描述**：
- 支持文本粘贴输入JD
- 自动解析JD内容，提取关键词和要求
- 生成结构化的岗位画像

**技术实现**：
- 文本输入：React + textarea
- JD解析：DeepSeek API
- 关键词提取：NLP算法
- 数据验证：Pydantic

**数据模型**：
```python
class JobDescription:
    id: str                    # 唯一标识
    raw_text: str              # 原始文本
    parsed_content: dict       # 解析后的内容
    created_at: datetime       # 创建时间

class ParsedJD:
    job_title: str             # 职位名称
    company: str               # 公司名称
    responsibilities: List[str]    # 岗位职责
    requirements: List[str]        # 任职要求
    keywords: List[str]            # 关键词
    hard_requirements: dict        # 硬性要求
    soft_requirements: List[str]   # 软性要求
```

### 3.3 匹配度分析模块

**功能描述**：
- 计算简历与JD的整体匹配度
- 各维度分项评分
- 识别缺失项和优势项

**技术实现**：
- 匹配度算法：加权评分模型
- 维度分析：技能、经验、学历、项目
- 可视化：雷达图、进度条

**数据模型**：
```python
class AnalysisResult:
    id: str                    # 唯一标识
    resume_id: str             # 简历ID
    jd_id: str                 # JDID
    overall_score: float       # 整体匹配度（0-100）
    dimension_scores: dict     # 各维度得分
    missing_items: List[str]   # 缺失项
    strengths: List[str]       # 优势项
    suggestions: List[str]     # 改进建议
    created_at: datetime       # 创建时间
```

### 3.4 AI智能修改模块

**功能描述**：
- 支持轻度、中度、深度三种修改强度
- 分模块修改（工作经历、项目经验等）
- 生成修改理由和说明

**技术实现**：
- AI调用：DeepSeek API
- Prompt工程：角色设定、修改原则
- 内容生成：结构化输出

**数据模型**：
```python
class ModificationResult:
    id: str                    # 唯一标识
    analysis_id: str           # 分析结果ID
    original_content: dict     # 原始内容
    modified_content: dict     # 修改后内容
    changes: List[Change]      # 修改记录
    created_at: datetime       # 创建时间

class Change:
    section: str               # 修改模块
    original_text: str         # 原始文本
    modified_text: str         # 修改后文本
    reason: str                # 修改理由
    type: str                  # 修改类型
```

### 3.5 修改预览与对比模块

**功能描述**：
- 左右对比视图
- 修改痕迹标注
- 人工微调支持

**技术实现**：
- 对比视图：React + CSS Grid
- 差异对比：diff算法
- 编辑功能：富文本编辑器

### 3.6 导出与下载模块

**功能描述**：
- 支持PDF、Word格式导出
- 自动排版优化
- 文件下载

**技术实现**：
- PDF导出：reportlab
- Word导出：python-docx
- 排版优化：CSS样式

## 4. API接口设计

### 4.1 简历相关API

**上传简历**
- `POST /api/resume/upload`
- 请求：multipart/form-data（文件）
- 响应：`{ "resume_id": "xxx", "parsed_content": {...} }`

### 4.2 JD相关API

**解析JD**
- `POST /api/jd/parse`
- 请求：`{ "text": "JD文本内容" }`
- 响应：`{ "jd_id": "xxx", "parsed_content": {...} }`

### 4.3 分析相关API

**匹配度分析**
- `POST /api/analysis/analyze`
- 请求：`{ "resume_id": "xxx", "jd_id": "xxx" }`
- 响应：`{ "analysis_id": "xxx", "overall_score": 75, ... }`

### 4.4 AI修改相关API

**AI修改简历**
- `POST /api/ai/modify`
- 请求：`{ "analysis_id": "xxx", "strength": "medium" }`
- 响应：`{ "modification_id": "xxx", "modified_content": {...}, "changes": [...] }`

### 4.5 导出相关API

**导出简历**
- `GET /api/export/{modification_id}?format=pdf`
- 响应：文件下载

## 5. UI界面设计

### 5.1 设计原则
1. **简洁直观**：非技术人员也能轻松使用
2. **流程清晰**：一步步引导用户完成操作
3. **反馈及时**：每个操作都有明确的反馈
4. **移动端适配**：支持手机和平板浏览

### 5.2 页面流程
1. 首页：产品介绍 + 开始使用按钮
2. 上传页：上传简历 + 输入JD
3. 分析页：匹配度分析 + 修改建议
4. 编辑页：修改预览 + 导出

### 5.3 配色方案
- 主色：#3B82F6（蓝色）
- 辅助色：#10B981（绿色）
- 警告色：#F59E0B（橙色）
- 错误色：#EF4444（红色）
- 背景色：#F9FAFB（浅灰）
- 文字色：#1F2937（深灰）

## 6. 部署方案

### 6.1 前端部署：Vercel
- 免费、自动部署、支持自定义域名
- 限制：每月100GB带宽、100小时构建时间

### 6.2 后端部署：Render
- 免费、支持Docker、自动部署
- 限制：15分钟无请求会休眠、512MB内存

### 6.3 环境变量配置
```env
# 前端
VITE_API_URL=https://your-backend.onrender.com

# 后端
DEEPSEEK_API_KEY=your_api_key
DEEPSEEK_API_URL=https://api.deepseek.com
CORS_ORIGINS=https://your-frontend.vercel.app
```

### 6.4 数据存储方案
- **MVP阶段**：本地文件系统 + SQLite
- **生产环境**：Cloudinary + PostgreSQL

## 7. 开发计划

### 7.1 阶段一：基础搭建（第1周）
- 项目初始化
- 基础UI组件
- 模拟API实现
- 基础页面

### 7.2 阶段二：核心功能（第2周）
- 简历解析功能
- JD解析功能
- 匹配度分析
- 前端交互优化

### 7.3 阶段三：AI集成（第3周）
- DeepSeek API集成
- AI修改功能
- 修改预览功能
- 导出功能

### 7.4 阶段四：测试部署（第4周）
- 功能测试
- 性能优化
- 部署准备
- 上线监控

## 8. 错误处理机制

### 8.1 前端错误处理
- **网络错误**：显示友好提示，提供重试按钮
- **文件格式错误**：提示支持的格式，引导重新上传
- **AI响应超时**：显示加载状态，支持取消操作
- **数据验证错误**：高亮错误字段，提供修正建议

### 8.2 后端错误处理
- **文件解析失败**：返回具体错误原因，支持重试
- **AI服务不可用**：降级到模拟数据，保证基本功能
- **数据验证失败**：返回详细错误信息
- **服务器错误**：记录日志，返回通用错误信息

### 8.3 错误码设计
```python
# 成功
200: "success"

# 客户端错误
400: "bad_request"           # 请求参数错误
401: "unauthorized"          # 未授权
403: "forbidden"             # 禁止访问
404: "not_found"             # 资源不存在
413: "payload_too_large"     # 文件过大
422: "unprocessable_entity"  # 数据验证失败

# 服务端错误
500: "internal_server_error" # 服务器内部错误
502: "bad_gateway"           # 网关错误
503: "service_unavailable"   # 服务不可用
504: "gateway_timeout"       # 网关超时
```

## 9. 数据安全设计

### 9.1 数据加密
- **传输加密**：HTTPS/TLS 1.3
- **存储加密**：敏感数据加密存储
- **API密钥**：环境变量管理，不硬编码

### 9.2 隐私保护
- **数据最小化**：只收集必要数据
- **数据隔离**：用户数据隔离存储
- **数据删除**：支持用户删除自己的数据
- **隐私政策**：明确数据使用范围

### 9.3 安全措施
- **输入验证**：所有用户输入都进行验证
- **文件类型检查**：只允许上传指定格式文件
- **文件大小限制**：限制上传文件大小（最大10MB）
- **速率限制**：API调用频率限制
- **CORS配置**：只允许指定域名访问

## 10. 性能指标

### 10.1 响应时间
- **页面加载**：< 2秒
- **文件上传**：< 5秒（10MB文件）
- **简历解析**：< 3秒
- **JD解析**：< 2秒
- **匹配度分析**：< 5秒
- **AI修改**：< 30秒

### 10.2 并发性能
- **同时在线用户**：100+
- **并发API请求**：50+
- **文件上传并发**：10+

### 10.3 可用性
- **系统可用性**：99.9%
- **数据持久性**：99.99%
- **故障恢复时间**：< 5分钟

## 11. 风险和应对

### 11.1 技术风险
1. **简历解析准确率**：使用成熟的解析库，逐步优化
2. **AI响应时间**：优化Prompt，减少token使用
3. **部署稳定性**：使用成熟的托管服务

### 11.2 资源风险
1. **API费用**：先用模拟数据，控制调用频率
2. **时间不足**：优先实现核心功能

## 12. 后续迭代方向

### 12.1 功能扩展
- 图片简历OCR识别
- 招聘链接自动抓取JD
- 多种修改强度与风格选择
- 多版本管理
- 简历模板库
- 投递记录追踪
- AI模拟面试

### 12.2 商业模式
- 免费版：每日2次修改机会，基础功能
- 会员版：无限次修改、全部功能
- 企业版：API接口、批量处理

## 13. 附录

### 13.1 技术选型理由
- **React**：生态系统成熟，社区活跃
- **TypeScript**：类型安全，代码质量高
- **Tailwind CSS**：快速开发，样式一致
- **FastAPI**：高性能，适合AI集成
- **DeepSeek**：国产模型，性价比高

### 13.2 参考资源
- React官方文档：https://react.dev/
- FastAPI官方文档：https://fastapi.tiangolo.com/
- DeepSeek API文档：https://platform.deepseek.com/api-docs
