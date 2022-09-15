const handleSignin = (req, res, db, bcrypt) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            //console.log(data);
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            //console.log(isValid);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        // console.log(user[0]);
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get the user inf0'));
            } else {
                return res.json('incorect combination')
            }
        })
        .catch(err => res.status(400).json('data error'))
}

module.exports = {
    handleSignin: handleSignin
}