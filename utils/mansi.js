function genToken (userData){
    const token = jwt.sign(userData, JWT)
    return token;
}
