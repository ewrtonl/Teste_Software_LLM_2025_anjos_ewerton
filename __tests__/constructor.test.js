const { createDuration } = require('../src/createDuration');

describe('createDuration', () => {
  it('cria uma duração com milissegundos diretos', () => {
    const duration = createDuration(60000);
    expect(duration._milliseconds).toBe(60000);
  });

  it('cria uma duração com chave "days"', () => {
    const duration = createDuration(5, 'days');
    expect(duration._days).toBe(5);
  });

  it('clona uma Duration existente', () => {
    const original = createDuration(3600000);
    const clone = createDuration(original);
    expect(clone._milliseconds).toBe(original._milliseconds);
    expect(clone._days).toBe(original._days);
    expect(clone._months).toBe(original._months);
  });

  it('cria uma duração a partir de um objeto com horas e minutos', () => {
    const duration = createDuration({ hours: 2, minutes: 30 });
    expect(duration._milliseconds).toBe(9000000);
  });
});
