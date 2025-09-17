-- =========================================
-- Portal Educativo IA & Tecnologia
-- Dados de Seed (Dados Iniciais)
-- Data: 2025-09-17
-- =========================================

-- Limpar dados existentes para reset limpo
DELETE FROM global_stats;
DELETE FROM comments;
DELETE FROM user_favorites;
DELETE FROM showcase_tags;
DELETE FROM tutorial_tags;
DELETE FROM ai_image_tags;
DELETE FROM ai_showcases;
DELETE FROM tutorials;
DELETE FROM ai_images;
DELETE FROM tags;
DELETE FROM categories;
DELETE FROM users;

-- =========================================
-- 1. USUÁRIOS DE EXEMPLO
-- =========================================

INSERT INTO users (id, email, name, avatar_url, bio, role, profile_data) VALUES 
(1, 'silvio@portal-ia.com', 'Silvio Portal IA', 'https://via.placeholder.com/150/6366f1/ffffff?text=SP', 
 'Analista de Informação, pesquisador de tecnologias aplicadas à vida e às pessoas, tecnólogo e matemático.', 'admin',
 '{"skills": ["IA", "Machine Learning", "Políticas Públicas"], "linkedin": "silvio-portal-ia", "github": "silvio-ai"}'),

(2, 'ana.santos@email.com', 'Ana Santos', 'https://via.placeholder.com/150/8b5cf6/ffffff?text=AS',
 'Especialista em Computer Vision e Deep Learning. PhD em Ciência da Computação.', 'moderator',
 '{"skills": ["Computer Vision", "PyTorch", "OpenCV"], "university": "USP"}'),

(3, 'carlos.dev@email.com', 'Carlos Developer', 'https://via.placeholder.com/150/06b6d4/ffffff?text=CD',
 'Desenvolvedor Full-Stack especializado em aplicações de IA. Criador de chatbots inteligentes.', 'user',
 '{"skills": ["Python", "JavaScript", "NLP"], "github": "carlos-ai-dev"}'),

(4, 'maria.pesq@email.com', 'Maria Pesquisadora', 'https://via.placeholder.com/150/10b981/ffffff?text=MP',
 'Pesquisadora em IA aplicada à educação. Especialista em sistemas adaptativos de aprendizagem.', 'user',
 '{"skills": ["Educational AI", "Learning Analytics", "Research"], "orcid": "0000-0000-0000-0000"}');

-- =========================================
-- 2. CATEGORIAS PRINCIPAIS
-- =========================================

INSERT INTO categories (id, name, slug, description, color, icon, sort_order) VALUES 
(1, 'Machine Learning', 'machine-learning', 'Algoritmos de aprendizado de máquina, redes neurais e modelos preditivos', '#3b82f6', 'fas fa-cogs', 1),
(2, 'Computer Vision', 'computer-vision', 'Processamento de imagens, reconhecimento de objetos e análise visual', '#10b981', 'fas fa-eye', 2),
(3, 'Natural Language Processing', 'nlp', 'Processamento de linguagem natural, chatbots e análise de texto', '#8b5cf6', 'fas fa-comments', 3),
(4, 'Robótica', 'robotica', 'Robôs inteligentes, automação e sistemas embarcados com IA', '#f59e0b', 'fas fa-robot', 4),
(5, 'Data Science', 'data-science', 'Análise de dados, visualização e descoberta de padrões', '#ef4444', 'fas fa-chart-bar', 5),
(6, 'Deep Learning', 'deep-learning', 'Redes neurais profundas, CNNs, RNNs e arquiteturas avançadas', '#6366f1', 'fas fa-brain', 6);

-- Subcategorias
INSERT INTO categories (id, name, slug, description, color, icon, parent_id, sort_order) VALUES 
(7, 'CNNs', 'cnns', 'Redes Neurais Convolucionais para visão computacional', '#10b981', 'fas fa-layer-group', 2, 1),
(8, 'GANs', 'gans', 'Redes Adversárias Generativas para criação de conteúdo', '#8b5cf6', 'fas fa-magic', 2, 2),
(9, 'Transformers', 'transformers', 'Arquiteturas Transformer para NLP e além', '#8b5cf6', 'fas fa-language', 3, 1),
(10, 'Chatbots', 'chatbots', 'Assistentes virtuais e sistemas conversacionais', '#8b5cf6', 'fas fa-robot', 3, 2);

-- =========================================
-- 3. TAGS DO SISTEMA
-- =========================================

INSERT INTO tags (id, name, slug, color) VALUES 
-- Tags técnicas
(1, 'Python', 'python', '#3776ab'),
(2, 'TensorFlow', 'tensorflow', '#ff6f00'),
(3, 'PyTorch', 'pytorch', '#ee4c2c'),
(4, 'OpenCV', 'opencv', '#5c3ee8'),
(5, 'Scikit-learn', 'scikit-learn', '#f7931e'),
(6, 'Keras', 'keras', '#d00000'),
(7, 'Hugging Face', 'hugging-face', '#ffcc00'),
(8, 'DALL-E', 'dall-e', '#00d4aa'),
(9, 'Midjourney', 'midjourney', '#1a1a1a'),
(10, 'Stable Diffusion', 'stable-diffusion', '#8b5cf6'),

-- Tags de nível
(11, 'Iniciante', 'iniciante', '#10b981'),
(12, 'Intermediário', 'intermediario', '#f59e0b'),
(13, 'Avançado', 'avancado', '#ef4444'),

-- Tags de aplicação
(14, 'Educação', 'educacao', '#3b82f6'),
(15, 'Saúde', 'saude', '#ef4444'),
(16, 'Finanças', 'financas', '#10b981'),
(17, 'Arte Digital', 'arte-digital', '#8b5cf6'),
(18, 'Jogos', 'jogos', '#f59e0b'),
(19, 'Automação', 'automacao', '#6366f1'),
(20, 'Pesquisa', 'pesquisa', '#64748b');

-- =========================================
-- 4. IMAGENS DE IA PARA GALERIA
-- =========================================

INSERT INTO ai_images (id, title, description, prompt_used, ai_model, image_url, thumbnail_url, user_id, category_id, status, is_featured, view_count, like_count) VALUES 
(1, 'Paisagem Futurística com IA', 'Uma visão impressionante de uma cidade do futuro com elementos de inteligência artificial integrados na arquitetura', 
 'futuristic cityscape with AI elements, neon lights, flying cars, holographic displays, cyberpunk style, ultra detailed, 8k', 
 'DALL-E 3', 'https://via.placeholder.com/800x600/6366f1/ffffff?text=Paisagem+Futurística', 
 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Paisagem+Thumb', 2, 2, 'approved', 1, 547, 89),

(2, 'Retrato Neural Artístico', 'Retrato criado por IA combinando estilos clássicos com elementos neurais abstratos',
 'neural network portrait, abstract art style, colorful synapses, digital brain, artistic interpretation, high resolution',
 'Midjourney v6', 'https://via.placeholder.com/800x800/8b5cf6/ffffff?text=Retrato+Neural',
 'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Retrato+Thumb', 3, 6, 'approved', 1, 423, 67),

(3, 'Robô Educacional Interativo', 'Visualização de um robô amigável projetado para auxiliar no ensino de programação para crianças',
 'friendly educational robot, colorful design, teaching programming to children, classroom setting, warm lighting, approachable',
 'Stable Diffusion XL', 'https://via.placeholder.com/700x500/10b981/ffffff?text=Robô+Educacional',
 'https://via.placeholder.com/350x250/10b981/ffffff?text=Robô+Thumb', 4, 4, 'approved', 0, 298, 45),

(4, 'Visualização de Dados Neurais', 'Representação artística de como uma rede neural processa informações visuais',
 'neural network data visualization, flowing data streams, abstract brain connections, scientific art, blue and purple tones',
 'DALL-E 3', 'https://via.placeholder.com/900x600/06b6d4/ffffff?text=Visualização+Neural',
 'https://via.placeholder.com/450x300/06b6d4/ffffff?text=Visual+Thumb', 1, 5, 'approved', 1, 672, 134),

(5, 'Chatbot Assistente Médico', 'Conceito visual de um assistente de IA para área médica com interface holográfica',
 'medical AI assistant, holographic interface, hospital environment, doctor using AI, futuristic medicine, clean design',
 'Midjourney v6', 'https://via.placeholder.com/800x600/ef4444/ffffff?text=Assistente+Médico',
 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Médico+Thumb', 2, 3, 'approved', 0, 356, 78);

-- =========================================
-- 5. TUTORIAIS EDUCATIVOS
-- =========================================

INSERT INTO tutorials (id, title, slug, description, content, difficulty, estimated_time, author_id, category_id, status, is_featured, view_count, like_count) VALUES 
(1, 'Introdução ao Machine Learning com Python', 'intro-ml-python', 
 'Aprenda os conceitos fundamentais de Machine Learning e como implementar seu primeiro modelo usando Python e Scikit-learn',
 '# Introdução ao Machine Learning\n\n## O que é Machine Learning?\n\nMachine Learning é uma área da inteligência artificial...\n\n## Configurando o Ambiente\n\n```python\nimport pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\n```\n\n## Seu Primeiro Modelo\n\nVamos criar um modelo simples de classificação...', 
 'beginner', 45, 1, 1, 'published', 1, 1247, 189),

(2, 'Criando Imagens com IA Generativa', 'criando-imagens-ia-generativa',
 'Tutorial completo sobre como usar modelos de IA generativa para criar imagens impressionantes',
 '# Gerando Imagens com IA\n\n## Introdução às GANs\n\nRedes Adversárias Generativas (GANs) revolucionaram...\n\n## Usando Stable Diffusion\n\n```python\nfrom diffusers import StableDiffusionPipeline\nimport torch\n\npipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")\n```',
 'intermediate', 60, 2, 2, 'published', 1, 934, 156),

(3, 'Construindo um Chatbot com NLP', 'chatbot-nlp-tutorial',
 'Aprenda a construir um chatbot inteligente usando técnicas modernas de processamento de linguagem natural',
 '# Chatbot com NLP\n\n## Preparando os Dados\n\nPrimeiro, vamos preparar nosso dataset de conversas...\n\n## Usando Transformers\n\n```python\nfrom transformers import AutoTokenizer, AutoModelForCausalLM\n\ntokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")\n```',
 'intermediate', 90, 3, 3, 'published', 0, 567, 89),

(4, 'Deep Learning para Visão Computacional', 'deep-learning-computer-vision',
 'Guia avançado para implementar redes neurais convolucionais para reconhecimento de imagens',
 '# CNNs para Visão Computacional\n\n## Arquiteturas Fundamentais\n\nVamos explorar as principais arquiteturas...\n\n## Implementando uma CNN\n\n```python\nimport tensorflow as tf\nfrom tensorflow.keras import layers, models\n\nmodel = models.Sequential([\n    layers.Conv2D(32, (3, 3), activation="relu", input_shape=(224, 224, 3))\n])\n```',
 'advanced', 120, 4, 2, 'published', 1, 445, 67);

-- =========================================
-- 6. PROJETOS SHOWCASE
-- =========================================

INSERT INTO ai_showcases (id, title, slug, description, ai_type, technology_stack, demo_url, github_url, creator_id, category_id, status, view_count, star_count) VALUES 
(1, 'EduBot - Assistente Educacional Inteligente', 'edubot-assistente-educacional',
 'Chatbot especializado em educação que adapta seu estilo de ensino baseado no perfil do aluno. Utiliza NLP avançado para compreender dúvidas e fornecer explicações personalizadas.',
 'chatbot', '["Python", "Transformers", "FastAPI", "React", "PostgreSQL"]',
 'https://edubot-demo.example.com', 'https://github.com/silvio-ai/edubot', 1, 3, 'approved', 892, 67),

(2, 'VisionAnalyzer - Análise Inteligente de Imagens Médicas', 'vision-analyzer-medical',
 'Sistema de IA para análise automatizada de exames de imagem médica. Auxilia radiologistas na detecção precoce de anomalias usando CNNs especializadas.',
 'computer_vision', '["PyTorch", "OpenCV", "Flask", "Vue.js", "MongoDB"]',
 'https://vision-analyzer.example.com', 'https://github.com/ana-santos/vision-analyzer', 2, 2, 'featured', 1456, 134),

(3, 'SmartCode - Gerador de Código com IA', 'smartcode-gerador-codigo',
 'Ferramenta que gera código automaticamente baseado em descrições em linguagem natural. Suporta múltiplas linguagens de programação.',
 'code_generation', '["Python", "Transformers", "CodeT5", "Streamlit", "Redis"]',
 'https://smartcode.example.com', 'https://github.com/carlos-dev/smartcode', 3, 1, 'approved', 734, 89),

(4, 'LearnPath AI - Personalização de Trilhas de Aprendizado', 'learnpath-ai-personalizacao',
 'Sistema que cria trilhas de aprendizado personalizadas usando algoritmos de recomendação baseados em IA. Analisa o progresso do aluno em tempo real.',
 'recommendation_system', '["Python", "Scikit-learn", "Django", "React", "Redis", "Celery"]',
 'https://learnpath-ai.example.com', 'https://github.com/maria-pesq/learnpath-ai', 4, 1, 'approved', 623, 78);

-- =========================================
-- 7. RELACIONAMENTOS TAGS
-- =========================================

-- Tags para imagens
INSERT INTO ai_image_tags (image_id, tag_id) VALUES 
(1, 8), (1, 17), (1, 12), -- Paisagem Futurística: DALL-E, Arte Digital, Intermediário
(2, 9), (2, 17), (2, 13), -- Retrato Neural: Midjourney, Arte Digital, Avançado
(3, 10), (3, 14), (3, 19), (3, 11), -- Robô Educacional: Stable Diffusion, Educação, Automação, Iniciante
(4, 8), (4, 20), (4, 12), -- Visualização Neural: DALL-E, Pesquisa, Intermediário
(5, 9), (5, 15), (5, 12); -- Chatbot Médico: Midjourney, Saúde, Intermediário

-- Tags para tutoriais
INSERT INTO tutorial_tags (tutorial_id, tag_id) VALUES 
(1, 1), (1, 5), (1, 11), (1, 14), -- Intro ML: Python, Scikit-learn, Iniciante, Educação
(2, 10), (2, 17), (2, 12), -- Imagens IA: Stable Diffusion, Arte Digital, Intermediário
(3, 1), (3, 7), (3, 12), -- Chatbot: Python, Hugging Face, Intermediário
(4, 2), (4, 4), (4, 13); -- Deep Learning: TensorFlow, OpenCV, Avançado

-- Tags para showcases
INSERT INTO showcase_tags (showcase_id, tag_id) VALUES 
(1, 1), (1, 7), (1, 14), -- EduBot: Python, Hugging Face, Educação
(2, 3), (2, 4), (2, 15), -- VisionAnalyzer: PyTorch, OpenCV, Saúde
(3, 1), (3, 7), (3, 19), -- SmartCode: Python, Hugging Face, Automação
(4, 1), (4, 5), (4, 14); -- LearnPath: Python, Scikit-learn, Educação

-- =========================================
-- 8. ESTATÍSTICAS GLOBAIS
-- =========================================

INSERT INTO global_stats (stat_name, stat_value) VALUES 
('total_images', 5),
('total_tutorials', 4),
('total_showcases', 4),
('total_users', 4),
('total_categories', 10),
('total_tags', 20),
('featured_images', 3),
('featured_tutorials', 3),
('total_views', 8756),
('total_likes', 1247);

-- =========================================
-- 9. COMENTÁRIOS DE EXEMPLO
-- =========================================

INSERT INTO comments (content, user_id, item_id, item_type) VALUES 
('Imagem incrível! O nível de detalhe é impressionante. Que prompt você usou exatamente?', 3, 1, 'image'),
('Muito útil este tutorial! Consegui implementar meu primeiro modelo seguindo os passos.', 4, 1, 'tutorial'),
('Este projeto é exatamente o que eu estava procurando para minha pesquisa. Parabéns!', 1, 2, 'showcase'),
('A qualidade artística desta imagem é fantástica. Como você conseguiu esse estilo único?', 2, 2, 'image'),
('Excelente explicação sobre GANs! Quando vai lançar a segunda parte?', 3, 2, 'tutorial');

-- =========================================
-- FINALIZAÇÃO
-- =========================================

-- Atualizar contadores de uso das tags
UPDATE tags SET usage_count = (
    SELECT COUNT(*) FROM ai_image_tags WHERE tag_id = tags.id
) + (
    SELECT COUNT(*) FROM tutorial_tags WHERE tag_id = tags.id
) + (
    SELECT COUNT(*) FROM showcase_tags WHERE tag_id = tags.id
);

-- Commit das alterações
-- (O SQLite faz commit automaticamente)