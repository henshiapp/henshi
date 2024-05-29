export const getEmailConfirmationBody = (username: string, url: string) => {
    return `
Olá, <b>${username}</b>!<br /><br />

Temos o prazer de recebê-lo! Antes de começar sua jornada, precisamos verificar sua conta. Siga estas etapas para concluir o processo de verificação:<br /><br />

Clique no link abaixo para verificar sua conta:<br />
<a href="${url}">Confirmar email</a><br /><br />

Se o link não for clicável, você pode copiar e colar este URL em seu navegador:<br />
${url}<br /><br />

Após a verificação, você terá acesso a todos os recursos gratuitos no Trilha Investidor.<br /><br />

Se você encontrar algum problema ou tiver dúvidas, nossa equipe de suporte está aqui para ajudar. Basta entrar em contato conosco em contato@trilhainvestidor.com.br.<br /><br />

Bem vindo a bordo!<br /><br />

Atenciosamente,<br />
Equipe Trilha Investidor
            `;
};
