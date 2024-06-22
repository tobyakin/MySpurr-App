const messages = ref([
  {
    id: 1,
    recieverID: 0;
    name: "jenny rio",
    clicked: false,
    logo: "",
    mail: "google@inquiry.com",
    company: "Google",
    thread: [
      {
        id: 01,
        subject: "Work inquiry from google",
        senderID: user_id,
        message: ``,
        to: "",
        cc: "",
        bcc: "",
        attachment: [{
          fileName: "details.pdf",
          size: '2kb'
        }],
        status: "primary",
        date: "",
        timeStamp: "",
      },
    ],
  },
  {
    id: 2,
    recieverID: 010;
    name: "janat firdaus",
    clicked: false,
    logo: "",
    mail: "holmes@inquiry.com",
    company: "Holmes",
    thread: [
      {
        id: 21,
        subject: "Work inquiry from google",
        senderID: 010,
        message: ``,
        to: "",
        cc: "",
        bcc: "",
        attachment: [{
          fileName: "details.pdf",
          size: '2kb'
        }],
        status: "primary",
        date: "",
        timeStamp: "",
      },
      {
        id: 22,
        subject: "Work inquiry from google",
        senderID: user_id,
        message: ``,
        to: "",
        cc: "",
        bcc: "",
        attachment: [{
          fileName: "details.pdf",
          size: '2kb'
        }],
        status: "read",
        date: "",
        timeStamp: "",
      },
    ],
  },
  
])