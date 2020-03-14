create table conta(
id bigint not null auto_increment,
nome varchar(60) not null,
numero_conta int not null,
agencia int not null,
cheque_especial_liberado tinyint(1) not null,
saldo varchar(15),
cheque_especial varchar(15),
taxa varchar(4),
primary key (id)
)engine=InnoDB default charset=utf8;