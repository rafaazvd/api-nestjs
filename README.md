
# Resumo da Arquitetura e Vantagens

## Arquitetura Utilizada:
A arquitetura do projeto é baseada na **Arquitetura em Camadas** (Layered Architecture), combinada com princípios de **Clean Architecture** e **SOLID**. Essa arquitetura favorece a separação de responsabilidades, desacoplamento e testabilidade, seguindo as melhores práticas de desenvolvimento de software.

## Estrutura de Pastas:
- **src/**: Diretório principal que contém todo o código da aplicação.
  - **infra/**: Contém a infraestrutura do projeto, como configurações de banco de dados e migrações.
  - **migrations/**: Gerenciamento de versões do banco de dados com arquivos de migração.
  - **tutorials/**, **users/**: Módulos específicos que representam diferentes domínios da aplicação, cada um com seus próprios controladores, serviços, entidades, repositórios, DTOs, e testes.
  - **dto/**: Objeto de transferência de dados, utilizado para validação e transformação de dados de entrada e saída.
  - **entities/**: Contém as entidades do domínio, representando a modelagem de dados.
  - **testes**: Cobertura de testes consistente utilizando `spec.ts` para garantir a qualidade do código.

## Vantagens da Arquitetura:
### Aplicação de SOLID:
- **Single Responsibility Principle (SRP)**: Cada módulo, classe e função possui uma única responsabilidade bem definida.
- **Open/Closed Principle (OCP)**: O sistema é aberto para extensão e fechado para modificação, permitindo fácil adição de novas funcionalidades sem alterar o código existente.
- **Liskov Substitution Principle (LSP)**: As abstrações e interfaces são implementadas corretamente, garantindo que qualquer implementação de uma interface possa ser substituída por outra sem quebrar o código.
- **Interface Segregation Principle (ISP)**: Interfaces específicas são utilizadas em vez de interfaces grandes e genéricas.
- **Dependency Inversion Principle (DIP)**: O código depende de abstrações, não de implementações concretas, facilitando a inversão de dependência e promovendo o desacoplamento.

### Desacoplamento:
- O uso de **Design Patterns** como injeção de dependência, repositórios, e serviços promove o desacoplamento do código, facilitando a manutenção e evolução da aplicação.

### Consistência e Manutenibilidade:
- A divisão clara entre **Controller**, **Service**, **Repository**, e **Entities** proporciona um código mais modular e fácil de manter.
- **DTOs** garantem que a entrada e saída de dados sejam validadas e transformadas de forma consistente, reduzindo erros e facilitando o tratamento de dados.

### Testabilidade:
- A arquitetura facilita a criação de testes unitários e de integração. A cobertura de testes consistente aumenta a confiabilidade do sistema e ajuda a prevenir regressões.

### Dockerização:
- A utilização do **Docker** permite a fácil replicação do ambiente de desenvolvimento em qualquer máquina, garantindo consistência entre desenvolvimento, testes e produção.

### Documentação com Swagger:
- A integração com **Swagger** facilita a documentação da API, permitindo que outros desenvolvedores ou consumidores da API compreendam e utilizem os endpoints de forma clara e objetiva.

### Segurança:
- O uso de **AuthGuard** com **JWT** e a implementação de **CanActivate** garantem que apenas usuários autenticados e autorizados possam acessar determinadas rotas, aumentando a segurança da aplicação.

### Tratamento de Erros:
- Implementações robustas de tratamento de erros garantem que exceções sejam corretamente capturadas e tratadas, proporcionando uma experiência de usuário mais estável e amigável.

## Conclusão:
Essa arquitetura proporciona uma base sólida, escalável e sustentável para o desenvolvimento da aplicação. Ela facilita a manutenção, extensão e evolução do sistema ao longo do tempo, garantindo alta qualidade de código e segurança.

## Documentação:
- **Controller Annotations**: Os endpoints estão documentados com o `@ApiTags` e `@ApiBearerAuth`, garantindo que os endpoints apareçam na documentação Swagger e que a autenticação esteja documentada.

## Uso de Cache:
- Para aplicar cache utilizei o módulo de cache do NestJS, que fornece uma maneira fácil de implementar caching na aplicação.
- Em resumo usei para armazenar em cache os resultados da consulta de tutoriais. Isso melhora a performance das consultas, especialmente quando há filtragem e paginação envolvidas.
- O cache é gerado a partir da combinação dos filtros de título e data, juntamente com os parâmetros de paginação. Se a mesma consulta for feita novamente, o resultado é retornado do cache em vez de acessar o banco de dados.
- O TTL foi configurado para 60 segundos (1 minuto) no exemplo dado. Após esse período, o cache expira e uma nova consulta é feita ao banco de dados.

## Passos para Rodar o Docker Compose:
```bash
docker-compose up -d
```
- Crie e executa o contêiner em segundo plano.

## Migrations:
- Gera nova migration com base nas modificações nas entidades:
```bash
npm run migration:generate -name=initial
```
- Executar migrations no banco:
```bash
npm run migration:run
```
- Reverter última migration:
```bash
npm run migration:revert
```

## Executar Teste:
```bash
npm run test
```
ou 
```bash
yarn test
```

## Para acessar a Documentação:
- Acesse a documentação Swagger em:
```bash
http://localhost:4000/swagger
```

- No arquivo `example.env` estão as configurações de ambiente.

## Executando a API:
```bash
yarn dev
```
ou 
```bash
npm run dev
```
