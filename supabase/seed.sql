-- ── Students ────────────────────────────────────────────────
insert into students (name, slug, streak) values
  ('Alex',    'alex',    14),
  ('Maya',    'maya',    21),
  ('Jordan',  'jordan',   8),
  ('Priya',   'priya',   32),
  ('Sam',     'sam',      5),
  ('Taylor',  'taylor',  17),
  ('Chris',   'chris',   26),
  ('Jamie',   'jamie',   11),
  ('Morgan',  'morgan',   3),
  ('Riley',   'riley',   44),
  ('Casey',   'casey',   19),
  ('Drew',    'drew',     7)
on conflict (slug) do update set
  name   = excluded.name,
  streak = excluded.streak;

-- ── Courses ─────────────────────────────────────────────────
insert into courses (student_slug, title, progress, icon_name)
select student_slug, title, progress, icon_name
from (values
  -- alex (original 4 + 2 new)
  ('alex', 'Advanced React Patterns',      75, 'Layers'),
  ('alex', 'TypeScript Deep Dive',         42, 'Code2'),
  ('alex', 'System Design Fundamentals',   90, 'Network'),
  ('alex', 'Machine Learning Basics',      28, 'Brain'),
  ('alex', 'GraphQL Essentials',           61, 'GitBranch'),
  ('alex', 'Testing with Vitest',          33, 'TestTube2'),

  -- maya (original 4 + 2 new)
  ('maya', 'Product Design Systems',       88, 'Palette'),
  ('maya', 'Data Visualization',           64, 'BarChart2'),
  ('maya', 'Motion for Interfaces',        52, 'Sparkles'),
  ('maya', 'Research Methods',             91, 'Search'),
  ('maya', 'Accessibility Fundamentals',   47, 'Eye'),
  ('maya', 'Color Theory for UI',          76, 'Droplets'),

  -- jordan (original 4 + 2 new)
  ('jordan', 'Backend Fundamentals',       58, 'Server'),
  ('jordan', 'Database Modeling',          73, 'Database'),
  ('jordan', 'API Security',               36, 'Shield'),
  ('jordan', 'Cloud Deployments',          84, 'Cloud'),
  ('jordan', 'Docker & Containers',        69, 'Box'),
  ('jordan', 'CI/CD Pipelines',            22, 'GitMerge'),

  -- priya (original 4 + 2 new)
  ('priya', 'Machine Learning Basics',     79, 'Brain'),
  ('priya', 'Python for Data Science',     67, 'Code2'),
  ('priya', 'Statistics Essentials',       94, 'Sigma'),
  ('priya', 'Neural Networks',             48, 'Network'),
  ('priya', 'Feature Engineering',         55, 'Wrench'),
  ('priya', 'MLOps Fundamentals',          31, 'Settings2'),

  -- sam (6 courses)
  ('sam', 'Vue.js Fundamentals',           18, 'Layers'),
  ('sam', 'CSS Grid & Flexbox',            82, 'Layout'),
  ('sam', 'JavaScript Async Patterns',     46, 'Zap'),
  ('sam', 'Web Performance',               37, 'Gauge'),
  ('sam', 'PWA Development',               60, 'Smartphone'),
  ('sam', 'Browser DevTools',              71, 'Monitor'),

  -- taylor (6 courses)
  ('taylor', 'Kotlin for Android',         53, 'Smartphone'),
  ('taylor', 'iOS with Swift',             29, 'Apple'),
  ('taylor', 'React Native',               77, 'Layers'),
  ('taylor', 'Mobile UX Patterns',         88, 'Palette'),
  ('taylor', 'Push Notifications',         42, 'Bell'),
  ('taylor', 'App Store Optimization',     65, 'TrendingUp'),

  -- chris (6 courses)
  ('chris', 'Kubernetes Basics',           44, 'Cloud'),
  ('chris', 'Infrastructure as Code',      68, 'Code2'),
  ('chris', 'Monitoring & Alerting',       57, 'Activity'),
  ('chris', 'Linux Essentials',            83, 'Terminal'),
  ('chris', 'Network Security',            39, 'Shield'),
  ('chris', 'Site Reliability Engineering',72, 'Server'),

  -- jamie (6 courses)
  ('jamie', 'Product Management 101',      91, 'Briefcase'),
  ('jamie', 'Agile & Scrum',               66, 'RefreshCw'),
  ('jamie', 'OKRs & Goal Setting',         49, 'Target'),
  ('jamie', 'User Story Mapping',          78, 'Map'),
  ('jamie', 'Roadmap Planning',            35, 'Route'),
  ('jamie', 'Stakeholder Communication',   54, 'MessageCircle'),

  -- morgan (6 courses)
  ('morgan', 'SQL Fundamentals',           12, 'Database'),
  ('morgan', 'Data Cleaning with Pandas',  27, 'Filter'),
  ('morgan', 'Business Intelligence',      43, 'BarChart2'),
  ('morgan', 'Tableau Essentials',         58, 'Monitor'),
  ('morgan', 'A/B Testing Basics',         34, 'TestTube2'),
  ('morgan', 'Excel for Analysts',         70, 'Table'),

  -- riley (6 courses)
  ('riley', 'Rust Programming',            86, 'Code2'),
  ('riley', 'WebAssembly',                 61, 'Cpu'),
  ('riley', 'Compiler Design',             45, 'Layers'),
  ('riley', 'Operating Systems',           93, 'HardDrive'),
  ('riley', 'Distributed Systems',         74, 'Network'),
  ('riley', 'Cryptography Fundamentals',   38, 'Lock'),

  -- casey (6 courses)
  ('casey', 'Prompt Engineering',          81, 'Brain'),
  ('casey', 'LangChain & LLM Apps',        56, 'Link'),
  ('casey', 'Embeddings & Vector DBs',     47, 'Database'),
  ('casey', 'Fine-Tuning Models',          23, 'Sliders'),
  ('casey', 'AI Ethics & Safety',          89, 'Shield'),
  ('casey', 'Retrieval-Augmented Gen.',    62, 'Search'),

  -- drew (6 courses)
  ('drew', 'Figma Mastery',                73, 'Palette'),
  ('drew', 'Design Tokens',                50, 'Droplets'),
  ('drew', 'Prototyping for Devs',         88, 'Layers'),
  ('drew', 'Component Libraries',          41, 'Package'),
  ('drew', 'Dark Mode Design',             64, 'Moon'),
  ('drew', 'Typography Systems',           30, 'Type')
) as seed(student_slug, title, progress, icon_name)
where not exists (
  select 1 from courses
  where courses.student_slug = seed.student_slug
    and courses.title = seed.title
);