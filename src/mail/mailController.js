const nodemailer = require('nodemailer');
const auth = require('../auth/authController');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt = require('bcrypt');

module.exports = {
	async sendCode(req, res) {
		const { email } = req.body;

		if (!email) {
			res.status(422).send('Você deve definir email');
		}

		const usuario = await User.findOne({ email: req.body.email });

		if (!usuario) {
			res.status(404).send('Usuário não encontrado!');
		} else {
			let diferenca;
			if (usuario.codigoRecuperacao != null) {
				diferenca = new Date(
					new Date().getTime() - usuario.dataCodigo.getTime()
				);
			} else {
				diferenca = new Date(new Date().getTime());
			}
			if (diferenca.getTime() / 1000 >= 900) {
				const code = getCodigoRecuperacao(usuario._id);
				sendMail(usuario.nome, usuario.email, code);
				User.findByIdAndUpdate(usuario._id, {
					codigoRecuperacao: code,
					dataCodigo: new Date(),
				})
					.then((data) => {
						console.log(data);
						res.status(200).send('Email enviado com sucesso!');
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				res
					.status(400)
					.send(
						'Você já possui um código em vigor! Aguarde 15 minutos para gerar outro código!'
					);
			}
		}
	},
	async verifyCode(req, res) {
		const { code, senha } = req.body;

		if (!code && !senha) {
			res.status(422).send('Você deve enviar um código');
		}

		const usuario = await User.findOne({ codigoRecuperacao: code });
		if (!usuario) {
			res.status(404).send('Código inválido!');
		} else {
			let diferenca;
			diferenca = new Date(new Date().getTime() - usuario.dataCodigo.getTime());

			if (diferenca.getTime() / 1000 < 900) {
				const salt = bcrypt.genSaltSync();
				const encode = bcrypt.hashSync(senha, salt);

				User.findByIdAndUpdate(usuario._id, {
					senha: encode,
					codigoRecuperacao: null,
					dataCodigo: null,
				})
					.then((data) => {
						console.log(data);
						res.status(200).send('Senha alterada com sucesso!');
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				res.status(400).send('Tempo expirado, solicite um novo código');
			}
		}
	},
};

const sendMail = (name, email, code) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: 'contato99pets@outlook.com',
			pass: '99pets123',
		},
	});

	const mailOptions = {
		from: '99 Pets <contato99pets@outlook.com>',
		to: email,
		subject: 'Redefinição de senha',
		text: `Prezado(a) ${name},

Recebemos uma solicitação para redefinir a senha de sua conta. Para continuar o processo de redefinição, enviamos um código de segurança que você deve inserir no campo apropriado ao acessar sua conta.

Seu código de segurança é: ${code}

Lembre-se de que este código é válido por um período limitado de tempo. Portanto, recomendamos que você o utilize imediatamente para evitar que expire.

Se você não solicitou uma redefinição de senha, por favor, entre em contato conosco imediatamente, para que possamos tomar medidas de segurança e proteger sua conta.

Agradecemos por usar nossos serviços e estamos disponíveis para qualquer dúvida ou suporte que você possa precisar.

Atenciosamente,
Gabriel Feijó
Developer at 99 Pets`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email enviado: ' + info.response);
		}
	});
};

const getCodigoRecuperacao = (id) => {
	var today = new Date();
	var day = today.getDate() + '';
	var month = today.getMonth() + 1 + '';
	var year = today.getFullYear() + '';
	var hour = today.getHours() + '';
	var minutes = today.getMinutes() + '';
	var seconds = today.getSeconds() + '';

	day = checkZero(day);
	month = checkZero(month);
	year = checkZero(year);
	hour = checkZero(hour);
	minutes = checkZero(minutes);
	seconds = checkZero(seconds);

	return day + month + year + hour + minutes + seconds + id;
};

const checkZero = (data) => {
	if (data.length == 1) {
		data = '0' + data;
	}
	return data;
};
