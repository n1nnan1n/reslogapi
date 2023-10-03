module.exports = (req, res) => {

    let fname = ""
    let lname = ""
    let nname = ""
    let birthdate = ""
    let address = ""
    let email = ""
    let password = ""
    let data = req.flash('data')[0]

    if (typeof data != "undefined") {
        fname = data.fname
        lname = data.lname
        nname = data.nname
        birthdate = data.birthdate
        address = data.address
        email = data.email
        password = data.password
    }

    res.render('register', {
        errors: req.flash('validationErrors'),
        fname : fname,
        lname : lname,
        nname : nname,
        birthdate : birthdate,
        address : address,
        email: email,
        password: password
    })
}