let config;
if (process.env.NODE_ENV !== 'production') {
    config = require('./config');
}

let DBUSER, DBPWD;
if (process.env.NODE_ENV === 'production') {
    DBUSER = process.env.DBUSER;
    DBPWD = process.env.DBPWD;
} else {
    DBUSER = config.DBUSER;
    DBPWD = config.DBPWD;
}

const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors());
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${DBUSER}:${DBPWD}@ds155492.mlab.com:55492/flashlinks`);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const FlashlinkSchema = new Schema({
    id: ObjectId,
    url: { type: String, required: true },
    flash: { type: String, required: true, unique: true },
    expiry: { type: Number, required: true }
});

const FlashlinkModel = mongoose.model('Flashlink', FlashlinkSchema);

router.use((request, response, next) => {
    console.log('API was used!');
    // TODO: Write log of API use to DB
    next();
});

// Default route to check if API is alive
router.get('/', (request, response) => {
    response.status(200).send();
});

router.route('/createLink')
    .post((request, response) => {
        const flash = createFlash();
        let url = request.body.url;
        const lifetime = request.body.lifetime;

        // Only proceed if required parameters have been supplied
        if (!url || !lifetime) {
            return response.status(400).send({
                status: 'failure',
                message: 'ParamError: Invalid parameters provided.'
            });
        }

        // Validate the URL
        if (!/^([w]{3}.)?[a-zA-Z\-]{3,}.[a-z]{2,3}$/.test(url)) {
            return response.status(400).send({
                status: 'failure',
                message: 'UrlError: Invalid url format.'
            });
        }

        // TODO: Validate the lifetime

        // Append https:// to the URL if protocol is not present
        if (!/^http(s?)\:\/\//.test(url)) {
            url = `https://${url}`;
        }

        const expiry = Date.now() + lifetime * 1000;

        const NewFlash = new FlashlinkModel({
            url: url,
            flash: flash,
            expiry: expiry
        });

        NewFlash.save((err) => {
            if (err) {
                return response.status(500).send({
                    status: 'failure',
                    message: 'SaveError: Could not save new flashlink.'
                });
            }
            response.status(200).send({
                status: 'success',
                message: 'Successfully saved a new flashlink.',
                url: url,
                flash: flash,
                expiry: expiry
            });
        });
    });

router.route('/retrieve/:flash')
    .get((request, response) => {
        const flash = request.params.flash;
        
        if (flash.length !== 7) {
            return response.status(400).send({
                status: 'failure',
                message: 'FlashError: Invalid flashlink.'
            });
        }

        const flashQuery = FlashlinkModel.find({ flash: flash });
        flashQuery.exec((err, docs) => {

            if (err || !docs) {
                response.status(404).send({
                    status: 'failure',
                    reason: 'not found',
                    message: 'NotFoundError: Flashlink does not exist.'
                });
                return;
            }

            if (docs[0] === undefined) {
                response.status(404).send({
                    status: 'failure',
                    reason: 'not found',
                    message: 'NotFoundError: Flashlink does not exist.'
                });
                return;
            }

            const url = docs[0].url;
            const expiryDate = docs[0].expiry;

            if (Date.now() > expiryDate) {
                response.status(400).send({
                    status: 'failure',
                    reason: 'expired',
                    message: 'ExpiredError: This flashlink has expired.'
                });
                return;
            }

            response.status(200).send({
                status: 'success',
                url: url,
                message: 'Successfully retrieved corresponding URL.'
            });

        });

    });


app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./spa/dist/'));
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, './spa/dist/index.html'));
    });
} else {
    app.use(express.static(path.join(__dirname, 'spa/dist/')));
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'spa/dist/index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Purge stale links on a daily basis
setInterval(purgeCallback, 86400000);

//// Utilities
// Creates a flashlink identifier
function createFlash() {
    let flash = '';
    const alphanumerals = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 7; i++) {
        flash += alphanumerals.charAt(Math.floor(Math.random() * alphanumerals.length));
    }
    return flash;
}

function purgeCallback() {
    // TODO: If links have been expired for 5 days, purge them.
    console.log(`Purging stale data...`);
}
