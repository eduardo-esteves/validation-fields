/**
 * validation-fields.ts
 * @version: v1.0
 * @author: Eduardo Esteves
 * @description: Uma biblioteca abrangente para validar campos de formulário, projetada para evitar conflitos
 * com outras bibliotecas no mesmo projeto.
 *
 * Este projeto em andamento nasceu de um módulo anterior chamado 'valid-form.ts', que pode ser encontrado no
 * seguinte link: https://github.com/eduardo-esteves/typescript-trainning/blob/main/src/functions/valid-form.ts
 *
 * A necessidade constante de desenvolvedores escreverem funções de validações JavaScript repetidamente para cada
 * novo projeto, me inspirou em desenvolvero esta biblioteca. O objetivo é centralizar uma ampla variedade de
 * validações em um único pacote, aderindo a boas práticas de programação, como a aplicação de clean code, para
 * tornar as validações fáceis de testar e reutilizar em diversos contextos, facilitando em seus testes unitarios.
 */

interface validateFields {
  isNull: (input: any) => boolean
  isUndefined: (input: any) => boolean
  notInitializeds: (inputs: any[]) => boolean
  email: (input: string) => boolean
  text: (input: string) => boolean
  isNumber: (input: any) => boolean
  date: (input: string, format?: string) => boolean
  isLandline: (input: string) => boolean
  isCellPhone: (input: string) => boolean
}

const validForm = (): validateFields => {
  return {
    /**
     * Validate if the input informed is of type null
     *
     * @author Eduardo Esteves
     *
     * @param {any} input
     *
     * @return {boolean}
     */
    isNull (input: any): boolean {
      return input === null
    },

    /**
     * Validate if the input informed is of type undefined
     *
     * @author Eduardo Esteves
     *
     * @param {any} input
     *
     * @return {boolean}
     */
    isUndefined (input: any): boolean {
      return typeof input === 'undefined'
    },

    /**
     * Validate if the are some input who is not initialized
     *
     * @author Eduardo Esteves
     *
     * @param {any[]} inputs
     *
     * @return {boolean}
     */
    notInitializeds (inputs: any[]): boolean {
      return inputs.some((valor) => valor === '' || this.isNull(valor) || this.isUndefined(valor))
    },

    /**
     * Validate if the input informed is an email valid
     *
     * @author Eduardo Esteves
     *
     * @param {string} input
     *
     * @return {boolean}
     */
    email (input: string): boolean {
      const email = input.replace(/^\s+|\s+$/, '')
      const filter = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/i

      return !!(filter.test(email))
    },

    /**
     * Validate if input informed is a text valid
     *
     * @author Eduardo Esteves
     *
     * @param {string} input
     *
     * @return {boolean}
     */
    text (input: string): boolean {
      const num = Number(input)
      const isString = !Number.isInteger(num)

      const filter = /^[\wà-ú]{2,}\s?.+$/i
      const text = input.trim().replace(/\s{1,}/g, '')

      return isString && !!(filter.test(text))
    },

    /**
     * Valida se o input informado é Numérico
     * Obs não faz distinção do seu tipo '1' == 1
     * @author Eduardo Esteves
     *
     * @param {any} input
     *
     * @return {boolean}
     */
    isNumber (input: any) {
      const regex = /^[0-9]+$/
      return regex.test(input)
    },

    /**
     * Validate if the input informed is a date valid
     *
     * @author Eduardo Esteves
     *
     * @param {string} input
     *
     * @return {boolean}
     */
    date (input: string, format = 'db'): boolean {
      const now = new Date()

      switch (format) {
        case 'pt': {
          const dateBr = input.split('/')

          if (!Array.isArray(dateBr) || dateBr.length !== 3) {
            return false
          }

          const date = `${dateBr[2]}-${dateBr[1]}-${dateBr[0]}`
          const dateInfo = new Date(`${date} ${now.toLocaleTimeString()}`)

          if (dateInfo.getTime() > now.getTime()) {
            return false
          }

          return true
        }

        default: {
          const dateInfo = new Date(`${input} ${now.toLocaleTimeString()}`)

          if (dateInfo.getTime() > now.getTime()) {
            return false
          }

          return true
        }
      }
    },

    /**
     * Valida se o input informado é um Telefone Residencial válido
     *
     * @author Eduardo Esteves
     *
     * @param {string} input
     *
     * @return {boolean}
     */
    isLandline (input: string) {
      input = input.replace(/[^0-9]+/g, '')
      if (!this.isNumber(input)) {
        return false
      }
      const regex = /^[1-9]{2}[2-5]{1}[0-9]{3}[0-9]{4}$/
      return regex.test(input)
    },

    /**
     * Valida se o input informado é um Telefone Celular válido
     *
     * @author Eduardo Esteves
     *
     * @param {string} input
     *
     * @return {boolean}
     */
    isCellPhone (input: string) {
      input = input.replace(/[^0-9]+/g, '')
      if (!this.isNumber(input)) {
        return false
      }
      const regex = /^[1-9]{2}[6-9]{1}[0-9]{8}$/
      return regex.test(input)
    }

  }
}

export default validForm
