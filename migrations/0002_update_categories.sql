-- =========================================
-- Portal Educativo IA & Tecnologia
-- Atualização de Categorias - Conforme Design
-- Data: 2025-09-17
-- =========================================

-- Remover categorias antigas (manter IDs baixos para compatibilidade)
DELETE FROM categories WHERE id > 6;

-- Atualizar categorias existentes para as especificações dos designs
UPDATE categories SET name = 'Espiritual & Contemplativo', slug = 'espiritual-contemplativo', 
       description = 'Imagens que evocam espiritualidade, contemplação e conexão divina através da IA', 
       color = '#8b5cf6', icon = 'fas fa-pray' WHERE id = 1;

UPDATE categories SET name = 'Futurista & Tecnológico', slug = 'futurista-tecnologico', 
       description = 'Visões futurísticas, tecnologia avançada e elementos holográficos', 
       color = '#06b6d4', icon = 'fas fa-robot' WHERE id = 2;

UPDATE categories SET name = 'Arte Digital & Criativa', slug = 'arte-digital-criativa', 
       description = 'Expressões artísticas criadas por IA, estilos únicos e experimentais', 
       color = '#ec4899', icon = 'fas fa-palette' WHERE id = 3;

UPDATE categories SET name = 'Natureza & Orgânico', slug = 'natureza-organico', 
       description = 'Paisagens naturais, elementos orgânicos e harmonia com a natureza', 
       color = '#10b981', icon = 'fas fa-leaf' WHERE id = 4;

UPDATE categories SET name = 'Arquitetura & Espaços', slug = 'arquitetura-espacos', 
       description = 'Arquitetura futurística, design de interiores e espaços inovadores', 
       color = '#f59e0b', icon = 'fas fa-building' WHERE id = 5;

UPDATE categories SET name = 'Retratos & Humanidade', slug = 'retratos-humanidade', 
       description = 'Retratos gerados por IA, expressões humanas e diversidade cultural', 
       color = '#ef4444', icon = 'fas fa-user-friends' WHERE id = 6;

-- Inserir novas categorias conforme especificações
INSERT INTO categories (id, name, slug, description, color, icon, sort_order) VALUES 
(7, 'Divino & Transcendental', 'divino-transcendental', 'Representações do divino, transcendência e mistérios espirituais', '#6366f1', 'fas fa-star', 7),
(8, 'Holográfico & Virtual', 'holografico-virtual', 'Elementos holográficos, realidade virtual e interfaces futurísticas', '#14b8a6', 'fas fa-cube', 8),
(9, 'Conceitual & Abstrato', 'conceitual-abstrato', 'Arte conceitual, formas abstratas e interpretações únicas da IA', '#a855f7', 'fas fa-shapes', 9),
(10, 'Sci-Fi & Fantasia', 'sci-fi-fantasia', 'Ficção científica, mundos fantásticos e criaturas imaginárias', '#3b82f6', 'fas fa-rocket', 10);

-- Atualizar estatísticas globais
UPDATE global_stats SET stat_value = 10 WHERE stat_name = 'total_categories';