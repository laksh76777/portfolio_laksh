import fs from 'fs';
import path from 'path';

// Clean standard PDF 1.4 vector generator for Laksh Suthar's Official Resume
function generateExactResumePdf() {
  const content = `%PDF-1.4
%
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595.28 841.89]
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
      /F3 6 0 R
    >>
  >>
  /Contents 7 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Oblique
>>
endobj
7 0 obj
<<
  /Length 8 0 R
>>
stream
% Background clean white paper
1 1 1 rg
0 0 595.28 841.89 re f

% Top Header Name
BT
/F1 20 Tf
0.08 0.12 0.2 rg
235 805 Td
(Laksh Suthar) Tj
ET

% Contact Header Bar
BT
/F2 8.5 Tf
0.05 0.45 0.85 rg
105 788 Td
(+91-9024005934) Tj
0.2 0.2 0.2 rg
175 788 Td
( |  lakshsuthar703@gmail.com  |  Bengaluru, Karnataka) Tj
ET

BT
/F2 8.5 Tf
0.05 0.45 0.85 rg
195 774 Td
(LinkedIn) Tj
0.2 0.2 0.2 rg
233 774 Td
( | ) Tj
0.05 0.45 0.85 rg
243 774 Td
(GitHub) Tj
0.2 0.2 0.2 rg
274 774 Td
( | ) Tj
0.05 0.45 0.85 rg
284 774 Td
(LeetCode) Tj
0.2 0.2 0.2 rg
325 774 Td
( | ) Tj
0.05 0.45 0.85 rg
335 774 Td
(Codolio) Tj
ET

% SECTION: SUMMARY
0.2 0.2 0.2 RG
0.8 w
40 760 m 555 760 l S

BT
/F1 10.5 Tf
0.1 0.1 0.1 rg
40 748 Td
(SUMMARY) Tj
ET

BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
40 735 Td
(Final-year Computer Science Engineering student (Expected Graduation: May 2027) with hands-on experience) Tj
40 724 Td
(building scalable full-stack applications using Java, Python, React.js, TypeScript, and Firebase. Strong foundation in) Tj
40 713 Td
(Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems,) Tj
40 702 Td
(Computer Networks, and Software Engineering.) Tj
ET

% SECTION: EDUCATION
0.2 0.2 0.2 RG
0.8 w
40 690 m 555 690 l S

BT
/F1 10.5 Tf
0.1 0.1 0.1 rg
40 678 Td
(EDUCATION) Tj
ET

BT
/F1 9 Tf
0.1 0.1 0.1 rg
40 665 Td
(JSS Academy of Technical Education, Bengaluru) Tj
ET

BT
/F3 8.5 Tf
0.2 0.2 0.2 rg
490 665 Td
(2023 - 2027) Tj
ET

BT
/F2 8.5 Tf
0.2 0.2 0.2 rg
40 653 Td
(Bachelor of Engineering in Computer Science and Engineering) Tj
ET

BT
/F1 9 Tf
0.1 0.1 0.1 rg
465 653 Td
(CGPA: 8.24/10) Tj
ET

BT
/F1 9 Tf
0.1 0.1 0.1 rg
40 638 Td
(Sri Chaitanya Techno School, Bengaluru \\(CBSE\\)) Tj
ET

BT
/F3 8.5 Tf
0.2 0.2 0.2 rg
490 638 Td
(2021 - 2023) Tj
ET

BT
/F2 8.5 Tf
0.2 0.2 0.2 rg
40 626 Td
(Class XII \\(Senior Secondary\\) - CBSE Board) Tj
ET

% SECTION: PROJECT EXPERIENCE
0.2 0.2 0.2 RG
0.8 w
40 614 m 555 614 l S

BT
/F1 10.5 Tf
0.1 0.1 0.1 rg
40 602 Td
(PROJECT EXPERIENCE) Tj
ET

BT
/F1 9 Tf
0.1 0.1 0.1 rg
40 589 Td
(Fake News Analysis System) Tj
ET

BT
/F3 8.5 Tf
0.2 0.2 0.2 rg
525 589 Td
(2026) Tj
ET

BT
/F3 8 Tf
0.25 0.25 0.25 rg
40 578 Td
(React, TypeScript, Vite, AI APIs, HTML, CSS) Tj
ET

BT
/F2 8 Tf
0.05 0.45 0.85 rg
40 567 Td
(GitHub Repository: github.com/laksh76777/fake_news_analysis) Tj
0.2 0.2 0.2 rg
280 567 Td
( | ) Tj
0.05 0.45 0.85 rg
290 567 Td
(Live: fake-news-analysiz.vercel.app) Tj
ET

BT
/F2 8 Tf
0.15 0.15 0.15 rg
45 555 Td
(\\(bullet\\) Developed a React-based Fake News Analysis System that analyzes news articles in real time and generates authenticity) Tj
45 545 Td
(  scores using AI APIs.) Tj
45 534 Td
(\\(bullet\\) Built an interactive frontend using React and TypeScript, providing users with real-time news credibility predictions.) Tj
45 523 Td
(\\(bullet\\) Integrated external AI APIs to analyze news content and generate authenticity scores with detailed insights.) Tj
45 512 Td
(\\(bullet\\) Designed a responsive and user-friendly interface using Vite, HTML, and CSS to enhance accessibility and performance.) Tj
ET

BT
/F1 9 Tf
0.1 0.1 0.1 rg
40 496 Td
(Inventory Management System) Tj
ET

BT
/F3 8.5 Tf
0.2 0.2 0.2 rg
525 496 Td
(2025) Tj
ET

BT
/F3 8 Tf
0.25 0.25 0.25 rg
40 485 Td
(React, JavaScript, Firebase Firestore, HTML, CSS) Tj
ET

BT
/F2 8 Tf
0.05 0.45 0.85 rg
40 474 Td
(GitHub Repository: github.com/laksh76777/Ai-inventory-system) Tj
ET

BT
/F2 8 Tf
0.15 0.15 0.15 rg
45 462 Td
(\\(bullet\\) Developed an inventory management system to automate product tracking and stock management.) Tj
45 451 Td
(\\(bullet\\) Implemented real-time inventory updates using Firebase, ensuring synchronized data across users.) Tj
45 440 Td
(\\(bullet\\) Added low-stock alerts and inventory monitoring features to improve stock availability and operational efficiency.) Tj
45 429 Td
(\\(bullet\\) Designed responsive dashboards for managing products, inventory status, and stock updates.) Tj
ET

% SECTION: TECHNICAL SKILLS
0.2 0.2 0.2 RG
0.8 w
40 417 m 555 417 l S

BT
/F1 10.5 Tf
0.1 0.1 0.1 rg
40 405 Td
(TECHNICAL SKILLS) Tj
ET

BT
/F1 8.2 Tf
0.1 0.1 0.1 rg
40 392 Td
(Programming Languages:) Tj
ET
BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
155 392 Td
(Java, C, Python, JavaScript, TypeScript) Tj
ET

BT
/F1 8.2 Tf
0.1 0.1 0.1 rg
40 380 Td
(Frontend:) Tj
ET
BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
155 380 Td
(HTML, CSS, Tailwind CSS, React.js, Next.js, Vite) Tj
ET

BT
/F1 8.2 Tf
0.1 0.1 0.1 rg
40 368 Td
(Backend:) Tj
ET
BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
155 368 Td
(Node.js, Express.js, Flask, REST APIs, API Integration) Tj
ET

BT
/F1 8.2 Tf
0.1 0.1 0.1 rg
40 356 Td
(Databases:) Tj
ET
BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
155 356 Td
(SQL, Firebase Firestore) Tj
ET

BT
/F1 8.2 Tf
0.1 0.1 0.1 rg
40 344 Td
(Tools & Platforms:) Tj
ET
BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
155 344 Td
(Git, GitHub, VS Code, Firebase, Vercel, Netlify, Canva, Figma) Tj
ET

BT
/F1 8.2 Tf
0.1 0.1 0.1 rg
40 332 Td
(Core CS:) Tj
ET
BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
155 332 Td
(Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks) Tj
ET

BT
/F1 8.2 Tf
0.1 0.1 0.1 rg
40 320 Td
(Soft Skills:) Tj
ET
BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
155 320 Td
(Problem Solving, Team Collaboration, Communication, Agile Methodology) Tj
ET

% SECTION: CERTIFICATIONS
0.2 0.2 0.2 RG
0.8 w
40 308 m 555 308 l S

BT
/F1 10.5 Tf
0.1 0.1 0.1 rg
40 296 Td
(CERTIFICATIONS) Tj
ET

BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
45 283 Td
(\\(bullet\\) GeeksforGeeks GFG 160 Certification - Certificate Link [media.geeksforgeeks.org]) Tj
ET

BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
45 270 Td
(\\(bullet\\) Machine Learning Specialization \\(Stanford University & DeepLearning.AI\\) - Certificate Link [coursera.org]) Tj
ET

% SECTION: ACHIEVEMENTS
0.2 0.2 0.2 RG
0.8 w
40 258 m 555 258 l S

BT
/F1 10.5 Tf
0.1 0.1 0.1 rg
40 246 Td
(ACHIEVEMENTS) Tj
ET

BT
/F2 8.2 Tf
0.15 0.15 0.15 rg
45 233 Td
(\\(bullet\\) Solved 100+ Data Structures and Algorithms problems across LeetCode \\(laksh076\\) and Codolio \\(Laksh14\\).) Tj
45 220 Td
(\\(bullet\\) Developed and deployed real-world projects including Fake News Analysis System and Inventory Management System.) Tj
45 207 Td
(\\(bullet\\) Maintained a CGPA of 8.24 / 10 in Computer Science and Engineering at JSSATE Bengaluru.) Tj
ET

endstream
endobj
8 0 obj
4290
endobj
xref
0 9
0000000000 65535 f 
0000000015 00000 n 
0000000068 00000 n 
0000000125 00000 n 
0000000288 00000 n 
0000000373 00000 n 
0000000453 00000 n 
0000000541 00000 n 
0000004890 00000 n 
trailer
<<
  /Size 9
  /Root 1 0 R
>>
startxref
4915
%%EOF`;

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'Laksh_Suthar_Resume.pdf'), content);
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), content);
  console.log('Regenerated official resume PDF successfully.');
}

generateExactResumePdf();
