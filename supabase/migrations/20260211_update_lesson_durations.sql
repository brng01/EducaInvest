-- Update durations for lessons 1, 2, and 3 based on real audio length

-- Aula 1: 02:35
UPDATE lessons
SET duration = '02:35'
WHERE id = 1;

-- Aula 2: 01:40
UPDATE lessons
SET duration = '01:40'
WHERE id = 2;

-- Aula 3: 02:08
UPDATE lessons
SET duration = '02:08'
WHERE id = 3;
