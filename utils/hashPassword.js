import bcrypt from 'bcrypt';

const hashPassword = function(plainPassword,saltRounds = 10){
    return bcrypt.hash(plainPassword, saltRounds)
}