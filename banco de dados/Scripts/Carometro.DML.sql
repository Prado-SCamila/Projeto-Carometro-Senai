USE Carometro

INSERT INTO Turma(Nome)
VALUES			 ('DEV Manhã'),
				 ('DEV tarde'),
				 ('Redes Manhã'),
				 ('Redes Tarde')

INSERT INTO Aluno(IdTurma, Nome, Email, Telefone, Foto)
VALUES			 ('1', 'André', 'andre.senai@email.com', '11 95432-2351', 'D:\Documents\WorldUnited.gg\Screenshots\nfsw624.png'),
				 ('2', 'Carlos', 'carlos.senai@email.com', '11 98758-5832', 'D:\Documents\WorldUnited.gg\Screenshots\nfsw624.png'),
				 ('3', 'Camila', 'camila.senai@email.com', '11 99012-6475', 'D:\Documents\WorldUnited.gg\Screenshots\nfsw624.png'),
				 ('4', 'Danilo', 'danilo.senai@email.com', '11 95767-2514', 'D:\Documents\WorldUnited.gg\Screenshots\nfsw624.png')

INSERT INTO TipoUsuario(Nome)
VALUES				   ('Administrador'),
					   ('Colaborador')


INSERT INTO Usuario(IdTipoUsuario, Nome, Email, Senha)
VALUES			   ('1', 'Paulo', 'paulo.senai@email.com', '12345'),
				   ('1', 'Priscila', 'priscila.senai@eail.com', '67890'),
				   ('2', 'Saulo', 'saulo.senai@email.com', '51432'),
				   ('2', 'Caique', 'caique.senai@email.com', '60978'),
				   ('2', 'Possarle', 'possarle.senai@email.com', '25314')

		   SELECT * FROM Turma;
		   SELECT * FROM Usuario;