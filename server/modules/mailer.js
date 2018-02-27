const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yohai.roz@gmail.com ',
        pass: '200188138'
    }
});


const groups = [
    {
        name: 'Gastroenterologists',
        contacts: [
            'yohai.roz@gmail.com',
            'odedgruber@gmail.com',
            'sam.elfassy@gmail.com',
            'dan.nayot@gmail.com'

        ]
    },
    {
        name: 'REIs',
        contacts: [
            'y.o.h.ai.r.o.z@gmail.com',
            'o.d.e.d.g.r.u.b.er@gmail.com',
            's.a.m.e.l.f.a.s.s.y@gmail.com',
            'd.a.n.n.a.y.o.t@gmail.com'
        ]
    }
];


module.exports = {


    send: function (surveyId, surveyName, groupId) {


        // let promises = [];
        // for (let i = 0; i < fromUser.length; i++) {
        //     promises.push(new Promise(function (resolve, reject) {
        //         mail.sendMail({
        //             from: 'KeyOps <contact@keyops.co>',
        //             to: fromUser[i].email,
        //             subject: 'Seller Matched',
        //             template: 'SellerMatch',
        //             context: {
        //                 user: fromUser[i].Name,
        //                 username: offer.owner.username,
        //                 OfferName: offer.name,
        //                 category: offer.category
        //             }
        //         }, function (err, info) {
        //             if (err) {
        //                 reject(err)
        //             } else {
        //                 resolve(info)
        //             }
        //         });
        //     }));
        // }
        //



        return new Promise(function (resolve, reject) {

            let group = groups[groupId];
            if (!group) {
                return reject('no group')
            }


           let  url = (id, user) =>
                `<p>Please share the following link with the relevant participants:</p><p><a href="http://keyops.herokuapp.com/display/${id}/${user}">Start the survey</a></p>`;


            let promises = group.contacts.map(contact =>
                new Promise(function (resolve, reject) {

                    let mailOptions = {
                        from: 'contact@keyops.com', // sender address
                        to: contact, // list of receivers
                        subject: `Survey ${surveyName} is ready!`, // Subject line
                        html: url(surveyId, encodeURIComponent(contact).replace(/\./g, '%2E'))
                    };


                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return reject(error);
                        }

                        console.log('Message sent: %s', info.messageId);
                        // Preview only available when sending through an Ethereal account
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

                        return resolve();
                    });
                }));


            Promise.all(promises)
                .then(resolve, reject);

        })
    }
};