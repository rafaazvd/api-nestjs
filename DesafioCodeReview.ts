function processNumbers(items: number[]): number {
  let total = 0;

  items.forEach((item) => {
    if (item > 0) {
      total += item;
      console.log(`${item} is a positive number`);
    }
  });

  return total;
}

const numbers = [1, -2, 3, -4, 5];
const result = processNumbers(numbers);
console.log('Total:', result);
/*
Melhorias implementadas
- Uso de Template Literals: Para simplificar a concatenação de strings.
- Uso de let e const: Variáveis locais agora têm escopo de bloco.
- Combinação de loops: A lógica foi condensada em um único loop forEach.
*/
