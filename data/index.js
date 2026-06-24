window.STORY_DATA_PAGES = {
  index: { id: 'index', title: '广告入口', url: 'index.html', requiredLevel: 0, hidden: false },
  home: { id: 'home', title: '新生主页', url: 'home.html', requiredLevel: 0, hidden: false },
  login: { id: 'login', title: '账号登录', url: 'login.html', requiredLevel: 0, hidden: false },
  courses: { id: 'courses', title: '课程中心', url: 'courses.html', requiredLevel: 0, hidden: false },
  students: { id: 'students', title: '学生名单', url: 'students.html', requiredLevel: 0, hidden: false },
  search: { id: 'search', title: '搜索记录', url: 'search.html', requiredLevel: 0, hidden: false },
  notice: { id: 'notice', title: '通知公告', url: 'notice.html', requiredLevel: 2, hidden: false },
  admin: { id: 'admin', title: '教师后台', url: 'admin.html', requiredLevel: 5, hidden: false },
  'course-01': { id: 'course-01', title: '断头练习与再生', url: 'course-01.html', requiredLevel: 0, hidden: false },
  'course-02': { id: 'course-02', title: '抽血复活术基础', url: 'course-02.html', requiredLevel: 0, hidden: false },
  'course-03': { id: 'course-03', title: '灵体感知入门', url: 'course-03.html', requiredLevel: 0, hidden: false },
  'course-04': { id: 'course-04', title: '禁忌药理学', url: 'course-04.html', requiredLevel: 0, hidden: false },
  'course-05': { id: 'course-05', title: '时间停滞理论', url: 'course-05.html', requiredLevel: 0, hidden: false },
  'course-06': { id: 'course-06', title: '记忆转移实操', url: 'course-06.html', requiredLevel: 0, hidden: false },
  'student-chen-yutong': { id: 'student-chen-yutong', title: '陈雨桐个人主页', url: 'student/chen-yutong.html', requiredLevel: 0, hidden: false },
  'student-lin-mo': { id: 'student-lin-mo', title: '林墨个人主页', url: 'student/lin-mo.html', requiredLevel: 0, hidden: false },
  'student-zhou-yuan': { id: 'student-zhou-yuan', title: '周远个人主页', url: 'student/zhou-yuan.html', requiredLevel: 0, hidden: false },
  'teacher-lu-xiaoji': { id: 'teacher-lu-xiaoji', title: '陆晓济教师主页', url: 'teacher/lu-xiaoji.html', requiredLevel: 2, hidden: false },
  orientation: { id: 'orientation', title: '异常入学须知', url: 'hidden/orientation.html', requiredLevel: 0, hidden: true },
  'exp-001': { id: 'exp-001', title: '实验记录001', url: 'hidden/exp-001.html', requiredLevel: 1, hidden: true },
  'exp-002': { id: 'exp-002', title: '事故报告', url: 'hidden/exp-002.html', requiredLevel: 1, hidden: true },
  supply: { id: 'supply', title: '供体转运清单', url: 'hidden/supply.html', requiredLevel: 1, hidden: true },
  archive: { id: 'archive', title: '学生档案库', url: 'hidden/archive.html', requiredLevel: 1, hidden: true },
  map: { id: 'map', title: '地下设施地图', url: 'hidden/map.html', requiredLevel: 2, hidden: true },
  truth: { id: 'truth', title: '最终真相', url: 'hidden/truth.html', requiredLevel: 5, hidden: true }
};

window.STORY_DATA_COURSES = {
  C01: {
    id: 'C01',
    pageId: 'course-01',
    url: 'course-01.html',
    title: '断头练习与再生',
    instructor: '钟教授',
    description: '基础断头技术与再生缝合。课程材料里反复提到一种学院专用的缝合线。',
    keywords: ['缝合线', '不死术']
  },
  C02: {
    id: 'C02',
    pageId: 'course-02',
    url: 'course-02.html',
    title: '抽血复活术基础',
    instructor: '沈教授',
    description: '讲授血型匹配、供体筛选与复活回注流程。公开课件删去了供体来源章节。',
    keywords: ['血型匹配', '供体筛选']
  },
  C03: {
    id: 'C03',
    pageId: 'course-03',
    url: 'course-03.html',
    title: '灵体感知入门',
    instructor: '陆晓济（代课）',
    description: '濒死体验训练。课程通知提到陆老师每年十月会暂停授课。',
    keywords: ['濒死体验']
  },
  C04: {
    id: 'C04',
    pageId: 'course-04',
    url: 'course-04.html',
    title: '禁忌药理学',
    instructor: '吴教授',
    description: '研究还魂汤、活体提取和样本稳定技术。实验材料来源字段被隐藏。',
    keywords: ['活体提取']
  },
  C05: {
    id: 'C05',
    pageId: 'course-05',
    url: 'course-05.html',
    title: '时间停滞理论',
    instructor: '赵教授',
    description: '生命暂停与冷冻库维护。部分冷冻库条目需要助教权限查看。',
    keywords: ['冷冻库']
  },
  C06: {
    id: 'C06',
    pageId: 'course-06',
    url: 'course-06.html',
    title: '记忆转移实操',
    instructor: '钟教授',
    description: '意识上传与宿主替换。维护人记录里出现过 lu-xiaoji。',
    keywords: ['宿主替换', '陆晓济']
  }
};

window.STORY_DATA_ACCOUNTS = {
  'chen-yutong': {
    id: 'chen-yutong',
    username: 'chen-yutong',
    displayName: '陈雨桐',
    role: 'student',
    level: 1,
    passwordHash: '4030c42b313a82b953d14f04a85ff9dd9739e49a97d90631b7fb3029cca1d6e1',
    hintPageIds: ['student-chen-yutong']
  },
  'lin-mo': {
    id: 'lin-mo',
    username: 'lin-mo',
    displayName: '林墨',
    role: 'assistant',
    level: 2,
    passwordHash: 'ff641dab77828ef509ed6cafa6e79dc6c7fb4dca8a217750272e96d7203d2491',
    hintPageIds: ['student-lin-mo', 'archive']
  },
  'lu-xiaoji': {
    id: 'lu-xiaoji',
    username: 'lu-xiaoji',
    displayName: '陆晓济',
    role: 'teacher',
    level: 5,
    passwordHash: '0bf5b6b1c1a174b6b5b3c8800ed1a6d60060d16418f4fe988edcec706d82e000',
    hintPageIds: ['teacher-lu-xiaoji', 'supply', 'map', 'archive']
  }
};

window.STORY_DATA_PEOPLE = {
  'chen-yutong': {
    id: 'chen-yutong',
    type: 'student',
    displayName: '陈雨桐',
    publicStatus: '已结业',
    privateStatus: '转运完成',
    profilePage: 'student/chen-yutong.html',
    recent: '最后一次公开登录：7/15 23:41'
  },
  'lin-mo': {
    id: 'lin-mo',
    type: 'student',
    displayName: '林墨',
    publicStatus: '实验中',
    privateStatus: '助教权限保留',
    profilePage: 'student/lin-mo.html',
    recent: '留言提到 04/26 的门禁更新'
  },
  'zhou-yuan': {
    id: 'zhou-yuan',
    type: 'student',
    displayName: '周远',
    publicStatus: '已结业',
    privateStatus: '档案冻结',
    profilePage: 'student/zhou-yuan.html',
    recent: '无联系方式'
  },
  'lu-xiaoji': {
    id: 'lu-xiaoji',
    type: 'teacher',
    displayName: '陆晓济',
    publicStatus: '课程维护人',
    privateStatus: '实验负责人',
    profilePage: 'teacher/lu-xiaoji.html',
    recent: '教师账号使用临时生日密码'
  }
};

window.STORY_DATA_CLUES = {
  'chen-date': { id: 'chen-date', pageId: 'student-chen-yutong', label: '陈雨桐日期线索', reveals: '0715' },
  'lin-date': { id: 'lin-date', pageId: 'student-lin-mo', label: '林墨门禁线索', reveals: '0426' },
  'lxj-year': { id: 'lxj-year', pageId: 'supply', label: '陆晓济年份', reveals: '1992' },
  'lxj-month': { id: 'lxj-month', pageId: 'notice', label: '陆晓济月份', reveals: '10' },
  'lxj-day': { id: 'lxj-day', pageId: 'map', label: '陆晓济日期', reveals: '15' },
  'lxj-format': { id: 'lxj-format', pageId: 'archive', label: '教师密码格式', reveals: 'YYYYMMDD' }
};

window.STORY_DATA_SEARCH_INDEX = {
  entries: [
    { keyword: '退学', aliases: ['退出', '注销'], targetPageId: 'search', requiredLevel: 0, unlockMode: 'fuzzy' },
    { keyword: '陈雨桐', aliases: ['陈雨', 'yutong', 'chen-yutong'], targetPageId: 'student-chen-yutong', requiredLevel: 0, unlockMode: 'fuzzy' },
    { keyword: '林墨', aliases: ['lin-mo', '助教'], targetPageId: 'student-lin-mo', requiredLevel: 1, unlockMode: 'fuzzy' },
    { keyword: '缝合线', aliases: ['血型匹配'], targetPageId: 'orientation', requiredLevel: 0, unlockMode: 'exact' },
    { keyword: '不死术', aliases: [], targetPageId: 'exp-001', requiredLevel: 1, unlockMode: 'exact' },
    { keyword: '供体筛选', aliases: ['供体'], targetPageId: 'archive', requiredLevel: 1, unlockMode: 'exact' },
    { keyword: '濒死体验', aliases: ['濒死'], targetPageId: 'exp-002', requiredLevel: 1, unlockMode: 'exact' },
    { keyword: '活体提取', aliases: ['活体'], targetPageId: 'supply', requiredLevel: 1, unlockMode: 'exact' },
    { keyword: '冷冻库', aliases: ['冷冻'], targetPageId: 'map', requiredLevel: 2, unlockMode: 'exact' },
    { keyword: '陆晓济', aliases: ['陆老师', 'lu-xiaoji'], targetPageId: 'teacher-lu-xiaoji', requiredLevel: 2, unlockMode: 'fuzzy' },
    { keyword: '宿主替换', aliases: ['宿主'], targetPageId: 'truth', requiredLevel: 5, unlockMode: 'exact' }
  ]
};
