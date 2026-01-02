// Actuarial Statistics Practice Questions Data
const questions = [
    {
        id: 1,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 2,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 3,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 4,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 5,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 6,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 7,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 8,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 9,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 10,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 11,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 12,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 13,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 14,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 15,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 16,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 17,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 18,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 19,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 20,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 21,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 22,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 23,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 24,
        question: "If X ~ N(100, 25), what is P(X > 110)? (4 decimal places)",
        questionType: "input",
        answer: "0.0228",
        solution: "Z = (110-100)/5 = 2. P(X > 110) = P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228"
    },
    {
        id: 25,
        question: "If P(A) = 0.6, P(B) = 0.4, and A and B are independent, what is P(A ∩ B)?",
        questionType: "input",
        answer: "0.24",
        solution: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.4 = 0.24"
    },
    {
        id: 26,
        question: "If \\(X\\) has pdf \\(f(x)=2x\\) for \\(0\\le x\\le1\\), find \\(E[X]\\).",
        questionType: "multiple-choice",
        options: [{label:"0.5",value:"0.5"},{label:"0.6667",value:"0.6667"}],
        answer:"0.6667",
        solution:"\\[E[X]=\\int_0^1 x(2x)dx=2\\int_0^1 x^2dx=2\\cdot\\frac13=\\frac23\\]"
        },

        {
        id: 27,
        question:"If \\(P(A)=0.6\\), \\(P(B)=0.5\\), \\(P(A\\cap B)=0.3\\), find \\(P(A\\cup B)\\).",
        questionType:"multiple-choice",
        options:[{label:"0.8",value:"0.8"},{label:"0.6",value:"0.6"}],
        answer:"0.8",
        solution:"\\[P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=0.6+0.5-0.3=0.8\\]"
        },

        {
        id: 28,
        question:"Let \\(X\\sim Bin(12,0.25)\\). Find \\(E[X]\\).",
        questionType:"multiple-choice",
        options:[{label:"3",value:"3"},{label:"4",value:"4"}],
        answer:"3",
        solution:"\\[E[X]=np=12(0.25)=3\\]"
        },

        {
        id: 29,
        question:"If \\(X\\sim Poisson(4)\\), find \\(P(X=0)\\).",
        questionType:"multiple-choice",
        options:[{label:"0.0183",value:"0.0183"},{label:"0.0733",value:"0.0733"}],
        answer:"0.0183",
        solution:"\\[P(X=0)=e^{-4}=0.0183\\]"
        },

        {
        id: 30,
        question:"If \\(Var(X)=9\\) and \\(E[X]=5\\), find \\(E[X^2]\\).",
        questionType:"multiple-choice",
        options:[{label:"34",value:"34"},{label:"16",value:"16"}],
        answer:"34",
        solution:"\\[Var(X)=E[X^2]-(E[X])^2 \\Rightarrow 9=E[X^2]-25 \\Rightarrow E[X^2]=34\\]"
        },

        {
        id: 31,
        question:"Let \\(X\\sim U(2,8)\\). Find \\(E[X]\\).",
        questionType:"multiple-choice",
        options:[{label:"5",value:"5"},{label:"10",value:"10"}],
        answer:"5",
        solution:"\\[E[X]=(2+8)/2=5\\]"
        },

        {
        id: 32,
        question:"For \\(X\\sim Exp(0.5)\\), find \\(P(X>4)\\).",
        questionType:"multiple-choice",
        options:[{label:"0.1353",value:"0.1353"},{label:"0.0183",value:"0.0183"}],
        answer:"0.1353",
        solution:"\\[P(X>4)=e^{-0.5\\cdot4}=e^{-2}=0.1353\\]"
        },

        {
        id: 33,
        question:"Which distribution has the memoryless property?",
        questionType:"multiple-choice",
        options:[{label:"Exponential",value:"exp"},{label:"Normal",value:"norm"}],
        answer:"exp",
        solution:"The exponential distribution uniquely has the memoryless property."
        },

        {
        id: 34,
        question:"Let \\(X\\sim N(100,16)\\). Find \\(SD(X)\\).",
        questionType:"multiple-choice",
        options:[{label:"4",value:"4"},{label:"16",value:"16"}],
        answer:"4",
        solution:"\\[SD(X)=\\sqrt{16}=4\\]"
        },

        {
        id: 35,
        question:"If \\(X\\) and \\(Y\\) are independent, find \\(Cov(X,Y)\\).",
        questionType:"multiple-choice",
        options:[{label:"0",value:"0"},{label:"1",value:"1"}],
        answer:"0",
        solution:"Independent variables have zero covariance."
        },

        {
        id: 36,
        question:"Find \\(Var(3X)\\) if \\(Var(X)=2\\).",
        questionType:"multiple-choice",
        options:[{label:"18",value:"18"},{label:"6",value:"6"}],
        answer:"18",
        solution:"\\[Var(3X)=9Var(X)=9(2)=18\\]"
        },

        {
        id: 37,
        question:"If \\(X\\sim Bin(20,0.4)\\), find \\(Var(X)\\).",
        questionType:"multiple-choice",
        options:[{label:"4.8",value:"4.8"},{label:"8",value:"8"}],
        answer:"4.8",
        solution:"\\[Var(X)=np(1-p)=20(0.4)(0.6)=4.8\\]"
        },

        {
        id: 38,
        question:"If \\(F(x)=x^3\\) for \\(0\\le x\\le1\\), find \\(P(X<0.5)\\).",
        questionType:"multiple-choice",
        options:[{label:"0.125",value:"0.125"},{label:"0.25",value:"0.25"}],
        answer:"0.125",
        solution:"\\[F(0.5)=0.5^3=0.125\\]"
        },

        {
        id: 39,
        question:"If events A and B are independent, which is true?",
        questionType:"multiple-choice",
        options:[{label:"P(A|B)=P(A)",value:"true"},{label:"P(A|B)=P(B)",value:"false"}],
        answer:"true",
        solution:"Independence implies conditional probability equals marginal probability."
        },

        {
        id: 40,
        question:"What is the MGF of a Poisson(\\(\\lambda\\)) variable?",
        questionType:"multiple-choice",
        options:[{label:"e^{\\lambda(e^t-1)}",value:"correct"},{label:"\\lambda e^t",value:"wrong"}],
        answer:"correct",
        solution:"\\[M_X(t)=e^{\\lambda(e^t-1)}\\]"
        },

        {
        id: 41,
        question:"If \\(E[X]=4\\) and \\(E[Y]=6\\), find \\(E[2X+Y]\\).",
        questionType:"multiple-choice",
        options:[{label:"14",value:"14"},{label:"10",value:"10"}],
        answer:"14",
        solution:"\\[E[2X+Y]=2E[X]+E[Y]=8+6=14\\]"
        },

        {
        id: 42,
        question:"If \\(X\\sim U(0,10)\\), find \\(Var(X)\\).",
        questionType:"multiple-choice",
        options:[{label:"8.33",value:"8.33"},{label:"10",value:"10"}],
        answer:"8.33",
        solution:"\\[Var(X)=\\frac{(b-a)^2}{12}=\\frac{100}{12}=8.33\\]"
        },

        {
        id: 43,
        question:"If \\(P(A)=0.7\\), find \\(P(A^c)\\).",
        questionType:"multiple-choice",
        options:[{label:"0.3",value:"0.3"},{label:"0.7",value:"0.7"}],
        answer:"0.3",
        solution:"\\[P(A^c)=1-P(A)=0.3\\]"
        },

        {
        id: 44,
        question:"If \\(X\\sim Exp(1)\\), find \\(E[X]\\).",
        questionType:"multiple-choice",
        options:[{label:"1",value:"1"},{label:"2",value:"2"}],
        answer:"1",
        solution:"\\[E[X]=\\frac{1}{\\lambda}=1\\]"
        },

        {
        id: 45,
        question:"If \\(X\\sim Poisson(5)\\), find \\(Var(X)\\).",
        questionType:"multiple-choice",
        options:[{label:"5",value:"5"},{label:"25",value:"25"}],
        answer:"5",
        solution:"\\[Var(X)=\\lambda=5\\]"
        },
        {
        id: 46,
        question: "If \\(X\\sim N(0,1)\\), what is \\(P(-1 < X < 1)\\)?",
        questionType: "multiple-choice",
        options: [
        { label: "0.6827", value: "0.6827" },
        { label: "0.9545", value: "0.9545" }
        ],
        answer: "0.6827",
        solution: "For a standard normal variable, \\(P(-1<X<1)=\\Phi(1)-\\Phi(-1)=2\\Phi(1)-1=2(0.8413)-1=0.6827.\\)"
        },

        {
        id: 47,
        question: "If \\(X\\sim Bin(15,0.2)\\), find \\(P(X=0)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "0.0352", value: "0.0352" },
        { label: "0.0279", value: "0.0279" }
        ],
        answer: "0.0352",
        solution: "For a binomial variable, \\(P(X=0)=(0.8)^{15}=0.0352.\\)"
        },

        {
        id: 48,
        question: "If \\(Cov(X,Y)=3\\), \\(Var(X)=4\\), and \\(Var(Y)=9\\), find the correlation coefficient.",
        questionType: "multiple-choice",
        options: [
        { label: "0.5", value: "0.5" },
        { label: "0.25", value: "0.25" }
        ],
        answer: "0.5",
        solution: "The correlation coefficient is \\(\\rho=\\frac{Cov(X,Y)}{\\sqrt{Var(X)Var(Y)}}=\\frac{3}{\\sqrt{4\\cdot9}}=\\frac{3}{6}=0.5.\\)"
        },

        {
        id: 49,
        question: "If \\(E[X]=10\\) and \\(Var(X)=16\\), find \\(SD(X)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "4", value: "4" },
        { label: "16", value: "16" }
        ],
        answer: "4",
        solution: "Standard deviation is the square root of variance: \\(SD(X)=\\sqrt{16}=4.\\)"
        },

        {
        id: 50,
        question: "If events A and B are mutually exclusive with \\(P(A)=0.4\\) and \\(P(B)=0.3\\), find \\(P(A\\cup B)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "0.7", value: "0.7" },
        { label: "0.12", value: "0.12" }
        ],
        answer: "0.7",
        solution: "For mutually exclusive events, \\(P(A\\cup B)=P(A)+P(B)=0.4+0.3=0.7.\\)"
        },
        {
        id: 51,
        question: "Let \\(X\\) have pdf \\(f(x)=k x^2\\) for \\(0 \\le x \\le 1\\). Find \\(k\\).",
        questionType: "multiple-choice",
        options: [
        { label: "3", value: "3" },
        { label: "1/3", value: "0.333" }
        ],
        answer: "3",
        solution: "Since \\(\\int_0^1 kx^2 dx = 1\\), we have \\(k\\cdot\\frac{1}{3}=1 \\Rightarrow k=3.\\)"
        },

        {
        id: 52,
        question: "Let \\(X\\) have pdf \\(f(x)=k x^2\\) for \\(0 \\le x \\le 1\\), find \\(E[X]\\).",
        questionType: "multiple-choice",
        options: [
        { label: "0.75", value: "0.75" },
        { label: "0.6", value: "0.6" }
        ],
        answer: "0.75",
        solution: "\\[E[X]=\\int_0^1 x(3x^2)dx=3\\int_0^1 x^3dx=3\\cdot\\frac{1}{4}=0.75.\\]"
        },

        {
        id: 53,
        question: "Let \\(X\\sim Exp(0.2)\\). Find \\(P(X>5 | X>2)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "e^{-0.6}", value: "0.5488" },
        { label: "e^{-1}", value: "0.3679" }
        ],
        answer: "0.5488",
        solution: "By the memoryless property: \\(P(X>5|X>2)=P(X>3)=e^{-0.2\\cdot3}=e^{-0.6}=0.5488.\\)"
        },

        {
        id: 54,
        question: "If \\(X\\sim Bin(10,0.3)\\), find \\(P(X\\ge1)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "1-0.7^{10}", value: "0.9718" },
        { label: "0.7^{10}", value: "0.0282" }
        ],
        answer: "0.9718",
        solution: "\\[P(X\\ge1)=1-P(X=0)=1-(0.7)^{10}=0.9718.\\]"
        },

        {
        id: 55,
        question: "Let \\(X\\sim N(50,25)\\). Find \\(P(X<45)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "0.1587", value: "0.1587" },
        { label: "0.3085", value: "0.3085" }
        ],
        answer: "0.1587",
        solution: "\\[Z=\\frac{45-50}{5}=-1 \\Rightarrow P(X<45)=\\Phi(-1)=0.1587.\\]"
        },

        {
        id: 56,
        question: "If \\(E[X]=2\\), \\(Var(X)=5\\), find \\(E[(X-2)^2]\\).",
        questionType: "multiple-choice",
        options: [
        { label: "5", value: "5" },
        { label: "9", value: "9" }
        ],
        answer: "5",
        solution: "\\[E[(X-\\mu)^2]=Var(X)=5.\\]"
        },

        {
        id: 57,
        question: "If \\(X\\) and \\(Y\\) are independent with \\(Var(X)=4\\), \\(Var(Y)=9\\), find \\(Var(X+Y)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "13", value: "13" },
        { label: "36", value: "36" }
        ],
        answer: "13",
        solution: "\\[Var(X+Y)=Var(X)+Var(Y)=4+9=13.\\]"
        },

        {
        id: 58,
        question: "Let \\(X\\sim U(1,7)\\). Find \\(P(X>4)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "0.5", value: "0.5" },
        { label: "0.4", value: "0.4" }
        ],
        answer: "0.5",
        solution: "\\[P(X>4)=\\frac{7-4}{7-1}=\\frac{3}{6}=0.5.\\]"
        },

        {
        id: 59,
        question: "Let \\(X\\sim Poisson(3)\\). Find \\(P(X=2)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "0.2240", value: "0.2240" },
        { label: "0.1494", value: "0.1494" }
        ],
        answer: "0.2240",
        solution: "\\[P(X=2)=e^{-3}\\frac{3^2}{2!}=0.2240.\\]"
        },

        {
        id: 60,
        question: "Which of the following increases variance the most?",
        questionType: "multiple-choice",
        options: [
        { label: "Multiply by 3", value: "3" },
        { label: "Add 3", value: "add" }
        ],
        answer: "3",
        solution: "Variance scales with the square: multiplying by 3 increases variance by factor \\(9\\), adding does not change variance."
        },
        {
        id: 61,
        question: "Suppose \\(E[X]=0\\) and \\(Var(X)=1\\). What is the minimum possible value of \\(P(|X| \\ge 1)\\)?",
        questionType: "multiple-choice",
        options: [
        { label: "0.5", value: "0.5" },
        { label: "1", value: "1" }
        ],
        answer: "0.5",
        solution: "By Chebyshev's inequality: \\(P(|X| \\ge k) \\le 1/k^2\\). For \\(k=1\\), the bound is 1. But symmetry and variance constraints imply the minimum achievable is 0.5."
        },

        {
        id: 62,
        question: "Let \\(X\\) be a non-negative random variable with \\(E[X]=2\\). What is the maximum possible value of \\(P(X \\ge 5)\\)?",
        questionType: "multiple-choice",
        options: [
        { label: "0.4", value: "0.4" },
        { label: "0.6", value: "0.6" }
        ],
        answer: "0.4",
        solution: "By Markov's inequality: \\(P(X\\ge a) \\le E[X]/a = 2/5 = 0.4.\\)"
        },

        {
        id: 63,
        question: "If \\(X\\) takes values \\(-1, 0, 2\\) with probabilities chosen so that \\(E[X]=0\\), which must be true?",
        questionType: "multiple-choice",
        options: [
        { label: "P(X=2) = 0.5 P(X=-1)", value: "true" },
        { label: "P(X=0) = P(X=2)", value: "false" }
        ],
        answer: "true",
        solution: "Let probabilities be \\(p_{-1}, p_0, p_2\\). Then \\(-p_{-1} + 2p_2 = 0 \\Rightarrow p_2 = 0.5 p_{-1}.\\)"
        },

        {
        id: 64,
        question: "Which distribution maximises entropy among all distributions with fixed mean and variance?",
        questionType: "multiple-choice",
        options: [
        { label: "Normal", value: "normal" },
        { label: "Exponential", value: "exp" }
        ],
        answer: "normal",
        solution: "The normal distribution maximises entropy subject to fixed mean and variance."
        },

        {
        id: 65,
        question: "Let \\(X\\sim Exp(\\lambda)\\). Which quantity is independent of \\(\\lambda\\)?",
        questionType: "multiple-choice",
        options: [
        { label: "Coefficient of variation", value: "cv" },
        { label: "Mean", value: "mean" }
        ],
        answer: "cv",
        solution: "For exponential: mean = 1/λ, SD = 1/λ, so CV = SD/mean = 1."
        },

        {
        id: 66,
        question: "If \\(X\\) and \\(Y\\) are independent and identically distributed with \\(Var(X)=1\\), find \\(Var(X-Y)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "2", value: "2" },
        { label: "0", value: "0" }
        ],
        answer: "2",
        solution: "\\[Var(X-Y)=Var(X)+Var(Y)=1+1=2.\\]"
        },

        {
        id: 67,
        question: "Which random variable has the smallest variance for a given support [0,1]?",
        questionType: "multiple-choice",
        options: [
        { label: "Degenerate at 0.5", value: "degenerate" },
        { label: "Uniform(0,1)", value: "uniform" }
        ],
        answer: "degenerate",
        solution: "Placing all mass at the mean minimises variance."
        },

        {
        id: 68,
        question: "If \\(E[X]=0\\) and \\(E[X^2]=1\\), which must be true?",
        questionType: "multiple-choice",
        options: [
        { label: "Var(X)=1", value: "true" },
        { label: "SD(X)=0", value: "false" }
        ],
        answer: "true",
        solution: "Variance is \\(Var(X)=E[X^2]-(E[X])^2 = 1.\\)"
        },

        {
        id: 69,
        question: "Let \\(X\\sim N(0,1)\\). Which probability is larger?",
        questionType: "multiple-choice",
        options: [
        { label: "P(|X|>2)", value: "tail" },
        { label: "P(|X|<1)", value: "center" }
        ],
        answer: "center",
        solution: "Most mass of normal lies near the mean: \\(P(|X|<1) \\approx 0.6827 > P(|X|>2) \\approx 0.0455.\\)"
        },

        {
        id: 70,
        question: "If \\(X\\sim Exp(1)\\), find \\(P(X > E[X])\\).",
        questionType: "multiple-choice",
        options: [
        { label: "e^{-1}", value: "0.3679" },
        { label: "0.5", value: "0.5" }
        ],
        answer: "0.3679",
        solution: "Since \\(E[X]=1\\), \\(P(X>1)=e^{-1}=0.3679.\\)"
        },

        {
        id: 71,
        question: "If \\(X\\sim Bin(n,p)\\) and \\(Y\\sim Bin(n,1-p)\\), what is \\(E[X+Y]\\)?",
        questionType: "multiple-choice",
        options: [
        { label: "n", value: "n" },
        { label: "2np", value: "2np" }
        ],
        answer: "n",
        solution: "\\[E[X+Y]=np+n(1-p)=n.\\]"
        },

        {
        id: 72,
        question: "Which inequality gives the tightest general upper bound for tail probabilities?",
        questionType: "multiple-choice",
        options: [
        { label: "Chebyshev", value: "cheb" },
        { label: "Markov", value: "markov" }
        ],
        answer: "cheb",
        solution: "Chebyshev incorporates variance information, producing a tighter bound."
        },

        {
        id: 73,
        question: "Which distribution minimises variance among all distributions on [0,1] with fixed mean?",
        questionType: "multiple-choice",
        options: [
        { label: "Two-point distribution", value: "two" },
        { label: "Uniform distribution", value: "uniform" }
        ],
        answer: "two",
        solution: "Placing probability mass as close to the mean as possible minimises variance."
        },

        {
        id: 74,
        question: "If \\(Cov(X,Y)=0\\), which statement must be true?",
        questionType: "multiple-choice",
        options: [
        { label: "X and Y are uncorrelated", value: "true" },
        { label: "X and Y are independent", value: "false" }
        ],
        answer: "true",
        solution: "Zero covariance implies uncorrelated, but not necessarily independent."
        },

        {
        id: 75,
        question: "What is the variance of a constant random variable?",
        questionType: "multiple-choice",
        options: [
        { label: "0", value: "0" },
        { label: "1", value: "1" }
        ],
        answer: "0",
        solution: "A constant has no variability, hence variance zero."
        },
        {
        id: 76,
        question: "Let \\(X\\) be non-negative with \\(E[X]=1\\). What is the maximum possible value of \\(P(X \\ge 3)\\)?",
        questionType: "multiple-choice",
        options: [
        { label: "1/3", value: "0.3333" },
        { label: "1/2", value: "0.5" }
        ],
        answer: "0.3333",
        solution: "By Markov's inequality: \\(P(X\\ge a) \\le E[X]/a = 1/3.\\)"
        },

        {
        id: 77,
        question: "If \\(Var(X)=0\\), which must be true?",
        questionType: "multiple-choice",
        options: [
        { label: "X is constant", value: "true" },
        { label: "E[X]=0", value: "false" }
        ],
        answer: "true",
        solution: "Variance zero implies no randomness — the variable is constant."
        },

        {
        id: 78,
        question: "Which random variable maximises variance on [0,1]?",
        questionType: "multiple-choice",
        options: [
        { label: "Two-point distribution at 0 and 1", value: "two" },
        { label: "Uniform(0,1)", value: "uniform" }
        ],
        answer: "two",
        solution: "Spreading mass to extremes maximises variance."
        },

        {
        id: 79,
        question: "Let \\(X\\sim N(\\mu,\\sigma^2)\\). What is \\(E[(X-\\mu)^2]\\)?",
        questionType: "multiple-choice",
        options: [
        { label: "\\(\\sigma^2\\)", value: "var" },
        { label: "\\(\\sigma\\)", value: "sd" }
        ],
        answer: "var",
        solution: "By definition, \\(E[(X-\\mu)^2]=Var(X)=\\sigma^2.\\)"
        },

        {
        id: 80,
        question: "Which distribution minimises entropy for a fixed support [0,1]?",
        questionType: "multiple-choice",
        options: [
        { label: "Degenerate", value: "degenerate" },
        { label: "Uniform", value: "uniform" }
        ],
        answer: "degenerate",
        solution: "All probability at a single point gives minimum uncertainty."
        },

        {
        id: 81,
        question: "If \\(E[X]=1\\), \\(E[X^2]=5\\), find \\(Var(X)\\).",
        questionType: "multiple-choice",
        options: [
        { label: "4", value: "4" },
        { label: "5", value: "5" }
        ],
        answer: "4",
        solution: "\\[Var(X)=E[X^2]-(E[X])^2=5-1=4.\\]"
        },

        {
        id: 82,
        question: "Let \\(X\\sim Exp(\\lambda)\\). Which is true?",
        questionType: "multiple-choice",
        options: [
        { label: "Mean equals SD", value: "true" },
        { label: "Variance equals mean", value: "false" }
        ],
        answer: "true",
        solution: "For exponential, \\(E[X]=SD(X)=1/\\lambda.\\)"
        },

        {
        id: 83,
        question: "If \\(X\\) and \\(Y\\) are independent, which is correct?",
        questionType: "multiple-choice",
        options: [
        { label: "Var(X+Y)=Var(X)+Var(Y)", value: "true" },
        { label: "Var(X+Y)=Var(X)-Var(Y)", value: "false" }
        ],
        answer: "true",
        solution: "Independence removes covariance: \\(Var(X+Y)=Var(X)+Var(Y).\\)"
        },

        {
        id: 84,
        question: "Let \\(X\\) take values 0 and 1. What is the maximum possible variance?",
        questionType: "multiple-choice",
        options: [
        { label: "0.25", value: "0.25" },
        { label: "0.5", value: "0.5" }
        ],
        answer: "0.25",
        solution: "Variance is maximised when \\(P(X=1)=0.5\\): \\(Var(X)=0.25.\\)"
        },

        {
        id: 85,
        question: "Which distribution has heavier tails?",
        questionType: "multiple-choice",
        options: [
        { label: "Exponential", value: "exp" },
        { label: "Normal", value: "norm" }
        ],
        answer: "exp",
        solution: "Exponential decays slower than Gaussian tails."
        },

        {
        id: 86,
        question: "If \\(Cov(X,Y)=0\\) and both have non-zero variance, which is guaranteed?",
        questionType: "multiple-choice",
        options: [
        { label: "They are uncorrelated", value: "true" },
        { label: "They are independent", value: "false" }
        ],
        answer: "true",
        solution: "Zero covariance implies no linear relationship, not necessarily independence."
        },

        {
        id: 87,
        question: "Which inequality requires only the mean to bound tail probabilities?",
        questionType: "multiple-choice",
        options: [
        { label: "Markov", value: "markov" },
        { label: "Chebyshev", value: "cheb" }
        ],
        answer: "markov",
        solution: "Markov's inequality uses only the expectation."
        },

        {
        id: 88,
        question: "Which inequality incorporates variance information?",
        questionType: "multiple-choice",
        options: [
        { label: "Chebyshev", value: "cheb" },
        { label: "Markov", value: "markov" }
        ],
        answer: "cheb",
        solution: "Chebyshev uses both mean and variance."
        },

        {
        id: 89,
        question: "If \\(X\\sim N(0,1)\\), which is larger?",
        questionType: "multiple-choice",
        options: [
        { label: "P(|X|<2)", value: "in" },
        { label: "P(|X|>2)", value: "out" }
        ],
        answer: "in",
        solution: "Normal distribution concentrates mass near the mean: \\(P(|X|<2)\\approx0.9545.\\)"
        },

        {
        id: 90,
        question: "What is the variance of a Bernoulli(p) variable?",
        questionType: "multiple-choice",
        options: [
        { label: "p(1-p)", value: "correct" },
        { label: "p^2", value: "wrong" }
        ],
        answer: "correct",
        solution: "For Bernoulli: \\(Var(X)=p(1-p).\\)"
        },
        {
        id: 91,
        question: "A sample of size 25 from a normal population yields a sample mean of 52. Population variance is 16. Test H0: μ=50 at 5% significance. What is the z-statistic?",
        questionType: "multiple-choice",
        options: [
        { label: "2.5", value: "2.5" },
        { label: "1.25", value: "1.25" }
        ],
        answer: "2.5",
        solution: "Standard error \\(SE=\\sigma/\\sqrt{n}=4/5=0.8\\). \\[z=(\\bar{x}-\\mu_0)/SE=(52-50)/0.8=2.5\\]"
        },

        {
        id: 92,
        question: "A sample of size 25 from a normal population yields a sample mean of 52. Population variance is 16. Test H0: μ=50 at 5% significance, what is the p-value for a two-sided test?",
        questionType: "multiple-choice",
        options: [
        { label: "0.0124", value: "0.0124" },
        { label: "0.0248", value: "0.0248" }
        ],
        answer: "0.0124",
        solution: "Two-sided p-value: \\(2P(Z>2.5)=2(0.0062)=0.0124\\)"
        },

        {
        id: 93,
        question: "Which is true about type I error?",
        questionType: "multiple-choice",
        options: [
        { label: "Probability of rejecting true H0", value: "true" },
        { label: "Probability of accepting false H0", value: "false" }
        ],
        answer: "true",
        solution: "Type I error is rejecting the null hypothesis when it is actually true."
        },

        {
        id: 94,
        question: "Which is true about type II error?",
        questionType: "multiple-choice",
        options: [
        { label: "Probability of accepting false H0", value: "true" },
        { label: "Probability of rejecting true H0", value: "false" }
        ],
        answer: "true",
        solution: "Type II error is failing to reject H0 when it is false."
        },

        {
        id: 95,
        question: "A sample of 36 yields \\(\\bar{x}=102\\). Population SD=6. Test H0: μ=100. What is the 95% CI for the mean?",
        questionType: "multiple-choice",
        options: [
        { label: "[100,104]", value: "[100,104]" },
        { label: "[101,103]", value: "[101,103]" }
        ],
        answer: "[100,104]",
        solution: "SE=6/√36=1. 95% CI: \\(102 ± 1.96*1 = [102-1.96,102+1.96]≈[100,104]\\)"
        },

        {
        id: 96,
        question: "Which test is appropriate for comparing means of two independent normal samples with equal variances?",
        questionType: "multiple-choice",
        options: [
        { label: "Two-sample t-test", value: "t-test" },
        { label: "Paired t-test", value: "paired" }
        ],
        answer: "t-test",
        solution: "Two-sample t-test compares independent means; paired t-test is for matched samples."
        },

        {
        id: 97,
        question: "What is the null hypothesis in a chi-square test for independence?",
        questionType: "multiple-choice",
        options: [
        { label: "Variables are independent", value: "independent" },
        { label: "Variables are correlated", value: "correlated" }
        ],
        answer: "independent",
        solution: "H0: no association between categorical variables."
        },

        {
        id: 98,
        question: "For a one-tailed z-test at 5% significance, what is the critical value?",
        questionType: "multiple-choice",
        options: [
        { label: "1.645", value: "1.645" },
        { label: "1.96", value: "1.96" }
        ],
        answer: "1.645",
        solution: "One-tailed 5% significance level: z0.05=1.645."
        },

        {
        id: 99,
        question: "A sample of n=16 gives s=4. Test H0: σ^2=9. Which test statistic is used?",
        questionType: "multiple-choice",
        options: [
        { label: "Chi-square", value: "chi" },
        { label: "t-test", value: "t" }
        ],
        answer: "chi",
        solution: "Testing variance uses \\(\\chi^2=(n-1)s^2/\\sigma_0^2\\)."
        },

        {
        id: 100,
        question: "In hypothesis testing, increasing sample size while keeping effect size constant does what to power?",
        questionType: "multiple-choice",
        options: [
        { label: "Increases power", value: "increase" },
        { label: "Decreases power", value: "decrease" }
        ],
        answer: "increase",
        solution: "Larger n reduces standard error, increasing likelihood to detect a true effect."
        }
];
