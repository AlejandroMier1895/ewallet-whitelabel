export default function({ $axios }) {
    const MockAdapter = require('axios-mock-adapter');
    const mock = new MockAdapter($axios);

    mock.onGet('/balance').reply(config => {
        config.headers = config.headers || {}; // prevención por si algún interceptor accede a Authorization
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([200, { balance }]);
            }, 1500); // 1500 ms de delay
        });
    });

    mock.onGet('/accounting').reply(config => {
        config.headers = config.headers || {}; // prevención por si algún interceptor accede a Authorization
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([200, { income: "34000.50", outcome: "15230.20" }]);
            }, 1500); // 1500 ms de delay
        });
    });

    mock.onGet('/pie_charts').reply(config => {
        config.headers = config.headers || {}; // prevención por si algún interceptor accede a Authorization
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([200, { transfers: 2000.0, deposits: 5000.60, withdraws: 3000.30, purchases: 10000.0 }]);
            }, 1500); // 1500 ms de delay
        });
    });

    mock.onGet('/contacts').reply(config => {
        config.headers = config.headers || {}; // prevención por si algún interceptor accede a Authorization
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([200, contacts]);
            }, 1500); // 1500 ms de delay
        });
    });

    mock.onGet('/transactions').reply(config => {
        config.headers = config.headers || {}; // prevención por si algún interceptor accede a Authorization
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([200, transactions]);
            }, 1500); // 1500 ms de delay
        });
    });

    mock.onPost('/login').reply(config => {
        config.headers = config.headers || {}; // Prevención

        return [
            200,
            {
                user: {
                    id: 290,
                    document_number: "123534",
                    document_type: "CC",
                    validation_code: "100268",
                    ewallet_id: "0780134670",
                    debit_card: "0780134670",
                    credit_card: "2342912317",
                    phone: "2291231234",
                    clabe: "229123123429123123",
                    email: "alejandro@ewallet.com",
                    account_name: "Alejandro Mier Fernández",
                    country: "",
                    referral: "",
                    kyc: 2,
                    fee: "",
                    is_active: true,
                    is_master: false,
                    master_account: "",
                    date_of_birth: "1995-01-18",
                    create_date: "2024-10-07T13:54:44.168273-05:00",
                    name: "Alejandro",
                    profile_picture: "/img/ewallet-profilePicture.png",
                    paternal_surname: "Mier",
                    maternal_surname: "Fernández",
                    twofactor: false,
                    business_name: "Alex's Empire",
                    account_level: 2,
                    account_type: 1,
                    step_onboarding: 6,
                    gender: 1,
                    type_of_person: 2,
                    country_code: 52
                }
            }
        ];
    });
    mock.onPost('/add-contact').reply(config => {
        const { nickname } = JSON.parse(config.data);

        const newId = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
        const ewallet_id = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const email = `${nickname.toLowerCase()}@ewallet.com`;
        const phone = Math.floor(1000 + Math.random() * 9000000).toString();
        const profile_picture = `/img/ewallet-unknown-profilePicture.png`;
        const max_amount = 50000;

        const newContact = {
            id: newId,
            ewallet_id,
            contact_user_email: email,
            nickname,
            phone,
            profile_picture,
            max_amount
        };

        contacts.unshift(newContact);

        return [200, { message: 'Contacto agregado correctamente', contact: newContact }];
    });

    mock.onPost('/transfer').reply(config => {
        const { amount, user } = JSON.parse(config.data);

        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        const transfer_date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        const trans_id = Math.random().toString(36).substring(2, 6).toUpperCase();
        const description = 'transferencia';

        const newTransaction = {
            transfer_date,
            amount: parseFloat(amount).toFixed(2),
            transaction_type: "Ewallet Transfer",
            detail_type: null,
            transaction_status: "Exitoso",
            sender_name: "Alejandro Mier Fernández",
            description,
            recipient: user,
            trans_id,
            is_qr_transaction: false,
            flow_type: "Sent",
        };

        // Agregar la transacción al principio del arreglo
        transactions.unshift(newTransaction);

        // Restar el monto al balance
        balance -= parseFloat(amount);


        return [200, { message: 'Transacción hecha correctamente', transaction: newTransaction }];
    });

    let balance = 76894.00;
    let contacts = [{
            id: 1,
            ewallet_id: "0347513819",
            contact_user_email: "sofia@ewallet.com",
            nickname: "Sofy",
            phone: "1234",
            profile_picture: "/img/ewallet-sofy-profilePicture.png",
            max_amount: 50000
        },
        {
            id: 2,
            ewallet_id: "1347513819",
            contact_user_email: "Roberto@ewallet.com",
            nickname: "Robert",
            phone: "12345",
            profile_picture: "/img/ewallet-robert-profilePicture.png",
            max_amount: 50000
        },
        {
            id: 3,
            ewallet_id: "2347513819",
            contact_user_email: "Vanessa@ewallet.com",
            nickname: "Vane",
            phone: "123456",
            profile_picture: "/img/ewallet-vane-profilePicture.png",
            max_amount: 50000
        },
        {
            id: 4,
            ewallet_id: "3347513819",
            contact_user_email: "Carlos@ewallet.com",
            nickname: "Charly",
            phone: "1234567",
            profile_picture: "/img/ewallet-charly-profilePicture.png",
            max_amount: 50000
        },
    ];

    let transactions = [{
            transfer_date: "2025-05-23 17:56:14",
            amount: "2000.00",
            transaction_type: "Ewallet Transfer",
            detail_type: null,
            transaction_status: "Exitoso",
            sender_name: "Alejandro Mier Fernández",
            description: "Test",
            trans_id: "HY47",
            is_qr_transaction: false,
            flow_type: "sent",
        },
        {
            transfer_date: "2025-05-23 17:56:14",
            amount: "350.00",
            transaction_type: "Ewallet Transfer",
            detail_type: null,
            transaction_status: "Pendiente",
            sender_name: "Tony",
            description: "Test",
            trans_id: "HY47",
            is_qr_transaction: false,
            flow_type: "Recieved",
        },
        {
            transfer_date: "2025-05-23 17:56:14",
            amount: "8000.00",
            transaction_type: "Compra",
            detail_type: null,
            transaction_status: "Exitoso",
            sender_name: "Tony",
            description: "Netflix",
            trans_id: "HY47",
            is_qr_transaction: false,
            flow_type: "Sent",
        },
    ]
}