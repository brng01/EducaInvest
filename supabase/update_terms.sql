-- Atualização dos termos Ativos e Passivos para melhor clareza

-- Atualizar Ativos
UPDATE terms
SET 
  explanation_full = 'Bens ou investimentos que geram renda para você, independentemente do seu trabalho (Renda Passiva). Ex: Ações, Fundos Imobiliários, Negócios.',
  explanation_simple = 'Coisas que colocam dinheiro no seu bolso.',
  example = 'Um imóvel alugado gera dinheiro todo mês sem você trabalhar nele constantemente.',
  tip = 'Comece comprando ativos baratos como Cotas de Fundos Imobiliários.',
  category = 'conceitos'
WHERE name ILIKE 'Ativos';

-- Atualizar Passivos
UPDATE terms
SET 
  explanation_full = 'Bens ou dívidas que geram despesas constantes, tirando dinheiro do seu bolso. Ex: Financiamentos, Carro de uso pessoal, Casa de praia parada.',
  explanation_simple = 'Coisas que tiram dinheiro do seu bolso.',
  example = 'Um carro financiado gera juros, IPVA, seguro e gasolina.',
  tip = 'Evite contrair dívidas para comprar passivos que não se pagam.',
  category = 'conceitos'
WHERE name ILIKE 'Passivos';
