const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);

  
});

test('Testando cadastro de três respostas e a funções get_pergunta e get_resposta', () => {
  const pergunta1 = modelo.cadastrar_pergunta('1 + 1 = ?');
  const pergunta2 = modelo.cadastrar_pergunta('2 + 2 = ?');
  const pergunta3 = modelo.cadastrar_pergunta('3 + 3 = ?');

  modelo.cadastrar_resposta(pergunta1, '2');
  modelo.cadastrar_resposta(pergunta2, '4');
  modelo.cadastrar_resposta(pergunta3, '6');

  const perguntas = modelo.listar_perguntas();
  const resposta1 = modelo.get_respostas(pergunta1);
  const resposta2 = modelo.get_respostas(pergunta2);
  const resposta3 = modelo.get_respostas(pergunta3);

  expect(resposta1[0].texto).toBe('2'); 
  expect(resposta2[0].texto).toBe('4'); 
  expect(resposta3[0].texto).toBe('6');   

  const teste = modelo.get_pergunta(pergunta1);

  expect(teste.texto).toBe('1 + 1 = ?');
  
})