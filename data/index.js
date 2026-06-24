/**
 * 数据索引文件
 * 将 JSON 数据转为 JS 变量，避免 file:// 下 fetch CORS 问题
 * 此文件在故事数据之后加载，由 story-data.js 消费
 */
const STORY_DATA_PAGES = {
  "home": {
    "id": "home", "title": "学生系统主页", "url": "home.html",
    "requiredLevel": 0, "hidden": false, "keywords": []
  },
  "courses": {
    "id": "courses", "title": "选课列表", "url": "courses.html",
    "requiredLevel": 0, "hidden": false, "keywords": []
  },
  "course-01": {
    "id": "course-01", "title": "断头练习与再生", "url": "course-01.html",
    "requiredLevel": 0, "hidden": false,
    "keywords": ["不死术", "缝合线"]
  },
  "course-02": {
    "id": "course-02", "title": "抽血复活术基础", "url": "course-02.html",
    "requiredLevel": 0, "hidden": false,
    "keywords": ["血型匹配", "供体筛选"]
  },
  "course-03": {
    "id": "course-03", "title": "灵体感知入门", "url": "course-03.html",
    "requiredLevel": 0, "hidden": false,
    "keywords": ["濒死体验", "秋季生日"]
  },
  "course-04": {
    "id": "course-04", "title": "禁忌药理学", "url": "course-04.html",
    "requiredLevel": 0, "hidden": false,
    "keywords": ["还魂汤", "活体提取"]
  },
  "course-05": {
    "id": "course-05", "title": "时间停滞理论", "url": "course-05.html",
    "requiredLevel": 0, "hidden": false,
    "keywords": ["生命暂停", "冷冻库"]
  },
  "course-06": {
    "id": "course-06", "title": "记忆转移实操", "url": "course-06.html",
    "requiredLevel": 0, "hidden": false,
    "keywords": ["意识上传", "宿主替换"]
  },
  "roster": {
    "id": "roster", "title": "学生名单", "url": "roster.html",
    "requiredLevel": 0, "hidden": false, "keywords": []
  },
  "orientation": {
    "id": "orientation", "title": "异常入学须知", "url": "hidden/orientation.html",
    "requiredLevel": 0, "hidden": true,
    "keywords": ["缝合线", "血型匹配"]
  },
  "exp-001": {
    "id": "exp-001", "title": "实验记录 #001", "url": "hidden/exp-001.html",
    "requiredLevel": 1, "hidden": true,
    "keywords": ["不死术"]
  },
  "exp-002": {
    "id": "exp-002", "title": "事故报告", "url": "hidden/exp-002.html",
    "requiredLevel": 1, "hidden": true,
    "keywords": ["濒死体验"]
  },
  "supply": {
    "id": "supply", "title": "供体转运清单", "url": "hidden/supply.html",
    "requiredLevel": 1, "hidden": true,
    "keywords": ["活体提取"]
  },
  "archive": {
    "id": "archive", "title": "学生档案库", "url": "hidden/archive.html",
    "requiredLevel": 1, "hidden": true,
    "keywords": ["供体筛选"]
  },
  "map": {
    "id": "map", "title": "地下设施地图", "url": "hidden/map.html",
    "requiredLevel": 1, "hidden": true,
    "keywords": ["冷冻库"]
  },
  "truth": {
    "id": "truth", "title": "陆晓济的工作日志", "url": "hidden/truth.html",
    "requiredLevel": 2, "hidden": true,
    "keywords": ["宿主替换"]
  },
  "admin": {
    "id": "admin", "title": "管理后台", "url": "admin.html",
    "requiredLevel": 2, "hidden": false, "keywords": []
  }
};

const STORY_DATA_COURSES = {
  "C01": {
    "id": "C01", "courseCode": "DEAD-101",
    "title": "断头练习与再生",
    "instructor": "钟教授",
    "credits": 4,
    "schedule": "每周一、四 22:00-00:00",
    "location": "地下二层 · 解剖实验室",
    "description": "本课程教授基础断头技术与再生缝合术。学员将学习在意识保持清醒的状态下完成颈部组织分离、脊柱截断与再生缝合的核心技术。课程包含理论讲授与实操练习，学员需两两配对完成全部实验环节。结业标准为自主完成一次完整的断头-再生循环。",
    "prerequisites": "无",
    "maxStudents": 16,
    "notes": "本课程使用的再生缝合线为学院专利产品，请勿私自带离实验室。断头后30秒内必须开始缝合，延误后果自负。",
    "keywords": ["不死术", "缝合线"]
  },
  "C02": {
    "id": "C02", "courseCode": "BLOOD-201",
    "title": "抽血复活术基础",
    "instructor": "沈教授",
    "credits": 3,
    "schedule": "每周二、五 23:00-01:00",
    "location": "地下三层 · 血液实验室",
    "description": "本课程系统讲解血液抽取、分离、保存与回注的核心技术。学员将掌握全血抽取的安全量计算、血液活性保持方法，以及在不同体况下的复活回注策略。重点内容包括血型匹配算法、供体筛选标准，以及应急情况下的自体血液循环技术。",
    "prerequisites": "建议先修「基础人体解剖」",
    "maxStudents": 12,
    "notes": "每次实验课抽血量不超过1500ml。学院提供标准供体血包，私自采集同组学员血液属于违纪行为。",
    "keywords": ["血型匹配", "供体筛选"]
  },
  "C03": {
    "id": "C03", "courseCode": "SPIRIT-101",
    "title": "灵体感知入门",
    "instructor": "陆晓济（代课）",
    "credits": 2,
    "schedule": "每周三 00:00-02:00",
    "location": "地面一层 · 感知训练室",
    "description": "本课程培养学员对超自然灵体的感知与沟通能力。通过系统化的濒死体验训练，学员将逐步打开灵视觉，学习辨别不同类型的灵体存在。课程后半段将进行灵魂出窍的引导练习，学员需在监护下完成首次自主出窍。陆老师每年十月会暂停授课，届时由钟教授代课。",
    "prerequisites": "需签署知情同意书",
    "maxStudents": 8,
    "notes": "灵体感知训练可能引起短期失眠、幻视、或被灵体跟随。以上均为正常现象，通常在结业后3-6个月内自行消退。如持续超过6个月，请联系学院医疗部。",
    "keywords": ["濒死体验", "秋季生日"]
  },
  "C04": {
    "id": "C04", "courseCode": "PHARM-301",
    "title": "禁忌药理学",
    "instructor": "吴教授",
    "credits": 4,
    "schedule": "每周一、三 21:00-23:00",
    "location": "地下二层 · 药剂实验室",
    "description": "本课程研究被主流医学界禁止或遗忘的药理配方及其现代应用。核心内容包括还魂汤的配方复原与改良、活体有效成分提取技术、以及神经毒素的医疗化改造。学员将在课程中亲自动手完成从原料采集到成品测试的全部流程。",
    "prerequisites": "需完成「基础毒理学」或获得教授批准",
    "maxStudents": 10,
    "notes": "活体提取实验的供体由学院统一提供，学员无需自行寻找。废弃样本请按医疗废物处理标准投入焚化炉。",
    "keywords": ["还魂汤", "活体提取"]
  },
  "C05": {
    "id": "C05", "courseCode": "TIME-401",
    "title": "时间停滞理论",
    "instructor": "赵教授",
    "credits": 3,
    "schedule": "每周四 22:00-01:00",
    "location": "地下四层 · 冷冻实验室",
    "description": "本课程探索生命体新陈代谢暂停与恢复的理论基础和技术实现。学员将学习人体冷冻保护液的配方与灌注技术、生命暂停状态的监控与维持方法，以及安全复苏的流程控制。课程配套参观学院地下冷冻库，实地了解大规模人体冷冻保存的运转体系。",
    "prerequisites": "「抽血复活术基础」或「禁忌药理学」",
    "maxStudents": 8,
    "notes": "冷冻库参观需提前预约。禁止在冷冻库内使用手机拍照。部分冷冻仓处于长期维护状态，请勿触碰。",
    "keywords": ["生命暂停", "冷冻库"]
  },
  "C06": {
    "id": "C06", "courseCode": "MEM-501",
    "title": "记忆转移实操",
    "instructor": "钟教授",
    "credits": 5,
    "schedule": "每周五、六 23:00-03:00",
    "location": "地下三层 · 神经实验室",
    "description": "本课程为学院核心高阶课程，教授完整的记忆提取、编码、存储与移植技术。学员将掌握意识数字化上传的方法、宿主匹配评估标准，以及记忆写入后的整合与验证流程。课程包含人体实验环节，学员需在导师监督下完成至少一次完整的宿主替换操作。",
    "prerequisites": "需完成三门以上学院核心课程，且获得陆晓济审批",
    "maxStudents": 4,
    "notes": "宿主替换实验的受体由学院统一分配。学员不得私自选择受体。实验失败的标准处理流程请参阅实验手册附录C。本课程结业即代表正式加入学院研究计划。",
    "keywords": ["意识上传", "宿主替换"]
  }
};

const STORY_DATA_ACCOUNTS = {
  "player": {
    "id": "player", "displayName": "玩家",
    "level": 0, "passwordType": "player-set",
    "passwordHint": "你入学时设置的生日密码",
    "description": "新入学学生，权限受限"
  },
  "chen-yutong": {
    "id": "chen-yutong", "displayName": "陈雨桐",
    "level": 1,
    "passwordHash": "4030c42b313a82b953d14f04a85ff9dd9739e49a97d90631b7fb3029cca1d6e1",
    "passwordHint": "名单页显示的生日，格式：MMDD"
  },
  "lu-xiaoji": {
    "id": "lu-xiaoji", "displayName": "陆晓济",
    "level": 2,
    "passwordHash": "0bf5b6b1c1a174b6b5b3c8800ed1a6d60060d16418f4fe988edcec706d82e000",
    "passwordHint": "密码为完整的8位生日，格式：YYYYMMDD"
  }
};

const STORY_DATA_CLUES = {
  "lxj-year": {
    "id": "lxj-year", "pageId": "supply",
    "label": "陆晓济生日 — 年份",
    "content": "供体转运清单显示，负责人陆晓济的入职编号为 LXJ-1992。",
    "reveals": "1992"
  },
  "lxj-month": {
    "id": "lxj-month", "pageId": "course-03",
    "label": "陆晓济生日 — 月份",
    "content": "「灵体感知入门」课程介绍中提到：陆老师每年十月会暂停授课。",
    "reveals": "10"
  },
  "lxj-day": {
    "id": "lxj-day", "pageId": "map",
    "label": "陆晓济生日 — 日期",
    "content": "地下设施地图标注：10月15日，B2层冷冻库封闭维护，仅限管理员陆晓济操作。",
    "reveals": "15"
  },
  "lxj-format": {
    "id": "lxj-format", "pageId": "archive",
    "label": "陆晓济生日 — 拼合规则",
    "content": "学生档案库的系统日志显示：管理员账号生日密码采用 YYYYMMDD 格式。",
    "reveals": "YYYYMMDD"
  },
  "tong-birthday": {
    "id": "tong-birthday", "pageId": "roster",
    "label": "陈雨桐生日",
    "content": "学生名单中陈雨桐条目显示生日为7月15日。",
    "reveals": "0715"
  }
};
