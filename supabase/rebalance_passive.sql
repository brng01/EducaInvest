-- Rebalanceamento de Renda Passiva - Empire Builder
-- Objetivo: Tornar o início do jogo mais rápido e acessível, reduzindo o custo dos itens passivos.

-- 1. Cofrinho de Moedas (De 150 para 30) - Redução drástica para início imediato
UPDATE public.empire_items SET base_cost = 30 WHERE name = 'Cofrinho de Moedas';

-- 2. Poupança Digital (De 900 para 400) - Mais acessível após alguns cofrinhos
UPDATE public.empire_items SET base_cost = 400 WHERE name = 'Poupança Digital';

-- 3. Tesouro Selic (De 4000 para 2000) - Redução de 50%
UPDATE public.empire_items SET base_cost = 2000 WHERE name = 'Tesouro Selic';

-- 4. Fundo de Renda Fixa (De 15000 para 7500)
UPDATE public.empire_items SET base_cost = 7500 WHERE name = 'Fundo de Renda Fixa';

-- 5. CDB 110% do CDI (De 60000 para 30000)
UPDATE public.empire_items SET base_cost = 30000 WHERE name = 'CDB 110% do CDI';

-- 6. Cotas de FIIs (De 200000 para 100000)
UPDATE public.empire_items SET base_cost = 100000 WHERE name = 'Cotas de FIIs';

-- 7. Ações de Dividendos (De 750000 para 350000)
UPDATE public.empire_items SET base_cost = 350000 WHERE name = 'Ações de Dividendos';

-- 8. Imóvel para Aluguel (De 3000000 para 1500000)
UPDATE public.empire_items SET base_cost = 1500000 WHERE name = 'Imóvel para Aluguel';

-- 9. Anjo Investidor (De 12000000 para 6000000)
UPDATE public.empire_items SET base_cost = 6000000 WHERE name = 'Anjo Investidor';

-- 10. Franquia de Fast Food (De 45000000 para 22000000)
UPDATE public.empire_items SET base_cost = 22000000 WHERE name = 'Franquia de Fast Food';

-- 11. Rede de Hotéis (De 180000000 para 90000000)
UPDATE public.empire_items SET base_cost = 90000000 WHERE name = 'Rede de Hotéis';

-- 12. Porto Comercial (De 800000000 para 400000000)
UPDATE public.empire_items SET base_cost = 400000000 WHERE name = 'Porto Comercial';

-- 13. Plataforma de Petróleo (De 4000000000 para 2000000000)
UPDATE public.empire_items SET base_cost = 2000000000 WHERE name = 'Plataforma de Petróleo';

-- 14. Empresa de Satélites (De 15000000000 para 7500000000)
UPDATE public.empire_items SET base_cost = 7500000000 WHERE name = 'Empresa de Satélites';

-- 15. Banco Central Privado (De 75000000000 para 35000000000)
UPDATE public.empire_items SET base_cost = 35000000000 WHERE name = 'Banco Central Privado';
