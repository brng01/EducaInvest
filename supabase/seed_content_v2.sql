-- =================================================================================
-- AUTOMATIZAÇÃO DE NÍVEIS POR XP
-- Este script cria a lógica no banco de dados para atualizar o "Nível" do usuário
-- automaticamente sempre que o XP mudar.
-- =================================================================================

-- 1. Cria a função que calcula o nível
CREATE OR REPLACE FUNCTION public.calculate_level()
RETURNS TRIGGER AS $$
BEGIN
    -- Lógica de níveis baseada na Gamificação
    IF NEW.xp_total < 501 THEN
        NEW.current_level := 'Iniciante';
    ELSIF NEW.xp_total < 1501 THEN
        NEW.current_level := 'Poupador';
    ELSIF NEW.xp_total < 3001 THEN
        NEW.current_level := 'Investidor';
    ELSIF NEW.xp_total < 6001 THEN
        NEW.current_level := 'Analista';
    ELSE
        NEW.current_level := 'Mestre';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Remove o gatilho antigo se existir (para evitar duplicidade)
DROP TRIGGER IF EXISTS trigger_update_level ON public.perfis;

-- 3. Cria o novo gatilho
CREATE TRIGGER trigger_update_level
BEFORE INSERT OR UPDATE OF xp_total ON public.perfis
FOR EACH ROW
EXECUTE FUNCTION public.calculate_level();

-- 4. Força a atualização de todos os usuários atuais para aplicar a nova lógica
-- Isso vai disparar o trigger para cada linha existente
UPDATE public.perfis SET xp_total = xp_total;
