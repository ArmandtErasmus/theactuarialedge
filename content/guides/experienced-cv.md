---
title: Experienced CV Template
slug: experienced-cv
summary: An ATS-friendly CV template for actuaries and quants with two or more years of experience, built to showcase measurable impact, leadership and technical depth.
category: CV
order: 2
readingTime: 4 min
download: /assets/cv/experienced-cv-template.zip
image: /assets/cv/experienced-cv-template.png
---

## Who this template is for

This template is for professionals with two or more years of experience, or anyone targeting senior actuarial, quant or risk roles. Recruiters spend very little time on each CV, so the layout is designed to let them assess your achievements quickly:

- Measurable impact, leadership and technical expertise sit at the top of each role.
- The section order and wording use the keywords that actuarial, quant and risk recruiters screen for.
- The format is clean and ATS-compliant.

Your CV should show what you have done and why it mattered, backed by evidence, numbers and the tools you used.

## What's in the download

```text
experienced-cv-template.zip
├── Firstname_Lastname_Resume.docx      # Word version
└── Experienced_Resume_Latex.zip        # LaTeX project
    ├── resume.tex                      # main file: compile this
    ├── custom-commands.tex             # layout macros
    └── src/
        ├── heading.tex
        ├── education.tex
        ├── experience.tex
        ├── projects.tex
        └── skills.tex
```

The two formats suit different needs:

- **LaTeX (recommended)** gives precise formatting and a professional PDF.
- **Word (DOCX)** suits you if you prefer to edit in Microsoft Word. Export it to PDF before you submit.

## Editing the LaTeX version in Overleaf

1. Unzip the download and locate `Experienced_Resume_Latex.zip`.
2. In [Overleaf](https://www.overleaf.com), choose **New Project**, then **Upload Project**, and select that zip.
3. Compile `resume.tex` with pdfLaTeX, Overleaf's default compiler, to generate your PDF.
4. Edit the section files in `src/`.

The template uses US Letter paper. Change `letterpaper` to `a4paper` in `resume.tex` if you are applying in South Africa, the UK or Europe.

## Filling in each section

The sections run in this order: heading, education, experience, projects, then skills and certifications. Replace all the example content. The sample employers, figures and qualifications are there only to show the level of detail expected.

### Heading and personal information

Include your name, email, phone number, city and country, and links to LinkedIn, GitHub or a portfolio. Leave out your date of birth, marital status and a photograph.

### Education and qualifications

List your degrees, then your professional qualification and the date you achieved it, for example Fellow or Associate of the IFoA or ASSA. If you are still qualifying, show your progress clearly in the skills section. At this stage a single coursework line is optional. Keep it only if it supports a move into a new area.

### Experience

This is the core of an experienced CV. List roles in reverse chronological order, each with its employer, title, dates and location, followed by two to four bullets. Strong bullets for experienced candidates:

- **Lead with scope and ownership:** the size of the portfolio, book or model you were responsible for, for example "a £[X]bn annuity portfolio" or "[N] pricing models".
- **Quantify the outcome:** runtime cut by [X]%, capital saved, audit issues resolved, P&L or loss-ratio improvement.
- **Name the frameworks and tools:** for example IFRS 17, Solvency II, SAM, Prophet, Python, SQL or C++.
- **Show leadership:** teams managed, stakeholders influenced, processes you redesigned or juniors you trained.

Concentrate detail on your most recent and most relevant roles. Older or less relevant roles can be reduced to one line.

### Projects

Include one or two substantial projects that show skills your job titles don't make obvious. Examples are a pricing or risk platform you built, a research piece, or a portfolio project in a new specialism you want to move into. Put the tech stack in the project heading.

### Skills and certifications

Use labelled lines:

- **Technical:** for example Python, R, SQL, C++, Excel/VBA, MATLAB, SAS and Git
- **Machine learning:** for example NumPy, pandas, scikit-learn, TensorFlow and PyTorch
- **Actuarial exams:** the exams you have passed, using official codes
- **Certifications:** for example CFA, FRM or FMVA, whether completed or in progress

## Keeping it ATS-compliant

Avoid tables or text boxes for content; icons, graphics, colours or logos; and images or photographs.

These are safe to use: bold text, bullet points, standard fonts at consistent sizes, and a black-and-white PDF.

To test machine readability, copy the text out of your PDF into a plain-text editor and check that it reads in the right order. For role-specific keywords, see the ATS-friendly CV guide.

## Best practices

- **Length:** one page is still the default. Move to two pages only with eight or more years of relevant experience, and only if every line earns its place.
- **Action verbs:** use verbs such as directed, engineered, optimised, designed, led and improved.
- **Metrics, then impact:** for example "reduced valuation runtime by [X]%, enabling [result]".
- **Tools and techniques:** name what you actually used, such as Python, SQL, C++, NumPy and pandas, and methods like GLMs, machine learning, GARCH, SABR or IFRS 17.
- **No filler:** drop words like "hardworking" and "team player". Your bullets should prove them.
- **Confidentiality:** don't disclose confidential figures. Use ranges, percentages or scale descriptions instead.

## File type and naming

- Submit a PDF, never an image.
- Use a professional file name, such as `Firstname_Lastname_CV.pdf`.

## Final check

An experienced CV should read as a record of results. Before you send it, tailor the top bullets of your current role and the skills line to the job description, and check that every number is accurate and defensible in an interview.
