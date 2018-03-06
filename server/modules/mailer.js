const API_PUBLIC_KEY = '88520bd95bbd738e4948a69e362fea08';
const API_SECRET_KEY = 'a9afa6cc77d12ffc37972a10f45d5d80';
const TEMPLATE_ID = 324830;

const mailjet = require('node-mailjet')
    .connect(API_PUBLIC_KEY, API_SECRET_KEY)


const groups = [
    {
        name: 'Testers',
        contacts: [
            {
                "Email": "yohai.roz@gmail.com",
                "Name": "Yohai"
            },
            {
                "Email": "odedgruber@gmail.com",
                "Name": "Oded"
            },
            {
                "Email": "sam.elfassy@gmail.com",
                "Name": "Sam"
            },
            {
                "Email": "dan.nayot@gmail.com",
                "Name": "Dan"
            }
        ]
    },
    {
        name: 'Gastroenterologists',
        contacts: [
            {
                "Email": "yohai.roz@gmail.com",
                "Name": "Yohai"
            },
            {
                "Email": "yohairosen@gmail.com",
                "Name": "Moshe"
            }

        ]
    },
    {
        name: 'REIs',
        contacts: [
            'y.o.h.ai.r.o.z@gmail.com'
        ]
    }
];
//
// const groups = [
//     {
//         name: 'Gastroenterologists',
//         contacts: [
//             'yohai.roz@gmail.com',
//             'odedgruber@gmail.com',
//             'sam.elfassy@gmail.com',
//             'dan.nayot@gmail.com'
//
//         ]
//     },
//     {
//         name: 'REIs',
//         contacts: [
//             'y.o.h.ai.r.o.z@gmail.com',
//             'o.d.e.d.g.r.u.b.er@gmail.com',
//             's.a.m.e.l.f.a.s.s.y@gmail.com',
//             'd.a.n.n.a.y.o.t@gmail.com'
//         ]
//     }
// ];


module.exports = {


    send: function (surveyId, clientId, surveyName, groupId) {

        let group = groups[groupId];
        if (!group)
            return Promise.reject('Provided group does not exist');

        return mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages": group.contacts.map(contact => ({
                        "From": {
                            "Email": "sam@keyops.io",
                            "Name": "Sam"
                        },
                        "To": [contact],
                        "TemplateID": TEMPLATE_ID,
                        "TemplateLanguage": true,
                        "Subject": "A new survey is ready for submission!",
                        "Variables": {
                            "survey_name": surveyName,
                            "survey_id": surveyId,
                            "client_id": clientId,
                            "first_name": contact.Name,
                            "user_id": Buffer.from(contact.Email).toString('base64')
                        }
                    }
                ))
            })

            .then(res => {
                return res;
            }, err => {
                return err;
            })
    }
};