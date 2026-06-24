# 酆都在线学院 — 游戏 Spec

## 概述

纯前端静态 ARG。玩家被一条学籍接收页面捕获，进入「酆都在线学院」学生系统。通过浏览课程、参与讨论区、调查学生档案，逐步发现账号 ID 和密码，提升权限，最终揭露学院是人体实验招募系统。

核心体验：

**浏览系统 → 发现异常词 → 搜索关键词 → 解锁隐藏页 → 讨论区发现下一级 ID → 档案/课件获取密码 → 登录升级 → 循环，直到真相**

## 故事线

```
[入口] 学籍接收页
  → 7秒倒计时，第2秒黑屏红字「不要入学！」
  → 关闭页面 = 确认入学 → 跳转学生系统

[Lv0] 玩家自设昵称和8位生日
  → 浏览6门诡异课程、15人学生名单、课程讨论区
  → 搜「缝合线」解锁入学须知 → 得知账号切换存在
  → 搜「陈雨桐」看档案 → 2001年7月15日 → 密码 20010715
  → BBS 看到 cyton2025 发言 → 获得 ID

[Lv1] 登录陈雨桐 (cytong2025 / 20010715)
  → 搜「不死术」→ 实验记录：周远被断头实验
  → 搜「供体筛选」→ 档案库：供体等级+密码格式 DATE8
  → 搜「濒死体验」→ 事故报告：陆晓济十月停课
  → 搜「活体提取」→ 供体清单：LXJ-1992（年份碎片）
  → BBS 看到 linmo_mo 发言 → 获得 ID
  → 搜「林墨」看档案 → 2001年4月26日 → 密码 20010426

[Lv2] 登录林墨 (linmo_mo / 20010426)
  → 搜「冷冻库」→ 地下地图：10月15日维护（日期碎片）
  → 搜「陆晓济」→ 教师页：认证策略 DATE8
  → BBS 看到 zhao_sq 发言 → 获得 ID
  → C01 断头课件：STU-20010429 → 密码 20010429

[Lv3] 登录赵思琪 (zhao_sq / 20010429)
  → 搜「停课通知」→ 十月停课（月份碎片）
  → BBS 看到 zhong_prof 发言 → 获得 ID
  → 搜「钟教授」→ 教师页：1975年3月11日 → 密码 19750311
  → 密码拼合完成：1992+10+15+DATE8 = 19921015

[Lv4] 登录钟教授 (zhong_prof / 19750311)
  → 搜「教授文件」→ 教授内部文件：系统全貌、lxj_admin ID
  → 已知 lxj_admin + 19921015

[Lv5] 登录陆晓济 (lxj_admin / 19921015)
  → 管理后台 → 全部档案
  → 搜「宿主替换」→ 最终真相
  → 玩家设备信息、搜索记录被列出 → 「你已被标记」
```

## 账号体系

### 完整账号表

| 等级 | 身份 | ID | 密码 | ID 来源 | 密码来源 |
|------|------|-----|------|---------|----------|
| Lv0 | 新生 | 自定义 | 自定义 8 位 | home 注册 | 自设 |
| Lv1 | 陈雨桐 | `cytong2025` | `20010715` | BBS 讨论区 | 陈雨桐档案：出生日期 |
| Lv2 | 林墨 | `linmo_mo` | `20010426` | BBS 讨论区 | 林墨档案：出生日期 |
| Lv3 | 赵思琪 | `zhao_sq` | `20010429` | BBS 讨论区 | C01 断头课件器材签收记录 |
| Lv4 | 钟教授 | `zhong_prof` | `19750311` | BBS 讨论区 | 钟教授页：出生日期 |
| Lv5 | 陆晓济 | `lxj_admin` | `19921015` | 教授内部文件 | 4碎片拼合 |

### 登录规则

- 登录页格式：账号 ID + 密码（YYYYMMDD，严格 8 位数字）
- 密码使用 MD5 哈希存储，登录时比对哈希
- 所有页面 URL 使用 base64 编码存储，加载时 atob 解码
- ID 不在档案页直接标注，玩家需从 BBS 讨论区用户名推理

### 等级逻辑

学生等级由累计学分决定：

| 等级 | 学分范围 |
|------|----------|
| Lv0 | 0-3 学分 |
| Lv1 | 4-6 学分 |
| Lv2 | 7-9 学分 |
| Lv3 | 10 学分以上 |

Lv4 以上为教授/管理员，与学分无关。

等级显示在个人主页仪表盘，点击 `?` 浮标查看规则。

## 陆晓济密码碎片

| 碎片 | 值 | 来源页面 | 内容 |
|------|-----|---------|------|
| 年份 | `1992` | hidden/supply.html | 供体清单：入职编号 LXJ-1992 |
| 月份 | `10` | notice.html | 通知公告：每年十月停课 |
| 日期 | `15` | hidden/map.html | 地下地图：10月15日维护 |
| 格式 | `YYYYMMDD` | hidden/archive.html | 档案库：密码格式 DATE8 |

## 课程体系

| ID | 课程 | 教授 | 最低等级 | 学分 | 关键词 |
|----|------|------|----------|------|--------|
| C01 | 断头练习与再生 | 钟教授 | Lv0 | 2 | 缝合线、不死术、STU-20010429 |
| C02 | 抽血复活术基础 | 沈教授 | Lv0 | 3 | 血型匹配、供体筛选 |
| C03 | 灵体感知入门 | 陆晓济 | Lv3 | 4 | 濒死体验、陆晓济 |
| C04 | 禁忌药理学 | 吴教授 | Lv1 | 3 | 活体提取 |
| C05 | 时间停滞理论 | 赵教授 | Lv2 | 4 | 冷冻库 |
| C06 | 记忆转移实操 | 钟教授 | Lv3 | 5 | 宿主替换、陆晓济 |

未达等级要求的课程显示为锁定状态。

## 学生名单（15人）

| 学籍号 | 姓名 | 学分 | 等级 | 状态 |
|--------|------|------|------|------|
| STU-2025-003 | 周远 | 3 | Lv0 | 已结业 |
| STU-2025-005 | 王建国 | 5 | Lv1 | 已结业 |
| STU-2025-007 | 陈雨桐 | 4 | Lv1 | 已结业 |
| STU-2025-008 | 马晓燕 | 10 | Lv3 | 已结业 |
| STU-2025-009 | 孙浩 | 9 | Lv2 | 已结业 |
| STU-2025-012 | 吴小曼 | 2 | Lv0 | 实验中 |
| STU-2025-015 | 张明 | 6 | Lv1 | 实验中 |
| STU-2025-017 | 钱一鸣 | 3 | Lv0 | 实验中 |
| STU-2025-019 | 林墨 | 7 | Lv2 | 实验中 |
| STU-2025-022 | 刘芳 | 8 | Lv2 | 在读 |
| STU-2025-028 | 黄小蕾 | 1 | Lv0 | 在读 |
| STU-2025-031 | 赵思琪 | 11 | Lv3 | 在读 |
| STU-2025-033 | 许文轩 | 2 | Lv0 | 在读 |
| STU-2025-035 | 江晨 | 0 | Lv0 | 在读 |
| STU-2025-047 | 玩家 | 0 | Lv0 | 在读 |

- 陈雨桐、林墨、赵思琪：有关键个人档案页
- 刘芳、黄小蕾、江晨、许文轩：简易档案页（在读）
- 其余 7 人：点击跳转退学维护页
- 按学籍号升序排列

## BBS 讨论区

讨论区分层可见：

| 层级 | 可见内容 |
|------|----------|
| Lv0 | 综合讨论：`jianchen_00`、`xu_wx2025`、`cytong2025`、`linmo_mo` |
| Lv1 | 陈雨桐与林墨对话，暴露 `linmo_mo` 门禁 |
| Lv2 | `zhao_sq` 讨论灵体感知课 |
| Lv3 | `zhong_prof` 发布课程通知 |
| Lv4 | 教授专区：`zhong_prof` 与 `lxj_admin` 讨论供体评估 |

## 关键词搜索映射

| 关键词 | 目标页面 | 权限 | 模式 |
|--------|----------|------|------|
| `退学` `退出` `注销` | withdraw.html (维护中) | Lv0 | 模糊 |
| `陈雨桐` `陈雨` `cytong` | student/chen-yutong.html | Lv0 | 模糊 |
| `缝合线` `再生缝合` | hidden/orientation.html | Lv0 | 精确 |
| `血型匹配` | hidden/orientation.html | Lv0 | 精确 |
| `不死术` | hidden/exp-001.html | Lv1 | 精确 |
| `供体筛选` `供体` | hidden/archive.html | Lv1 | 精确 |
| `濒死体验` `濒死` | hidden/exp-002.html | Lv1 | 精确 |
| `活体提取` `活体` | hidden/supply.html | Lv1 | 精确 |
| `林墨` `linmo` | student/lin-mo.html | Lv1 | 模糊 |
| `冷冻库` `冷冻` | hidden/map.html | Lv2 | 精确 |
| `赵思琪` `zhao_sq` | student/zhao-siqi.html | Lv2 | 模糊 |
| `陆晓济` `陆老师` `lxj_admin` | teacher/lu-xiaoji.html | Lv2 | 模糊 |
| `停课通知` `十月停课` | notice.html | Lv3 | 模糊 |
| `钟教授` `zhong_prof` | teacher/zhong-prof.html | Lv3 | 模糊 |
| `教授文件` `内部文件` | hidden/prof-files.html | Lv4 | 精确 |
| `宿主替换` `宿主` | hidden/truth.html | Lv5 | 精确 |

搜索权限不足时显示「该档案需要更高权限」，而非普通无结果。

## 页面结构

```
arg-game/
├── index.html                    # 入口：学籍接收
├── home.html                     # Lv0：学生主页+仪表盘+等级浮标
├── login.html                    # 账号切换：ID+YYYYMMDD
├── courses.html                  # 课程列表（等级标注）
├── course-01.html ~ 06           # 课程详情
├── students.html                 # 学生名单（15人）
├── bbs.html                      # 课程讨论区（分层可见）
├── search.html                   # 搜索记录+结果
├── notice.html                   # Lv3：教师通知公告
├── withdraw.html                 # 退学申请（维护中）
├── admin.html                    # Lv5：教师后台
├── student/
│   ├── chen-yutong.html          # 陈雨桐档案
│   ├── lin-mo.html               # 林墨档案
│   ├── zhao-siqi.html            # 赵思琪档案
│   ├── liu-fang.html             # 刘芳简易档案
│   ├── huang-xiaolei.html        # 黄小蕾简易档案
│   ├── jiang-chen.html           # 江晨简易档案
│   └── xu-wenxuan.html           # 许文轩简易档案
├── teacher/
│   ├── lu-xiaoji.html            # 陆晓济教师页
│   └── zhong-prof.html           # 钟教授教师页
├── hidden/
│   ├── orientation.html          # Lv0：异常入学须知
│   ├── exp-001.html              # Lv1：实验记录001
│   ├── exp-002.html              # Lv1：事故报告
│   ├── supply.html               # Lv1：供体转运清单
│   ├── archive.html              # Lv1：学生档案库
│   ├── map.html                   # Lv2：地下设施地图
│   ├── prof-files.html           # Lv4：教授内部文件
│   └── truth.html                # Lv5：最终真相
├── js/
│   ├── core/
│   │   ├── account-manager.js    # 账号登录（MD5比对）
│   │   ├── game-state.js         # localStorage 状态管理
│   │   ├── router.js             # 页面权限控制
│   │   ├── search-engine.js      # 搜索匹配引擎
│   │   └── story-data.js         # 数据加载+URL解码
│   ├── components/
│   │   └── layout.js             # 共享布局+搜索执行
│   └── utils/
│       ├── crypto.js             # MD5 实现
│       ├── dom.js                # DOM 快捷方法
│       └── storage.js            # localStorage 封装
├── data/
│   └── index.js                  # 全部游戏数据（内联）
├── css/
│   ├── reset.css
│   └── common.css
└── SPEC.md
```

## 数据存储

全部游戏数据集中在 `data/index.js`，分为六个全局对象：

| 对象 | 内容 |
|------|------|
| `STORY_DATA_PAGES` | 所有页面元数据（ID、URL、权限、是否隐藏） |
| `STORY_DATA_COURSES` | 6门课程（等级、学分、关键词） |
| `STORY_DATA_ACCOUNTS` | 5个账号（用户名、等级、MD5哈希） |
| `STORY_DATA_PEOPLE` | 15个学生+教授（档案信息） |
| `STORY_DATA_CLUES` | 8条线索定义 |
| `STORY_DATA_SEARCH_INDEX` | 16条搜索关键词→页面映射 |

URL 使用 base64 编码存储，`story-data.js` 加载时通过 `atob()` 解码。
密码使用 MD5 哈希存储，`account-manager.js` 登录时比对哈希。

## 防爬虫措施

- 密码 MD5 加密存储（非 SHA-256，轻量同步比对）
- 页面 URL base64 编码存储，运行时解码
- 隐藏页面需搜索关键词触发，直接输 URL 会被 router 拦截
- 公开页面源码可见，但关键关联信息（ID→密码→碎片）需推理
- 纯前端限制：清 localStorage 可重置、查看源码可获取所有数据

## 页面访问控制

每个页面 `<body>` 声明：

```html
<body data-page-id="archive"
      data-required-level="1"
      data-is-hidden="true">
```

`router.js` 检查规则：
- `data-required-level` > 当前等级 → 重定向 login.html?reason=level
- `data-is-hidden="true"` 且未发现 → 重定向 search.html?locked=1
- 通过则记录访问

## 游戏状态

localStorage key：`arg_game_save`

```json
{
  "started": true,
  "playerName": "玩家昵称",
  "playerBirthday": "20000101",
  "currentAccount": "chen-yutong",
  "level": 1,
  "foundPages": {},
  "searchHistory": [],
  "cluesFound": [],
  "accountsUsed": ["player", "chen-yutong"],
  "flags": {}
}
```

## 最终反转

`hidden/truth.html` 在 Lv5 登录后显示：

- 玩家昵称和生日（主动提交的）
- 账号切换路径：玩家 → 陈雨桐 → 林墨 → 赵思琪 → 钟教授 → 陆晓济
- 全部搜索记录
- 浏览器环境（User-Agent、屏幕分辨率、语言、时区）
- 不声称获取真实设备名、IP 或物理位置

反转文案：

> 你没有被服务器识别。你只是一步步把自己交给了系统。
> 你已被标记。

## 技术约束

- 纯前端静态页面，无后端，部署于 Netlify
- localStorage 存储游戏状态
- MD5 用于密码哈希，base64 用于 URL 编码，均不提供真实安全性
- 所有页面为独立 HTML 文件
- 防入口跳过：`sessionStorage + localStorage` 双通道检查 `ad_passed` 标记

## 设计风格

- 表层：旧式在线学院教务系统
- 底层：SCP 式冷静档案、实验记录
- 配色：深木色、旧纸色、低饱和红色警示
- 字体：中文衬线体（Noto Serif SC / SimSun）
- 讨论区用论坛风格，课程页用教务系统风格，档案用公文风格
