const userController = require('./controllers/userController')
const crypto = require('crypto');

const nonce = () => {
    let text = '';
    let selection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (i=0; i<20; i++) {
            text += selection.charAt(Math.floor(Math.random()*selection.length));
        };
    return text;
}

module.exports = (app) => {

	app.get('/', (req, res) => {
        res.sendFile(path.join( __dirname, 'build'));
      });

    app.post('/signup', (req, res) => {
        let userInfo = req.body
        let sessid = crypto.createHash('sha256').update(`${nonce()+Date.now()}`).digest('hex')

        userController.userSignUp(userInfo, sessid)
        .then((response, sessid) => {
            console.log('/signup RESPONSE: ', response, sessid)
            res.cookie('sessid', sessid).send(response)
        })
        .catch((error) => {console.log(error)});
    });
      
};