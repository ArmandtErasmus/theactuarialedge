// Economics Practice Questions Data
// Business Economics Practice Questions Data
const questions = [
    {
        id: 1,
        question: "Opportunity cost refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "The cost of the next best alternative foregone", value: "true" },
            { label: "The explicit monetary cost only", value: "false" },
            { label: "Sunk costs in a project", value: "false" },
            { label: "Costs that cannot be measured", value: "false" }
        ],
        answer: "true",
        solution: "Opportunity cost includes both explicit and implicit costs of the next best alternative."
    },
    {
        id: 2,
        question: "Scarcity in economics means:",
        questionType: "multiple-choice",
        options: [
            { label: "Resources are limited relative to wants", value: "true" },
            { label: "No resources exist", value: "false" },
            { label: "Prices are always high", value: "false" },
            { label: "Demand exceeds supply at all prices", value: "false" }
        ],
        answer: "true",
        solution: "Scarcity arises because resources are finite, but human wants are unlimited."
    },
    {
        id: 3,
        question: "Microeconomics primarily studies:",
        questionType: "multiple-choice",
        options: [
            { label: "Individual firms, households, and markets", value: "true" },
            { label: "National income and inflation", value: "false" },
            { label: "Government fiscal policy", value: "false" },
            { label: "Global trade balances", value: "false" }
        ],
        answer: "true",
        solution: "Microeconomics focuses on decisions and interactions of individual economic agents."
    },
    {
        id: 4,
        question: "Macroeconomics primarily studies:",
        questionType: "multiple-choice",
        options: [
            { label: "Aggregate economic variables like GDP and inflation", value: "true" },
            { label: "Price of a single product", value: "false" },
            { label: "Market structure of a firm", value: "false" },
            { label: "Consumer indifference curves", value: "false" }
        ],
        answer: "true",
        solution: "Macroeconomics looks at the economy as a whole, not individual markets."
    },
    {
        id: 5,
        question: "Which of the following is a key feature of Classical economics?",
        questionType: "multiple-choice",
        options: [
            { label: "Markets naturally reach equilibrium", value: "true" },
            { label: "Government should intervene heavily", value: "false" },
            { label: "Focus on central planning", value: "false" },
            { label: "Prices are always sticky downward", value: "false" }
        ],
        answer: "true",
        solution: "Classical economics assumes self-correcting markets where supply and demand determine prices."
    },
    {
        id: 6,
        question: "Marxian socialism emphasizes:",
        questionType: "multiple-choice",
        options: [
            { label: "Public ownership of the means of production", value: "true" },
            { label: "Free markets without regulation", value: "false" },
            { label: "Minimal government intervention", value: "false" },
            { label: "Focus on utility maximization for individuals", value: "false" }
        ],
        answer: "true",
        solution: "Marxian socialism emphasizes collective ownership and reducing inequality."
    },
    {
        id: 7,
        question: "Keynesian economics advocates:",
        questionType: "multiple-choice",
        options: [
            { label: "Active government intervention to stabilize the economy", value: "true" },
            { label: "No government interference in the market", value: "false" },
            { label: "Privatization of all industries", value: "false" },
            { label: "Fixed money supply regardless of demand", value: "false" }
        ],
        answer: "true",
        solution: "Keynesian theory recommends fiscal and monetary policy to smooth economic cycles."
    },
    {
        id: 8,
        question: "Monetarist economics primarily focuses on:",
        questionType: "multiple-choice",
        options: [
            { label: "The role of money supply in influencing inflation and output", value: "true" },
            { label: "Income redistribution through taxes", value: "false" },
            { label: "Government-controlled prices", value: "false" },
            { label: "Labour market rigidities", value: "false" }
        ],
        answer: "true",
        solution: "Monetarists emphasize controlling the money supply to stabilize the economy."
    },
    {
        id: 9,
        question: "The Austrian school of economics emphasizes:",
        questionType: "multiple-choice",
        options: [
            { label: "Individual decision-making and market processes", value: "true" },
            { label: "Central planning of resources", value: "false" },
            { label: "Government deficit spending", value: "false" },
            { label: "Nominal rigidities in wages", value: "false" }
        ],
        answer: "true",
        solution: "Austrian economics focuses on entrepreneurship, individual choices, and price signals."
    },
    {
        id: 10,
        question: "The 2008 banking crisis highlighted:",
        questionType: "multiple-choice",
        options: [
            { label: "The limitations of monetary policy alone to stabilize the economy", value: "true" },
            { label: "That free markets never fail", value: "false" },
            { label: "That fiscal policy is always ineffective", value: "false" },
            { label: "That inflation is always the main concern", value: "false" }
        ],
        answer: "true",
        solution: "The crisis showed that both fiscal and monetary tools are needed, and market failures occur."
    },
    {
        id: 11,
        question: "After the 2008 crisis, European governments:",
        questionType: "multiple-choice",
        options: [
            { label: "Implemented stimulus packages and austerity measures", value: "true" },
            { label: "Eliminated central banks", value: "false" },
            { label: "Privatized all banks immediately", value: "false" },
            { label: "Adopted pure laissez-faire policies", value: "false" }
        ],
        answer: "true",
        solution: "Europe applied a mix of stimulus, regulation, and austerity after the crisis."
    },
    {
        id: 12,
        question: "Economic choice involves:",
        questionType: "multiple-choice",
        options: [
            { label: "Selecting among alternatives given limited resources", value: "true" },
            { label: "Choosing randomly without constraints", value: "false" },
            { label: "Ignoring opportunity costs", value: "false" },
            { label: "Maximizing government revenue only", value: "false" }
        ],
        answer: "true",
        solution: "Economic choice is constrained by scarcity, requiring evaluation of opportunity costs."
    },
    {
        id: 13,
        question: "Business decisions are influenced by:",
        questionType: "multiple-choice",
        options: [
            { label: "Outputs, inputs, technology, location and competition", value: "true" },
            { label: "Only government regulations", value: "false" },
            { label: "Consumer preferences exclusively", value: "false" },
            { label: "Macroeconomic variables only", value: "false" }
        ],
        answer: "true",
        solution: "Firms consider multiple factors, including production choices, technology, and competition."
    },
    {
        id: 14,
        question: "The difference between microeconomics and macroeconomics is primarily:",
        questionType: "multiple-choice",
        options: [
            { label: "Micro focuses on individual agents; macro on aggregate economy", value: "true" },
            { label: "Micro deals with GDP; macro with firms", value: "false" },
            { label: "Micro ignores prices; macro ignores output", value: "false" },
            { label: "They are essentially the same", value: "false" }
        ],
        answer: "true",
        solution: "Micro studies firms, households, and markets; macro studies the whole economy."
    },
    {
        id: 15,
        question: "Economic models are used primarily to:",
        questionType: "multiple-choice",
        options: [
            { label: "Simplify and explain real-world economic phenomena", value: "true" },
            { label: "Replace real-world data entirely", value: "false" },
            { label: "Guarantee policy success", value: "false" },
            { label: "Predict exact future outcomes", value: "false" }
        ],
        answer: "true",
        solution: "Models simplify reality to highlight key relationships and support analysis."
    },
    {
        id: 16,
        question: "The principle of rational expectations suggests that:",
        questionType: "multiple-choice",
        options: [
            { label: "People use all available information to forecast future economic variables", value: "true" },
            { label: "People always make mistakes in forecasting", value: "false" },
            { label: "Expectations are irrelevant for markets", value: "false" },
            { label: "Governments can perfectly predict economic outcomes", value: "false" }
        ],
        answer: "true",
        solution: "Rational expectations assume that agents use all available information efficiently in forming expectations."
    },
    {
        id: 17,
        question: "Evidence against the strong form of the Efficient Markets Hypothesis includes:",
        questionType: "multiple-choice",
        options: [
            { label: "Insider trading profits", value: "true" },
            { label: "Stable stock prices", value: "false" },
            { label: "Market crashes", value: "false" },
            { label: "Interest rate changes", value: "false" }
        ],
        answer: "true",
        solution: "Strong EMH claims no one can consistently outperform the market, even with insider information."
    },
    {
        id: 18,
        question: "Expected utility theory is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Evaluate choices under uncertainty", value: "true" },
            { label: "Calculate GDP growth", value: "false" },
            { label: "Determine market prices directly", value: "false" },
            { label: "Measure inflation", value: "false" }
        ],
        answer: "true",
        solution: "Expected utility allows agents to make decisions considering both outcomes and their probabilities."
    },
    {
        id: 19,
        question: "A utility function exhibits risk aversion if:",
        questionType: "multiple-choice",
        options: [
            { label: "The individual prefers a certain outcome to a risky one with the same expected value", value: "true" },
            { label: "The individual prefers risk over certainty", value: "false" },
            { label: "Utility is independent of wealth", value: "false" },
            { label: "The function is linear", value: "false" }
        ],
        answer: "true",
        solution: "Risk-averse individuals prefer less risk for the same expected payoff."
    },
    {
        id: 20,
        question: "A declining absolute risk aversion means:",
        questionType: "multiple-choice",
        options: [
            { label: "As wealth increases, the individual becomes less sensitive to absolute risk", value: "true" },
            { label: "The individual becomes more sensitive to risk as wealth rises", value: "false" },
            { label: "The individual is risk neutral", value: "false" },
            { label: "The individual’s risk preference does not change with wealth", value: "false" }
        ],
        answer: "true",
        solution: "Declining absolute risk aversion indicates that richer individuals tolerate larger monetary risks."
    },
    {
        id: 21,
        question: "State-dependent utility functions imply that:",
        questionType: "multiple-choice",
        options: [
            { label: "Utility depends on the state of the world or individual circumstances", value: "true" },
            { label: "Utility is always linear", value: "false" },
            { label: "Utility is independent of outcomes", value: "false" },
            { label: "Preferences are random", value: "false" }
        ],
        answer: "true",
        solution: "State-dependent utilities allow utility to change with context, e.g., health or economic conditions."
    },
    {
        id: 22,
        question: "The Great Recession was triggered primarily by:",
        questionType: "multiple-choice",
        options: [
            { label: "A banking and financial crisis in the US housing market", value: "true" },
            { label: "A decline in gold prices", value: "false" },
            { label: "Excessive government spending in Europe only", value: "false" },
            { label: "Hyperinflation in Asia", value: "false" }
        ],
        answer: "true",
        solution: "The collapse of subprime mortgages and bank failures led to the global recession of 2008."
    },
    {
        id: 23,
        question: "Monetary policy was less effective during the 2008 crisis because:",
        questionType: "multiple-choice",
        options: [
            { label: "Interest rates were already near zero (liquidity trap)", value: "true" },
            { label: "Inflation was extremely high", value: "false" },
            { label: "Markets were perfectly efficient", value: "false" },
            { label: "Fiscal policy had no impact", value: "false" }
        ],
        answer: "true",
        solution: "When interest rates are near zero, lowering them further has little effect on stimulating demand."
    },
    {
        id: 24,
        question: "Stimulus–austerity debate revolves around:",
        questionType: "multiple-choice",
        options: [
            { label: "Whether governments should increase spending or cut deficits to support the economy", value: "true" },
            { label: "Whether to reduce taxes on firms only", value: "false" },
            { label: "The choice between free trade and protectionism", value: "false" },
            { label: "Monetary vs. fiscal policy for controlling inflation", value: "false" }
        ],
        answer: "true",
        solution: "The debate is about using fiscal policy to boost growth versus reducing debt."
    },
    {
        id: 25,
        question: "Classical economics assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Markets are self-correcting without government intervention", value: "true" },
            { label: "Government should actively manage aggregate demand", value: "false" },
            { label: "Prices are sticky in the short run", value: "false" },
            { label: "Economic agents are irrational", value: "false" }
        ],
        answer: "true",
        solution: "Classical theory trusts market forces to reach equilibrium naturally."
    },
    {
        id: 26,
        question: "Post-Keynesian economics differs from traditional Keynesianism by:",
        questionType: "multiple-choice",
        options: [
            { label: "Emphasizing historical time, uncertainty, and non-neutral money", value: "true" },
            { label: "Ignoring government intervention entirely", value: "false" },
            { label: "Assuming perfectly rational expectations", value: "false" },
            { label: "Relying solely on monetary aggregates", value: "false" }
        ],
        answer: "true",
        solution: "Post-Keynesians stress fundamental uncertainty and dynamic market processes."
    },
    {
        id: 27,
        question: "The main lesson from banking crises since the Great Depression is:",
        questionType: "multiple-choice",
        options: [
            { label: "Financial markets can fail, requiring regulation and oversight", value: "true" },
            { label: "Free markets always self-correct without risk", value: "false" },
            { label: "Inflation is the sole cause of crises", value: "false" },
            { label: "Government intervention is always harmful", value: "false" }
        ],
        answer: "true",
        solution: "Crises show that regulation and central bank intervention are needed to stabilize the financial system."
    },
    {
        id: 28,
        question: "Irrational behavior in financial markets may include:",
        questionType: "multiple-choice",
        options: [
            { label: "Excessive optimism leading to asset bubbles", value: "true" },
            { label: "Always making rational investment choices", value: "false" },
            { label: "Perfectly forecasting interest rates", value: "false" },
            { label: "Ignoring all market signals", value: "false" }
        ],
        answer: "true",
        solution: "Behavioral economics shows that psychological biases can cause bubbles and crashes."
    },
    {
        id: 29,
        question: "Economic choice in business decisions is influenced by:",
        questionType: "multiple-choice",
        options: [
            { label: "Opportunity costs, technology, competition, and inputs/outputs", value: "true" },
            { label: "Only government taxes", value: "false" },
            { label: "Random market movements", value: "false" },
            { label: "Consumer irrationality alone", value: "false" }
        ],
        answer: "true",
        solution: "Firms weigh multiple factors when deciding on production, location, and pricing."
    },
    {
        id: 30,
        question: "Microeconomic and macroeconomic perspectives differ in that:",
        questionType: "multiple-choice",
        options: [
            { label: "Micro looks at parts of the economy; macro at the whole economy", value: "true" },
            { label: "Micro is about money supply; macro is about firms", value: "false" },
            { label: "They are entirely unrelated", value: "false" },
            { label: "Micro ignores markets; macro ignores consumers", value: "false" }
        ],
        answer: "true",
        solution: "Micro studies individual markets and agents; macro studies aggregate variables and overall economic performance."
    },
    {
        id: 31,
        question: "Scarcity in economics refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "Limited resources relative to unlimited wants", value: "true" },
            { label: "A lack of money in the economy", value: "false" },
            { label: "Government intervention in markets", value: "false" },
            { label: "Overproduction of goods", value: "false" }
        ],
        answer: "true",
        solution: "Scarcity arises because resources are finite while human wants are virtually unlimited."
    },
    {
        id: 32,
        question: "Opportunity cost is defined as:",
        questionType: "multiple-choice",
        options: [
            { label: "The value of the next best alternative foregone", value: "true" },
            { label: "All the money spent on a decision", value: "false" },
            { label: "The total cost of production", value: "false" },
            { label: "The benefit from the chosen option", value: "false" }
        ],
        answer: "true",
        solution: "Opportunity cost measures what you give up when choosing one option over another."
    },
    {
        id: 33,
        question: "Classical economists primarily believed that:",
        questionType: "multiple-choice",
        options: [
            { label: "Markets naturally move toward full employment", value: "true" },
            { label: "Government should manage aggregate demand actively", value: "false" },
            { label: "Prices are rigid in the short run", value: "false" },
            { label: "Money is neutral in the long run", value: "false" }
        ],
        answer: "true",
        solution: "Classical theory assumes self-correcting markets and flexible prices."
    },
    {
        id: 34,
        question: "Marxian socialism emphasizes:",
        questionType: "multiple-choice",
        options: [
            { label: "Class struggle and public ownership of the means of production", value: "true" },
            { label: "Free-market efficiency", value: "false" },
            { label: "Rational expectations in financial markets", value: "false" },
            { label: "Short-run government stimulus", value: "false" }
        ],
        answer: "true",
        solution: "Marxian theory focuses on inequality, exploitation, and the role of the state in managing resources."
    },
    {
        id: 35,
        question: "Neo-classical economics assumes that:",
        questionType: "multiple-choice",
        options: [
            { label: "Individuals maximize utility and firms maximize profit", value: "true" },
            { label: "Governments always intervene effectively", value: "false" },
            { label: "Markets are always inefficient", value: "false" },
            { label: "Money is irrelevant", value: "false" }
        ],
        answer: "true",
        solution: "Neo-classical models rely on rational agents optimizing under constraints."
    },
    {
        id: 36,
        question: "Keynesian economics differs from classical theory by:",
        questionType: "multiple-choice",
        options: [
            { label: "Recognizing that aggregate demand drives output and employment in the short run", value: "true" },
            { label: "Assuming markets always self-correct", value: "false" },
            { label: "Ignoring government policy", value: "false" },
            { label: "Focusing only on long-run equilibrium", value: "false" }
        ],
        answer: "true",
        solution: "Keynes emphasized short-run fluctuations and the role of government spending in stabilizing demand."
    },
    {
        id: 37,
        question: "The 2008 banking crisis illustrated that:",
        questionType: "multiple-choice",
        options: [
            { label: "Failures in the financial system can lead to severe global recessions", value: "true" },
            { label: "Markets always correct themselves immediately", value: "false" },
            { label: "Monetary policy was unnecessary", value: "false" },
            { label: "Government action had no impact", value: "false" }
        ],
        answer: "true",
        solution: "The subprime mortgage collapse triggered widespread financial instability."
    },
    {
        id: 38,
        question: "Post-2008, many governments engaged in stimulus measures to:",
        questionType: "multiple-choice",
        options: [
            { label: "Boost aggregate demand and prevent deeper recession", value: "true" },
            { label: "Increase long-term interest rates", value: "false" },
            { label: "Reduce the money supply", value: "false" },
            { label: "Decrease public sector employment", value: "false" }
        ],
        answer: "true",
        solution: "Fiscal stimulus aimed to increase spending and support economic recovery."
    },
    {
        id: 39,
        question: "Austrian economics emphasizes:",
        questionType: "multiple-choice",
        options: [
            { label: "Individual choice, entrepreneurship, and the limits of central planning", value: "true" },
            { label: "Heavy government intervention", value: "false" },
            { label: "Short-run fiscal policy", value: "false" },
            { label: "Fixed exchange rates only", value: "false" }
        ],
        answer: "true",
        solution: "Austrian economists stress market processes and the dangers of intervention."
    },
    {
        id: 40,
        question: "The monetarist school is known for:",
        questionType: "multiple-choice",
        options: [
            { label: "Emphasizing the role of money supply in influencing inflation and output", value: "true" },
            { label: "Focusing solely on government regulation", value: "false" },
            { label: "Advocating central planning", value: "false" },
            { label: "Ignoring interest rates", value: "false" }
        ],
        answer: "true",
        solution: "Monetarists, like Friedman, link money supply growth to inflation and economic stability."
    },
    {
        id: 41,
        question: "The core difference between microeconomics and macroeconomics is that:",
        questionType: "multiple-choice",
        options: [
            { label: "Micro focuses on individuals and firms, macro on aggregate economy", value: "true" },
            { label: "Micro ignores prices, macro ignores output", value: "false" },
            { label: "Micro studies interest rates only", value: "false" },
            { label: "They are completely unrelated", value: "false" }
        ],
        answer: "true",
        solution: "Micro deals with parts of the economy, macro with the whole."
    },
    {
        id: 42,
        question: "Economic models are useful because they:",
        questionType: "multiple-choice",
        options: [
            { label: "Simplify complex reality to understand cause-effect relationships", value: "true" },
            { label: "Predict the future with complete accuracy", value: "false" },
            { label: "Remove all uncertainty from decision-making", value: "false" },
            { label: "Replace actual data", value: "false" }
        ],
        answer: "true",
        solution: "Models abstract from reality to highlight key mechanisms and relationships."
    },
    {
        id: 43,
        question: "The stimulus–austerity debate can impact businesses by:",
        questionType: "multiple-choice",
        options: [
            { label: "Affecting demand for goods and services through government spending decisions", value: "true" },
            { label: "Changing only interest rates", value: "false" },
            { label: "Determining the supply of labor directly", value: "false" },
            { label: "Fixing market prices", value: "false" }
        ],
        answer: "true",
        solution: "Government fiscal policy influences overall demand, which affects business revenues."
    },
    {
        id: 44,
        question: "Evidence for or against the Efficient Market Hypothesis can be gathered by:",
        questionType: "multiple-choice",
        options: [
            { label: "Studying the ability to consistently earn abnormal returns", value: "true" },
            { label: "Examining only macroeconomic growth", value: "false" },
            { label: "Counting the number of firms in a market", value: "false" },
            { label: "Measuring government spending alone", value: "false" }
        ],
        answer: "true",
        solution: "If markets are efficient, no strategy consistently outperforms the market after adjusting for risk."
    },
    {
        id: 45,
        question: "Economic history since the Great Depression shows that:",
        questionType: "multiple-choice",
        options: [
            { label: "Crises, interventions, and recoveries are recurrent themes in economic development", value: "true" },
            { label: "Economies always grow steadily without crises", value: "false" },
            { label: "Government policy is irrelevant", value: "false" },
            { label: "Inflation is always the main problem", value: "false" }
        ],
        answer: "true",
        solution: "Historical evidence shows cycles of boom, bust, and policy responses."
    },
    {
        id: 46,
        question: "Opportunity cost influences business decisions because:",
        questionType: "multiple-choice",
        options: [
            { label: "Choosing one option means forgoing the next best alternative", value: "true" },
            { label: "It guarantees a profit from every decision", value: "false" },
            { label: "It eliminates market risks", value: "false" },
            { label: "It only applies to government policies", value: "false" }
        ],
        answer: "true",
        solution: "Opportunity cost helps firms evaluate the true cost of choices in resource allocation."
    },
    {
        id: 47,
        question: "Post-Keynesian economics primarily emphasizes:",
        questionType: "multiple-choice",
        options: [
            { label: "Uncertainty, path-dependence, and the role of institutions in the economy", value: "true" },
            { label: "Automatic market equilibrium", value: "false" },
            { label: "Fixed exchange rates only", value: "false" },
            { label: "Long-run neutrality of money", value: "false" }
        ],
        answer: "true",
        solution: "Post-Keynesians focus on real-world deviations from classical predictions and institutional factors."
    },
    {
        id: 48,
        question: "Rational expectations theory assumes that:",
        questionType: "multiple-choice",
        options: [
            { label: "Economic agents use all available information efficiently", value: "true" },
            { label: "Firms ignore market prices", value: "false" },
            { label: "Individuals never make forecasting errors", value: "false" },
            { label: "Government intervention is always effective", value: "false" }
        ],
        answer: "true",
        solution: "Rational expectations imply agents form expectations consistent with model predictions on average."
    },
    {
        id: 49,
        question: "The Great Recession was triggered primarily by:",
        questionType: "multiple-choice",
        options: [
            { label: "The collapse of the US housing market and financial institutions", value: "true" },
            { label: "An increase in government regulation", value: "false" },
            { label: "Excessive government stimulus only", value: "false" },
            { label: "A sudden drop in global population", value: "false" }
        ],
        answer: "true",
        solution: "The subprime mortgage crisis caused systemic banking failures, triggering a global recession."
    },
    {
        id: 50,
        question: "Economic choice involves trade-offs because:",
        questionType: "multiple-choice",
        options: [
            { label: "Resources are limited and cannot satisfy all wants simultaneously", value: "true" },
            { label: "Governments dictate all production decisions", value: "false" },
            { label: "Technology is always fixed", value: "false" },
            { label: "Prices never change", value: "false" }
        ],
        answer: "true",
        solution: "Scarcity forces individuals and firms to prioritize some choices over others."
    },
    {
        id: 51,
        question: "The 2008 financial crisis led to:",
        questionType: "multiple-choice",
        options: [
            { label: "Extensive monetary and fiscal interventions globally", value: "true" },
            { label: "Complete market self-correction without policy", value: "false" },
            { label: "A permanent elimination of recessions", value: "false" },
            { label: "Stable housing prices worldwide", value: "false" }
        ],
        answer: "true",
        solution: "Central banks lowered interest rates and governments injected stimulus to stabilize economies."
    },
    {
        id: 52,
        question: "Scarcity and choice are linked because:",
        questionType: "multiple-choice",
        options: [
            { label: "Every choice consumes a scarce resource", value: "true" },
            { label: "All goods are free", value: "false" },
            { label: "Opportunity cost does not exist", value: "false" },
            { label: "Markets always produce abundance", value: "false" }
        ],
        answer: "true",
        solution: "Scarcity forces trade-offs, making opportunity cost an essential part of decision-making."
    },
    {
        id: 53,
        question: "The core difference between monetarists and Keynesians is:",
        questionType: "multiple-choice",
        options: [
            { label: "Monetarists emphasize money supply; Keynesians emphasize aggregate demand", value: "true" },
            { label: "Monetarists always support government spending; Keynesians oppose it", value: "false" },
            { label: "Keynesians ignore unemployment completely", value: "false" },
            { label: "Monetarists focus on fiscal deficits only", value: "false" }
        ],
        answer: "true",
        solution: "Monetarists focus on controlling money growth, while Keynesians advocate demand-side management."
    },
    {
        id: 54,
        question: "Rational choice theory uses the concept of:",
        questionType: "multiple-choice",
        options: [
            { label: "Utility functions to represent preferences", value: "true" },
            { label: "Fixed prices for all goods", value: "false" },
            { label: "Random decision-making", value: "false" },
            { label: "Government quotas", value: "false" }
        ],
        answer: "true",
        solution: "Utility functions quantify the satisfaction or value an individual gets from choices."
    },
    {
        id: 55,
        question: "Historical macroeconomic crises illustrate that:",
        questionType: "multiple-choice",
        options: [
            { label: "Markets can fail and require government or central bank intervention", value: "true" },
            { label: "Crises are always predictable with precision", value: "false" },
            { label: "Policy responses are irrelevant", value: "false" },
            { label: "Monetary policy alone can prevent all recessions", value: "false" }
        ],
        answer: "true",
        solution: "Real-world crises demonstrate the need for stabilization policies in addition to market mechanisms."
    },
    {
        id: 56,
        question: "Neoclassical economics assumes that firms:",
        questionType: "multiple-choice",
        options: [
            { label: "Maximize profit given constraints", value: "true" },
            { label: "Always fail in competitive markets", value: "false" },
            { label: "Ignore costs and inputs", value: "false" },
            { label: "Follow government-set prices only", value: "false" }
        ],
        answer: "true",
        solution: "Firms are modeled as rational agents optimizing profits in their decision-making."
    },
    {
        id: 57,
        question: "The Austrian school is skeptical of:",
        questionType: "multiple-choice",
        options: [
            { label: "Central planning and intervention", value: "true" },
            { label: "Private entrepreneurship", value: "false" },
            { label: "Market processes", value: "false" },
            { label: "Scarcity and opportunity cost", value: "false" }
        ],
        answer: "true",
        solution: "Austrians emphasize spontaneous order and the importance of market signals over central planning."
    },
    {
        id: 58,
        question: "Classical economists believed that recessions are:",
        questionType: "multiple-choice",
        options: [
            { label: "Temporary deviations that self-correct due to flexible prices", value: "true" },
            { label: "Permanent without government intervention", value: "false" },
            { label: "Always caused by monetary policy", value: "false" },
            { label: "Best solved with fiscal stimulus", value: "false" }
        ],
        answer: "true",
        solution: "Flexible prices and wages allow classical markets to return to full employment automatically."
    },
    {
        id: 59,
        question: "Behavioural economics challenges rational choice theory by:",
        questionType: "multiple-choice",
        options: [
            { label: "Showing that individuals sometimes act irrationally due to biases and heuristics", value: "true" },
            { label: "Claiming all agents maximize utility perfectly", value: "false" },
            { label: "Assuming perfect market efficiency at all times", value: "false" },
            { label: "Ignoring scarcity", value: "false" }
        ],
        answer: "true",
        solution: "Behavioral economics incorporates psychology to explain deviations from strict rationality."
    },
    {
        id: 60,
        question: "The main lesson from recent macroeconomic history for businesses is:",
        questionType: "multiple-choice",
        options: [
            { label: "Economic cycles, crises, and policy responses affect business strategy and risk management", value: "true" },
            { label: "Markets are always stable and predictable", value: "false" },
            { label: "Government interventions are always harmful", value: "false" },
            { label: "Business decisions are unaffected by macroeconomic trends", value: "false" }
        ],
        answer: "true",
        solution: "Understanding economic history helps firms anticipate risks and adjust strategies accordingly."
    },
    {
        id: 61,
        question: "In a perfectly competitive market, the price mechanism:",
        questionType: "multiple-choice",
        options: [
            { label: "Allocates resources efficiently by balancing demand and supply", value: "true" },
            { label: "Ensures monopoly profits", value: "false" },
            { label: "Ignores consumer preferences", value: "false" },
            { label: "Is set by government policy only", value: "false" }
        ],
        answer: "true",
        solution: "In perfect competition, prices adjust to equate quantity demanded and supplied, leading to efficient resource allocation."
    },
    {
        id: 62,
        question: "Price elasticity of demand measures:",
        questionType: "multiple-choice",
        options: [
            { label: "The responsiveness of quantity demanded to a change in price", value: "true" },
            { label: "The responsiveness of quantity supplied to a change in technology", value: "false" },
            { label: "The total revenue of a firm", value: "false" },
            { label: "The consumer surplus", value: "false" }
        ],
        answer: "true",
        solution: "Price elasticity of demand = % change in quantity demanded / % change in price."
    },
    {
        id: 63,
        question: "Indifference curves represent:",
        questionType: "multiple-choice",
        options: [
            { label: "Combinations of goods giving the same utility to the consumer", value: "true" },
            { label: "The total cost of production", value: "false" },
            { label: "Profit-maximizing output", value: "false" },
            { label: "Market equilibrium price", value: "false" }
        ],
        answer: "true",
        solution: "Indifference curves show consumer preferences where any point on the curve gives equal satisfaction."
    },
    {
        id: 64,
        question: "The production function relates:",
        questionType: "multiple-choice",
        options: [
            { label: "Inputs to output in a firm", value: "true" },
            { label: "Consumer income to utility", value: "false" },
            { label: "Price to quantity demanded", value: "false" },
            { label: "Government spending to GDP", value: "false" }
        ],
        answer: "true",
        solution: "A production function shows how different combinations of inputs produce output."
    },
    {
        id: 65,
        question: "Average cost is defined as:",
        questionType: "multiple-choice",
        options: [
            { label: "Total cost divided by output", value: "true" },
            { label: "Total revenue minus total cost", value: "false" },
            { label: "The additional cost of producing one more unit", value: "false" },
            { label: "Market price times quantity", value: "false" }
        ],
        answer: "true",
        solution: "Average cost = TC / Q."
    },
    {
        id: 66,
        question: "Marginal cost represents:",
        questionType: "multiple-choice",
        options: [
            { label: "The increase in total cost from producing one additional unit", value: "true" },
            { label: "The average cost per unit", value: "false" },
            { label: "The total revenue per unit", value: "false" },
            { label: "The price of inputs only", value: "false" }
        ],
        answer: "true",
        solution: "Marginal cost = change in total cost / change in output."
    },
    {
        id: 67,
        question: "In the short run, a firm should continue operating as long as:",
        questionType: "multiple-choice",
        options: [
            { label: "Price covers average variable cost", value: "true" },
            { label: "Price equals average total cost", value: "false" },
            { label: "Profit is zero", value: "false" },
            { label: "Total revenue is less than total cost", value: "false" }
        ],
        answer: "true",
        solution: "The firm covers its variable costs and contributes to fixed costs even if profit is negative."
    },
    {
        id: 68,
        question: "In perfect competition, profit maximization occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Marginal cost equals market price", value: "true" },
            { label: "Average cost is minimized", value: "false" },
            { label: "Total revenue is maximized", value: "false" },
            { label: "Price equals marginal revenue only in monopolies", value: "false" }
        ],
        answer: "true",
        solution: "For perfectly competitive firms, P = MR = MC at the profit-maximizing output."
    },
    {
        id: 69,
        question: "A monopoly sets output where:",
        questionType: "multiple-choice",
        options: [
            { label: "Marginal revenue equals marginal cost", value: "true" },
            { label: "Price equals marginal cost", value: "false" },
            { label: "Average cost is minimized", value: "false" },
            { label: "Total revenue is zero", value: "false" }
        ],
        answer: "true",
        solution: "Monopolists maximize profit where MR = MC and set price according to the demand curve."
    },
    {
        id: 70,
        question: "Economies of scale occur when:",
        questionType: "multiple-choice",
        options: [
            { label: "Average cost decreases as output increases", value: "true" },
            { label: "Average cost increases with output", value: "false" },
            { label: "Marginal cost exceeds price", value: "false" },
            { label: "Revenue is constant", value: "false" }
        ],
        answer: "true",
        solution: "Spreading fixed costs over more units reduces average cost."
    },
    {
        id: 71,
        question: "Oligopoly behavior can be analyzed using:",
        questionType: "multiple-choice",
        options: [
            { label: "Game theory", value: "true" },
            { label: "Indifference curves only", value: "false" },
            { label: "Consumer surplus analysis only", value: "false" },
            { label: "Monopolistic pricing models only", value: "false" }
        ],
        answer: "true",
        solution: "Game theory models strategic interactions among firms in an oligopoly."
    },
    {
        id: 72,
        question: "Perfect competition long-run profits are:",
        questionType: "multiple-choice",
        options: [
            { label: "Zero (normal profits)", value: "true" },
            { label: "Always positive", value: "false" },
            { label: "Negative", value: "false" },
            { label: "Indeterminate", value: "false" }
        ],
        answer: "true",
        solution: "Entry and exit drive profits to zero in the long run."
    },
    {
        id: 73,
        question: "Price discrimination allows firms to:",
        questionType: "multiple-choice",
        options: [
            { label: "Charge different prices to different consumers based on willingness to pay", value: "true" },
            { label: "Always reduce consumer surplus to zero", value: "false" },
            { label: "Eliminate costs entirely", value: "false" },
            { label: "Ignore production constraints", value: "false" }
        ],
        answer: "true",
        solution: "Firms segment the market to capture more value from consumers."
    },
    {
        id: 74,
        question: "Advertising affects demand by:",
        questionType: "multiple-choice",
        options: [
            { label: "Shifting the demand curve outward", value: "true" },
            { label: "Changing production costs", value: "false" },
            { label: "Increasing supply elasticity", value: "false" },
            { label: "Reducing market competition", value: "false" }
        ],
        answer: "true",
        solution: "Effective advertising can increase consumer willingness to pay and overall demand."
    },
    {
        id: 75,
        question: "Rational choice in consumer theory assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Consumers maximize utility subject to a budget constraint", value: "true" },
            { label: "Consumers always follow social trends", value: "false" },
            { label: "Consumers ignore prices", value: "false" },
            { label: "Consumers randomly select goods", value: "false" }
        ],
        answer: "true",
        solution: "Rational consumers make decisions that provide the highest satisfaction given their budget."
    },
    {
        id: 76,
        question: "In monopolistic competition, long-run economic profits are:",
        questionType: "multiple-choice",
        options: [
            { label: "Zero (normal profits)", value: "true" },
            { label: "Always positive", value: "false" },
            { label: "Negative", value: "false" },
            { label: "Indeterminate", value: "false" }
        ],
        answer: "true",
        solution: "Entry and exit of firms drive economic profits to zero in the long run."
    },
    {
        id: 77,
        question: "Barriers to entry in a monopoly lead to:",
        questionType: "multiple-choice",
        options: [
            { label: "Sustained positive economic profits", value: "true" },
            { label: "Zero economic profits", value: "false" },
            { label: "Increased competition", value: "false" },
            { label: "Lower market prices", value: "false" }
        ],
        answer: "true",
        solution: "Barriers prevent new firms from entering, allowing monopolists to earn profits over time."
    },
    {
        id: 78,
        question: "Oligopolistic firms may collude to:",
        questionType: "multiple-choice",
        options: [
            { label: "Increase joint profits by coordinating prices or output", value: "true" },
            { label: "Maximize consumer welfare", value: "false" },
            { label: "Eliminate fixed costs", value: "false" },
            { label: "Ensure zero profits", value: "false" }
        ],
        answer: "true",
        solution: "Collusion allows firms to act like a monopoly and capture higher profits."
    },
    {
        id: 79,
        question: "The shutdown point occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Price equals minimum average variable cost", value: "true" },
            { label: "Price equals average total cost", value: "false" },
            { label: "Marginal cost equals zero", value: "false" },
            { label: "Total revenue is maximized", value: "false" }
        ],
        answer: "true",
        solution: "Below this price, the firm cannot cover variable costs and should cease production in the short run."
    },
    {
        id: 80,
        question: "In the short run, total revenue is maximized when:",
        questionType: "multiple-choice",
        options: [
            { label: "Marginal revenue equals zero", value: "true" },
            { label: "Price equals marginal cost", value: "false" },
            { label: "Average revenue equals marginal cost", value: "false" },
            { label: "Total cost equals zero", value: "false" }
        ],
        answer: "true",
        solution: "Total revenue is maximized at the output where MR = 0."
    },
    {
        id: 81,
        question: "Income elasticity of demand measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Responsiveness of demand to changes in consumer income", value: "true" },
            { label: "Responsiveness of demand to price changes", value: "false" },
            { label: "Responsiveness of supply to price changes", value: "false" },
            { label: "Changes in consumer utility", value: "false" }
        ],
        answer: "true",
        solution: "Income elasticity = % change in quantity demanded / % change in income."
    },
    {
        id: 82,
        question: "A Giffen good is characterized by:",
        questionType: "multiple-choice",
        options: [
            { label: "Quantity demanded increases as price rises", value: "true" },
            { label: "Quantity demanded decreases as price rises", value: "false" },
            { label: "Price elasticity equals zero", value: "false" },
            { label: "Unitary elasticity", value: "false" }
        ],
        answer: "true",
        solution: "For a Giffen good, the income effect outweighs the substitution effect."
    },
    {
        id: 83,
        question: "Indifference curve convexity reflects:",
        questionType: "multiple-choice",
        options: [
            { label: "Diminishing marginal rate of substitution", value: "true" },
            { label: "Constant marginal utility", value: "false" },
            { label: "Increasing returns to scale", value: "false" },
            { label: "Perfect complements", value: "false" }
        ],
        answer: "true",
        solution: "Convex curves indicate consumers are willing to give up fewer units of one good for additional units of another as they move along the curve."
    },
    {
        id: 84,
        question: "In an oligopoly, a dominant strategy is:",
        questionType: "multiple-choice",
        options: [
            { label: "The best choice regardless of the other firm's actions", value: "true" },
            { label: "Always to collude", value: "false" },
            { label: "To produce zero output", value: "false" },
            { label: "To maximize social welfare", value: "false" }
        ],
        answer: "true",
        solution: "A dominant strategy yields the highest payoff for a firm regardless of competitors' decisions."
    },
    {
        id: 85,
        question: "A kinked demand curve explains:",
        questionType: "multiple-choice",
        options: [
            { label: "Price rigidity in oligopolistic markets", value: "true" },
            { label: "Perfect competition equilibrium", value: "false" },
            { label: "Monopolistic profit maximization", value: "false" },
            { label: "Shifts in aggregate supply", value: "false" }
        ],
        answer: "true",
        solution: "Firms may not change prices due to asymmetric response of rivals to price increases vs. decreases."
    },
    {
        id: 86,
        question: "Average revenue in a monopoly equals:",
        questionType: "multiple-choice",
        options: [
            { label: "Price", value: "true" },
            { label: "Marginal cost", value: "false" },
            { label: "Marginal revenue", value: "false" },
            { label: "Total cost", value: "false" }
        ],
        answer: "true",
        solution: "Average revenue = total revenue / quantity = price."
    },
    {
        id: 87,
        question: "Revenue maximization occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Marginal revenue = 0", value: "true" },
            { label: "Price = average cost", value: "false" },
            { label: "Price = marginal cost", value: "false" },
            { label: "Total cost is minimized", value: "false" }
        ],
        answer: "true",
        solution: "Revenue-maximizing output occurs where MR = 0."
    },
    {
        id: 88,
        question: "Price discrimination requires:",
        questionType: "multiple-choice",
        options: [
            { label: "Market power and ability to segment customers", value: "true" },
            { label: "Perfect competition", value: "false" },
            { label: "Zero marginal cost", value: "false" },
            { label: "Government regulation", value: "false" }
        ],
        answer: "true",
        solution: "Firms must have pricing power and prevent resale to implement price discrimination."
    },
    {
        id: 89,
        question: "A firm’s short-run supply curve is:",
        questionType: "multiple-choice",
        options: [
            { label: "Portion of marginal cost above average variable cost", value: "true" },
            { label: "Average cost curve", value: "false" },
            { label: "Average revenue curve", value: "false" },
            { label: "Marginal revenue curve", value: "false" }
        ],
        answer: "true",
        solution: "The supply curve corresponds to the marginal cost curve above the shutdown point."
    },
    {
        id: 90,
        question: "Monopolistic competition differs from perfect competition because:",
        questionType: "multiple-choice",
        options: [
            { label: "Firms sell differentiated products", value: "true" },
            { label: "Firms are price takers", value: "false" },
            { label: "Economic profits are always positive", value: "false" },
            { label: "There are no close substitutes", value: "false" }
        ],
        answer: "true",
        solution: "Product differentiation gives monopolistic competitors some market power."
    },
    {
        id: 91,
        question: "The law of diminishing marginal returns implies:",
        questionType: "multiple-choice",
        options: [
            { label: "Adding more of a variable input eventually yields smaller additional output", value: "true" },
            { label: "Total output decreases as inputs increase", value: "false" },
            { label: "Average cost increases indefinitely", value: "false" },
            { label: "Profit maximization is impossible", value: "false" }
        ],
        answer: "true",
        solution: "Each additional unit of input adds less to total output than the previous one, holding other inputs constant."
    },
    {
        id: 92,
        question: "The marginal cost curve intersects the average total cost curve at:",
        questionType: "multiple-choice",
        options: [
            { label: "The minimum of the average total cost", value: "true" },
            { label: "The maximum of average total cost", value: "false" },
            { label: "The shutdown point", value: "false" },
            { label: "Zero output", value: "false" }
        ],
        answer: "true",
        solution: "MC < ATC lowers ATC; MC > ATC raises ATC. So MC intersects ATC at its minimum."
    },
    {
        id: 93,
        question: "Cross-price elasticity of demand measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Responsiveness of quantity demanded of one good to a change in the price of another", value: "true" },
            { label: "Responsiveness of demand to income", value: "false" },
            { label: "Responsiveness of supply to price", value: "false" },
            { label: "Change in total revenue due to price changes", value: "false" }
        ],
        answer: "true",
        solution: "It indicates whether goods are substitutes (positive) or complements (negative)."
    },
    {
        id: 94,
        question: "A firm is said to be a price taker if:",
        questionType: "multiple-choice",
        options: [
            { label: "It cannot influence the market price", value: "true" },
            { label: "It can set any price it wants", value: "false" },
            { label: "It faces a downward sloping demand curve", value: "false" },
            { label: "It has market power", value: "false" }
        ],
        answer: "true",
        solution: "Perfectly competitive firms accept the market price and produce accordingly."
    },
    {
        id: 95,
        question: "Short-run supply in perfect competition is upward sloping because:",
        questionType: "multiple-choice",
        options: [
            { label: "Marginal cost rises with output", value: "true" },
            { label: "Average total cost falls with output", value: "false" },
            { label: "Demand is inelastic", value: "false" },
            { label: "Price is constant", value: "false" }
        ],
        answer: "true",
        solution: "Rising marginal cost means the firm must charge higher prices to supply more."
    },
    {
        id: 96,
        question: "Monopoly power arises because:",
        questionType: "multiple-choice",
        options: [
            { label: "Barriers to entry prevent competition", value: "true" },
            { label: "Firms have identical products", value: "false" },
            { label: "Market is perfectly competitive", value: "false" },
            { label: "All firms are small", value: "false" }
        ],
        answer: "true",
        solution: "Barriers allow a single firm to influence price and earn long-run profits."
    },
    {
        id: 97,
        question: "An isoquant represents:",
        questionType: "multiple-choice",
        options: [
            { label: "Combinations of inputs producing the same output", value: "true" },
            { label: "Combinations of outputs producing the same cost", value: "false" },
            { label: "Combinations of prices yielding the same revenue", value: "false" },
            { label: "Points of maximum profit", value: "false" }
        ],
        answer: "true",
        solution: "Isoquants are analogous to indifference curves but for production."
    },
    {
        id: 98,
        question: "The production function shows:",
        questionType: "multiple-choice",
        options: [
            { label: "Maximum output obtainable from a given set of inputs", value: "true" },
            { label: "Market demand for goods", value: "false" },
            { label: "Cost of production for each output level", value: "false" },
            { label: "Consumer preferences", value: "false" }
        ],
        answer: "true",
        solution: "It represents technological relationships between inputs and output."
    },
    {
        id: 99,
        question: "Total cost equals:",
        questionType: "multiple-choice",
        options: [
            { label: "Fixed cost plus variable cost", value: "true" },
            { label: "Average cost times marginal cost", value: "false" },
            { label: "Total revenue minus profit", value: "false" },
            { label: "Marginal cost divided by output", value: "false" }
        ],
        answer: "true",
        solution: "By definition, TC = FC + VC."
    },
    {
        id: 100,
        question: "Average cost is minimized when:",
        questionType: "multiple-choice",
        options: [
            { label: "Marginal cost equals average cost", value: "true" },
            { label: "Price equals average revenue", value: "false" },
            { label: "Total cost is minimized", value: "false" },
            { label: "Marginal revenue equals zero", value: "false" }
        ],
        answer: "true",
        solution: "MC intersects AC at its minimum, ensuring lowest per-unit cost."
    },
    {
        id: 101,
        question: "In a perfectly competitive market, the short-run supply curve is:",
        questionType: "multiple-choice",
        options: [
            { label: "Portion of MC above AVC", value: "true" },
            { label: "MC below AVC", value: "false" },
            { label: "Horizontal at market price", value: "false" },
            { label: "The demand curve", value: "false" }
        ],
        answer: "true",
        solution: "Firms produce where P ≥ AVC; otherwise, they shut down."
    },
    {
        id: 102,
        question: "Price elasticity of demand measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Responsiveness of quantity demanded to changes in price", value: "true" },
            { label: "Responsiveness of supply to price", value: "false" },
            { label: "Income effects on demand", value: "false" },
            { label: "Changes in total revenue", value: "false" }
        ],
        answer: "true",
        solution: "PED = %ΔQd / %ΔP."
    },
    {
        id: 103,
        question: "Revenue is maximized when:",
        questionType: "multiple-choice",
        options: [
            { label: "Elasticity of demand equals 1", value: "true" },
            { label: "Elasticity > 1", value: "false" },
            { label: "Elasticity < 1", value: "false" },
            { label: "Demand is perfectly inelastic", value: "false" }
        ],
        answer: "true",
        solution: "Unit elastic demand corresponds to maximum total revenue."
    },
    {
        id: 104,
        question: "A perfectly competitive firm's long-run supply curve is:",
        questionType: "multiple-choice",
        options: [
            { label: "Horizontal at minimum AC", value: "true" },
            { label: "Upward sloping", value: "false" },
            { label: "Vertical", value: "false" },
            { label: "Downward sloping", value: "false" }
        ],
        answer: "true",
        solution: "In long run, firms earn zero economic profit, supplying at minimum average cost."
    },
    {
        id: 105,
        question: "In monopolistic competition, product differentiation:",
        questionType: "multiple-choice",
        options: [
            { label: "Gives firms some market power", value: "true" },
            { label: "Eliminates all profits", value: "false" },
            { label: "Occurs only in oligopoly", value: "false" },
            { label: "Ensures perfect substitutes", value: "false" }
        ],
        answer: "true",
        solution: "Differentiation allows firms to set prices above marginal cost."
    },
    {
        id: 106,
        question: "Oligopolistic markets are characterized by:",
        questionType: "multiple-choice",
        options: [
            { label: "Few firms with interdependent pricing", value: "true" },
            { label: "Many firms with no influence on price", value: "false" },
            { label: "Single firm setting price", value: "false" },
            { label: "Perfect substitutes only", value: "false" }
        ],
        answer: "true",
        solution: "In oligopoly, each firm’s decisions affect others, leading to strategic behaviour."
    },
    {
        id: 107,
        question: "Game theory in oligopoly helps explain:",
        questionType: "multiple-choice",
        options: [
            { label: "Strategic interaction between firms", value: "true" },
            { label: "Cost minimization for a single firm", value: "false" },
            { label: "Perfect competition outcomes", value: "false" },
            { label: "Monopoly regulation", value: "false" }
        ],
        answer: "true",
        solution: "Oligopolists make decisions considering rivals’ likely responses."
    },
    {
        id: 108,
        question: "Price discrimination occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "A firm charges different prices for the same product to different consumers", value: "true" },
            { label: "Prices are set equal for all consumers", value: "false" },
            { label: "Monopolies charge a single profit-maximizing price", value: "false" },
            { label: "Competition forces prices down to marginal cost", value: "false" }
        ],
        answer: "true",
        solution: "Price discrimination allows firms to capture more consumer surplus."
    },
    {
        id: 109,
        question: "Average revenue in a monopoly equals:",
        questionType: "multiple-choice",
        options: [
            { label: "Price of the product", value: "true" },
            { label: "Marginal cost", value: "false" },
            { label: "Total revenue", value: "false" },
            { label: "Zero in equilibrium", value: "false" }
        ],
        answer: "true",
        solution: "AR = TR / Q, and in monopoly, AR = P at each quantity."
    },
    {
        id: 110,
        question: "A firm’s shut-down point in the short run occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Price falls below average variable cost", value: "true" },
            { label: "Total revenue equals total cost", value: "false" },
            { label: "Price equals marginal cost", value: "false" },
            { label: "Average total cost is minimized", value: "false" }
        ],
        answer: "true",
        solution: "If price < AVC, the firm cannot cover variable costs and should cease production temporarily."
    },
    {
        id: 111,
        question: "Indifference curves are:",
        questionType: "multiple-choice",
        options: [
            { label: "Curves showing combinations of goods providing the same utility", value: "true" },
            { label: "Production possibilities", value: "false" },
            { label: "Market demand curves", value: "false" },
            { label: "Revenue functions", value: "false" }
        ],
        answer: "true",
        solution: "Each point on the curve gives the consumer equal satisfaction."
    },
    {
        id: 112,
        question: "The slope of a budget line represents:",
        questionType: "multiple-choice",
        options: [
            { label: "The relative price of two goods", value: "true" },
            { label: "Consumer income", value: "false" },
            { label: "Utility level", value: "false" },
            { label: "Total expenditure", value: "false" }
        ],
        answer: "true",
        solution: "Budget line: Y = P1*Q1 + P2*Q2; slope = -P1/P2."
    },
    {
        id: 113,
        question: "Marginal rate of substitution (MRS) measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Rate at which consumer is willing to trade one good for another", value: "true" },
            { label: "Slope of demand curve", value: "false" },
            { label: "Slope of supply curve", value: "false" },
            { label: "Cost of production", value: "false" }
        ],
        answer: "true",
        solution: "MRS = |ΔQ2/ΔQ1| along an indifference curve."
    },
    {
        id: 114,
        question: "A firm’s average revenue curve in perfect competition is:",
        questionType: "multiple-choice",
        options: [
            { label: "Horizontal at the market price", value: "true" },
            { label: "Downward sloping", value: "false" },
            { label: "Upward sloping", value: "false" },
            { label: "Vertical", value: "false" }
        ],
        answer: "true",
        solution: "Price is constant; hence AR = P."
    },
    {
        id: 115,
        question: "Long-run equilibrium in perfect competition occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Firms earn zero economic profit", value: "true" },
            { label: "Firms earn positive economic profit", value: "false" },
            { label: "Marginal cost exceeds price", value: "false" },
            { label: "Output is below capacity", value: "false" }
        ],
        answer: "true",
        solution: "Entry and exit ensure P = min ATC in long run."
    },
    {
        id: 116,
        question: "Revenue maximization occurs at:",
        questionType: "multiple-choice",
        options: [
            { label: "Unit elasticity of demand", value: "true" },
            { label: "Perfectly elastic demand", value: "false" },
            { label: "Perfectly inelastic demand", value: "false" },
            { label: "Infinite demand", value: "false" }
        ],
        answer: "true",
        solution: "At unit elastic demand, total revenue is maximized."
    },
    {
        id: 117,
        question: "In monopolistic competition, long-run equilibrium implies:",
        questionType: "multiple-choice",
        options: [
            { label: "Zero economic profit", value: "true" },
            { label: "Maximum market share", value: "false" },
            { label: "Excess profits", value: "false" },
            { label: "Constant returns to scale", value: "false" }
        ],
        answer: "true",
        solution: "Free entry erodes supernormal profits in the long run."
    },
    {
        id: 118,
        question: "A kinked demand curve is associated with:",
        questionType: "multiple-choice",
        options: [
            { label: "Oligopoly", value: "true" },
            { label: "Perfect competition", value: "false" },
            { label: "Monopolistic competition", value: "false" },
            { label: "Monopoly", value: "false" }
        ],
        answer: "true",
        solution: "Firms expect rivals to follow price cuts but not price increases."
    },
    {
        id: 119,
        question: "Excess capacity in monopolistic competition means:",
        questionType: "multiple-choice",
        options: [
            { label: "Firms produce below minimum AC", value: "true" },
            { label: "Firms maximize profit at minimum AC", value: "false" },
            { label: "Firms produce at perfect competition output", value: "false" },
            { label: "Firms shut down", value: "false" }
        ],
        answer: "true",
        solution: "Product differentiation leads to less-than-efficient output."
    },
    {
        id: 120,
        question: "In an oligopoly, collusion can lead to:",
        questionType: "multiple-choice",
        options: [
            { label: "Higher prices and joint profit maximization", value: "true" },
            { label: "Lower prices than in perfect competition", value: "false" },
            { label: "No change in market outcome", value: "false" },
            { label: "Elimination of all competitors", value: "false" }
        ],
        answer: "true",
        solution: "Collusion allows oligopolists to act like a monopoly to maximize profits."
    },
    {
        id: 121,
        question: "Market failure occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Markets fail to allocate resources efficiently", value: "true" },
            { label: "All firms earn profits", value: "false" },
            { label: "Consumers maximize utility", value: "false" },
            { label: "Supply equals demand", value: "false" }
        ],
        answer: "true",
        solution: "Market failure arises due to externalities, public goods, or information asymmetry."
    },
    {
        id: 122,
        question: "Externalities are:",
        questionType: "multiple-choice",
        options: [
            { label: "Costs or benefits affecting third parties", value: "true" },
            { label: "Internal production costs", value: "false" },
            { label: "Government subsidies", value: "false" },
            { label: "Market prices", value: "false" }
        ],
        answer: "true",
        solution: "Externalities occur when private costs/benefits diverge from social costs/benefits."
    },
    {
        id: 123,
        question: "Fiscal policy involves:",
        questionType: "multiple-choice",
        options: [
            { label: "Government spending and taxation", value: "true" },
            { label: "Central bank interest rates", value: "false" },
            { label: "Stock market regulation", value: "false" },
            { label: "Trade tariffs only", value: "false" }
        ],
        answer: "true",
        solution: "Fiscal policy adjusts aggregate demand via taxes and government spending."
    },
    {
        id: 124,
        question: "Monetary policy is primarily conducted by:",
        questionType: "multiple-choice",
        options: [
            { label: "The central bank", value: "true" },
            { label: "The finance ministry", value: "false" },
            { label: "Private banks", value: "false" },
            { label: "The WTO", value: "false" }
        ],
        answer: "true",
        solution: "Central banks manage money supply and interest rates to influence the economy."
    },
    {
        id: 125,
        question: "Aggregate demand is composed of:",
        questionType: "multiple-choice",
        options: [
            { label: "Consumption, investment, government spending, net exports", value: "true" },
            { label: "Only consumption", value: "false" },
            { label: "Only exports", value: "false" },
            { label: "Supply of money", value: "false" }
        ],
        answer: "true",
        solution: "AD = C + I + G + (X - M) represents total demand in an economy."
    },
    {
        id: 126,
        question: "The circular flow of income illustrates:",
        questionType: "multiple-choice",
        options: [
            { label: "Flows of money and goods between households and firms", value: "true" },
            { label: "Government budget deficits", value: "false" },
            { label: "Trade balances only", value: "false" },
            { label: "Stock market returns", value: "false" }
        ],
        answer: "true",
        solution: "It shows how money circulates in exchange for goods, services, and factors of production."
    },
    {
        id: 127,
        question: "Inflation is defined as:",
        questionType: "multiple-choice",
        options: [
            { label: "A sustained rise in the general price level", value: "true" },
            { label: "A fall in interest rates", value: "false" },
            { label: "Increase in GDP only", value: "false" },
            { label: "An increase in money supply only", value: "false" }
        ],
        answer: "true",
        solution: "Inflation measures the percentage change in the price level over time."
    },
    {
        id: 128,
        question: "The Phillips curve shows the relationship between:",
        questionType: "multiple-choice",
        options: [
            { label: "Inflation and unemployment", value: "true" },
            { label: "GDP and investment", value: "false" },
            { label: "Interest rates and money supply", value: "false" },
            { label: "Exports and imports", value: "false" }
        ],
        answer: "true",
        solution: "The curve suggests an inverse short-term trade-off between inflation and unemployment."
    },
    {
        id: 129,
        question: "The multiplier effect refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "A change in spending leading to a larger change in national income", value: "true" },
            { label: "A change in interest rates affecting investment", value: "false" },
            { label: "Government taxes reducing consumption", value: "false" },
            { label: "Exports increasing imports", value: "false" }
        ],
        answer: "true",
        solution: "An initial injection into the economy produces a larger total increase in output."
    },
    {
        id: 130,
        question: "Monetary union refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "Two or more countries sharing a common currency", value: "true" },
            { label: "A single country using multiple currencies", value: "false" },
            { label: "Countries fixing interest rates individually", value: "false" },
            { label: "Countries imposing trade barriers", value: "false" }
        ],
        answer: "true",
        solution: "Monetary union harmonizes currency, monetary policy, and exchange rates."
    },
    {
        id: 131,
        question: "A central bank can influence interest rates by:",
        questionType: "multiple-choice",
        options: [
            { label: "Open market operations", value: "true" },
            { label: "Setting trade tariffs", value: "false" },
            { label: "Changing government spending", value: "false" },
            { label: "Regulating firms’ prices", value: "false" }
        ],
        answer: "true",
        solution: "Buying/selling securities affects the money supply and short-term interest rates."
    },
    {
        id: 132,
        question: "GDP measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Total market value of final goods and services produced in a country", value: "true" },
            { label: "Net exports only", value: "false" },
            { label: "Total population income", value: "false" },
            { label: "Government spending only", value: "false" }
        ],
        answer: "true",
        solution: "GDP = C + I + G + (X - M)."
    },
    {
        id: 133,
        question: "Potential GDP refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "Output when the economy is at full employment", value: "true" },
            { label: "Current measured GDP", value: "false" },
            { label: "GDP adjusted for inflation", value: "false" },
            { label: "Total government expenditure", value: "false" }
        ],
        answer: "true",
        solution: "Potential GDP represents sustainable output without accelerating inflation."
    },
    {
        id: 134,
        question: "A budget deficit occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Government spending exceeds revenue", value: "true" },
            { label: "Taxes exceed spending", value: "false" },
            { label: "Exports exceed imports", value: "false" },
            { label: "Private savings exceed investment", value: "false" }
        ],
        answer: "true",
        solution: "Deficit = G - T > 0."
    },
    {
        id: 135,
        question: "Unemployment causes a loss of:",
        questionType: "multiple-choice",
        options: [
            { label: "Output and income", value: "true" },
            { label: "Government revenue only", value: "false" },
            { label: "Inflation only", value: "false" },
            { label: "Exports only", value: "false" }
        ],
        answer: "true",
        solution: "Unemployment reduces the economy’s actual output below potential output."
    },
    {
        id: 136,
        question: "The AS–AD model illustrates:",
        questionType: "multiple-choice",
        options: [
            { label: "Interaction between aggregate supply and aggregate demand", value: "true" },
            { label: "Individual firm pricing decisions", value: "false" },
            { label: "International trade flows", value: "false" },
            { label: "Unemployment insurance schemes", value: "false" }
        ],
        answer: "true",
        solution: "The AS–AD model shows how price level and output are determined in the short run."
    },
    {
        id: 137,
        question: "Inflation targeting aims to:",
        questionType: "multiple-choice",
        options: [
            { label: "Keep inflation near a set rate", value: "true" },
            { label: "Maximise GDP growth regardless of inflation", value: "false" },
            { label: "Control unemployment directly", value: "false" },
            { label: "Regulate international trade", value: "false" }
        ],
        answer: "true",
        solution: "Central banks use interest rates to stabilize inflation near the target level."
    },
    {
        id: 138,
        question: "A trade surplus occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Exports exceed imports", value: "true" },
            { label: "Imports exceed exports", value: "false" },
            { label: "Government spending exceeds taxation", value: "false" },
            { label: "Investment exceeds savings", value: "false" }
        ],
        answer: "true",
        solution: "Trade surplus = X - M > 0."
    },
    {
        id: 139,
        question: "The money multiplier reflects:",
        questionType: "multiple-choice",
        options: [
            { label: "The maximum money supply generated from base money", value: "true" },
            { label: "Interest rate changes", value: "false" },
            { label: "Inflation rate", value: "false" },
            { label: "Government debt level", value: "false" }
        ],
        answer: "true",
        solution: "Money multiplier = 1 / reserve ratio; shows how deposits create new money."
    },
    {
        id: 140,
        question: "Systemic risk refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "Risk of collapse of the entire financial system", value: "true" },
            { label: "Individual firm risk only", value: "false" },
            { label: "Risk in foreign exchange markets", value: "false" },
            { label: "Operational risk in banks", value: "false" }
        ],
        answer: "true",
        solution: "Systemic risk affects the stability of the financial system as a whole."
    },
    {
        id: 141,
        question: "The Phillips curve trade-off may not hold in the long run because:",
        questionType: "multiple-choice",
        options: [
            { label: "Expectations adjust and unemployment returns to natural rate", value: "true" },
            { label: "Fiscal policy changes", value: "false" },
            { label: "Money supply is fixed", value: "false" },
            { label: "Exports fluctuate", value: "false" }
        ],
        answer: "true",
        solution: "Long-run Phillips curve is vertical; inflation does not reduce unemployment permanently."
    },
    {
        id: 142,
        question: "Quantitative easing involves:",
        questionType: "multiple-choice",
        options: [
            { label: "Central bank buying assets to increase money supply", value: "true" },
            { label: "Raising taxes to reduce deficit", value: "false" },
            { label: "Increasing government spending", value: "false" },
            { label: "Devaluing the currency directly", value: "false" }
        ],
        answer: "true",
        solution: "QE increases liquidity to stimulate the economy when interest rates are near zero."
    },
    {
        id: 143,
        question: "Floating exchange rates are determined by:",
        questionType: "multiple-choice",
        options: [
            { label: "Market forces of supply and demand", value: "true" },
            { label: "Government diktat", value: "false" },
            { label: "Fixed by the IMF", value: "false" },
            { label: "Trade surpluses only", value: "false" }
        ],
        answer: "true",
        solution: "Floating rates adjust according to currency demand and supply in foreign exchange markets."
    },
    {
        id: 144,
        question: "The circular flow model includes:",
        questionType: "multiple-choice",
        options: [
            { label: "Households, firms, government, and sometimes financial sector", value: "true" },
            { label: "Only households and firms", value: "false" },
            { label: "Only government and banks", value: "false" },
            { label: "Only exports and imports", value: "false" }
        ],
        answer: "true",
        solution: "It models flows of goods, services, and money in an economy including government and banks."
    },
    {
        id: 145,
        question: "Supply-side policies aim to:",
        questionType: "multiple-choice",
        options: [
            { label: "Increase productive capacity and efficiency", value: "true" },
            { label: "Reduce government spending only", value: "false" },
            { label: "Control inflation via interest rates only", value: "false" },
            { label: "Increase exports exclusively", value: "false" }
        ],
        answer: "true",
        solution: "Supply-side policies improve efficiency, incentives, and long-term growth."
    },
    {
        id: 146,
        question: "Business cycles consist of:",
        questionType: "multiple-choice",
        options: [
            { label: "Periods of expansion and contraction in economic activity", value: "true" },
            { label: "Constant GDP growth", value: "false" },
            { label: "Stable inflation only", value: "false" },
            { label: "Steady employment rates only", value: "false" }
        ],
        answer: "true",
        solution: "Business cycles are fluctuations in output, employment, and prices over time."
    },
    {
        id: 147,
        question: "Central bank independence can:",
        questionType: "multiple-choice",
        options: [
            { label: "Improve inflation control without political interference", value: "true" },
            { label: "Increase government deficit directly", value: "false" },
            { label: "Set fiscal policy", value: "false" },
            { label: "Control trade policy", value: "false" }
        ],
        answer: "true",
        solution: "Independent central banks can focus on monetary objectives like inflation targeting."
    },
    {
        id: 148,
        question: "Protectionist policies include:",
        questionType: "multiple-choice",
        options: [
            { label: "Tariffs and quotas", value: "true" },
            { label: "Monetary easing", value: "false" },
            { label: "Subsidies for domestic banks only", value: "false" },
            { label: "Currency devaluation alone", value: "false" }
        ],
        answer: "true",
        solution: "Protectionism restricts imports to protect domestic industries."
    },
    {
        id: 149,
        question: "The equilibrium level of income occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Planned expenditure equals output", value: "true" },
            { label: "Aggregate supply exceeds demand", value: "false" },
            { label: "Interest rates are zero", value: "false" },
            { label: "Government spending is maximal", value: "false" }
        ],
        answer: "true",
        solution: "Equilibrium income is where aggregate demand matches actual output."
    },
    {
        id: 150,
        question: "Inflation affects businesses by:",
        questionType: "multiple-choice",
        options: [
            { label: "Increasing input costs and uncertainty", value: "true" },
            { label: "Decreasing government taxes only", value: "false" },
            { label: "Increasing exports automatically", value: "false" },
            { label: "Reducing labour supply directly", value: "false" }
        ],
        answer: "true",
        solution: "Rising prices increase costs, affect planning, and can reduce investment."
    },
    {
        id: 151,
        question: "The circular flow of income model helps illustrate:",
        questionType: "multiple-choice",
        options: [
            { label: "Flows of money, goods, and services in the economy", value: "true" },
            { label: "Individual firm pricing decisions", value: "false" },
            { label: "Government budget deficits only", value: "false" },
            { label: "Foreign trade exclusively", value: "false" }
        ],
        answer: "true",
        solution: "It shows how households, firms, and government interact through markets and money flows."
    },
    {
        id: 152,
        question: "Monetary policy primarily affects the economy through:",
        questionType: "multiple-choice",
        options: [
            { label: "Interest rates and credit availability", value: "true" },
            { label: "Direct taxation levels", value: "false" },
            { label: "Government spending only", value: "false" },
            { label: "Foreign trade restrictions", value: "false" }
        ],
        answer: "true",
        solution: "Central banks adjust interest rates and money supply to influence spending and investment."
    },
    {
        id: 153,
        question: "Aggregate demand shifts when:",
        questionType: "multiple-choice",
        options: [
            { label: "Consumer confidence or government spending changes", value: "true" },
            { label: "Only wages change", value: "false" },
            { label: "Money supply is fixed", value: "false" },
            { label: "International trade remains constant", value: "false" }
        ],
        answer: "true",
        solution: "Aggregate demand depends on consumption, investment, government spending, and net exports."
    },
    {
        id: 154,
        question: "A government budget deficit can:",
        questionType: "multiple-choice",
        options: [
            { label: "Increase aggregate demand if financed by borrowing", value: "true" },
            { label: "Always reduce economic growth", value: "false" },
            { label: "Have no effect on the economy", value: "false" },
            { label: "Reduce private investment regardless of interest rates", value: "false" }
        ],
        answer: "true",
        solution: "Deficit spending injects money into the economy, raising demand."
    },
    {
        id: 155,
        question: "Unemployment increases can lead to:",
        questionType: "multiple-choice",
        options: [
            { label: "Lower consumer spending and slower economic growth", value: "true" },
            { label: "Higher government revenue automatically", value: "false" },
            { label: "Decreased inflation only", value: "false" },
            { label: "Increased exports directly", value: "false" }
        ],
        answer: "true",
        solution: "Fewer people working reduces income, consumption, and overall economic activity."
    },
    {
        id: 156,
        question: "Floating exchange rates can adjust to:",
        questionType: "multiple-choice",
        options: [
            { label: "Balance of payments changes through currency value adjustments", value: "true" },
            { label: "Government fiscal policy directly", value: "false" },
            { label: "Banking regulation automatically", value: "false" },
            { label: "Interest rate changes only", value: "false" }
        ],
        answer: "true",
        solution: "Supply and demand for currency determine floating exchange rates."
    },
    {
        id: 157,
        question: "The European Central Bank primarily targets:",
        questionType: "multiple-choice",
        options: [
            { label: "Price stability (inflation control)", value: "true" },
            { label: "Unemployment only", value: "false" },
            { label: "Government spending", value: "false" },
            { label: "Trade deficits", value: "false" }
        ],
        answer: "true",
        solution: "The ECB's main mandate is to maintain stable inflation in the eurozone."
    },
    {
        id: 158,
        question: "Supply-side policies may include:",
        questionType: "multiple-choice",
        options: [
            { label: "Reducing corporate taxes and deregulation", value: "true" },
            { label: "Direct increases in government spending", value: "false" },
            { label: "Reducing money supply", value: "false" },
            { label: "Setting exchange rates", value: "false" }
        ],
        answer: "true",
        solution: "Supply-side policies focus on increasing efficiency and productive capacity."
    },
    {
        id: 159,
        question: "The natural rate of unemployment is:",
        questionType: "multiple-choice",
        options: [
            { label: "The unemployment rate when the economy is at potential output", value: "true" },
            { label: "Zero unemployment", value: "false" },
            { label: "Caused by inflation only", value: "false" },
            { label: "Set by government policy directly", value: "false" }
        ],
        answer: "true",
        solution: "Even in a healthy economy, frictional and structural unemployment exist."
    },
    {
        id: 160,
        question: "The multiplier effect occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "An initial spending increase leads to a larger overall increase in output", value: "true" },
            { label: "Government sets interest rates", value: "false" },
            { label: "Exports exceed imports", value: "false" },
            { label: "Money supply is constant", value: "false" }
        ],
        answer: "true",
        solution: "Each round of spending generates additional income and consumption, amplifying the effect."
    },
    {
        id: 161,
        question: "Inflation can erode:",
        questionType: "multiple-choice",
        options: [
            { label: "Purchasing power of money", value: "true" },
            { label: "Government regulation", value: "false" },
            { label: "Aggregate supply", value: "false" },
            { label: "Exports directly", value: "false" }
        ],
        answer: "true",
        solution: "Rising prices reduce what money can buy, affecting consumers and firms."
    },
    {
        id: 162,
        question: "Interest rate changes affect business by:",
        questionType: "multiple-choice",
        options: [
            { label: "Altering borrowing costs and investment decisions", value: "true" },
            { label: "Directly controlling profits", value: "false" },
            { label: "Changing government taxation", value: "false" },
            { label: "Regulating international trade", value: "false" }
        ],
        answer: "true",
        solution: "Higher rates increase borrowing costs, reducing investment; lower rates stimulate investment."
    },
    {
        id: 163,
        question: "Globalisation benefits businesses by:",
        questionType: "multiple-choice",
        options: [
            { label: "Expanding markets and access to resources", value: "true" },
            { label: "Eliminating competition entirely", value: "false" },
            { label: "Guaranteeing domestic profits", value: "false" },
            { label: "Setting fixed exchange rates", value: "false" }
        ],
        answer: "true",
        solution: "Globalisation opens opportunities for trade, investment, and efficiency gains."
    },
    {
        id: 164,
        question: "Central banks influence aggregate demand through:",
        questionType: "multiple-choice",
        options: [
            { label: "Interest rate and liquidity adjustments", value: "true" },
            { label: "Government fiscal policy", value: "false" },
            { label: "Setting wages", value: "false" },
            { label: "Trade tariffs", value: "false" }
        ],
        answer: "true",
        solution: "Monetary policy tools affect borrowing, spending, and investment decisions."
    },
    {
        id: 165,
        question: "A contractionary monetary policy typically aims to:",
        questionType: "multiple-choice",
        options: [
            { label: "Reduce inflationary pressures", value: "true" },
            { label: "Increase government spending", value: "false" },
            { label: "Stimulate exports only", value: "false" },
            { label: "Raise unemployment intentionally", value: "false" }
        ],
        answer: "true",
        solution: "By reducing money supply or increasing interest rates, spending and inflation slow down."
    },
];
