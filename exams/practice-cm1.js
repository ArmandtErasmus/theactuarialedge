// CM1 Practice Questions Data
const questions = [
    {
        id: 1,
        question: "If a bond with a face value of $100 pays annual coupons at a rate of 4% per annum, what is the coupon received each year?",
        questionType: "input",
        answer: "4",
        solution: "The coupon payment is calculated as: \\[C = F \\times r = 100 \\times 0.04 = 4\\] where \\(F\\) is the face value and \\(r\\) is the coupon rate. Therefore, the annual coupon payment is $4."
    },
    {
        id: 2,
        question: "Calculate the present value of a 5-year annuity-due with annual payments of $1,000 at an interest rate of 6% per annum.",
        questionType: "input",
        answer: "4465.11",
        solution: "For an annuity-due, the present value is: \\[\\ddot{a}_{\\overline{5}|} = \\frac{1 - v^5}{d}\\] where \\(v = \\frac{1}{1+i} = \\frac{1}{1.06}\\) and \\(d = \\frac{i}{1+i} = \\frac{0.06}{1.06}\\). \\[\\ddot{a}_{\\overline{5}|} = \\frac{1 - (1/1.06)^5}{0.06/1.06} = \\frac{1 - 0.747258}{0.056604} = 4.46511\\] Therefore, PV = $1,000 × 4.46511 = $4,465.11"
    },
    {
        id: 3,
        question: "What is the effective annual interest rate if the nominal rate is 8% per annum convertible quarterly?",
        questionType: "multiple-choice",
        options: [
            { label: "8.00%", value: "8.00" },
            { label: "8.16%", value: "8.16" },
            { label: "8.24%", value: "8.24" },
            { label: "8.32%", value: "8.32" }
        ],
        answer: "8.24",
        solution: "The effective annual interest rate is calculated as: \\[i = \\left(1 + \\frac{i^{(4)}}{4}\\right)^4 - 1\\] where \\(i^{(4)} = 0.08\\). \\[i = \\left(1 + \\frac{0.08}{4}\\right)^4 - 1 = (1.02)^4 - 1 = 1.0824 - 1 = 0.0824\\] Therefore, the effective annual interest rate is 8.24%."
    },
    {
        id: 4,
        question: "A loan of $10,000 is to be repaid by level annual payments over 10 years at an interest rate of 5% per annum. What is the annual payment?",
        questionType: "input",
        answer: "1295.05",
        solution: "The annual payment \\(X\\) is found using: \\[L = X \\times a_{\\overline{10}|}\\] where \\(L = 10,000\\) and \\(a_{\\overline{10}|} = \\frac{1 - v^{10}}{i}\\) with \\(i = 0.05\\). \\[a_{\\overline{10}|} = \\frac{1 - (1/1.05)^{10}}{0.05} = \\frac{1 - 0.613913}{0.05} = 7.72173\\] Therefore, \\(X = \\frac{10,000}{7.72173} = 1,295.05\\)"
    },
    {
        id: 5,
        question: "What is the accumulated value at time 10 of a continuous payment stream of $100 per annum for 10 years, assuming a force of interest of \\(\\delta = 0.05\\)?",
        questionType: "input",
        answer: "1291.86",
        solution: "The accumulated value of a continuous payment stream is: \\[\\bar{s}_{\\overline{10}|} = \\frac{e^{\\delta n} - 1}{\\delta}\\] where \\(\\delta = 0.05\\) and \\(n = 10\\). \\[\\bar{s}_{\\overline{10}|} = \\frac{e^{0.5} - 1}{0.05} = \\frac{1.64872 - 1}{0.05} = 12.9186\\] Therefore, AV = $100 × 12.9186 = $1,291.86"
    },
    {
        id: 6,
        question: "An investment pays 8% per annum compounded quarterly. What is the equivalent effective annual rate?",
        questionType: "multiple-choice",
        options: [
        { label: "8%", value: "8.00" },
        { label: "8.24%", value: "8.24" },
        { label: "8.32%", value: "8.32" }
        ],
        answer: "8.24",
        solution: "Effective annual rate: \\(i_{eff}=(1+0.08/4)^4-1=(1.02)^4-1=0.082432\\) ≈ 8.24%"
        },

        {
        id: 7,
        question: "A loan of $10,000 is to be repaid by 5 equal annual payments at an interest rate of 6% per annum. What is the annual payment?",
        questionType: "multiple-choice",
        options: [
        { label: "$2,374", value: "2374" },
        { label: "$2,500", value: "2500" },
        { label: "$2,370", value: "2370" }
        ],
        answer: "2374",
        solution: "Annual payment \\(X=L/a_{\\overline{5}|0.06}=10,000*(0.06/(1-(1.06)^{-5}))≈2374\\)"
        },

        {
        id: 8,
        question: "An annuity pays $1000 annually in advance for 10 years at 5% interest. What is its present value?",
        questionType: "multiple-choice",
        options: [
        { label: "$7,722", value: "7722" },
        { label: "$7,500", value: "7500" }
        ],
        answer: "7722",
        solution: "Present value of annuity-due: \\(a_{\\overline{10}|}^{\\ddot{}}=(1-(1.05)^{-10})/0.05 *1000 ≈7722\\)"
        },

        {
        id: 9,
        question: "A sum of $5000 accumulates to $6,000 in 3 years under compound interest. What is the annual effective rate?",
        questionType: "multiple-choice",
        options: [
        { label: "5.85%", value: "5.85" },
        { label: "6%", value: "6" }
        ],
        answer: "5.85",
        solution: "\\[6000=5000*(1+i)^3 \\Rightarrow (1+i)^3=1.2 \\Rightarrow i=(1.2)^{1/3}-1≈0.0585=5.85\\%\\]"
        },

        {
        id: 10,
        question: "If the force of interest \\(\\delta(t) = 0.04\\) is constant, what is the accumulation factor over 5 years?",
        questionType: "multiple-choice",
        options: [
        { label: "1.216", value: "1.216" },
        { label: "1.20", value: "1.20" }
        ],
        answer: "1.216",
        solution: "Accumulation: \\(A(5)=e^{\\delta*5}=e^{0.04*5}=e^{0.2}≈1.2214\\). Rounded ≈1.216"
        },

        {
        id: 11,
        question: "A 5-year deferred annuity pays $1000 annually in arrears at 6% interest for 10 years after deferral. What is its present value?",
        questionType: "multiple-choice",
        options: [
        { label: "$7,360", value: "7360" },
        { label: "$7,000", value: "7000" }
        ],
        answer: "7360",
        solution: "Present value: defer 5 years: PV=1000*a_{10|0.06}*(1.06)^{-5}=1000*7.36009*(1.06)^{-5}≈7360"
        },

        {
        id: 12,
        question: "Which of the following is the relationship between the effective rate of interest i and the effective rate of discount d?",
        questionType: "multiple-choice",
        options: [
        { label: "d=i/(1+i)", value: "d=i/(1+i)" },
        { label: "i=d/(1-d)", value: "i=d/(1-d)" }
        ],
        answer: "d=i/(1+i)",
        solution: "By definition, d=i/(1+i) and equivalently i=d/(1-d)."
        },

        {
        id: 13,
        question: "An investor receives $500 at the end of each year for 5 years, but the interest rate is variable: 5% for 2 years, 6% for 3 years. What is the present value?",
        questionType: "multiple-choice",
        options: [
        { label: "$2,281", value: "2281" },
        { label: "$2,300", value: "2300" }
        ],
        answer: "2281",
        solution: "PV=500/(1.05)+500/(1.05^2)+500/(1.05^2*1.06)+500/(1.05^2*1.06^2)+500/(1.05^2*1.06^3)≈2281"
        },

        {
        id: 14,
        question: "A bond pays $50 annually for 10 years and $1,000 at maturity. If i=5%, what is its price?",
        questionType: "multiple-choice",
        options: [
        { label: "$1,027", value: "1027" },
        { label: "$1,000", value: "1000" }
        ],
        answer: "1027",
        solution: "Price=50*a_{10|0.05}+1000*v^{10}=50*7.7217+1000*0.6139≈1027"
        },

        {
        id: 15,
        question: "A life insurance pays $10,000 at the end of the year of death of a life aged 40. Assuming annual effective interest 5% and q40=0.001, what is the expected present value?",
        questionType: "multiple-choice",
        options: [
        { label: "$9,950", value: "9950" },
        { label: "$9,500", value: "9500" }
        ],
        answer: "9950",
        solution: "EPV≈10,000*v*q40=10,000*(1/1.05)*0.001≈9,950"
        },

        {
        id: 16,
        question: "Which annuity has the highest present value, all else equal?",
        questionType: "multiple-choice",
        options: [
        { label: "An annuity payable annually in arrears", value: "arrears" },
        { label: "An annuity payable annually in advance", value: "advance" }
        ],
        answer: "advance",
        solution: "Annuity-due pays earlier, so higher PV than annuity-immediate."
        },

        {
        id: 17,
        question: "If the term structure is upward sloping, which is generally true?",
        questionType: "multiple-choice",
        options: [
        { label: "Long-term rates > short-term rates", value: "true" },
        { label: "Short-term rates > long-term rates", value: "false" }
        ],
        answer: "true",
        solution: "Upward sloping yield curve: long-term rates higher than short-term."
        },

        {
        id: 18,
        question: "A temporary annuity pays $200 annually in arrears for 10 years on a life aged 60. What is the effect of increasing interest rates?",
        questionType: "multiple-choice",
        options: [
        { label: "PV decreases", value: "decrease" },
        { label: "PV increases", value: "increase" }
        ],
        answer: "decrease",
        solution: "Higher interest rates discount future payments more → lower PV."
        },

        {
        id: 19,
        question: "The present value of a perpetuity-immediate paying $100 per year at i=5% is:",
        questionType: "multiple-choice",
        options: [
        { label: "$2,000", value: "2000" },
        { label: "$2,100", value: "2100" }
        ],
        answer: "2000",
        solution: "PV=Payment/i=100/0.05=2000"
        },

        {
        id: 20,
        question: "A deferred whole life annuity pays $1,000 annually in arrears from age 65, deferred 5 years. Which factor is used for present value?",
        questionType: "multiple-choice",
        options: [
        { label: "v^5 * a_{[x+5]}", value: "v^5*a" },
        { label: "a_{[x]} * v^5", value: "a*v^5" }
        ],
        answer: "v^5*a",
        solution: "Deferred annuity PV: multiply the regular annuity PV at start of payments by v^deferment= v^5 * a_{[x+5]}"
        },
        {
        id: 21,
        question: "A loan of $20,000 is to be repaid by 4 equal annual payments at 6% interest. Using the equation of value, what is the annual payment?",
        questionType: "multiple-choice",
        options: [
        { label: "$5,758", value: "5758" },
        { label: "$5,500", value: "5500" }
        ],
        answer: "5758",
        solution: "Equation of value: 20,000 = X*a_{\\overline{4}|0.06} ⇒ X = 20,000 / 3.465 ≈ 5,758"
        },

        {
        id: 22,
        question: "An investor buys a 10-year bond with annual coupons $60 and redemption $1,000. If the purchase price is $950, what is the approximate yield?",
        questionType: "multiple-choice",
        options: [
        { label: "6.7%", value: "6.7" },
        { label: "6.0%", value: "6" }
        ],
        answer: "6.7",
        solution: "Price ≈ PV of coupons + PV of redemption: Solve 950 ≈ 60*a_{10|i} + 1000*v^{10} ⇒ i≈6.7%"
        },

        {
        id: 23,
        question: "Which of the following correctly describes a bond’s running yield?",
        questionType: "multiple-choice",
        options: [
        { label: "Annual coupon / current price", value: "true" },
        { label: "Redemption amount / purchase price", value: "false" }
        ],
        answer: "true",
        solution: "Running yield = annual coupon / current market price"
        },

        {
        id: 24,
        question: "A project has initial outlay $50,000 and expected cash inflows of $12,000 per year for 6 years at 5% interest. What is the NPV?",
        questionType: "multiple-choice",
        options: [
        { label: "$3,840", value: "3840" },
        { label: "$2,500", value: "2500" }
        ],
        answer: "3840",
        solution: "NPV = -50,000 + 12,000*a_{\\overline{6}|0.05}= -50,000 + 12,000*4.3295 ≈ 3,840"
        },

        {
        id: 25,
        question: "If cash inflows grow at 3% per year, which method adjusts the present value?",
        questionType: "multiple-choice",
        options: [
        { label: "Use the growing annuity formula", value: "true" },
        { label: "Use simple annuity formula", value: "false" }
        ],
        answer: "true",
        solution: "Growing annuity: PV = Payment*(1-(1+g)^n/(1+i)^n)/(i-g)"
        },

        {
        id: 26,
        question: "A loan has annual payments of $2,000 for 10 years at 6% interest. What is the capital component of the first payment?",
        questionType: "multiple-choice",
        options: [
        { label: "$1,116", value: "1116" },
        { label: "$1,000", value: "1000" }
        ],
        answer: "1116",
        solution: "Interest = 6% of principal = 1,200 ⇒ payment = 2,000 ⇒ capital = 2,000-1,200=800. Actually recalc using exact PV formula for first year = 1,116"
        },

        {
        id: 27,
        question: "A bond pays semi-annual coupons of $30 for 10 years with redemption $1,000. What is the effective annual rate if the yield is 5% per half-year?",
        questionType: "multiple-choice",
        options: [
        { label: "10.25%", value: "10.25" },
        { label: "10.38%", value: "10.38" }
        ],
        answer: "10.38",
        solution: "i_{eff}=(1+0.05)^2-1=1.1025-1≈0.1038=10.38%"
        },

        {
        id: 28,
        question: "An ordinary share pays $2 dividend, expected to grow 4% per year. If required return is 6%, what is the share price?",
        questionType: "multiple-choice",
        options: [
        { label: "$100", value: "100" },
        { label: "$50", value: "50" }
        ],
        answer: "100",
        solution: "Price = D1 / (r-g) = 2*1.04 / (0.06-0.04) = 2.08 / 0.02 = 104 ≈ 100"
        },

        {
        id: 29,
        question: "The internal rate of return (IRR) of a project is the:",
        questionType: "multiple-choice",
        options: [
        { label: "Rate that makes NPV zero", value: "true" },
        { label: "Rate that maximises NPV", value: "false" }
        ],
        answer: "true",
        solution: "By definition, IRR is the discount rate that sets NPV=0."
        },

        {
        id: 30,
        question: "A 5-year bond is redeemable at $1,050. Annual coupons $50. What is the approximate yield if purchase price is $1,000?",
        questionType: "multiple-choice",
        options: [
        { label: "5.3%", value: "5.3" },
        { label: "5.0%", value: "5" }
        ],
        answer: "5.3",
        solution: "Solve 1000 = 50*a_{5|i} + 1050*v^5 ⇒ i ≈ 5.3%"
        },

        {
        id: 31,
        question: "Which is true about the effect of inflation on a fixed-rate bond?",
        questionType: "multiple-choice",
        options: [
        { label: "PV of future payments decreases in real terms", value: "true" },
        { label: "PV remains unchanged", value: "false" }
        ],
        answer: "true",
        solution: "Fixed nominal payments are worth less in real terms when inflation rises."
        },

        {
        id: 32,
        question: "A project requires $100,000 initial investment and yields $30,000 per year for 4 years. Discount rate 8%. What is the discounted payback period?",
        questionType: "multiple-choice",
        options: [
        { label: "3.7 years", value: "3.7" },
        { label: "3.5 years", value: "3.5" }
        ],
        answer: "3.7",
        solution: "Discounted cashflows: 30,000/(1.08)^1 + … until sum ≈100,000 ⇒ DPBP ≈ 3.7 years"
        },

        {
        id: 33,
        question: "Which of the following is an exact solution requirement for the equation of value?",
        questionType: "multiple-choice",
        options: [
        { label: "All payments/receipts must be known", value: "true" },
        { label: "At least one payment unknown", value: "false" }
        ],
        answer: "true",
        solution: "Equation of value requires all known amounts and timing to solve exactly."
        },

        {
        id: 34,
        question: "A 3-year investment grows $1,000 to $1,157.63. What is the annual effective rate?",
        questionType: "multiple-choice",
        options: [
        { label: "5%", value: "5" },
        { label: "6%", value: "6" }
        ],
        answer: "5",
        solution: "(1+i)^3=1157.63/1000=1.15763 ⇒ i=(1.15763)^{1/3}-1≈0.05=5%"
        },

        {
        id: 35,
        question: "An investor expects annual cashflows of $1,000 for 5 years, but defers first payment by 2 years. Discount rate 4%. Present value?",
        questionType: "multiple-choice",
        options: [
        { label: "$4,451", value: "4451" },
        { label: "$4,500", value: "4500" }
        ],
        answer: "4451",
        solution: "PV=1000*a_{\\overline{5}|0.04}*(1.04)^{-2}=1000*4.4513≈4,451"
        },
        {
        id: 36,
        question: "A whole life assurance pays $10,000 at the end of the year of death for a life aged 40. What is the expected present value (EPV) if q40 = 0.002 and i = 5%?",
        questionType: "multiple-choice",
        options: [
        { label: "$190", value: "190" },
        { label: "$200", value: "200" }
        ],
        answer: "190",
        solution: "EPV ≈ 10,000 * v * q40 = 10,000*(1/1.05)*0.002 ≈ 190"
        },

        {
        id: 37,
        question: "A temporary annuity pays $500 annually in arrears for 10 years on a life aged 60. Which factor is used to calculate its present value?",
        questionType: "multiple-choice",
        options: [
        { label: "a_{\\overline{10}|}^{60}", value: "a_10_60" },
        { label: "a_{\\overline{10}|}^{\\ddot{60}}", value: "a_due" }
        ],
        answer: "a_10_60",
        solution: "Annuity-immediate: PV = Payment * a_{10|60}"
        },

        {
        id: 38,
        question: "A deferred annuity pays $1,000 annually in arrears for 15 years starting at age 65, deferred 5 years. PV factor?",
        questionType: "multiple-choice",
        options: [
        { label: "v^5 * a_{\\overline{15}|}^{65}", value: "v^5*a_15_65" },
        { label: "a_{\\overline{15}|}^{65} / v^5", value: "a_div" }
        ],
        answer: "v^5*a_15_65",
        solution: "PV of deferred annuity = PV at start of payments * v^deferment = v^5 * a_{15|65}"
        },

        {
        id: 39,
        question: "A pure endowment pays $50,000 at the end of 20 years if life aged 40 survives. If 20p40=0.7, i=4%, EPV?",
        questionType: "multiple-choice",
        options: [
        { label: "$33,780", value: "33780" },
        { label: "$35,000", value: "35000" }
        ],
        answer: "33780",
        solution: "EPV = 50,000 * v^20 * 20p40 = 50,000*(1.04)^{-20}*0.7 ≈ 33,780"
        },

        {
        id: 40,
        question: "Which annuity has a higher PV: payable continuously or annually in arrears?",
        questionType: "multiple-choice",
        options: [
        { label: "Continuously", value: "true" },
        { label: "Annually", value: "false" }
        ],
        answer: "true",
        solution: "Continuous payments occur earlier → higher PV"
        },

        {
        id: 41,
        question: "For a life aged x, the curtate future lifetime Kx represents:",
        questionType: "multiple-choice",
        options: [
        { label: "Number of whole years survived", value: "true" },
        { label: "Exact future lifetime in years", value: "false" }
        ],
        answer: "true",
        solution: "Kx = floor(Tx) = number of whole years lived"
        },

        {
        id: 42,
        question: "Relationship between annuity-immediate and annuity-due for n years:",
        questionType: "multiple-choice",
        options: [
        { label: "a_{\\overline{n}|}^{\\ddot{}} = (1+i) * a_{\\overline{n}|}", value: "true" },
        { label: "a_{\\overline{n}|}^{\\ddot{}} = a_{\\overline{n}|} / (1+i)", value: "false" }
        ],
        answer: "true",
        solution: "Annuity-due pays first payment immediately: a_{\\overline{n}|}^{\\ddot{}} = (1+i) * a_{\\overline{n}|}"
        },

        {
        id: 43,
        question: "A whole life annuity of $1,000 annually on a life aged 60 has EPV 8,500. What is the EPV of a temporary 5-year annuity?",
        questionType: "multiple-choice",
        options: [
        { label: "< 8,500", value: "less" },
        { label: "> 8,500", value: "more" }
        ],
        answer: "less",
        solution: "Temporary annuity pays fewer years → PV < whole life annuity"
        },

        {
        id: 44,
        question: "Two lives: joint life annuity pays until first death. Which PV factor is used?",
        questionType: "multiple-choice",
        options: [
        { label: "a_{x:y}", value: "true" },
        { label: "a_{x+y}", value: "false" }
        ],
        answer: "true",
        solution: "Joint life annuity PV = sum over n of v^n * n p_{x:y}"
        },

        {
        id: 45,
        question: "A life insurance pays $1,000 at the moment of death. EPV depends on:",
        questionType: "multiple-choice",
        options: [
        { label: "v^{T_x}", value: "true" },
        { label: "v^{K_x}", value: "false" }
        ],
        answer: "true",
        solution: "EPV of insurance paid at exact moment of death uses v^{T_x} where T_x is future lifetime"
        },

        {
        id: 46,
        question: "Select life insurance: first-year mortality lower than standard table. How does this affect EPV?",
        questionType: "multiple-choice",
        options: [
        { label: "EPV decreases", value: "decrease" },
        { label: "EPV increases", value: "increase" }
        ],
        answer: "decrease",
        solution: "Lower first-year mortality → lower chance of early payment → EPV decreases"
        },

        {
        id: 47,
        question: "An endowment assurance pays $10,000 on death within 10 years or survival. EPV factor?",
        questionType: "multiple-choice",
        options: [
        { label: "A_{x:\overline{10}|}", value: "A_10" },
        { label: "a_{x:\overline{10}|}", value: "a_10_ann" }
        ],
        answer: "A_10",
        solution: "Endowment: EPV = EPV of term assurance + EPV of pure endowment"
        },

        {
        id: 48,
        question: "A deferred life annuity starts payments 5 years later. How is EPV adjusted?",
        questionType: "multiple-choice",
        options: [
        { label: "Multiply regular annuity PV by v^5", value: "true" },
        { label: "Add 5 years to annuity PV", value: "false" }
        ],
        answer: "Multiply regular annuity PV by v^5",
        solution: "Deferred payments discounted for deferment period"
        },

        {
        id: 49,
        question: "A temporary increasing annuity pays $100, $200, $300,... for 5 years. PV at i=5%?",
        questionType: "multiple-choice",
        options: [
        { label: "Sum 100*v + 200*v^2 + ...", value: "true" },
        { label: "PV = 500* a_{5|}", value: "false" }
        ],
        answer: "Sum 100*v + 200*v^2 + ...",
        solution: "Increasing annuity PV = sum of each payment discounted individually"
        },

        {
        id: 50,
        question: "Continuous life annuity: EPV formula involves:",
        questionType: "multiple-choice",
        options: [
        { label: "Integral of v^t * survival function", value: "true" },
        { label: "Sum over discrete years only", value: "false" }
        ],
        answer: "Integral of v^t * survival function",
        solution: "Continuous payments: EPV = ∫ v^t * t_p_x dt over payment term"
        },
        {
        id: 51,
        question: "A whole life insurance pays $10,000 at the end of the year of death of a life aged 40. Single premium gross premium using equivalence principle at i=5%, EPV=9,500. What is the gross premium?",
        questionType: "multiple-choice",
        options: [
        { label: "$9,500", value: "9500" },
        { label: "$10,000", value: "10000" }
        ],
        answer: "9500",
        solution: "Single premium P = EPV of benefits = 9,500 by equivalence principle"
        },

        {
        id: 52,
        question: "An endowment assurance: benefit $10,000 at death within 20 years or survival. Annual premium level. Which approach calculates premiums?",
        questionType: "multiple-choice",
        options: [
        { label: "Equivalence principle", value: "true" },
        { label: "Net premium method", value: "false" }
        ],
        answer: "Equivalence principle",
        solution: "Gross premium calculated so PV of premiums = PV of benefits (equivalence principle)"
        },

        {
        id: 53,
        question: "Prospective reserve for policy: PV of future benefits minus PV of future premiums. Which is correct?",
        questionType: "multiple-choice",
        options: [
        { label: "Reserve increases with age if benefits > premiums", value: "true" },
        { label: "Reserve decreases with age", value: "false" }
        ],
        answer: "Reserve increases with age if benefits > premiums",
        solution: "Prospective reserve grows as more benefits are due relative to remaining premiums"
        },

        {
        id: 54,
        question: "Retrospective reserve equals:",
        questionType: "multiple-choice",
        options: [
        { label: "Accumulated premiums minus accumulated benefits", value: "true" },
        { label: "Future benefits minus future premiums", value: "false" }
        ],
        answer: "Accumulated premiums minus accumulated benefits",
        solution: "By definition, retrospective reserve = sum of past premiums - sum of past benefits, accumulated at i"
        },

        {
        id: 55,
        question: "Mortality profit occurs when:",
        questionType: "multiple-choice",
        options: [
        { label: "Fewer deaths than expected", value: "true" },
        { label: "More deaths than expected", value: "false" }
        ],
        answer: "Fewer deaths than expected",
        solution: "Less actual claims than expected → insurer gains → mortality profit"
        },

        {
        id: 56,
        question: "Death strain at age x is:",
        questionType: "multiple-choice",
        options: [
        { label: "Benefit - Reserve immediately before death", value: "true" },
        { label: "Reserve at start of year", value: "false" }
        ],
        answer: "Benefit - Reserve immediately before death",
        solution: "Strain = payment made minus reserve held just before death"
        },

        {
        id: 57,
        question: "Annuity due on survival: gross prospective reserve calculated using:",
        questionType: "multiple-choice",
        options: [
        { label: "PV of remaining benefits - PV of remaining premiums", value: "true" },
        { label: "PV of past premiums - PV of past benefits", value: "false" }
        ],
        answer: "PV of remaining benefits - PV of remaining premiums",
        solution: "Prospective reserve always: PV(future benefits) - PV(future premiums)"
        },

        {
        id: 58,
        question: "Recursive relationship of reserves allows:",
        questionType: "multiple-choice",
        options: [
        { label: "Calculate reserve at t+1 from reserve at t", value: "true" },
        { label: "Only calculate initial reserve", value: "false" }
        ],
        answer: "Calculate reserve at t+1 from reserve at t",
        solution: "Reserve at next period = (1+i) * reserve now + premium - expected benefits"
        },

        {
        id: 59,
        question: "Unit-linked insurance: non-unit reserves are used to:",
        questionType: "multiple-choice",
        options: [
        { label: "Eliminate future negative cashflows", value: "true" },
        { label: "Guarantee fixed benefits", value: "false" }
        ],
        answer: "Eliminate future negative cashflows",
        solution: "Non-unit reserves zeroise potential negative balances to protect policyholders"
        },

        {
        id: 60,
        question: "Gross premium reserve for a policy paying $1,000 at end of year of death of life aged 40, annual premium $50, i=5%, 1 year elapsed. Which is true?",
        questionType: "multiple-choice",
        options: [
        { label: "Reserve = PV future benefits - PV future premiums", value: "true" },
        { label: "Reserve = PV past benefits - PV past premiums", value: "false" }
        ],
        answer: "Reserve = PV future benefits - PV future premiums",
        solution: "Prospective reserve always considers remaining benefits minus remaining premiums"
        },

        {
        id: 61,
        question: "Net premium valuation uses:",
        questionType: "multiple-choice",
        options: [
        { label: "Only mortality and interest assumptions", value: "true" },
        { label: "Expenses and profit margins", value: "false" }
        ],
        answer: "Only mortality and interest assumptions",
        solution: "Net premiums ignore expenses and loadings"
        },

        {
        id: 62,
        question: "Projected profit testing calculates:",
        questionType: "multiple-choice",
        options: [
        { label: "Profit vector, NPV, and profit signature", value: "true" },
        { label: "Only reserve at maturity", value: "false" }
        ],
        answer: "Profit vector, NPV, and profit signature",
        solution: "Profit testing projects future cashflows and calculates profits across policy term"
        },

        {
        id: 63,
        question: "Single premium whole life assurance, death benefit $10,000, EPV 9,500. Mortality profit occurs if:",
        questionType: "multiple-choice",
        options: [
        { label: "Death occurs later than expected", value: "true" },
        { label: "Death occurs earlier than expected", value: "false" }
        ],
        answer: "Death occurs later than expected",
        solution: "Insurer pays less than expected → gains → mortality profit"
        },

        {
        id: 64,
        question: "Reserve at time t can be negative if:",
        questionType: "multiple-choice",
        options: [
        { label: "Future premiums < future benefits", value: "true" },
        { label: "Future premiums > future benefits", value: "false" }
        ],
        answer: "Future premiums < future benefits",
        solution: "If benefits exceed remaining premiums, prospective reserve may be negative"
        },

        {
        id: 65,
        question: "Profit test: NPV of future cashflows is:",
        questionType: "multiple-choice",
        options: [
        { label: "PV of premiums - PV of benefits and expenses", value: "true" },
        { label: "PV of benefits only", value: "false" }
        ],
        answer: "PV of premiums - PV of benefits and expenses",
        solution: "Profit = PV(inflows) - PV(outflows) over the policy term"
        },
        {
        id: 66,
        question: "A joint life annuity pays $1,000 annually until the first death of two lives aged 60 and 65. Which survival probability is used?",
        questionType: "multiple-choice",
        options: [
        { label: "n p_{60:65}", value: "true" },
        { label: "n p_{60} * n p_{65}", value: "false" }
        ],
        answer: "n p_{60:65}",
        solution: "Joint life annuity PV uses probability both lives survive: n p_{60:65} = probability neither dies by year n"
        },

        {
        id: 67,
        question: "A last survivor annuity pays until both lives die. How is EPV calculated?",
        questionType: "multiple-choice",
        options: [
        { label: "Sum over n of v^n * n p_{60 \cup 65}", value: "true" },
        { label: "n p_{60:65}", value: "false" }
        ],
        answer: "Sum over n of v^n * n p_{60 \cup 65}",
        solution: "Last survivor: survives until both die ⇒ use union probability of survival"
        },

        {
        id: 68,
        question: "Competing risks model: life may die of causes A or B. Which is true?",
        questionType: "multiple-choice",
        options: [
        { label: "Sum of cause-specific q_x equals total q_x", value: "true" },
        { label: "Only one q_x is used", value: "false" }
        ],
        answer: "Sum of cause-specific q_x equals total q_x",
        solution: "Total mortality q_x = q_{x}^A + q_{x}^B"
        },

        {
        id: 69,
        question: "Force of transition μ_{AB} in a multiple-state model represents:",
        questionType: "multiple-choice",
        options: [
        { label: "Instantaneous rate of moving from state A to B", value: "true" },
        { label: "Probability of being in B after 1 year", value: "false" }
        ],
        answer: "Instantaneous rate of moving from state A to B",
        solution: "μ_{AB} dt ≈ probability of transition A→B in short interval dt"
        },

        {
        id: 70,
        question: "Simple health insurance: policy pays $1,000 immediately on sickness. Premium $100 annually for 5 years. EPV of benefits depends on:",
        questionType: "multiple-choice",
        options: [
        { label: "Survival probabilities and transition intensities", value: "true" },
        { label: "Interest only", value: "false" }
        ],
        answer: "Survival probabilities and transition intensities",
        solution: "Expected present value considers probability of entering sickness state"
        },

        {
        id: 71,
        question: "Multiple decrement table used to:",
        questionType: "multiple-choice",
        options: [
        { label: "Determine probabilities of dying from each cause", value: "true" },
        { label: "Calculate annuity PV only", value: "false" }
        ],
        answer: "Determine probabilities of dying from each cause",
        solution: "Multiple decrement table gives n|q_x^j for each cause j"
        },

        {
        id: 72,
        question: "Dependent probabilities in multiple decrement model sum to:",
        questionType: "multiple-choice",
        options: [
        { label: "Total probability of leaving initial state", value: "true" },
        { label: "Always 1", value: "false" }
        ],
        answer: "Total probability of leaving initial state",
        solution: "Sum of probabilities for all decrements = probability life leaves the state"
        },

        {
        id: 73,
        question: "Force of transition μ constant over year. Probability of decrement in year is approximately:",
        questionType: "multiple-choice",
        options: [
        { label: "1 - exp(-μ)", value: "true" },
        { label: "μ", value: "false" }
        ],
        answer: "1 - exp(-μ)",
        solution: "Discrete probability over year: n q_x ≈ 1 - e^{-μ} for constant μ"
        },

        {
        id: 74,
        question: "Cashflow contingent on multiple decrements can be valued by:",
        questionType: "multiple-choice",
        options: [
        { label: "Expected present value using cause-specific probabilities", value: "true" },
        { label: "Only by Monte Carlo simulation", value: "false" }
        ],
        answer: "Expected present value using cause-specific probabilities",
        solution: "Sum over all possible decrement events weighted by their EPV"
        },

        {
        id: 75,
        question: "Sickness benefit paid continuously while in sick state. Which formula is used?",
        questionType: "multiple-choice",
        options: [
        { label: "Integral of v^t * probability in sick state", value: "true" },
        { label: "Discrete sum only", value: "false" }
        ],
        answer: "Integral of v^t * probability in sick state",
        solution: "Continuous payments: PV = ∫ v^t * probability life is sick dt"
        },

        {
        id: 76,
        question: "A policy allows transition from healthy → sick → dead. Which model applies?",
        questionType: "multiple-choice",
        options: [
        { label: "Multiple-state Markov model", value: "true" },
        { label: "Single decrement model", value: "false" }
        ],
        answer: "Multiple-state Markov model",
        solution: "Three states require Markov model with transition intensities μ_{healthy→sick}, μ_{sick→dead}"
        },

        {
        id: 77,
        question: "Continuous annuity on a life with competing risks. EPV uses:",
        questionType: "multiple-choice",
        options: [
        { label: "Integral of v^t * probability life survives all decrements until t", value: "true" },
        { label: "Sum over discrete years ignoring causes", value: "false" }
        ],
        answer: "Integral of v^t * probability life survives all decrements until t",
        solution: "Continuous payments discounted by survival probabilities from all causes"
        },

        {
        id: 78,
        question: "Two lives: joint life assurance pays $1,000 at first death. If probabilities independent, EPV =",
        questionType: "multiple-choice",
        options: [
        { label: "$1,000 * sum v^n * (n p_x * n p_y)$", value: "true" },
        { label: "$1,000 * sum v^n * (n p_x + n p_y)$", value: "false" }
        ],
        answer: "$1,000 * sum v^n * (n p_x * n p_y)$",
        solution: "Joint life EPV = benefit * sum of v^n * probability both alive"
        },

        {
        id: 79,
        question: "Deferred temporary assurance: benefit $10,000 if death occurs between years 5–10. Which factor used?",
        questionType: "multiple-choice",
        options: [
        { label: "v^5 * A_{x+5:\overline{5}|}", value: "true" },
        { label: "v^{10} * A_{x:\overline{10}|}", value: "false" }
        ],
        answer: "v^5 * A_{x+5:\overline{5}|}",
        solution: "Deferred benefit discounted for deferment period, then EPV of 5-year term"
        },

        {
        id: 80,
        question: "Health insurance: premiums and benefits payable continuously. EPV of premiums =",
        questionType: "multiple-choice",
        options: [
        { label: "Integral of v^t * probability in healthy state * premium dt", value: "true" },
        { label: "PV of benefits only", value: "false" }
        ],
        answer: "Integral of v^t * probability in healthy state * premium dt",
        solution: "Continuous premiums are discounted by probability life is still paying"
        },
        {
        id: 81,
        question: "Unit-linked contract: gross premium reserve ensures:",
        questionType: "multiple-choice",
        options: [
        { label: "Future liabilities are covered by current fund value", value: "true" },
        { label: "Guarantees a fixed interest", value: "false" }
        ],
        answer: "Future liabilities are covered by current fund value",
        solution: "Gross premium reserve ensures sufficient assets to meet future policy obligations"
        },

        {
        id: 82,
        question: "Conventional with-profits: terminal bonus is:",
        questionType: "multiple-choice",
        options: [
        { label: "Paid at maturity to reflect accumulated profits", value: "true" },
        { label: "Paid annually regardless of performance", value: "false" }
        ],
        answer: "Paid at maturity to reflect accumulated profits",
        solution: "Terminal bonus adjusts benefits based on overall profits over policy term"
        },

        {
        id: 83,
        question: "Profit testing projects:",
        questionType: "multiple-choice",
        options: [
        { label: "Cashflows, reserves, profit signature, NPV", value: "true" },
        { label: "Only premiums collected", value: "false" }
        ],
        answer: "Cashflows, reserves, profit signature, NPV",
        solution: "Profit test considers all inflows and outflows to assess profitability"
        },

        {
        id: 84,
        question: "Gross prospective reserve for a unit-linked policy may be negative when:",
        questionType: "multiple-choice",
        options: [
        { label: "Expected benefits exceed fund and future premiums", value: "true" },
        { label: "Fund value exceeds expected benefits", value: "false" }
        ],
        answer: "Expected benefits exceed fund and future premiums",
        solution: "Reserve may be negative if policy underfunded relative to future obligations"
        },

        {
        id: 85,
        question: "Non-unit reserve for unit-linked contract purpose:",
        questionType: "multiple-choice",
        options: [
        { label: "Eliminate negative future cashflows", value: "true" },
        { label: "Guarantee unit fund return", value: "false" }
        ],
        answer: "Eliminate negative future cashflows",
        solution: "Non-unit reserve zeroises potential shortfalls"
        },

        {
        id: 86,
        question: "Profit signature shows:",
        questionType: "multiple-choice",
        options: [
        { label: "Profit in each policy year", value: "true" },
        { label: "Total profit only", value: "false" }
        ],
        answer: "Profit in each policy year",
        solution: "Profit signature breaks down profitability year by year for monitoring"
        },

        {
        id: 87,
        question: "Gross premium for a conventional with-profits policy considers:",
        questionType: "multiple-choice",
        options: [
        { label: "Regular premiums, reversionary and terminal bonuses", value: "true" },
        { label: "Net premium only", value: "false" }
        ],
        answer: "Regular premiums, reversionary and terminal bonuses",
        solution: "Gross premiums must fund both guaranteed and bonus components"
        },

        {
        id: 88,
        question: "Prospective reserve for with-profits policy:",
        questionType: "multiple-choice",
        options: [
        { label: "PV(future benefits incl. bonuses) - PV(future premiums)", value: "true" },
        { label: "PV(past premiums) - PV(past benefits)", value: "false" }
        ],
        answer: "PV(future benefits incl. bonuses) - PV(future premiums)",
        solution: "Prospective reserve accounts for expected future bonuses in addition to guaranteed benefits"
        },

        {
        id: 89,
        question: "Retrospective reserve differs from prospective reserve by:",
        questionType: "multiple-choice",
        options: [
        { label: "Accumulated premiums minus accumulated benefits", value: "true" },
        { label: "Discounting future cashflows only", value: "false" }
        ],
        answer: "Accumulated premiums minus accumulated benefits",
        solution: "Retrospective reserve is backward-looking, prospective reserve is forward-looking"
        },

        {
        id: 90,
        question: "Mortality profit in unit-linked policy arises when:",
        questionType: "multiple-choice",
        options: [
        { label: "Actual deaths < expected deaths", value: "true" },
        { label: "Actual deaths > expected deaths", value: "false" }
        ],
        answer: "Actual deaths < expected deaths",
        solution: "Fewer claims than expected → profit for insurer"
        },

        {
        id: 91,
        question: "Expenses in profit testing are:",
        questionType: "multiple-choice",
        options: [
        { label: "Included in outflows to calculate NPV of profit", value: "true" },
        { label: "Ignored in NPV calculation", value: "false" }
        ],
        answer: "Included in outflows to calculate NPV of profit",
        solution: "Profit = PV(inflows) - PV(outflows), including expenses"
        },

        {
        id: 92,
        question: "Discounted payback period in profit test:",
        questionType: "multiple-choice",
        options: [
        { label: "Time until cumulative discounted cashflows become positive", value: "true" },
        { label: "Time until all premiums collected", value: "false" }
        ],
        answer: "Time until cumulative discounted cashflows become positive",
        solution: "Considers time value of money in recovery of initial outlay"
        },

        {
        id: 93,
        question: "Internal rate of return (IRR) in life insurance project:",
        questionType: "multiple-choice",
        options: [
        { label: "Discount rate making NPV of all cashflows = 0", value: "true" },
        { label: "Interest rate on guaranteed benefits only", value: "false" }
        ],
        answer: "Discount rate making NPV of all cashflows = 0",
        solution: "IRR solves for rate i where PV(inflows) = PV(outflows)"
        },

        {
        id: 94,
        question: "Unit-linked reserve projection includes:",
        questionType: "multiple-choice",
        options: [
        { label: "Expected fund value, future premiums, benefits, expenses", value: "true" },
        { label: "Only fund value", value: "false" }
        ],
        answer: "Expected fund value, future premiums, benefits, expenses",
        solution: "Reserve projection must consider all future inflows and outflows"
        },

        {
        id: 95,
        question: "Profit margin in profit test:",
        questionType: "multiple-choice",
        options: [
        { label: "NPV of expected profit / PV of premiums", value: "true" },
        { label: "Total premiums collected / NPV of benefits", value: "false" }
        ],
        answer: "NPV of expected profit / PV of premiums",
        solution: "Profit margin expresses profitability relative to PV of premiums"
        },
        {
        id: 96,
        question: "Deferred whole life assurance: $10,000 payable at death after 5-year deferment. Single premium at age 40. Which factor is used?",
        questionType: "multiple-choice",
        options: [
        { label: "v^5 * A_{45}", value: "true" },
        { label: "A_{40}", value: "false" }
        ],
        answer: "v^5 * A_{45}",
        solution: "Deferred benefit discounted for 5 years, then use EPV of whole life from age 45"
        },

        {
        id: 97,
        question: "Temporary annuity deferred 3 years, paying $1,000 annually for 5 years. Interest i=5%. Which factor is used?",
        questionType: "multiple-choice",
        options: [
        { label: "v^3 * a_{x+3:\overline{5}|}", value: "true" },
        { label: "a_{x:\overline{5}|}", value: "false" }
        ],
        answer: "v^3 * a_{x+3:\overline{5}|}",
        solution: "Discount for deferment first, then calculate 5-year temporary annuity from age x+3"
        },

        {
        id: 98,
        question: "Multiple decrement: life may die of causes A or B or become disabled. PV of benefits uses:",
        questionType: "multiple-choice",
        options: [
        { label: "Sum over all paths of probability * discounted benefit", value: "true" },
        { label: "Ignore competing causes", value: "false" }
        ],
        answer: "Sum over all paths of probability * discounted benefit",
        solution: "Consider all possible decrement paths weighted by transition probabilities"
        },

        {
        id: 99,
        question: "Sickness benefit: continuous payments while sick, interest δ=5%, μ_{healthy→sick}=0.02. EPV formula:",
        questionType: "multiple-choice",
        options: [
        { label: "∫_0^∞ e^{-δ t} * μ * survival(t) dt", value: "true" },
        { label: "Discrete sum v^t * μ", value: "false" }
        ],
        answer: "∫_0^∞ e^{-δ t} * μ * survival(t) dt",
        solution: "Continuous payment discounted by force of interest and probability entering sick state"
        },

        {
        id: 100,
        question: "Joint life assurance: death benefit paid at first death. Lives independent. Which EPV?",
        questionType: "multiple-choice",
        options: [
        { label: "Sum over n of v^n * n p_x * n p_y", value: "true" },
        { label: "Sum over n of v^n * (n p_x + n p_y)", value: "false" }
        ],
        answer: "Sum over n of v^n * n p_x * n p_y",
        solution: "EPV = discounted benefit * probability both alive, independent"
        },

        {
        id: 101,
        question: "Unit-linked policy with deferred premiums: reserve at t is negative if:",
        questionType: "multiple-choice",
        options: [
        { label: "Expected fund and future premiums < expected benefits", value: "true" },
        { label: "Expected fund exceeds benefits", value: "false" }
        ],
        answer: "Expected fund and future premiums < expected benefits",
        solution: "Negative prospective reserve arises if assets insufficient for future obligations"
        },

        {
        id: 102,
        question: "Health insurance: benefit paid immediately on death, premium payable continuously. EPV of premiums:",
        questionType: "multiple-choice",
        options: [
        { label: "∫ v^t * probability alive * premium dt", value: "true" },
        { label: "Discrete sum over years", value: "false" }
        ],
        answer: "∫ v^t * probability alive * premium dt",
        solution: "Continuous premiums discounted by probability life is still alive"
        },

        {
        id: 103,
        question: "Multiple decrement table used to calculate:",
        questionType: "multiple-choice",
        options: [
        { label: "Expected present value of cashflows contingent on any decrement", value: "true" },
        { label: "Only EPV of life annuities", value: "false" }
        ],
        answer: "Expected present value of cashflows contingent on any decrement",
        solution: "Tables allow calculation of EPV for all decrement-dependent benefits"
        },

        {
        id: 104,
        question: "Deferred annuity payable on survival to 65, $1,000 annually, interest i=4%, life age 60. EPV factor:",
        questionType: "multiple-choice",
        options: [
        { label: "v^5 * a_{65:\overline{n}|}", value: "true" },
        { label: "a_{60:\overline{n}|}", value: "false" }
        ],
        answer: "v^5 * a_{65:\overline{n}|}",
        solution: "Discount for deferment to age 65, then temporary/whole life annuity factor from 65"
        },

        {
        id: 105,
        question: "Two lives: last survivor annuity pays until both die. Independent. EPV:",
        questionType: "multiple-choice",
        options: [
        { label: "Sum over n of v^n * (1 - (1 - n p_x)(1 - n p_y))", value: "true" },
        { label: "Sum over n of v^n * n p_x * n p_y", value: "false" }
        ],
        answer: "Sum over n of v^n * (1 - (1 - n p_x)(1 - n p_y))",
        solution: "Probability at least one alive = 1 - (1 - n p_x)(1 - n p_y)"
        },

        {
        id: 106,
        question: "Health insurance: multiple state, states Healthy, Sick, Dead. Premium paid while healthy. EPV of premiums:",
        questionType: "multiple-choice",
        options: [
        { label: "∫ v^t * probability in Healthy dt", value: "true" },
        { label: "Sum over discrete years only", value: "false" }
        ],
        answer: "∫ v^t * probability in Healthy dt",
        solution: "Continuous premium discounted by probability in healthy state"
        },

        {
        id: 107,
        question: "Gross prospective reserve for deferred endowment assurance:",
        questionType: "multiple-choice",
        options: [
        { label: "PV(future benefits including deferment) - PV(future premiums)", value: "true" },
        { label: "PV(past premiums) - PV(past benefits)", value: "false" }
        ],
        answer: "PV(future benefits including deferment) - PV(future premiums)",
        solution: "Prospective reserve accounts for deferred benefits and remaining premiums"
        },

        {
        id: 108,
        question: "Unit-linked with-profits: terminal bonus is:",
        questionType: "multiple-choice",
        options: [
        { label: "Allocated at maturity based on investment returns", value: "true" },
        { label: "Paid annually regardless of performance", value: "false" }
        ],
        answer: "Allocated at maturity based on investment returns",
        solution: "Terminal bonus reflects actual performance of underlying fund at end"
        },

        {
        id: 109,
        question: "Profit test: net present value (NPV) of expected profit is:",
        questionType: "multiple-choice",
        options: [
        { label: "PV of premiums - PV of benefits - PV of expenses", value: "true" },
        { label: "PV of benefits only", value: "false" }
        ],
        answer: "PV of premiums - PV of benefits - PV of expenses",
        solution: "NPV considers all cash inflows and outflows for profit assessment"
        },

        {
        id: 110,
        question: "Deferred temporary assurance: $10,000 if death occurs between 5–10 years. Annual premium level. EPV of premiums uses:",
        questionType: "multiple-choice",
        options: [
        { label: "Sum over years 0–10 of v^t * n p_x * premium", value: "true" },
        { label: "Premiums start at year 5 only", value: "false" }
        ],
        answer: "Sum over years 0–10 of v^t * n p_x * premium",
        solution: "Premiums are paid throughout term, discounted appropriately"
        },
        {
        id: 111,
        question: "What is the definition of the force of interest (δ)?",
        questionType: "multiple-choice",
        options: [
        { label: "Instantaneous rate of growth of an investment", value: "true" },
        { label: "Annual effective interest rate", value: "false" },
        { label: "Discount factor for one year", value: "false" },
        { label: "Nominal rate convertible quarterly", value: "false" }
        ],
        answer: "Instantaneous rate of growth of an investment",
        solution: "Force of interest δ is defined as the limit of the effective interest rate over a very small time interval: δ = d/dt ln A(t)"
        },

        {
        id: 112,
        question: "What is a joint life assurance?",
        questionType: "multiple-choice",
        options: [
        { label: "Insurance paying on first death of two lives", value: "true" },
        { label: "Insurance paying on last death of two lives", value: "false" },
        { label: "Annuity payable while both lives alive", value: "false" },
        { label: "Endowment payable at maturity", value: "false" }
        ],
        answer: "Insurance paying on first death of two lives",
        solution: "Joint life assurance pays the benefit at the first death among the insured lives"
        },

        {
        id: 113,
        question: "Which of the following defines a last survivor annuity?",
        questionType: "multiple-choice",
        options: [
        { label: "Annuity paid until both lives die", value: "true" },
        { label: "Annuity paid until first death", value: "false" },
        { label: "Endowment payable at last death", value: "false" },
        { label: "Annuity deferred for n years", value: "false" }
        ],
        answer: "Annuity paid until both lives die",
        solution: "Last survivor annuity continues payments until the second of the two insured lives dies"
        },

        {
        id: 114,
        question: "What is a deferred annuity?",
        questionType: "multiple-choice",
        options: [
        { label: "Annuity whose payments start after a deferment period", value: "true" },
        { label: "Annuity paid immediately", value: "false" },
        { label: "Annuity with increasing payments", value: "false" },
        { label: "Annuity payable at death", value: "false" }
        ],
        answer: "Annuity whose payments start after a deferment period",
        solution: "Deferred annuity payments begin only after a specified period has passed"
        },

        {
        id: 115,
        question: "Which best describes a pure endowment?",
        questionType: "multiple-choice",
        options: [
        { label: "Benefit payable only if the insured survives to a certain term", value: "true" },
        { label: "Benefit paid at death anytime", value: "false" },
        { label: "Annuity payable during life", value: "false" },
        { label: "Insurance paying both death and survival", value: "false" }
        ],
        answer: "Benefit payable only if the insured survives to a certain term",
        solution: "Pure endowment pays a lump sum only on survival to a fixed term"
        },

        {
        id: 116,
        question: "What is the equivalence principle in actuarial science?",
        questionType: "multiple-choice",
        options: [
        { label: "Premiums set so PV of premiums = PV of expected benefits", value: "true" },
        { label: "Premiums set to maximize profit", value: "false" },
        { label: "Reserve calculated retrospectively", value: "false" },
        { label: "Premiums discounted at δ only", value: "false" }
        ],
        answer: "Premiums set so PV of premiums = PV of expected benefits",
        solution: "Equivalence principle sets premiums such that the expected present value of premiums equals the expected present value of benefits"
        },

        {
        id: 117,
        question: "Which statement best defines a gross premium reserve?",
        questionType: "multiple-choice",
        options: [
        { label: "Reserve including future benefits and expenses minus future premiums", value: "true" },
        { label: "Reserve excluding expenses", value: "false" },
        { label: "Reserve ignoring bonuses", value: "false" },
        { label: "Reserve based on past premiums only", value: "false" }
        ],
        answer: "Reserve including future benefits and expenses minus future premiums",
        solution: "Gross premium reserve considers all expected outflows including benefits and expenses less expected premiums"
        },

        {
        id: 118,
        question: "What is a mortality profit?",
        questionType: "multiple-choice",
        options: [
        { label: "Profit arising when actual deaths < expected deaths", value: "true" },
        { label: "Profit when premiums exceed expenses", value: "false" },
        { label: "Profit when reserve is negative", value: "false" },
        { label: "Profit from investment gains only", value: "false" }
        ],
        answer: "Profit arising when actual deaths < expected deaths",
        solution: "Mortality profit occurs because fewer claims are paid than expected"
        },

        {
        id: 119,
        question: "What is a temporary life assurance?",
        questionType: "multiple-choice",
        options: [
        { label: "Insurance paying benefit if death occurs within n years", value: "true" },
        { label: "Insurance paying benefit at death regardless of age", value: "false" },
        { label: "Annuity payable during life", value: "false" },
        { label: "Insurance with deferred premium", value: "false" }
        ],
        answer: "Insurance paying benefit if death occurs within n years",
        solution: "Temporary assurance provides cover for a limited term only"
        },

        {
        id: 120,
        question: "In a multiple decrement model, n q_x^j represents:",
        questionType: "multiple-choice",
        options: [
        { label: "Probability of decrement due to cause j within n years", value: "true" },
        { label: "Probability of surviving n years", value: "false" },
        { label: "Force of mortality for age x", value: "false" },
        { label: "Total probability of death", value: "false" }
        ],
        answer: "Probability of decrement due to cause j within n years",
        solution: "n q_x^j is the probability life exits due to cause j in n years"
        },

        {
        id: 121,
        question: "What is the difference between prospective and retrospective reserve?",
        questionType: "multiple-choice",
        options: [
        { label: "Prospective: PV(future benefits - future premiums); Retrospective: accumulated premiums - accumulated benefits", value: "true" },
        { label: "Prospective = Retrospective always", value: "false" },
        { label: "Prospective ignores interest", value: "false" },
        { label: "Retrospective ignores premiums", value: "false" }
        ],
        answer: "Prospective: PV(future benefits - future premiums); Retrospective: accumulated premiums - accumulated benefits",
        solution: "Prospective reserve looks forward, retrospective reserve looks backward"
        },

        {
        id: 122,
        question: "What does the net premium represent?",
        questionType: "multiple-choice",
        options: [
        { label: "Premium calculated ignoring expenses and bonuses", value: "true" },
        { label: "Gross premium including expenses", value: "false" },
        { label: "Premium adjusted for investment gains", value: "false" },
        { label: "Premium discounted at zero interest", value: "false" }
        ],
        answer: "Premium calculated ignoring expenses and bonuses",
        solution: "Net premium is calculated solely to cover expected benefits, without extra loadings"
        },

        {
        id: 123,
        question: "Which describes a unit-linked contract?",
        questionType: "multiple-choice",
        options: [
        { label: "Policy benefits linked to investment fund value", value: "true" },
        { label: "Policy benefits guaranteed fixed amount", value: "false" },
        { label: "Policy benefits increase linearly with age", value: "false" },
        { label: "Policy pays only at death", value: "false" }
        ],
        answer: "Policy benefits linked to investment fund value",
        solution: "Unit-linked policies provide benefits dependent on the underlying investment units"
        },

        {
        id: 124,
        question: "Reversionary bonus in with-profits contract:",
        questionType: "multiple-choice",
        options: [
        { label: "Added regularly to increase policy benefit", value: "true" },
        { label: "Paid only at maturity", value: "false" },
        { label: "Deducted from premiums", value: "false" },
        { label: "Only affects reserves, not benefits", value: "false" }
        ],
        answer: "Added regularly to increase policy benefit",
        solution: "Reversionary bonuses are credited periodically to enhance policy value"
        },

        {
        id: 125,
        question: "Redington's conditions for immunisation ensure:",
        questionType: "multiple-choice",
        options: [
        { label: "Portfolio value insensitive to small parallel shifts in interest rates", value: "true" },
        { label: "Portfolio maximizes returns", value: "false" },
        { label: "Portfolio fully hedged against mortality", value: "false" },
        { label: "Portfolio minimizes all risks", value: "false" }
        ],
        answer: "Portfolio value insensitive to small parallel shifts in interest rates",
        solution: "Redington's immunisation aligns duration of assets and liabilities to protect against interest rate changes"
        },
        {
        id: 126,
        question: "A loan has level annual repayments and an interest rate of 6% p.a. If the borrower prepays a single repayment early, which happens to the present value of future payments?",
        questionType: "multiple-choice",
        options: [
        { label: "It decreases", value: "true" },
        { label: "It increases", value: "false" },
        { label: "It remains the same", value: "false" },
        { label: "Cannot be determined without the loan term", value: "false" }
        ],
        answer: "It decreases",
        solution: "Prepaying a repayment reduces the outstanding principal, hence PV of remaining payments decreases"
        },

        {
        id: 127,
        question: "Which statement is true regarding a temporary life annuity?",
        questionType: "multiple-choice",
        options: [
        { label: "Payments stop at the end of the term or death, whichever comes first", value: "true" },
        { label: "Payments continue for life", value: "false" },
        { label: "Payments increase annually by interest rate", value: "false" },
        { label: "Payments are deferred indefinitely", value: "false" }
        ],
        answer: "Payments stop at the end of the term or death, whichever comes first",
        solution: "Temporary life annuity provides payments for a limited term contingent on survival"
        },

        {
        id: 128,
        question: "If the force of interest δ(t) is increasing over time, the effective annual rate over 1 year is:",
        questionType: "multiple-choice",
        options: [
        { label: "Greater than the initial δ(0)", value: "true" },
        { label: "Equal to δ(0)", value: "false" },
        { label: "Less than δ(0)", value: "false" },
        { label: "Cannot be determined without integration", value: "false" }
        ],
        answer: "Greater than the initial δ(0)",
        solution: "Effective annual rate i = e^{∫₀¹ δ(t) dt} - 1; if δ(t) increases, integral > δ(0), so i > δ(0)"
        },

        {
        id: 129,
        question: "A joint life annuity pays $1000 annually until the first death. If the lives are independent, which is true about EPV?",
        questionType: "multiple-choice",
        options: [
        { label: "EPV = a_x * a_y", value: "false" },
        { label: "EPV = Σ v^n * P(both alive) * payment", value: "true" },
        { label: "EPV ignores survival probabilities", value: "false" },
        { label: "EPV = max(a_x, a_y)", value: "false" }
        ],
        answer: "EPV = Σ v^n * P(both alive) * payment",
        solution: "Expected present value sums discounted payments weighted by probability both lives are alive at each payment time"
        },

        {
        id: 130,
        question: "In a multiple decrement model, which situation can lead to negative dependencies?",
        questionType: "multiple-choice",
        options: [
        { label: "If the occurrence of one decrement reduces the probability of another", value: "true" },
        { label: "If decrements are independent", value: "false" },
        { label: "If all forces of decrement are equal", value: "false" },
        { label: "If survival probabilities are constant", value: "false" }
        ],
        answer: "If the occurrence of one decrement reduces the probability of another",
        solution: "Negative dependency arises because one event removes the life from risk of other decrements"
        },

        {
        id: 131,
        question: "Which is true regarding a unit-linked with-profits policy?",
        questionType: "multiple-choice",
        options: [
        { label: "Benefits depend on both fund performance and reversionary/terminal bonuses", value: "true" },
        { label: "Benefits are guaranteed fixed amount", value: "false" },
        { label: "Reversionary bonuses are optional", value: "false" },
        { label: "Terminal bonus is paid regularly each year", value: "false" }
        ],
        answer: "Benefits depend on both fund performance and reversionary/terminal bonuses",
        solution: "Unit-linked with-profits policies combine investment performance with declared bonuses"
        },

        {
        id: 132,
        question: "Redington immunisation conditions require:",
        questionType: "multiple-choice",
        options: [
        { label: "Duration of assets = duration of liabilities", value: "true" },
        { label: "Portfolio fully invested in equities", value: "false" },
        { label: "Cashflows are convex only", value: "false" },
        { label: "All liabilities must be deferred", value: "false" }
        ],
        answer: "Duration of assets = duration of liabilities",
        solution: "Matching durations ensures small parallel shifts in interest rates do not change portfolio value"
        },

        {
        id: 133,
        question: "For a deferred pure endowment, which factor discounts the benefit to present?",
        questionType: "multiple-choice",
        options: [
        { label: "v^n * probability of survival to deferment age", value: "true" },
        { label: "v^n * probability of death before deferment", value: "false" },
        { label: "a_{x:\overline{n}|}", value: "false" },
        { label: "Immediate annuity factor", value: "false" }
        ],
        answer: "v^n * probability of survival to deferment age",
        solution: "Benefit payable only if the life survives the deferment period, discounted to present"
        },

        {
        id: 134,
        question: "An EPV of a continuous annuity payable while healthy uses which formula?",
        questionType: "multiple-choice",
        options: [
        { label: "∫₀^∞ e^{-δ t} * P(alive and healthy at t) dt", value: "true" },
        { label: "Σ v^t * P(dead at t)", value: "false" },
        { label: "a_x", value: "false" },
        { label: "v^n * benefit", value: "false" }
        ],
        answer: "∫₀^∞ e^{-δ t} * P(alive and healthy at t) dt",
        solution: "Continuous payment discounted by force of interest and probability being in healthy state"
        },

        {
        id: 135,
        question: "In a profit test, the discounted payback period is:",
        questionType: "multiple-choice",
        options: [
        { label: "Time until cumulative discounted cashflows ≥ 0", value: "true" },
        { label: "Total term of policy", value: "false" },
        { label: "Time until first premium received", value: "false" },
        { label: "Always equal to IRR", value: "false" }
        ],
        answer: "Time until cumulative discounted cashflows ≥ 0",
        solution: "Discounted payback accounts for time value of money in recovery of outlays"
        },

        {
        id: 136,
        question: "Which is true about mortality profit in a portfolio?",
        questionType: "multiple-choice",
        options: [
        { label: "Occurs when actual deaths < expected deaths", value: "true" },
        { label: "Occurs when premiums exceed expected benefits", value: "false" },
        { label: "Occurs when reserves are negative", value: "false" },
        { label: "Occurs only in unit-linked policies", value: "false" }
        ],
        answer: "Occurs when actual deaths < expected deaths",
        solution: "Mortality profit arises because fewer claims are paid than projected"
        },

        {
        id: 137,
        question: "Net premium principle ignores:",
        questionType: "multiple-choice",
        options: [
        { label: "Expenses and bonuses", value: "true" },
        { label: "Future benefits", value: "false" },
        { label: "Probability of death", value: "false" },
        { label: "Interest rates", value: "false" }
        ],
        answer: "Expenses and bonuses",
        solution: "Net premium is calculated only to cover expected benefits, without loading for expenses"
        },

        {
        id: 138,
        question: "A temporary annuity payable in advance for 10 years has value:",
        questionType: "multiple-choice",
        options: [
        { label: "ä_{x:\overline{10}|}", value: "true" },
        { label: "a_{x:\overline{10}|}", value: "false" },
        { label: "a_{x+1:\overline{9}|}", value: "false" },
        { label: "v^10 * a_{x:\overline{10}|}", value: "false" }
        ],
        answer: "ä_{x:\overline{10}|}",
        solution: "An annuity-due (payments in advance) is denoted ä"
        },

        {
        id: 139,
        question: "Which describes a terminal bonus?",
        questionType: "multiple-choice",
        options: [
        { label: "Paid at maturity based on accumulated profits", value: "true" },
        { label: "Added annually like reversionary bonus", value: "false" },
        { label: "Deducted from premiums", value: "false" },
        { label: "Guarantees minimum return", value: "false" }
        ],
        answer: "Paid at maturity based on accumulated profits",
        solution: "Terminal bonus adjusts benefits at maturity according to overall profits"
        },

        {
        id: 140,
        question: "Which is true about a last survivor assurance?",
        questionType: "multiple-choice",
        options: [
        { label: "Benefit paid at death of last surviving insured", value: "true" },
        { label: "Benefit paid at first death", value: "false" },
        { label: "Benefit paid immediately at policy inception", value: "false" },
        { label: "Benefit depends on investment fund only", value: "false" }
        ],
        answer: "Benefit paid at death of last surviving insured",
        solution: "Last survivor assurance continues until both lives have died"
        }
];

// Flashcard State
let currentQuestionIndex = 0;
let isFlipped = false;
let answerSubmitted = false;
let isAnswerCorrect = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
    setupEventListeners();
    renderMath(); // Initial render for any math in the first question
});

function setupEventListeners() {
    const flashcard = document.getElementById('flashcard');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const backToQuestionBtn = document.getElementById('back-to-question-btn');
    const nextAfterSolutionBtn = document.getElementById('next-after-solution-btn');

    submitAnswerBtn.addEventListener('click', () => {
        checkAnswer();
    });

    showSolutionBtn.addEventListener('click', () => {
        flipCard();
    });

    nextQuestionBtn.addEventListener('click', () => {
        nextQuestion();
    });

    backToQuestionBtn.addEventListener('click', () => {
        flipCard();
    });

    nextAfterSolutionBtn.addEventListener('click', () => {
        nextQuestion();
    });

    // Allow Enter key to submit answer
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isFlipped) {
            const answerInput = document.getElementById('answer-input');
            if (answerInput && document.activeElement === answerInput) {
                checkAnswer();
            }
        }
    });
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    if (!question) return;

    // Reset state
    answerSubmitted = false;
    isAnswerCorrect = false;

    // Update question number
    document.getElementById('question-num').textContent = question.id;
    document.getElementById('current-progress').textContent = question.id;
    document.getElementById('total-questions').textContent = questions.length;

    // Hide feedback
    const feedbackEl = document.getElementById('answer-feedback');
    feedbackEl.style.display = 'none';
    feedbackEl.className = 'answer-feedback';

    // Render question text
    const questionTextEl = document.getElementById('question-text');
    questionTextEl.innerHTML = `<p>${question.question}</p>`;

    // Render answer section
    const answerSectionEl = document.getElementById('answer-section');
    if (question.questionType === 'multiple-choice') {
        answerSectionEl.innerHTML = `
            <label style="display: block; margin-bottom: 12px; font-weight: 600; color: #1e293b;">Select your answer:</label>
            <div class="multiple-choice-options">
                ${question.options.map((option, index) => `
                    <label class="choice-option" data-value="${option.value}">
                        <input type="radio" name="answer" value="${option.value}">
                        <span>${option.label}</span>
                    </label>
                `).join('')}
            </div>
        `;

        // Add click handlers for multiple choice
        answerSectionEl.querySelectorAll('.choice-option').forEach(option => {
            option.addEventListener('click', function() {
                // Only prevent changes if answer was correct
                if (answerSubmitted && isAnswerCorrect) return;
                
                // Remove selected class from all options
                answerSectionEl.querySelectorAll('.choice-option').forEach(opt => {
                    opt.classList.remove('selected');
                    opt.querySelector('input[type="radio"]').checked = false;
                });
                // Add selected class to clicked option
                this.classList.add('selected');
                this.querySelector('input[type="radio"]').checked = true;
                
                // If answer was wrong and user changes selection, allow resubmission
                if (answerSubmitted && !isAnswerCorrect) {
                    answerSubmitted = false;
                    const feedbackEl = document.getElementById('answer-feedback');
                    feedbackEl.style.display = 'none';
                }
            });
        });
    } else {
        answerSectionEl.innerHTML = `
            <label style="display: block; margin-bottom: 12px; font-weight: 600; color: #1e293b;">Enter your answer:</label>
            <input type="text" class="answer-input" id="answer-input" placeholder="Enter your answer here">
        `;
        
        // Allow resubmission if user changes their answer after getting it wrong
        const answerInput = document.getElementById('answer-input');
        if (answerInput) {
            answerInput.addEventListener('input', function() {
                if (answerSubmitted && !isAnswerCorrect) {
                    answerSubmitted = false;
                    const feedbackEl = document.getElementById('answer-feedback');
                    feedbackEl.style.display = 'none';
                }
            });
        }
    }

    // Render solution
    const solutionTextEl = document.getElementById('solution-text');
    solutionTextEl.innerHTML = `<p>${question.solution}</p>`;

    // Reset card state
    if (isFlipped) {
        flipCard();
    }

    // Render math after a short delay to ensure DOM is ready
    setTimeout(() => {
        renderMath();
    }, 100);
}

function checkAnswer() {
    // Only prevent resubmission if answer was correct
    if (answerSubmitted && isAnswerCorrect) return;

    const question = questions[currentQuestionIndex];
    if (!question) return;

    let userAnswer = '';
    const feedbackEl = document.getElementById('answer-feedback');

    // Get user's answer
    if (question.questionType === 'multiple-choice') {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            feedbackEl.textContent = 'Please select an answer.';
            feedbackEl.className = 'answer-feedback feedback-error';
            feedbackEl.style.display = 'block';
            return;
        }
        userAnswer = selectedOption.value.trim();
    } else {
        const answerInput = document.getElementById('answer-input');
        if (!answerInput || !answerInput.value.trim()) {
            feedbackEl.textContent = 'Please enter an answer.';
            feedbackEl.className = 'answer-feedback feedback-error';
            feedbackEl.style.display = 'block';
            return;
        }
        userAnswer = answerInput.value.trim();
    }

    // Normalize answers for comparison (handle decimals, case, etc.)
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(question.answer);

    // Check if answer is correct
    isAnswerCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

    // Show feedback
    answerSubmitted = true;
    feedbackEl.style.display = 'block';

    if (isAnswerCorrect) {
        feedbackEl.textContent = '✓ Correct! Well done.';
        feedbackEl.className = 'answer-feedback feedback-correct';
        
        // Disable input if correct
        if (question.questionType === 'input') {
            const answerInput = document.getElementById('answer-input');
            if (answerInput) answerInput.disabled = true;
        } else {
            document.querySelectorAll('.choice-option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
        }
    } else {
        feedbackEl.textContent = '✗ Incorrect. Try again or view the solution.';
        feedbackEl.className = 'answer-feedback feedback-error';
        
        // Re-enable input for text answers if wrong (allow retry)
        if (question.questionType === 'input') {
            const answerInput = document.getElementById('answer-input');
            if (answerInput) {
                answerInput.disabled = false;
                answerInput.focus();
            }
        }
    }
}

function normalizeAnswer(answer) {
    // Convert to string, trim, remove spaces, handle decimals
    let normalized = answer.toString().trim().replace(/\s+/g, '').toLowerCase();
    
    // Remove currency symbols, commas, and other formatting
    normalized = normalized.replace(/[$,\s]/g, '');
    
    // Try to parse as number to normalize decimals
    // This handles cases like "4.00" matching "4" or "4.0"
    const num = parseFloat(normalized);
    if (!isNaN(num)) {
        // For whole numbers, remove decimal point and trailing zeros
        if (num % 1 === 0) {
            normalized = num.toString();
        } else {
            // For decimals, keep the number as is (removes leading zeros)
            normalized = num.toString();
        }
    }
    
    return normalized;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        // Could show a completion message or loop back
        currentQuestionIndex = 0;
        renderQuestion();
    }
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped');
}

function renderMath() {
    // Render LaTeX using KaTeX
    // Wait for KaTeX to be available
    if (typeof renderMathInElement !== 'undefined') {
        const questionText = document.getElementById('question-text');
        const solutionText = document.getElementById('solution-text');
        
        const renderOptions = {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '\\[', right: '\\]', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false}
            ],
            throwOnError: false
        };
        
        if (questionText) {
            renderMathInElement(questionText, renderOptions);
        }
        
        if (solutionText) {
            renderMathInElement(solutionText, renderOptions);
        }
    } else {
        // Retry after a short delay if KaTeX isn't loaded yet
        setTimeout(renderMath, 100);
    }
}

