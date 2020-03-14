# projeto-conta-bancaria

Ferramentas utilizadas:
- MySql
- Spring Boot
- React

### Para a execução do projeto:
1. Subir uma instância do Mysql
```
docker pull mysql:5.7
docker run --name NOME_DA_INSTANCIA -p 3306:3306 -e MYSQL_ROOT_PASSWORD=SENHA_DO_ROOT -d mysql:5.7
```

2. Adicionar no arquivo **projeto-conta-bancaria/contas-bancarias/src/main/resources/application.properties** a senha do root do MySql
```
spring.datasource.password=SENHA_DO_ROOT
```

3. Na pasta raíz do projeto executar o Spring
```
./mvnw spring-boot:run
```

4. Acessar o sistema
```
http://localhost:8080/
```
# Utilização
Devido alguns dados serem inseridos no banco como **String** :eyes: as seguintes constraints devem ser seguidas:

- Ao Criar ou Alterar uma Conta o campo **Taxa** deve ser inserido como no exemplo **2,00**

- Valores monetários devem ser no padrão **99.999,99** utilizando o **"."** para o milhar e **","** para centavos

# Endpoints da API

Collection resource de Contas:
```
GET http://localhost:8080/contas
```
Single resource de Conta:
```
GET http://localhost:8080/contas/{numeroConta}
```
Adicionar uma Conta:
```
POST http://localhost:8080/contas/

{
    "nome": "????",
    "numeroConta": 123456,
    "agencia": 1234,
    "taxa": "1,00"
}

```
Alterar uma Conta:
```
PUT http://localhost:8080/contas/

{
    "nome": "????",
    "numeroConta": 123456,
    "agencia": 1234,
    "taxa": "1,00"
}
```
Remover Conta:
```
DELETE http://localhost:8080/contas/{numeroConta}
```
Liberar Cheque Especial:
```
PUT http://localhost:8080/contas/{numeroConta}/cheque-especial
{
  "chequeEspecial": "1.150,99"
}
```
Alterar Saldo:
```
PUT http://localhost:8080/contas/{numeroConta}/saldo
{
  "valor": "1.000,00"
}
```

# Implementações futuras
- Alterar o valores monetários para BigDecimal
- Transferência entre contas
- Depośito
- Saque
- Histórico de transações
- Busca paginada com filtro
- Validação de campos
- Desativação de ChequeEspecial
- Melhorias nas views
- Conteinerizar
