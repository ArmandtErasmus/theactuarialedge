// Business Finance Practice Questions Data
const questions = [
    {
        id: 1,
        question: "Which of the following situations is least likely to give rise to agency costs?",
        questionType: "multiple-choice",
        options: [
            { label: "A car manufacturing business, which employs managers to carry out day-to-day operations", value: "A" },
            { label: "An oil refining business in which the government takes a great interest", value: "B" },
            { label: "Wage negotiations in which managers have more information than unions", value: "C" },
            { label: "A retailing business, which has one owner-manager", value: "D" },
        ],
        answer: "D",
        solution: "Agency costs arise when costs are incurred in the monitoring and influencing of others. When the owner is the manager there is no conflict of interest."
    },
    {
        id: 2,
        question: "Which of the following is NOT one of the headings in the UK Corporate Governance Code?",
        questionType: "multiple-choice",
        options: [
            { label: "Leadership", value: "A" },
            { label: "Profitability", value: "B" },
            { label: "Accountability", value: "C" },
            { label: "Remuneration", value: "D" },
        ],
        answer: "B",
        solution: "The headings are: Board Leadership and Company Purpose, Division of Responsibilities, Composition, Succession and Evaluation, Audit, Risk and Internal Control, Renumeration"
    },
    {
        id: 3,
        question: "Describe the role of the financial manager. (enter financial manager to submit a correct solution)",
        questionType: "input",
        answer: "financial manager",
        solution: "The financial manager is the link between the firm’s operations and the financial markets. Therefore the financial manager must make two main decisions: The investment or capital budgeting decision and the financial decision. The investment decision is complex, important and risky. There are often alternative investment projects, each with uncertain returns over an uncertain lifespan. A wrong decision could have very serious consequences for the firm’s fortunes. The financial manger must get together with many interested parties, such as project managers, production managers, marketing managers, tax experts and legal experts in order to understand the full implications of the investment decision. In order to make appropriate financing decisions, the financial manager should have a clear understanding of the options available and the way in which the capital markets work."
    },
    {
        id: 4,
        question: "Explain how businesses are subject to the disciplines of the capital markets. (enter capital markets to submit a correct solution)",
        questionType: "input",
        answer: "capital markets",
        solution: "Capital markets are continuously expressing their view of the current and expected future performance of a particular company through the valuations of a firm’s shares and bonds. If managers are not using the assets of the business effectively, the market will soon know this and its poor perception of the company will be revealed in a lower share price. One consequence of a falling share price may be a takeover bid as the firm becomes a bargain for a corporate acquirer. Another consequence might be redundancy for the manager. So, by providing continuous assessment of the firm’s performance, the capital markets stimulate efficiency and provide incentives to business managers to improve their performance."
    },
    {
        id: 5,
        question: "A limited liability partnership differs from a limited company in that:",
        questionType: "multiple-choice",
        options: [
            { label: "It is not a separate legal entity.", value: "A" },
            { label: "There must be one member with unlimited liability.", value: "B" },
            { label: "It has no Memorandum or Articles of Association.", value: "C" },
            { label: "Action cannot be taken against individual members for fraud and negligence.", value: "D" },
        ],
        answer: "C",
        solution: "A limited liability partnership is similar to a limited company in that it is a separate legal entity, all its members benefit from limited liability and action can be taken against individual members for fraud and negligence. However, it does not have to produce a Memorandum or Articles of Association."
    },
    {
        id: 6,
        question: "Which of the following is NOT true of a public company?",
        questionType: "multiple-choice",
        options: [
            { label: "The company name must end in ‘public limited company’ or PLC or plc.", value: "A" },
            { label: "The ordinary shares must be quoted on the Stock Exchange.", value: "B" },
            { label: "Ordinary shareholders have one vote per share held.", value: "C" },
            { label: "The issued share capital must not be less than £50,000.", value: "D" },
        ],
        answer: "B",
        solution: "Being a public company is a requirement for obtaining a quotation, but having a quotation is not a requirement for being a public company."
    },
    {
        id: 7,
        question: "Investors in the ordinary shares of a company have their liability limited to:",
        questionType: "multiple-choice",
        options: [
            { label: "The market price of the shares.", value: "A" },
            { label: "The fully paid value of the shares.", value: "B" },
            { label: "The nominal value of their holding.", value: "C" },
            { label: "The capital value of their holding, less any dividends due.", value: "D" },
        ],
        answer: "B",
        solution: "Shareholders’ liability is limited to the fully paid-up value of their shares."
    },
    {
        id: 8,
        question: "Explain the differences between a sole trader and a company. (enter differences to submit a correct solution)",
        questionType: "input",
        answer: "differences",
        solution: "1. Ownership: A sole trader is an organisation owned by one person. A company is owned by its shareholders. 2. Liability: A sole trader has unlimited liability. Shareholders of a company have limited liability. 3. Legal Identity: A sole trader does not have a legal identity distinct from its owners. A company is a legal entity distinct from its owners. 4. Documentation: A sole trader needs no documentation. A company must have a Memorandum of Association and Articles of Association and be registered at Companies House. 5. Disclosure and Tax: A sole trader prepares accounts for the tax authorities and pays income tax. A company (above a certain size) must publish its accounts. It pays corporation tax."
    },
    {
        id: 9,
        question: "Compare a partnership and a limited liability partnership. (enter parnership to submit a correct solution)",
        questionType: "input",
        answer: "partnership",
        solution: "1. Ownership: A partnership is owned by two or more people. An LLP is owned by its members. 2. Liability: Partners have unlimited liability. Individual partners are jointly and severally liable for the debts of the partnership. Members of an LLP have limited liability. 3. Legal Identity: A partnership does not have a legal identity distinct from its owners. An LLP is a legal entity distinct from its owners. 4. Documentation: A partnership needs no documentation, though a Partnership Agreement is advisable. An LLP has a Partnership Agreement or else is governed by the default provisions in the regulations. The LLP must be registered at Companies House. 5. Disclosure and Tax: A partnership prepares accounts for the tax authorities and the partners pay income tax. An LLP (above a certain size) must publish its accounts. Partners pay income tax."
    },
    {
        id: 10,
        question: "Taxable profits for a company are:",
        questionType: "multiple-choice",
        options: [
            { label: "Unadjusted pre-tax accounting profits.", value: "A" },
            { label: "Trading profits less capital allowances.", value: "B" },
            { label: "Unadjusted income (after expenses) plus capital gains.", value: "C" },
            { label: "None of the above.", value: "D" },
        ],
        answer: "D",
        solution: "None of the above: The accounting profits will differ from the taxable profits. Capital allowances are not the only difference between accounting profits and taxable profits. C deals with accounting profits again."
    },
    {
        id: 11,
        question: "What is the most logical explanation for the requirement that investment income often has tax deducted at source?",
        questionType: "multiple-choice",
        options: [
            { label: "To discourage companies from paying dividends", value: "A" },
            { label: "To ensure that taxpayers who have insufficient income to pay tax are required to pay tax on their investment income", value: "B" },
            { label: "To enable governments to tax investment income at a higher rate than earned income", value: "C" },
            { label: "To simplify the collection of tax", value: "D" },
        ],
        answer: "D",
        solution: "There is no reason to discourage the payment of dividends by companies. If the investor receives the income, there is theoretically sufficient income to pay the tax. Charging tax up front will not raise the rate of tax charged. However, this could lead to simplifications in the collection of taxes as it avoids having to collect tax from many investors."
    },
    {
        id: 12,
        question: "List three sources of personal income that are tax-free in the UK. Outline other adjustments made to total income in order to arrive at taxable income. (enter income to submit a correct solution)",
        questionType: "input",
        answer: "income",
        solution: "Three sources of income that are tax-free in the UK are: 1. most gambling profits, 2. income from certain investments, e.g. ISAs and 3. most social security benefits. Other adjustments that have to be made to total income to arrive at taxable income are: 1. the addition of benefits-in-kind (fringe benefits) such as cheap mortgages, 2. the deduction of tax-free expenditure such as contributions to an approved pension scheme and charitable gifts and 3. the deduction of appropriate allowances, eg personal allowance, age-related allowance."
    },
    {
        id: 13,
        question: "Outline the system of capital gains tax as it applies to individuals in the UK. (enter tax to submit a correct solution)",
        questionType: "input",
        answer: "tax",
        solution: "A capital gain is the gain made when an asset is sold for more than it cost. Capital gains on some assets may be exempt. For example, in the UK, private motor cars and a main private residence are free from capital gains tax for UK residents. The sale price can be reduced by any expenses associated with the sale. The purchase cost can be increased by any costs associated with the purchase and any expenditure made to enhance the value of the asset during the period the asset was held. Individuals are usually given an annual allowance, which is transferrable between spouses/partners. Taxable gains (net of any capital losses) are normally taxed at 10% or 20%, depending on the individual’s taxable income and the nature of the asset."
    },
    {
        id: 14,
        question: "Explain how corporation tax on the annual profits of a company is calculated. (enter profits to submit a correct solution)",
        questionType: "input",
        answer: "profits",
        solution: "Companies pay corporation tax on their taxable profits. Taxable profits include both income and capital gains and the starting point for their assessment is the profits shown in a company’s profit & loss statement. Various adjustments are made to these profits from the accounts to arrive at taxable profits. The adjustments include: 1. adding back any expenses or potential expenditure included in the accounts which are not allowable for tax purposes, 2. deducting any special reliefs (eg research & development costs), 3. adding back the depreciation charged and instead deducting the ‘capital allowances’. In most countries, the taxable profits are taxed at the corporation tax rate which may vary each year. If the company has earned income or capital gains and paid tax abroad, and if the country has a double taxation agreement with other countries, the tax authorities will offset tax paid overseas against the company’s liability to pay domestic corporation tax. The maximum offset is the rate of tax that would have been paid locally."
    },
    {
        id: 15,
        question: "Government bonds are more marketable than debenture stock. (True/False)",
        questionType: "multiple-choice",
        options: [
            { label: "True", value: "True" },
            { label: "False", value: "False" },
        ],
        answer: "True",
        solution: "True. Marketability of debentures is lower than the marketability of government bonds because the debenture issues are smaller. Trading in a particular debenture can be infrequent."
    },
    {
        id: 16,
        question: "Eurobonds are more marketable than ordinary shares. (True/False)",
        questionType: "multiple-choice",
        options: [
            { label: "True", value: "True" },
            { label: "False", value: "False" },
        ],
        answer: "False",
        solution: "False. Ordinary shares are the most common form of company finance and are the most marketable. Eurobonds are usually more marketable than other forms of debt finance because they are issued in larger amounts and are actively marketed by banks."
    },
    {
        id: 17,
        question: "Debentures provide a higher return than unsecured loan stock. (True/False)",
        questionType: "multiple-choice",
        options: [
            { label: "True", value: "True" },
            { label: "False", value: "False" },
        ],
        answer: "False",
        solution: "False. Debentures provide a lower expected return because they are the more secure form of company finance. Holders of unsecured loan stock take a greater risk and thus require a greater reward."
    },
    {
        id: 18,
        question: "Convertible loan stock generally provides a lower income yield than conventional loan stock. (True/False)",
        questionType: "multiple-choice",
        options: [
            { label: "True", value: "True" },
            { label: "False", value: "False" },
        ],
        answer: "True",
        solution: "True. Convertible loan stock generally provides a lower income than conventional loan stock because convertibles offer the prospect of dividend growth in the future. Investors are attracted by the prospect of dividend growth in the future and are thus willing to accept lower income in the short term."
    },
    {
        id: 19,
        question: "Ordinary shares generally provide a higher income yield than convertible preference shares. (True/False)",
        questionType: "multiple-choice",
        options: [
            { label: "True", value: "True" },
            { label: "False", value: "False" },
        ],
        answer: "False",
        solution: "False. Convertible preference shares generally provide a higher income than ordinary shares because convertibles do not at present offer the benefit of dividend growth. An ordinary shareholder is willing to accept a lower initial income in return for dividend growth, whereas the holder of a convertible does not benefit from dividend growth at present and would require a higher income."
    },
    {
        id: 20,
        question: "Warrants are a form of loan stock. (True/False)",
        questionType: "multiple-choice",
        options: [
            { label: "True", value: "True" },
            { label: "False", value: "False" },
        ],
        answer: "False",
        solution: "False. Warrants are not a form of loan stock. They are call options written by a company on its own stock. They are often issued in conjunction with a fixed-interest bond to make the bond more attractive to investors."
    },
    {
        id: 21,
        question: "Executive share options are a form of warrant. (True/False)",
        questionType: "multiple-choice",
        options: [
            { label: "True", value: "True" },
            { label: "False", value: "False" },
        ],
        answer: "True",
        solution: "True. Executive share options are options to buy the company’s shares. They are issued to senior management as part of an incentive package."
    },
    {
        id: 22,
        question: "Eurobonds are less risky than debentures. (True/False)",
        questionType: "multiple-choice",
        options: [
            { label: "True", value: "True" },
            { label: "False", value: "False" },
        ],
        answer: "False",
        solution: "False. Debentures are secured on some or all of the assets of the company. Eurobonds are a form of unsecured loan stock and rank after debentures in a wind-up."
    },

    {
        id: 23,
        question: "Which of the following statements concerning Eurobonds is false?",
        questionType: "multiple-choice",
        options: [
            { label: "Eurobonds are often issued outside the country of the currency of issue.", value: "A" },
            { label: "Eurobonds are often issued outside the country of the borrower.", value: "B" },
            { label: "Eurosterling can be issued in London.", value: "C" },
            { label: "Eurobonds are only issued in Europe.", value: "D" },
        ],
        answer: "D",
        solution: "The term ‘Euro’ is misleading (although the oldest, and still the main, markets are in Europe). The other statements are all correct."
    },
    {
        id: 24,
        question: "‘The lender’s security is a specified asset which the borrower cannot dispose of (without the lender’s permission). The lender can repossess upon default or appoint a receiver to intercept income (eg rent).’ This is a definition of what?",
        questionType: "multiple-choice",
        options: [
            { label: "Eurobond", value: "A" },
            { label: "Warrant", value: "B" },
            { label: "Fixed-charge debenture", value: "C" },
            { label: "Floating-charge debenture", value: "D" },
        ],
        answer: "C",
        solution: "Debentures can be either fixed-charge (or mortgage) debentures or floating-charge debentures. Fixed-charge debentures are secured against a particular asset."
    },
    {
        id: 25,
        question: "Which of the following is correct?",
        questionType: "multiple-choice",
        options: [
            { label: "Interest payments are always greater than dividend payments.", value: "A" },
            { label: "Interest is paid out of pre-tax profit and dividends are paid out of post-tax profit.", value: "B" },
            { label: "Interest is paid on debentures and dividends are paid on unsecured loan stock.", value: "C" },
            { label: "Interest is taxable but dividends are not.", value: "D" },
        ],
        answer: "B",
        solution: "Interest is paid on loan stock, whereas dividends are paid on equity. Interest could be greater than, equal to or less than dividend payments (though the overall return to equity is expected to be greater than the return to debt because equity is riskier for the investor). Interest payments are treated as an expense for the company and are therefore paid out of pre-tax profit. Dividends are paid out of post-tax profit. Both interest and dividends are taxable, though in some countries governments give at least some credit to the recipient for the tax that has already been paid by the company."
    },
    {
        id: 26,
        question: "Which of the following ranks lowest if a company is wound up?",
        questionType: "multiple-choice",
        options: [
            { label: "Eurobonds", value: "A" },
            { label: "Mortgage debentures", value: "B" },
            { label: "Floating-charge debentures", value: "C" },
            { label: "Preference shares", value: "D" },
        ],
        answer: "D",
        solution: "Loan stock holders (Options A, B and C) are always paid before preference shareholders."
    },
    {
        id: 27,
        question: "A highly risk-averse investor should NOT invest in ordinary shares because:",
        questionType: "multiple-choice",
        options: [
            { label: "ordinary shares offer a low expected return relative to other securities.", value: "A" },
            { label: "ordinary shareholders have the last entitlement in the event of a winding-up of the company.", value: "B" },
            { label: "they offer a low initial yield.", value: "C" },
            { label: "shareholders have pre-emptive rights.", value: "D" },
        ],
        answer: "B",
        solution: "A is false, and C and D are wrong because these should not prevent a risk-averse investor from investing in ordinary shares."
    },
    {
        id: 28,
        question: "Under a floating charge:",
        questionType: "multiple-choice",
        options: [
            { label: "the company may not, in the usual course of business, realise assets which are subject to the charge.", value: "A" },
            { label: "a default by the company will make the charge crystallise into a fixed charge.", value: "B" },
            { label: "specific assets are available to meet investors’ claims if the company defaults on interest or capital payments.", value: "C" },
            { label: "security is provided in the event that the borrower defaults on the final capital payment, but not in the event of default on the interest payments.", value: "D" },
        ],
        answer: "B",
        solution: "A and C would be true for a fixed charge."
    },
    {
        id: 29,
        question: "Which of the following will NOT dilute the value of the equity in a business?",
        questionType: "multiple-choice",
        options: [
            { label: "Warrants", value: "A" },
            { label: "Eurobonds", value: "B" },
            { label: "Convertible loan stock", value: "C" },
            { label: "Executive stock options", value: "D" },
        ],
        answer: "B",
        solution: "Eurobonds do not have any effect on the number of shares issued. The other three could all cause an increase in the number of shares and therefore a dilution of the value of the equity in the business."
    },
    {
        id: 30,
        question: "A convertible bond gives the right to purchase 70 ordinary shares per £100 nominal. The market prices of the convertible bond and ordinary shares are £120 and 90 pence respectively. The conversion premium per share is:",
        questionType: "multiple-choice",
        options: [
            { label: "81p", value: "A" },
            { label: "125p", value: "B" },
            { label: "129p", value: "C" },
            { label: "171p", value: "D" },
        ],
        answer: "A",
        solution: "The conversion premium is the extra amount that an investor pays for a share by buying it as a convertible, compared with the cost of buying the share directly. In this case, (120/70) - 0.90 = 81p"
    },
    {
        id: 31,
        question: "Which of the following could NOT result in a company obtaining a stock exchange listing?",
        questionType: "multiple-choice",
        options: [
            { label: "an introduction", value: "A" },
            { label: "a rights issue", value: "B" },
            { label: "an offer for subscription", value: "C" },
            { label: "a placing", value: "D" },
        ],
        answer: "B",
        solution: "Rights issues are used by companies that already listed in order to raise further capital. The other three method are used for obtaining a listing."
    },
    {
        id: 32,
        question: "An arrangement whereby a company’s shares obtain a quotation on the London Stock Exchange, and the shares that are made available are bought by a small number of institutional investors, is known as:",
        questionType: "multiple-choice",
        options: [
            { label: "a placing.", value: "A" },
            { label: "an offer for subscription.", value: "B" },
            { label: "an introduction.", value: "C" },
            { label: "an offer for sale.", value: "D" },
        ],
        answer: "A",
        solution: "All four are methods of obtaining a listing. A subscription and offer for sale are both offers made to the public (directly by the company itself, or via an issuing house respectively). An introduction does not make any shares available."
    },
    {
        id: 33,
        question: "The main significance of the par value of an ordinary share is that:",
        questionType: "multiple-choice",
        options: [
            { label: "it is the minimum price at which shares can be traded on the Stock Exchange.", value: "A" },
            { label: "it is the minimum price at which shares can be issued by the company.", value: "B" },
            { label: "it is the amount at which the shares will be redeemed.", value: "C" },
            { label: "at prices above the par value a company must have a scrip issue.", value: "D" },
        ],
        answer: "B",
        solution: "A is the market price. C is wrong because shares are usually irredeemable. D is false because companies do not have to have scrip issues."
    },
    {
        id: 34,
        question: "The market price of a company’s shares is currently £7 per share. If it has a 1-for-3 rights issue at £5, the expected ex-rights price of the shares will be:",
        questionType: "multiple-choice",
        options: [
            { label: "£7.00", value: "A" },
            { label: "£6.50", value: "B" },
            { label: "£5.50", value: "C" },
            { label: "£5.00", value: "D" },
        ],
        answer: "B",
        solution: "The ex-rights price is given by price = [(3 × 7) + (1 × 5)] / (3 + 1) = £6.50"
    },
    {
        id: 35,
        question: "Which of the following is most often used by companies that are suffering from cashflow problems arising from late-paying customers?",
        questionType: "multiple-choice",
        options: [
            { label: "hire purchase", value: "A" },
            { label: "bills of exchange", value: "B" },
            { label: "invoice discounting", value: "C" },
            { label: "trade credit", value: "D" },
        ],
        answer: "C",
        solution: "Invoice discounting is another name for recourse factoring. This provides early payment of a percentage of the value of the invoices by a factor. The supplier retains contact with the customers and when the customers eventually pay their bills, the loan is repaid to the factor, with interest."
    },
    {
        id: 36,
        question: "Which of the following is NOT a type of crowdfunding?",
        questionType: "multiple-choice",
        options: [
            { label: "donation-based", value: "A" },
            { label: "pre-payment", value: "B" },
            { label: "loan-based", value: "C" },
            { label: "non-recourse", value: "D" },
        ],
        answer: "D",
        solution: "The fourth type of crowdfunding mentioned is investment-based."
    },
    {
        id: 37,
        question: "Which of the following statements about project finance is true?",
        questionType: "multiple-choice",
        options: [
            { label: "It entails the formation of a new legal entity.", value: "A" },
            { label: "It is a recourse method of financing.pre-payment", value: "B" },
            { label: "It provides on-balance-sheet financing.", value: "C" },
            { label: "It always involves the public sector.", value: "D" },
        ],
        answer: "A",
        solution: "Project finance is a non-recourse, off-balance sheet method of obtaining finance. It often involves public-private partnerships, but does not have to involve the public sector."
    },
    {
        id: 38,
        question: "The most likely explanation for an investor buying a call option is that they expect:",
        questionType: "multiple-choice",
        options: [
            { label: "the value of the underlying security to increase.", value: "A" },
            { label: "the value of the underlying security to fall.", value: "B" },
            { label: "interest rates to rise.", value: "C" },
            { label: "a stock market crash.", value: "D" },
        ],
        answer: "A",
        solution: "A call option gives the buyer the right to buy the underlying security at a set price. This will be worth doing if the market price on the expiry date is higher than the exercise price. If interest rates rise, we might expect the value of shares to fall, so it would not be worth buying a call option. (It might be worth buying a put option, though.)"
    },
    {
        id: 39,
        question: "Margin is:",
        questionType: "multiple-choice",
        options: [
            { label: "the cost of buying an option.", value: "A" },
            { label: "the cost of buying a future.", value: "B" },
            { label: "a deposit paid to the seller of a future or writer of an option by the purchaser.", value: "C" },
            { label: "a deposit paid to the clearing house by the buyer and seller of a future and the writer of an option.non-recourse", value: "D" },
        ],
        answer: "D",
        solution: "The margin exists to protect the clearing house against credit loss."
    },
    {
        id: 40,
        question: "Which of the following strategies would NOT help a company to reduce its exposure to rising interest rates?",
        questionType: "multiple-choice",
        options: [
            { label: "the negotiation of an interest rate swap", value: "A" },
            { label: "the purchase of a put option on an interest rate future", value: "B" },
            { label: "the purchase of a bond future", value: "C" },
            { label: "the sale of an interest rate future", value: "D" },
        ],
        answer: "C",
        solution: "The company could swap a floating interest rate for a fixed interest rate to protect it from rising interest rates. It could sell an interest rate future. If interest rates rise, the price of the interest rate future falls and thus a profit could be made on the future to offset the rise in interest rates. By buying a put option on an interest rate future, it is buying the option to sell. It will exercise this right if interest rates rise. It would not buy a bond future. If interest rates rise, the price of the bond future will fall. It would make a loss on the future as well as suffering from higher interest rates."
    },
    {
        id: 41,
        question: "Which of the following is responsible for developing, issuing and withdrawing accounting standards?",
        questionType: "multiple-choice",
        options: [
            { label: "International Accounting Standards Board", value: "A" },
            { label: "Auditing Practices Board", value: "B" },
            { label: "International Financial Reporting Standards", value: "C" },
            { label: "Department of Trade and Industry", value: "D" },
        ],
        answer: "A",
        solution: "The International Accounting Standards Board is responsible for developing, issuing and withdrawing accounting standards."
    },
    {
        id: 42,
        question: "Inventories (ie stock or raw materials used by a company) are valued at the lower of cost or net realisable value. This is an application of which accounting concept?",
        questionType: "multiple-choice",
        options: [
            { label: "cost concept", value: "A" },
            { label: "accruals concept", value: "B" },
            { label: "prudence concept", value: "C" },
            { label: "realisation concept", value: "D" },
        ],
        answer: "C",
        solution: "According to the prudence concept, assets should not be overestimated. If there is some uncertainty about the value of the inventories (eg Easter eggs after Easter!) and it is felt that the sale value is lower than the cost value then the lower (net realisable) value should be used in the statement of financial position."
    },
    {
        id: 43,
        question: "Which of the following statements most accurately describes the main purpose of the external audit of a limited company?",
        questionType: "multiple-choice",
        options: [
            { label: "To review the company’s accounting systems and related internal controls.", value: "A" },
            { label: "To assist the directors to prepare the company’s annual financial statements.", value: "B" },
            { label: "To express an opinion on the truth and fairness of the company’s annual financial statements.", value: "C" },
            { label: "To prevent and detect fraud within the company.", value: "D" },
        ],
        answer: "C",
        solution: "The wording of a typical auditors’ report is: ‘In our opinion, the financial statements give a true and fair view, in accordance with IFRSs as adopted by the European Union, of the state of the group’s and the parent company’s affairs as at …….. and of the group’s and the parent company’s profit [loss] for the year then ended; the financial statements and the part of the Directors’ Remuneration Report to be audited have been properly prepared in accordance with the Companies Act 2006 and Article 4 of the IAS Regulation; and the information given in the Directors’ Report is consistent with the financial statements.’"
    },
    {
        id: 44,
        question: "‘Expenses are recognised when they are incurred. It is not necessary to wait until the bills are paid.’ This statement refers to the:",
        questionType: "multiple-choice",
        options: [
            { label: "realisation concept", value: "A" },
            { label: "accruals concept", value: "B" },
            { label: "going concern concept", value: "C" },
            { label: "money measurement concept", value: "D" },
        ],
        answer: "B",
        solution: "The accruals concept."
    },
    {
        id: 45,
        question: "The term ‘current asset’ as used in company reports and accounts describes cash and other assets:",
        questionType: "multiple-choice",
        options: [
            { label: "that are marketable.", value: "A" },
            { label: "that the company plans to dispose of within the next financial year.", value: "B" },
            { label: "that are tangible.", value: "C" },
            { label: "that will be converted into cash in the normal course of business.", value: "D" },
        ],
        answer: "D",
        solution: "Land is an example of an asset that is marketable, tangible and a company may have plans to sell it. However, it is a non-current, not a current, asset."
    },
    {
        id: 46,
        question: "The term ‘inventories’ as used in company reports and accounts describes:",
        questionType: "multiple-choice",
        options: [
            { label: "finished goods for resale only.", value: "A" },
            { label: "work-in-progress and finished goods for resale only.", value: "B" },
            { label: "raw materials, work-in-progress and finished goods for resale only.", value: "C" },
            { label: "raw materials and consumables, work-in-progress and finished goods.", value: "D" },
        ],
        answer: "D",
        solution: "Raw materials and consumables, work-in-progress and finished goods."
    },
    {
        id: 47,
        question: "What are non-current assets?",
        questionType: "multiple-choice",
        options: [
            { label: "tangible assets with an expected life of more than one year", value: "A" },
            { label: "tangible assets which are not held for sale in the normal course of business", value: "B" },
            { label: "assets which are not held for sale in the normal course of business", value: "C" },
            { label: "machines, factories and other immobile assets which are not intended for resale", value: "D" },
        ],
        answer: "C",
        solution: "Non-current assets may be tangible or intangible. They may also be mobile (eg a lorry)."
    },
    
];
