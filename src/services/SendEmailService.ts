import nodemailer, { Transporter } from 'nodemailer'
import fs from 'fs'
import handlebars from 'handlebars'

//serviço de envio de e-mail
class SendEmailService {
  private client: Transporter // esse é nosso cliente de e-mail

  constructor(){ // conficuração do nosso cliente de email
    nodemailer.createTestAccount().then(({ smtp, user, pass })=> {
      this.client = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: { user, pass }
      })
    })
  }

  async execute(to: string, subject: string, variables: object, path: string){
    //referenciando o arquivo de template de email para o handlebars
    const templateFileContent = fs.readFileSync(path).toString('utf8') // realizar a leitura do arquivo e transforma em utf8
    const mailTemplateParser = handlebars.compile(templateFileContent) // realiza a compilação do aquivo .hbs

    //aqui passamos nossas variaveis para o html
    const html = mailTemplateParser(variables)

    // configurando o conteudo do e-mail
    const message = await this.client.sendMail({ 
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>'
    })

    console.log('Message: ', message.messageId)
    console.log('Preview URL: ', nodemailer.getTestMessageUrl(message))
  }
}

export default new SendEmailService()