const API_PUBLIC_KEY = '88520bd95bbd738e4948a69e362fea08';
const API_SECRET_KEY = 'a9afa6cc77d12ffc37972a10f45d5d80';
const TEMPLATE_ID = 324830;

const mailjet = require('node-mailjet')
    .connect(API_PUBLIC_KEY, API_SECRET_KEY)


const groups = [
    {
        name: 'Gastroenterologists',
        contacts: [

            {
                "Email": "jeff.mosko@gmail.com",
                "Name": "Dr. Jeffrey Mosko"
            },
            {
                "Email": "Taliazenlea@gmail.com",
                "Name": "Dr. Talia Zenlea"
            },
            {
                "Email": "lindsay.crabbe@medportal.ca",
                "Name": "Dr. Lindsay Crabbe"
            },
            {
                "Email": "ian@gibookman.com",
                "Name": "Dr. Ian Bookman"
            },
            {
                "Email": "jonathonspringer1@gmail.com",
                "Name": "Dr.Jonathon Springer"
            },
            {
                "Email": "xenodet@gmail.com",
                "Name": "Dr.Ted Xenodemetropoulos"
            },
            {
                "Email": "Svoglis@hotmail.com",
                "Name": "Dr.Stefan Voglis"
            },
            {
                "Email": "abbasmerali@gmail.com",
                "Name": "Dr.Abbas Merali"
            },
            {
                "Email": "Lee_roth@hotmail.com",
                "Name": "Dr.Lee Roth"
            },
            {
                "Email": "sam.elfassy@gmail.com",
                "Name": "Dr.Sam Elfassy"
            },
        ]
    },
    {
        name: 'REIs',
        contacts: [
            {
                "Email": "mikehartman3@hotmail.com",
                "Name": "Dr. Mike Hartman"
            },
            {
                "Email": "jigalh@hotmail.com",
                "Name": "Dr. Jigal Haas"
            },
            {
                "Email": "binserri@gmail.com",
                "Name": "Dr. Abdulrahman Alserri"
            },
            {
                "Email": "dgurau@gmail.com",
                "Name": "Dr. David Gurau"
            },
            {
                "Email": "ruthronn@gmail.com",
                "Name": "Dr. Ruthie Ronn"
            },
            {
                "Email": "kaajal.abrol@gmail.com",
                "Name": "Dr. Kaajal Abrol"
            },
            {
                "Email": "Claire.Jones@sinaihealthsystem.ca",
                "Name": "Dr. Claire Jones"
            },
            {
                "Email": "ashleygilman@gmail.com",
                "Name": "Dr. Ashley Gilman"
            },
            {
                "Email": "caitlinmhdunne@yahoo.ca",
                "Name": "Dr. Caitlin Dunne"
            },
            {
                "Email": "dan.nayot@gmail.com",
                "Name": "Dr. Dan Nayot"
            },
        ]
    },

    {
        name: 'Admin',
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
                            "domain": process.env.DOMAIN || 'keyops.io',
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