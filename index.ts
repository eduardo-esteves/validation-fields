import validForm from './src/validation-fields'

const data = '2023-08-04'

const result = validForm().date(data)

// eslint-disable-next-line
console.log(result)
