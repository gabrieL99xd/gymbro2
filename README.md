Para fazer funcionar em localhost será necessário o SQL Server , criar um banco de dados vazio e depois pegar a string de conexão e substituir no arquivo appsettings da API a chave GymBroDataBase pela conexão do seu banco.
Após isso, precisará usar os comandos do ef tools para criar as tabelas e o banco de dados. Será necessário instalar pacotes do nuget para isso.
Referência para guiar o processo https://learn.microsoft.com/en-us/ef/core/cli/dotnet
