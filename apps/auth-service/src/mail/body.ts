export const getEmailConfirmationBody = (username: string, url: string) => {
    return `
Dear ${username},

Thank you for registering for Henshi! We are excited to have you join us.

To confirm your email, please click on the link below to verify your account:

<a href="${url}">Verify account</a><br /><br />

If you have any questions, feel free to contact us at contact@henshi.com.

Welcome aboard!

Best,
Henshi Team
contact@henshi.com
`;
};
