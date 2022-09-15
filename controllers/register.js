const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission')
    }
    const hashPassword = bcrypt.hashSync(password);
    /*   bcrypt.hash(password, null, null, function (err, hash) {
          console.log(hash);
      }); */
    db.transaction(trx => {
        trx.insert({
            hash: hashPassword,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}