-- Shorten "Tabela Regressiva" to "Tab. Regressiva" in Lesson 04 Table
-- And ensure the term is matched

DO $$
DECLARE
    v_term_id BIGINT;
BEGIN
    -- 1. Find the term "Tabela Regressiva"
    SELECT id INTO v_term_id FROM public.terms WHERE name = 'Tabela Regressiva' LIMIT 1;

    IF v_term_id IS NOT NULL THEN
        -- Add "Tab. Regressiva" to acronyms (if not already there)
        -- Assuming acronym field can hold it. If currently null, set it.
        UPDATE public.terms 
        SET acronym = CASE 
            WHEN acronym IS NULL OR acronym = '' THEN 'Tab. Regressiva'
            WHEN acronym LIKE '%Tab. Regressiva%' THEN acronym
            ELSE acronym || '/Tab. Regressiva'
        END
        WHERE id = v_term_id;
    END IF;

    -- 2. Update Lesson 04 Transcript
    -- Replace "Sim ( Tabela Regressiva )" with "Tab. Regressiva" to save space
    UPDATE public.lessons
    SET transcript_html = REPLACE(transcript_html, 'Sim ( Tabela Regressiva )', 'Tab. Regressiva')
    WHERE title_short LIKE '%04%' OR order_index = 4;

    -- Also try a variant with less spaces just in case
    UPDATE public.lessons
    SET transcript_html = REPLACE(transcript_html, 'Sim (Tabela Regressiva)', 'Tab. Regressiva')
    WHERE title_short LIKE '%04%' OR order_index = 4;

END $$;
