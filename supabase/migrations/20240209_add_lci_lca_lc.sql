-- Add LCI/LCA (Combined) and LC terms
-- We assume these should be associated with an appropriate lesson (e.g. Renda Fixa or Lesson 04)

DO $$
DECLARE
    v_lesson_id BIGINT;
BEGIN
    -- Try to find Lesson 04 (or similar Renda Fixa lesson)
    SELECT id INTO v_lesson_id FROM public.lessons WHERE title_short LIKE '%04%' OR order_index = 4 LIMIT 1;

    -- Fallback to Lesson 03 if 04 not found
    IF v_lesson_id IS NULL THEN
        SELECT id INTO v_lesson_id FROM public.lessons WHERE order_index = 3 LIMIT 1;
    END IF;

    IF v_lesson_id IS NOT NULL THEN
        -- Insert LCI / LCA (Combined)
        INSERT INTO public.terms (lesson_id, acronym, name, explanation_full, explanation_simple, example, tip, category)
        VALUES (
            v_lesson_id,
            'LCI/LCA',
            'Letras de Crédito (Imobiliário e Agronegócio)',
            'São títulos de renda fixa emitidos por bancos para financiar os setores Imobiliário (LCI) e do Agronegócio (LCA). A principal vantagem de ambos é a isenção de Imposto de Renda para pessoas físicas.',
            'Você empresta dinheiro ao banco para financiar imóveis ou agro, e não paga imposto sobre o lucro.',
            'CDB 100% CDI (com imposto) vs LCI 90% CDI (isenta). Muitas vezes a LCI ganha.',
            'Compare sempre a taxa líquida! Ótimo para médio prazo (vencimento em 90 dias ou mais).',
            'Renda Fixa'
        );

        -- Insert LC
        INSERT INTO public.terms (lesson_id, acronym, name, explanation_full, explanation_simple, example, tip, category)
        VALUES (
            v_lesson_id,
            'LC',
            'Letra de Câmbio',
            'Título emitido por "financeiras" (instituições menores que bancos). Por ser de instituições menores, costuma oferecer rentabilidade maior que CDBs de grandes bancos, mas possui o mesmo risco coberto pelo FGC.',
            'Empresta para financeiras. Risco um pouco maior, retorno maior, mas tem garantia do FGC.',
            'LC pagando 120% do CDI pode valer a pena se estiver dentro do limite do FGC.',
            'Não confunda com Letra de Câmbio (moeda). Aqui é investimento!',
            'Renda Fixa'
        );
    END IF;
END $$;
