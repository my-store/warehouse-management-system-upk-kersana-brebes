/* ===================================================================== ###
............................................................................
............................................................................
............................................................................
   <=( String Helper )=>
............................................................................
............................................................................
............................................................................
*/
const RombaxHash = require('password-hash')

module.exports = 
{
    /* ======= | EMAIL VALIDATION | ======= */
    emailValidation : getEmail =>
    {
        const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(getEmail.match(emailFormat)) 
        {
            return true
        }
        else {
            return false
        }
    },

    /* ======= | PERCENTAGE - 0-100% | ======= */
    percentage : (partialValue, totalValue) => (100 * partialValue) / totalValue,

    /* ======= | NUMBER FORMATING | ======= */
    numberFormat : x =>
    {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },

    /* ======= | UNIQUE ID MAKER | ======= */
    makeUniqueId : length =>
    {
        let result           = []
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for(let i = 0; i < length; i++ ) 
        {
            result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
        }
        return result.join('')
    },

    /* ======= | UPPERCASE IN ALL FIRST WORD | ======= */
    upperCase : str =>
    {
        const splitStr = str.toLowerCase().split(' ')
        for(let i = 0; i < splitStr.length; i++) 
        {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
        }
        // Directly return the joined string
        return splitStr.join(' ')
    },

    /* ======= | PASSWORD CHECKING | ======= */
    checkPassword : GET_PASSWORD =>
    {
        const check_pwd = RombaxHash.verify(GET_PASSWORD.pwd, GET_PASSWORD.hashed_pwd)
        return check_pwd
    },

    /* ======= | PASSWORD MAKER | ======= */
    makePassword : GET_PASSWORD =>
    {
        const make_pwd = RombaxHash.generate(GET_PASSWORD)
        return make_pwd
    },

    /* ======= | PASSWORD MAKER | ======= */
    hashedPassword : GET_PASSWORD =>
    {
        const hashed_pwd = RombaxHash.isHashed(GET_PASSWORD)
        return hashed_pwd
    },
}