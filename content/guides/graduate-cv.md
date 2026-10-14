---
title: Graduate CV Template
slug: graduate-cv
summary: A one-page, ATS-friendly CV template for actuarial, quant and risk graduates, in LaTeX and Word, plus how to fill in every section.
category: CV
order: 1
readingTime: 5 min
download: /assets/cv/graduate-cv-template.zip
image: /assets/cv/graduate-cv-template.png
---

## Who this template is for

This template is for students and recent graduates applying for actuarial, quantitative and risk graduate programmes, vacation work and analyst roles. It is built to get you shortlisted:

- The structure is one that recruiters and Applicant Tracking Systems (ATS) can read easily.
- Exams, technical skills and experience sit where a reader expects to find them, so keywords stand out.
- Bullets are written around impact rather than duties.

Your CV should show both technical ability and analytical thinking. It needs to communicate what you have done and the impact it had, backed by evidence, numbers and the tools you used.

## What's in the download

The zip contains two versions of the same CV:

```text
graduate-cv-template.zip
├── Firstname_Lastname_Resume.docx      # Word version
└── Graduate_Resume_Latex.zip           # LaTeX project
    ├── resume.tex                      # main file: compile this
    ├── custom-commands.tex             # layout macros
    └── src/
        ├── heading.tex                 # name and contact line
        ├── education.tex
        ├── experience.tex
        ├── projects.tex
        └── skills.tex
```

The two formats suit different needs:

- **LaTeX (recommended)** gives precise, consistent formatting and a clean, professional PDF.
- **Word (DOCX)** suits you if you prefer to edit in Microsoft Word. Always export it to PDF before you submit.

## Editing the LaTeX version in Overleaf

[Overleaf](https://www.overleaf.com) is a free online LaTeX editor, so you don't need to install anything.

1. Unzip the download. You will find `Graduate_Resume_Latex.zip` inside.
2. In Overleaf, choose **New Project**, then **Upload Project**, and select `Graduate_Resume_Latex.zip`.
3. Open `resume.tex` and click **Recompile** to produce the PDF. The template uses pdfLaTeX, which is Overleaf's default compiler.
4. Edit the files in `src/`, one per section. You rarely need to touch `resume.tex` or `custom-commands.tex`.

The template is set to US Letter paper (`letterpaper` on the first line of `resume.tex`). If you are applying in South Africa, the UK or Europe, change it to `a4paper`.

## Filling in each section

The template runs top to bottom in this order: heading, education, experience, projects, then skills and certifications. Replace every piece of example content, including the names, employers, dates, coursework and exam codes.

### Heading and personal information

Include:

- your name, email address and phone number
- your location (city and country)
- relevant links: LinkedIn, GitHub, a portfolio or personal website

Leave out your date of birth, marital status and a photograph. They take up space, add nothing to your case and can introduce bias.

### Education

List your degree, university, expected or actual graduation date and location. Add your professional body membership, for example student membership of ASSA or the IFoA, with the date you joined.

Finish with a single **Coursework** line naming the modules most relevant to the role, such as probability and statistics, financial mathematics, risk theory, life contingencies, or stochastic modelling in Python or R.

### Experience

Use this section for internships, vacation work, part-time analytical work and tutoring. For each role, write three or four bullets that:

- focus on impact rather than responsibilities ("automated monthly reporting, cutting preparation time by [X]%" rather than "responsible for reports")
- name the technical tools you used, such as Python, R, SQL, C++ or Excel
- quantify outcomes wherever you can: time saved, accuracy improved, volume handled, people supported

If you have no formal experience yet, give the projects section more room.

### Projects

Projects are where a graduate can show real modelling ability. Give each one a heading with its name and tech stack, for example "Bornhuetter-Ferguson Reserving Engine | Python, Streamlit". Then write three to five bullets covering what you built, the method you used, how you validated it and what you found. The portfolio projects on this site each include CV bullets you can adapt.

### Skills and certifications

Group these into short labelled lines:

- **Technical:** programming languages and tools
- **Activities and societies:** for example your university actuarial society
- **Actuarial exams:** exams passed or exemptions granted, using the official exam codes
- **Certifications:** for example a data science or financial modelling certificate

## Keeping it ATS-compliant

Many employers screen CVs with an ATS before a person reads them, and a CV the system can't parse may never be seen.

Avoid:

- tables and text boxes for laying out content
- icons, graphics, colours and logos
- images and photographs

These are safe to use:

- simple bold text and bullet points
- a black-and-white PDF
- standard fonts at consistent sizes

The LaTeX template keeps its layout minimal and turns on Unicode text mapping (`\pdfgentounicode=1`) so the PDF text extracts cleanly. To test any CV, copy all the text out of the PDF into a plain-text editor. If it comes out in the right order with nothing garbled, an ATS can probably read it too. See the ATS-friendly CV guide for keywords.

## Best practices

- **Length:** keep it to one page. Two pages are only justified with roughly eight or more years of experience.
- **Action verbs:** start bullets with strong verbs such as engineered, optimised, designed, built, automated or improved.
- **Metrics, then impact:** for example "reduced model RMSE by [X]%" or "increased profit by [Y]%". Use your real numbers. If you can't share a figure, describe the scale instead, such as the size of the portfolio or the number of policies.
- **Tools:** list the libraries and tools you actually used, such as Python, SQL, C++, NumPy and pandas.
- **Techniques:** name the actuarial and quantitative methods you applied, such as GLMs, machine learning, GARCH, SABR or IFRS 17, but only those you can discuss in an interview.
- **No filler:** drop phrases like "hardworking" and "team player". Show those qualities through your bullets instead.

## File type and naming

- Always submit a PDF, never an image or a scan.
- Use a professional file name, such as `Firstname_Lastname_CV.pdf`.

## Final check

Keep the CV concise, professional and technically sound, with a structure that lets a recruiter or an ATS judge your fit in seconds. Before you send it:

- read it aloud
- check every number and date
- confirm every link works
- tailor the skills line and top bullets to the specific job description
