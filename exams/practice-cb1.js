// Business Finance Practice Questions Data
const questions = [
    {
        id: 1,
        question: "Calculate the present value of $1,000 received in 6 years at 5% per annum.",
        questionType: "input",
        answer: "746.22",
        solution: "PV = FV / (1+r)^n = 1000 / (1.05)^6 = 746.22"
    },
    {
        id: 2,
        question: "What is the PV of an annuity-immediate with $300 payments for 7 years at 6%?",
        questionType: "input",
        answer: "1674.71",
        solution: "PV = Payment × a_{\overline{7}|} = $300 × 5.5824 = $1674.71"
    },
    {
        id: 3,
        question: "What is the effective annual rate if nominal rate is 8% convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" },
        ],
        answer: "8.24",
        solution: "Effective rate = (1 + 0.08/4)^4 - 1 = 1.02^4 - 1 = 0.0824 = 8.24%"
    },
    {
        id: 4,
        question: "Calculate the present value of $1,000 received in 9 years at 4% per annum.",
        questionType: "input",
        answer: "702.59",
        solution: "PV = FV / (1+r)^n = 1000 / (1.04)^9 = 702.59"
    },
    {
        id: 5,
        question: "What is the PV of an annuity-immediate with $100 payments for 10 years at 6%?",
        questionType: "input",
        answer: "736.01",
        solution: "PV = Payment × a_{\overline{10}|} = $100 × 7.3601 = $736.01"
    },
    {
        id: 6,
        question: "What is the effective annual rate if nominal rate is 8% convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" },
        ],
        answer: "8.24",
        solution: "Effective rate = (1 + 0.08/4)^4 - 1 = 1.02^4 - 1 = 0.0824 = 8.24%"
    },
    {
        id: 7,
        question: "Calculate the present value of $1,000 received in 12 years at 7% per annum.",
        questionType: "input",
        answer: "444.01",
        solution: "PV = FV / (1+r)^n = 1000 / (1.07)^12 = 444.01"
    },
    {
        id: 8,
        question: "What is the PV of an annuity-immediate with $400 payments for 13 years at 6%?",
        questionType: "input",
        answer: "3541.07",
        solution: "PV = Payment × a_{\overline{13}|} = $400 × 8.8527 = $3541.07"
    },
    {
        id: 9,
        question: "What is the effective annual rate if nominal rate is 8% convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" },
        ],
        answer: "8.24",
        solution: "Effective rate = (1 + 0.08/4)^4 - 1 = 1.02^4 - 1 = 0.0824 = 8.24%"
    },
    {
        id: 10,
        question: "Calculate the present value of $1,000 received in 7 years at 6% per annum.",
        questionType: "input",
        answer: "665.06",
        solution: "PV = FV / (1+r)^n = 1000 / (1.06)^7 = 665.06"
    },
    {
        id: 11,
        question: "What is the PV of an annuity-immediate with $200 payments for 6 years at 6%?",
        questionType: "input",
        answer: "983.46",
        solution: "PV = Payment × a_{\overline{6}|} = $200 × 4.9173 = $983.46"
    },
    {
        id: 12,
        question: "What is the effective annual rate if nominal rate is 8% convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" },
        ],
        answer: "8.24",
        solution: "Effective rate = (1 + 0.08/4)^4 - 1 = 1.02^4 - 1 = 0.0824 = 8.24%"
    },
    {
        id: 13,
        question: "Calculate the present value of $1,000 received in 10 years at 5% per annum.",
        questionType: "input",
        answer: "613.91",
        solution: "PV = FV / (1+r)^n = 1000 / (1.05)^10 = 613.91"
    },
    {
        id: 14,
        question: "What is the PV of an annuity-immediate with $500 payments for 9 years at 6%?",
        questionType: "input",
        answer: "3400.85",
        solution: "PV = Payment × a_{\overline{9}|} = $500 × 6.8017 = $3400.85"
    },
    {
        id: 15,
        question: "What is the effective annual rate if nominal rate is 8% convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" },
        ],
        answer: "8.24",
        solution: "Effective rate = (1 + 0.08/4)^4 - 1 = 1.02^4 - 1 = 0.0824 = 8.24%"
    },
    {
        id: 16,
        question: "Calculate the present value of $1,000 received in 5 years at 4% per annum.",
        questionType: "input",
        answer: "821.93",
        solution: "PV = FV / (1+r)^n = 1000 / (1.04)^5 = 821.93"
    },
    {
        id: 17,
        question: "What is the PV of an annuity-immediate with $300 payments for 12 years at 6%?",
        questionType: "input",
        answer: "2515.15",
        solution: "PV = Payment × a_{\overline{12}|} = $300 × 8.3838 = $2515.15"
    },
    {
        id: 18,
        question: "What is the effective annual rate if nominal rate is 8% convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" },
        ],
        answer: "8.24",
        solution: "Effective rate = (1 + 0.08/4)^4 - 1 = 1.02^4 - 1 = 0.0824 = 8.24%"
    },
    {
        id: 19,
        question: "Calculate the present value of $1,000 received in 8 years at 7% per annum.",
        questionType: "input",
        answer: "582.01",
        solution: "PV = FV / (1+r)^n = 1000 / (1.07)^8 = 582.01"
    },
    {
        id: 20,
        question: "What is the PV of an annuity-immediate with $100 payments for 5 years at 6%?",
        questionType: "input",
        answer: "421.24",
        solution: "PV = Payment × a_{\overline{5}|} = $100 × 4.2124 = $421.24"
    },
    {
        id: 21,
        question: "What is the effective annual rate if nominal rate is 8% convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" },
        ],
        answer: "8.24",
        solution: "Effective rate = (1 + 0.08/4)^4 - 1 = 1.02^4 - 1 = 0.0824 = 8.24%"
    },
    {
        id: 22,
        question: "Calculate the present value of $1,000 received in 11 years at 6% per annum.",
        questionType: "input",
        answer: "526.79",
        solution: "PV = FV / (1+r)^n = 1000 / (1.06)^11 = 526.79"
    },
    {
        id: 23,
        question: "What is the PV of an annuity-immediate with $400 payments for 8 years at 6%?",
        questionType: "input",
        answer: "2483.92",
        solution: "PV = Payment × a_{\overline{8}|} = $400 × 6.2098 = $2483.92"
    },
    {
        id: 24,
        question: "What is the effective annual rate if nominal rate is 8% convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" },
        ],
        answer: "8.24",
        solution: "Effective rate = (1 + 0.08/4)^4 - 1 = 1.02^4 - 1 = 0.0824 = 8.24%"
    },
    {
        id: 25,
        question: "Calculate the present value of $1,000 received in 6 years at 5% per annum.",
        questionType: "input",
        answer: "746.22",
        solution: "PV = FV / (1+r)^n = 1000 / (1.05)^6 = 746.22"
    },
];
