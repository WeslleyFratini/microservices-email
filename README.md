# Mail Service

- O usuário importa uma lista de destinatários de um CSV e os coloca em uma tag
- O usuário deve poder visualizar os inscritos de uma tag específica
- O suário dever poder enviar mensagens para um inscrito em uma ou mais tags
- O usuário dever poder acompannhar o progresso de envio para os detinatários

# Requisitos Funcionais 

- Enviar mensagem para uma ou mais tags
- Listar inscritos em uma ou mais tags
- Vizualização do progresso de envio (concluído/não conluido)

# Requisitos não funcionais

- Utilizar Amazon SES - Amazon Simple Email Server
- Utilizar MongoDB
- Utilizar Express
- Utilizar serviço de mensagem (Redis)

# Regra de Negócio

- Na importação, se a tag não existir ela deve ser criada
- Na importação, se o usuário não existri, só vamos veicula-lo com a tag
- Na importação deve permitir múltiplas tags


