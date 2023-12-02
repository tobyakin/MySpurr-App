import { defineStore } from 'pinia'

const useHelpStore = defineStore('help', {
  state: () => {
    return {
      //   help: [
      //     {
      //       topic: 'Opening a Kavlr account',
      //       content: 'Setting up your Kavlr account',
      //       url: 'opening-a-kavlr-account',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     },
      //     {
      //       topic: 'Invoices with Kavlr',
      //       content: 'How to create and send invoices using Kavlr',
      //       url: 'invoices-with-kavlr',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     },
      //     {
      //       topic: 'Payments with Kavlr',
      //       content: 'Accepting payments through Kavlr',
      //       url: 'payments-with-kavlr',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     },
      //     {
      //       topic: 'Expenses with Kavlr',
      //       content: 'Expense tracking with Kavlr',
      //       url: 'expenses-with-kavlr',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     },
      //     {
      //       topic: 'Bookkeeping with Kavlr',
      //       content: 'Managing bookkeeping tasks with Kavlr',
      //       url: 'bookkeeping-with-kavlr',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     },
      //     {
      //       topic: "Kavlr's web presence",
      //       content: 'Setting up your Kavlr business profile and web presence',
      //       url: 'kavlrs-web-presence',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     },
      //     {
      //       topic: 'Kavlr currencies',
      //       content: 'Multi-currency banking with Kavlr',
      //       url: 'kavlr-currencies',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     },
      //     {
      //       topic: 'Kavlr Cards',
      //       content: "Using Kavlr's virtual and visible card features",
      //       url: 'kavlr-cards',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     },
      //     {
      //       topic: 'Kavlr payments integration',
      //       content: 'How to integrate Kavlr with other payment platforms',
      //       url: 'kavlr-payments-integration',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     },
      //     {
      //       topic: 'Troubleshooting',
      //       content: 'Troubleshooting common issues with Kavlr',
      //       url: 'trobleshooting',
      //       icon: null,
      //       articles: [
      //         {
      //           name: 'How do I create a Kavlr account?',
      //           url: 'how-do-i-create-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'What information do I need to provide to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Is there a minimum balance requirement to open a Kavlr account?',
      //           url: 'What-information-do-i-need-to-provide-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: "Can I open a Kavlr account if I'm not based in the UK?",
      //           url: 'can-i-open-a-kavlr-account-if-im-not-based-in-the-uk',
      //           content: ''
      //         },
      //         {
      //           name: 'How long does it take to open a Kavlr account?',
      //           url: 'how-long-does-it-take-to-open-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'What do I do if I have trouble opening a Kavlr account?',
      //           url: 'what-do-i-do-if-i-have-trouble-opening-a-kavlr-account',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I have multiple Kavlr accounts for different businesses?',
      //           url: 'can-i-have-multiple-kavlr-accounts-for-different-businesses',
      //           content: ''
      //         },
      //         {
      //           name: 'Are there any fees associated with opening a Kavlr account?',
      //           url: 'are-there-any-fees-associated-with-opening-a-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'How do I close my Kavlr account?',
      //           url: 'how-do-i-close-my-kavlr-account?',
      //           content: ''
      //         },
      //         {
      //           name: 'Can I reopen a closed Kavlr account?',
      //           url: 'can-i-reopen-a-closed-kavlr-account?',
      //           content: ''
      //         }
      //       ]
      //     }
      //   ],
      help: [
        {
          name: 'Account Creation',
          content: `<p>Welcome to MySpurr! If you're new here, creating an account is a breeze. Follow these steps to get started:
          </p><p class="mt-4">Visit MySpurr Sign-Up Page
          </p><p>Click on "Sign Up" and enter your email address.
          </p><p>Choose a strong password and complete the required fields.
          </p><p>Verify your email address through the confirmation email we'll send you.
          </p>`,
          showContent: false
        },

        {
          name: 'Profile Management',
          content: '',
          showContent: false
        },
        {
          name: 'Password and Security',
          content: '',
          showContent: false
        }
      ],
      gettingStarted: [
        {
          name: 'Onboarding Process',
          content: '',
          showContent: false
        },

        {
          name: 'Platform Navigation',
          content: '',
          showContent: false
        },
        {
          name: 'Frist Project Setup',
          content: '',
          showContent: false
        }
      ],
      jobManagement: [
        {
          name: 'Posting a Job',
          content: '',
          showContent: false
        },

        {
          name: 'Invoice Managament',
          content: '',
          showContent: false
        },
        {
          name: 'Managing Jobs',
          content: '',
          showContent: false
        }
      ],
      payments: [
        {
          name: 'Payment Methods',
          content: '',
          showContent: false
        },

        {
          name: 'Billing Issues',
          content: '',
          showContent: false
        },
        {
          name: 'Transaction History',
          content: '',
          showContent: false
        }
      ],
      policies: [
        {
          name: 'Terms of Service',
          content: '',
          showContent: false
        },

        {
          name: 'Community Guidelines',
          content: '',
          showContent: false
        },
        {
          name: 'Privacy Policy',
          content: '',
          showContent: false
        }
      ],
      communication: [
        {
          name: 'Messaging System',
          content: '',
          showContent: false
        },

        {
          name: 'Notifications',
          content: '',
          showContent: false
        },
        {
          name: 'Alerts and Updates',
          content: '',
          showContent: false
        }
      ]
    }
  },
  getters: {
  },
  actions: {
    toogleFaq(index) {
      this.help.map((item) => {
        item.showContent = false
      })

      this.help[index].showContent = !this.help[index].showContent
    }
  }
})

export default useHelpStore
