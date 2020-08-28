# Portal Covid - APP

Container nginx 19 para executar interface do cliente e integração com backend

## Infraestrutura

	1 - nginx:19.1
	2 - docker-composer

## Instalação

	docker-composer up -d --build
	
## Dependência externa

	não há
	
## Dependência interna

	1 - Serviço portal-covid-backend 
	
### Portas

Container internamente roda na porta 3000 e porta externa está a 8080 

## Proxy Reverso

Bind entre as portas 8080:80.

Qualquer rota que tenha na sua URI a palavra **api/** será redirecionado para o serviço de backend do container portal-covid-backend.
As demais serão enviadas para a pasta html do próprio nginx.



