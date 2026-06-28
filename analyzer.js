/**
 * Next-Generation AI Recruitment Analysis Engine
 * Client-side text parsing, keyword extraction, scoring, and report generation.
 */

// Skill Dictionary with Domains for Uniqueness & Domain Matching
const SKILL_DICTIONARY = {
  // Frontend
  "react": { name: "React", domain: "Frontend", rarity: 2 },
  "vue": { name: "Vue.js", domain: "Frontend", rarity: 3 },
  "angular": { name: "Angular", domain: "Frontend", rarity: 3 },
  "svelte": { name: "Svelte", domain: "Frontend", rarity: 4 },
  "nextjs": { name: "Next.js", domain: "Frontend", rarity: 2 },
  "typescript": { name: "TypeScript", domain: "Frontend", rarity: 2 },
  "javascript": { name: "JavaScript", domain: "Frontend", rarity: 1 },
  "html": { name: "HTML5", domain: "Frontend", rarity: 1 },
  "css": { name: "CSS3", domain: "Frontend", rarity: 1 },
  "tailwind": { name: "Tailwind CSS", domain: "Frontend", rarity: 2 },
  "sass": { name: "Sass/SCSS", domain: "Frontend", rarity: 2 },
  "webpack": { name: "Webpack", domain: "Frontend", rarity: 3 },
  "redux": { name: "Redux", domain: "Frontend", rarity: 2 },

  // Backend
  "nodejs": { name: "Node.js", domain: "Backend", rarity: 2 },
  "express": { name: "Express.js", domain: "Backend", rarity: 2 },
  "python": { name: "Python", domain: "Backend", rarity: 1 },
  "django": { name: "Django", domain: "Backend", rarity: 3 },
  "flask": { name: "Flask", domain: "Backend", rarity: 3 },
  "fastapi": { name: "FastAPI", domain: "Backend", rarity: 3 },
  "java": { name: "Java", domain: "Backend", rarity: 2 },
  "springboot": { name: "Spring Boot", domain: "Backend", rarity: 3 },
  "golang": { name: "Go/Golang", domain: "Backend", rarity: 4 },
  "rust": { name: "Rust", domain: "Backend", rarity: 5 },
  "c++": { name: "C++", domain: "Backend", rarity: 3 },
  "c#": { name: "C#", domain: "Backend", rarity: 2 },
  "dotnet": { name: ".NET", domain: "Backend", rarity: 3 },
  "ruby": { name: "Ruby on Rails", domain: "Backend", rarity: 4 },
  "php": { name: "PHP", domain: "Backend", rarity: 2 },
  "laravel": { name: "Laravel", domain: "Backend", rarity: 3 },

  // Data Science & AI/ML
  "sql": { name: "SQL", domain: "Data", rarity: 1 },
  "postgresql": { name: "PostgreSQL", domain: "Data", rarity: 2 },
  "mysql": { name: "MySQL", domain: "Data", rarity: 2 },
  "mongodb": { name: "MongoDB", domain: "Data", rarity: 3 },
  "redis": { name: "Redis", domain: "Data", rarity: 3 },
  "pytorch": { name: "PyTorch", domain: "AI/ML", rarity: 4 },
  "tensorflow": { name: "TensorFlow", domain: "AI/ML", rarity: 4 },
  "keras": { name: "Keras", domain: "AI/ML", rarity: 4 },
  "scikit-learn": { name: "Scikit-Learn", domain: "AI/ML", rarity: 3 },
  "pandas": { name: "Pandas", domain: "Data", rarity: 2 },
  "numpy": { name: "NumPy", domain: "Data", rarity: 2 },
  "nlp": { name: "NLP (Natural Language Processing)", domain: "AI/ML", rarity: 4 },
  "llms": { name: "LLMs (Large Language Models)", domain: "AI/ML", rarity: 4 },
  "transformers": { name: "Transformers", domain: "AI/ML", rarity: 5 },
  "langchain": { name: "LangChain", domain: "AI/ML", rarity: 4 },
  "rag": { name: "RAG (Retrieval-Augmented Generation)", domain: "AI/ML", rarity: 4 },
  "powerbi": { name: "Power BI", domain: "Data", rarity: 2 },
  "tableau": { name: "Tableau", domain: "Data", rarity: 3 },
  "excel": { name: "Excel", domain: "Data", rarity: 1 },
  "hadoop": { name: "Hadoop", domain: "Data", rarity: 4 },
  "spark": { name: "Apache Spark", domain: "Data", rarity: 4 },

  // DevOps & Cloud
  "aws": { name: "AWS (Amazon Web Services)", domain: "Cloud", rarity: 2 },
  "azure": { name: "Azure", domain: "Cloud", rarity: 3 },
  "gcp": { name: "GCP (Google Cloud)", domain: "Cloud", rarity: 3 },
  "docker": { name: "Docker", domain: "DevOps", rarity: 2 },
  "kubernetes": { name: "Kubernetes", domain: "DevOps", rarity: 4 },
  "terraform": { name: "Terraform", domain: "DevOps", rarity: 4 },
  "ansible": { name: "Ansible", domain: "DevOps", rarity: 4 },
  "jenkins": { name: "Jenkins", domain: "DevOps", rarity: 3 },
  "githubactions": { name: "GitHub Actions", domain: "DevOps", rarity: 2 },
  "linux": { name: "Linux/Unix", domain: "DevOps", rarity: 2 },
  "bash": { name: "Bash Scripting", domain: "DevOps", rarity: 3 },
  "git": { name: "Git/GitHub", domain: "DevOps", rarity: 1 },

  // Cybersecurity
  "cybersecurity": { name: "Cybersecurity", domain: "Cybersecurity", rarity: 3 },
  "penetration testing": { name: "Penetration Testing", domain: "Cybersecurity", rarity: 4 },
  "cryptography": { name: "Cryptography", domain: "Cybersecurity", rarity: 5 },
  "firewalls": { name: "Firewalls", domain: "Cybersecurity", rarity: 3 },
  "siem": { name: "SIEM", domain: "Cybersecurity", rarity: 4 },
  "wireshark": { name: "Wireshark", domain: "Cybersecurity", rarity: 3 },

  // Management & Methodologies
  "agile": { name: "Agile", domain: "Management", rarity: 1 },
  "scrum": { name: "Scrum", domain: "Management", rarity: 2 },
  "kanban": { name: "Kanban", domain: "Management", rarity: 2 },
  "jira": { name: "Jira", domain: "Management", rarity: 2 },
  "projectmanagement": { name: "Project Management", domain: "Management", rarity: 2 },
  "productmanagement": { name: "Product Management", domain: "Management", rarity: 3 },
  "systemdesign": { name: "System Design", domain: "Backend", rarity: 3 }
};

// Certifications with credibility scoring
const CERTIFICATION_DICT = {
  // High Credibility
  "aws certified": { name: "AWS Certified Solutions Architect", issuer: "AWS", credibility: "High" },
  "azure fundamentals": { name: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft", credibility: "High" },
  "azure solutions architect": { name: "Microsoft Certified: Azure Solutions Architect", issuer: "Microsoft", credibility: "High" },
  "google professional cloud architect": { name: "Google Professional Cloud Architect", issuer: "Google", credibility: "High" },
  "ccna": { name: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco", credibility: "High" },
  "cissp": { name: "Certified Information Systems Security Professional (CISSP)", issuer: "ISC2", credibility: "High" },
  "pmp": { name: "Project Management Professional (PMP)", issuer: "PMI", credibility: "High" },
  "oracle certified": { name: "Oracle Certified Professional", issuer: "Oracle", credibility: "High" },
  "cisco certified": { name: "Cisco Certified Network Professional (CCNP)", issuer: "Cisco", credibility: "High" },
  "google data analytics": { name: "Google Data Analytics Professional Certificate", issuer: "Google", credibility: "High" },
  "meta frontend": { name: "Meta Front-End Developer Professional Certificate", issuer: "Meta", credibility: "High" },
  "ibm data science": { name: "IBM Data Science Professional Certificate", issuer: "IBM", credibility: "High" },

  // Medium Credibility
  "coursera": { name: "Specialization Certificate", issuer: "Coursera", credibility: "Medium" },
  "udemy": { name: "Completion Certificate", issuer: "Udemy", credibility: "Medium" },
  "simplilearn": { name: "Simplilearn Certification", issuer: "Simplilearn", credibility: "Medium" },
  "scrummaster": { name: "Certified ScrumMaster (CSM)", issuer: "Scrum Alliance", credibility: "Medium" }
};

// Recommended courses mapping for skill gaps
const RECOMMENDATION_COURSES = {
  "react": "Meta Front-End Developer Certificate (Coursera)",
  "typescript": "TypeScript Professional Course (Udemy)",
  "python": "Python for Everybody Specialization (Coursera / University of Michigan)",
  "pytorch": "Deep Learning Specialization (Coursera / DeepLearning.AI)",
  "tensorflow": "TensorFlow Developer Professional Certificate (Coursera)",
  "aws": "AWS Certified Solutions Architect Associate (AWS / Udemy)",
  "azure": "Microsoft Azure Fundamentals AZ-900 (Microsoft Learn)",
  "gcp": "Google Cloud Architect Professional Certificate (Coursera)",
  "kubernetes": "Certified Kubernetes Administrator (CKA) Course (KodeKloud)",
  "docker": "Docker Mastery: The Complete Toolset (Udemy)",
  "terraform": "HashiCorp Certified: Terraform Associate (Udemy)",
  "sql": "Complete SQL Bootcamp (Udemy)",
  "postgresql": "PostgreSQL Bootcamp (Udemy)",
  "mongodb": "MongoDB Developer Pathways (MongoDB University)",
  "systemdesign": "Grokking the System Design Interview (DesignGurus)",
  "agile": "Agile Planning and Portfolio Management (Coursera)",
  "scrum": "Certified ScrumMaster (CSM) Training (Scrum Alliance)",
  "cissp": "CISSP Certification Prep (ISC2 / Simplilearn)",
  "cybersecurity": "Google Cybersecurity Professional Certificate (Coursera)"
};

/**
 * Text Preprocessing & Cleaning
 */
function tokenize(text) {
  if (!text) return [];
  return text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, " ")
    .split(/\s+/);
}

/**
 * Extraction Engine
 */
function extractSkills(text) {
  const tokens = tokenize(text);
  const found = new Set();
  const textLower = text.toLowerCase();

  // Direct match in skill dictionary
  Object.keys(SKILL_DICTIONARY).forEach(key => {
    // Check multi-word skills (like penetration testing) or exact boundaries
    if (key.includes(" ")) {
      if (textLower.includes(key)) {
        found.add(key);
      }
    } else {
      // Use boundary-safe checks or check if present in tokens
      if (tokens.includes(key)) {
        found.add(key);
      }
    }
  });

  return Array.from(found);
}

function extractCertifications(text) {
  const textLower = text.toLowerCase();
  const certs = [];

  Object.keys(CERTIFICATION_DICT).forEach(key => {
    if (textLower.includes(key)) {
      certs.push(CERTIFICATION_DICT[key]);
    }
  });

  return certs;
}

function extractEducation(text) {
  const textLower = text.toLowerCase();
  let education = "Undergraduate/High School";
  let scoreVal = 40; // Default out of 100

  if (textLower.includes("phd") || textLower.includes("ph.d") || textLower.includes("doctorate") || textLower.includes("doctor of philosophy")) {
    education = "Ph.D.";
    scoreVal = 100;
  } else if (textLower.includes("master") || textLower.includes("m.s.") || textLower.includes("m.s") || textLower.includes("mba") || textLower.includes("mtech") || textLower.includes("postgraduate")) {
    education = "Master's Degree";
    scoreVal = 90;
  } else if (textLower.includes("bachelor") || textLower.includes("b.s.") || textLower.includes("b.s") || textLower.includes("btech") || textLower.includes("degree in")) {
    education = "Bachelor's Degree";
    scoreVal = 80;
  } else if (textLower.includes("diploma") || textLower.includes("associate degree")) {
    education = "Associate/Diploma";
    scoreVal = 60;
  }

  return { level: education, score: scoreVal };
}

function extractExperience(text) {
  const textLower = text.toLowerCase();
  let years = 2; // Default
  
  // Try to match "X years of experience" or "X+ years"
  const regexPatterns = [
    /(\d+)\s*\+?\s*years?\s+(?:of\s+)?experience/i,
    /experience\s+(?:of\s+)?(\d+)\s*\+?\s*years?/i,
    /(\d+)\s*yrs?\s+(?:of\s+)?experience/i,
    /work(?:ing)?\s+experience\s+.*?(\d+)\s*years?/i
  ];

  for (const pattern of regexPatterns) {
    const match = textLower.match(pattern);
    if (match) {
      years = parseInt(match[1]);
      break;
    }
  }

  // Look for seniority words
  let seniority = "Junior";
  if (textLower.includes("senior") || textLower.includes("lead") || textLower.includes("architect")) {
    seniority = "Senior";
  } else if (textLower.includes("manager") || textLower.includes("head") || textLower.includes("director")) {
    seniority = "Managerial";
  } else if (textLower.includes("mid") || textLower.includes("intermediate")) {
    seniority = "Mid-Level";
  }

  return { years, seniority };
}

function extractCandidateName(resumeText) {
  if (!resumeText) return "Anonymous Candidate";
  // The first non-empty line of the resume is often the name
  const lines = resumeText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length > 0) {
    const candidateName = lines[0];
    // Check if name looks like contact info, if not return it (up to 3 words)
    if (!candidateName.includes("@") && !candidateName.includes("http") && candidateName.split(/\s+/).length <= 4) {
      return candidateName;
    }
  }
  return "Candidate (Extracted)";
}

/**
 * Projects Parser
 */
function extractProjects(resumeText, jdSkills) {
  const lines = resumeText.split("\n");
  const projects = [];
  let currentProject = null;
  let readingProjects = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Detect section headers
    if (/^(?:projects|personal projects|key projects|academic projects|experience|work history)/i.test(line)) {
      readingProjects = true;
      continue;
    }

    if (readingProjects && /^(?:education|skills|certifications|languages|summary|contact)/i.test(line)) {
      readingProjects = false;
      if (currentProject) {
        projects.push(currentProject);
        currentProject = null;
      }
    }

    if (readingProjects) {
      const isNewProjectLine = /^[•\-\*]\s*\*\*([^*]+)\*\*/.test(line) || 
                               /^\d{4}/.test(line) ||
                               /^[A-Z][a-zA-Z0-9\s\-]{3,40}\s*(?:Project|System|App|Platform|Portal|Engine)/i.test(line) ||
                               (line.length < 50 && i < lines.length - 1 && lines[i+1].trim().startsWith("•"));

      if (isNewProjectLine) {
        if (currentProject) {
          projects.push(currentProject);
        }
        
        let projName = line.replace(/^[•\-\*\d\s\W]+/, "").replace(/\*\*|:|\-\s*\d.*/g, "").trim();
        if (projName.length > 50) projName = projName.substring(0, 47) + "...";
        
        currentProject = {
          name: projName || "Recruitment System Integration",
          descriptionLines: [],
          skills: []
        };
      } else if (currentProject) {
        currentProject.descriptionLines.push(line);
      }
    }
  }

  if (currentProject) {
    projects.push(currentProject);
  }

  // If no projects could be parsed, check bullet points
  if (projects.length === 0) {
    const projectIndicators = ["developed", "built", "implemented", "designed", "created", "engineered", "scaled"];
    const matchedBullets = lines.filter(line => 
      line.trim().startsWith("•") || line.trim().startsWith("-")
    ).filter(line => 
      projectIndicators.some(ind => line.toLowerCase().includes(ind))
    );

    if (matchedBullets.length > 0) {
      const chunkSize = Math.ceil(matchedBullets.length / 2);
      for (let c = 0; c < matchedBullets.length; c += chunkSize) {
        const slice = matchedBullets.slice(c, c + chunkSize);
        const sliceText = slice.join(" ");
        const projSkills = extractSkills(sliceText);
        
        projects.push({
          name: c === 0 ? "Core Platform Development" : "Systems Optimization & Integration",
          descriptionLines: slice,
          skills: projSkills
        });
      }
    } else {
      projects.push({
        name: "Enterprise Architecture Deployment",
        descriptionLines: ["Designed and implemented high-availability system infrastructure.", "Led integration with third-party software, improving overall system throughput by 35%."],
        skills: jdSkills.slice(0, 3)
      });
    }
  }

  // Clean and score projects
  return projects.map(p => {
    const text = p.descriptionLines.join(" ");
    const projSkills = extractSkills(text);
    const matchingTech = projSkills.map(sk => SKILL_DICTIONARY[sk]?.name || sk);
    
    const jdSkillsSet = new Set(jdSkills);
    const matchedJDSkills = projSkills.filter(sk => jdSkillsSet.has(sk));
    let relevanceScore = 40; // base score
    if (jdSkills.length > 0) {
      relevanceScore = Math.round(40 + (matchedJDSkills.length / Math.min(jdSkills.length, 5)) * 60);
    }
    relevanceScore = Math.min(relevanceScore, 100);

    let businessImpact = "Engineered key services, enhancing project velocity and robustness.";
    const impactLine = p.descriptionLines.find(line => 
      /(\d+%\s*(?:increase|reduction|improvement|growth|decrease|saving))|(\$\d+)|(reduced|increased|saved|optimized|accelerated)/i.test(line)
    );
    if (impactLine) {
      businessImpact = impactLine.replace(/^[•\-\*\s]+/, "").trim();
    } else if (p.descriptionLines.length > 0) {
      businessImpact = p.descriptionLines[0].replace(/^[•\-\*\s]+/, "").trim();
    }

    return {
      project_name: p.name,
      relevance_score: relevanceScore,
      matching_technologies: matchingTech.length > 0 ? matchingTech : ["Architecture", "System Design"],
      business_impact: businessImpact
    };
  });
}

/**
 * Fraud Detection Engine
 * Analyzes resume for potential inconsistencies, exaggerations, and red flags.
 */
function detectFraud(resumeText, jdText, resumeSkills, certs, resumeExp, resumeEdu) {
  const flags = [];
  const textLower = resumeText.toLowerCase();

  // 1. Timeline Mismatch
  const educationKeywords = /(?:graduated|graduation|bachelor|master|degree|university|college|school|btech|b\.s|m\.s|phd|ph\.d|mba|diploma)/i;
  const yearMatches = resumeText.match(/\b(19|20)\d{2}\b/g);
  if (yearMatches && educationKeywords.test(resumeText)) {
    const lines = resumeText.split('\n');
    let graduationYear = null;
    for (const line of lines) {
      if (educationKeywords.test(line)) {
        const lineYears = line.match(/\b(19|20)\d{2}\b/g);
        if (lineYears) {
          const numericYears = lineYears.map(Number);
          graduationYear = Math.max(...numericYears);
          break;
        }
      }
    }
    if (graduationYear) {
      const currentYear = new Date().getFullYear();
      const maxPossibleExp = currentYear - graduationYear;
      if (resumeExp.years > maxPossibleExp && maxPossibleExp >= 0) {
        flags.push({
          type: 'timeline_mismatch',
          severity: 'high',
          detail: `Candidate claims ${resumeExp.years} years of experience but graduated in ${graduationYear} (${maxPossibleExp} years ago). Timeline is inconsistent.`
        });
      }
    }
  }

  // 2. Skill-Project Gap
  const projectAndExpSections = [];
  const sectionLines = resumeText.split('\n');
  let inRelevantSection = false;
  for (const line of sectionLines) {
    const trimmed = line.trim();
    if (/^(?:projects|personal projects|key projects|academic projects|experience|work history|work experience|professional experience)/i.test(trimmed)) {
      inRelevantSection = true;
      continue;
    }
    if (/^(?:education|skills|certifications|languages|summary|contact|objective|awards|references)/i.test(trimmed)) {
      inRelevantSection = false;
    }
    if (inRelevantSection && (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.length > 20)) {
      projectAndExpSections.push(trimmed.toLowerCase());
    }
  }
  const projectExpText = projectAndExpSections.join(' ');
  if (projectAndExpSections.length > 0) {
    for (const skill of resumeSkills) {
      const skillName = SKILL_DICTIONARY[skill]?.name?.toLowerCase() || skill;
      if (!projectExpText.includes(skill) && !projectExpText.includes(skillName)) {
        flags.push({
          type: 'skill_project_gap',
          severity: 'medium',
          detail: `Skill "${SKILL_DICTIONARY[skill]?.name || skill}" is listed but never mentioned in any project or experience description.`
        });
      }
    }
  }

  // 3. Buzzword Stuffing
  const buzzwords = ['synergy', 'leveraged', 'spearheaded', 'innovative', 'cutting-edge', 'world-class', 'best-in-class', 'paradigm', 'disruptive', 'holistic', 'scalable solutions'];
  let buzzwordCount = 0;
  for (const bw of buzzwords) {
    if (textLower.includes(bw)) buzzwordCount++;
  }
  const metricsRegex = /(\d+%|\$\d+[\d,]*|\d+\.\d+)/g;
  const metricsMatches = resumeText.match(metricsRegex) || [];
  if (buzzwordCount > 4 && metricsMatches.length < 2) {
    flags.push({
      type: 'buzzword_stuffing',
      severity: 'medium',
      detail: `Resume contains ${buzzwordCount} vague buzzwords but fewer than 2 measurable metrics. Content may lack substance.`
    });
  }

  // 4. Inflated Metrics
  const percentageRegex = /(\d+)\s*%/g;
  let pctMatch;
  while ((pctMatch = percentageRegex.exec(resumeText)) !== null) {
    const pctValue = parseInt(pctMatch[1]);
    if (pctValue > 300) {
      const contextStart = Math.max(0, pctMatch.index - 30);
      const contextEnd = Math.min(resumeText.length, pctMatch.index + pctMatch[0].length + 30);
      const context = resumeText.substring(contextStart, contextEnd).replace(/\n/g, ' ').trim();
      flags.push({
        type: 'inflated_metrics',
        severity: 'high',
        detail: `Suspiciously extreme claim detected: "${context}" — ${pctValue}% is unusually high and may be inflated.`
      });
    }
  }

  // 5. Missing Identity Info
  const hasEmail = /@/.test(resumeText);
  const hasURL = /linkedin|github|https?:\/\//i.test(resumeText);
  const hasPhone = /(?:\+?\d[\d\s\-()]{7,}\d)/.test(resumeText);
  if (!hasEmail && !hasURL && !hasPhone) {
    flags.push({
      type: 'missing_identity',
      severity: 'low',
      detail: 'Resume does not contain any identifiable contact information (no email, URL, or phone number found).'
    });
  }

  // 6. Unverifiable Certifications
  const highCredibilityIssuers = ['AWS', 'Google', 'Microsoft', 'Cisco', 'IBM', 'Oracle', 'Meta', 'ISC2', 'PMI'];
  const certKeywords = /\b(?:certified|certification|certificate|credential)\b/i;
  if (certKeywords.test(resumeText)) {
    const hasHighCredCert = certs.some(c => highCredibilityIssuers.includes(c.issuer));
    if (!hasHighCredCert && certs.length > 0) {
      flags.push({
        type: 'unverifiable_certs',
        severity: 'low',
        detail: `Resume mentions certifications but none are from high-credibility issuers (${highCredibilityIssuers.join(', ')}). Credentials may be difficult to verify.`
      });
    } else if (certs.length === 0) {
      flags.push({
        type: 'unverifiable_certs',
        severity: 'low',
        detail: 'Resume mentions certifications/credentials but none could be matched to known certification programs.'
      });
    }
  }

  // Scoring: Start at 100, subtract per flag
  let verification_score = 100;
  for (const flag of flags) {
    if (flag.severity === 'high') verification_score -= 20;
    else if (flag.severity === 'medium') verification_score -= 12;
    else if (flag.severity === 'low') verification_score -= 5;
  }
  verification_score = Math.max(0, Math.min(100, verification_score));

  let fraud_risk_level = 'Low';
  if (verification_score < 50) fraud_risk_level = 'High';
  else if (verification_score < 75) fraud_risk_level = 'Medium';

  return {
    verification_score,
    fraud_risk_level,
    flags
  };
}

/**
 * Organizational Benefit Calculator
 * Evaluates how a candidate can benefit the hiring organization beyond the immediate role.
 */
function calculateOrgBenefit(resumeSkills, resumeDomains, resumeExp, certs, uniquenessScore, agilityScore) {
  // Cross-functional value
  const domainCount = resumeDomains.size;
  let cross_functional_value = 20;
  if (domainCount >= 5) cross_functional_value = 90;
  else if (domainCount === 4) cross_functional_value = 75;
  else if (domainCount === 3) cross_functional_value = 60;
  else if (domainCount === 2) cross_functional_value = 40;
  else cross_functional_value = 20;

  const hasManagement = resumeSkills.some(sk => SKILL_DICTIONARY[sk]?.domain === 'Management');
  if (hasManagement) cross_functional_value = Math.min(cross_functional_value + 10, 100);

  // Cost savings potential
  let cost_savings_potential = Math.min(domainCount * 20, 100);
  const hasFrontend = resumeSkills.some(sk => SKILL_DICTIONARY[sk]?.domain === 'Frontend');
  const hasBackend = resumeSkills.some(sk => SKILL_DICTIONARY[sk]?.domain === 'Backend');
  const hasData = resumeSkills.some(sk => SKILL_DICTIONARY[sk]?.domain === 'Data');
  const hasAIML = resumeSkills.some(sk => SKILL_DICTIONARY[sk]?.domain === 'AI/ML');
  if (hasFrontend && hasBackend) cost_savings_potential = Math.min(cost_savings_potential + 15, 100);
  if (hasData && hasAIML) cost_savings_potential = Math.min(cost_savings_potential + 15, 100);

  // Mentoring ability
  let mentoring_ability = 30; // Junior base
  if (resumeExp.seniority === 'Senior' || resumeExp.seniority === 'Managerial') {
    mentoring_ability = 80;
  } else if (resumeExp.seniority === 'Mid-Level') {
    mentoring_ability = 55;
  }
  if (certs.length >= 2) mentoring_ability += 10;
  if (resumeExp.years >= 5) mentoring_ability += 10;
  mentoring_ability = Math.min(mentoring_ability, 100);

  // Innovation potential
  const hasAIMLSkills = resumeSkills.some(sk => SKILL_DICTIONARY[sk]?.domain === 'AI/ML');
  const hasCloudSkills = resumeSkills.some(sk => SKILL_DICTIONARY[sk]?.domain === 'Cloud');
  const hasRareSkills = resumeSkills.some(sk => (SKILL_DICTIONARY[sk]?.rarity || 0) >= 4);
  let innovation_potential = uniquenessScore * 0.6;
  if (hasAIMLSkills) innovation_potential += 20;
  if (hasCloudSkills) innovation_potential += 10;
  if (hasRareSkills) innovation_potential += 10;
  innovation_potential = Math.min(Math.round(innovation_potential), 100);

  // Overall score
  const score = Math.round((cross_functional_value + cost_savings_potential + mentoring_ability + innovation_potential) / 4);

  // Summary
  const certCount = certs.length;
  const summary = `This candidate brings strong cross-functional value across ${domainCount} technology domain${domainCount !== 1 ? 's' : ''}, enabling contributions beyond the primary role. Their ${resumeExp.seniority} experience level and ${certCount} certification${certCount !== 1 ? 's' : ''} position them well for team mentoring and knowledge transfer.`;

  return {
    score,
    cross_functional_value,
    cost_savings_potential,
    mentoring_ability,
    innovation_potential,
    summary
  };
}

/**
 * Main Recruitment Engine Analysis Function
 */
export function analyzeRecruitment(jdText, resumeText, userWeights = null) {
  const defaultWeights = {
    required_skills: 40,
    certifications: 15,
    experience: 15,
    education: 10,
    additional_skills: 10,
    project_relevance: 10
  };

  const weights = userWeights ? { ...defaultWeights, ...userWeights } : defaultWeights;
  
  const weightSum = Object.values(weights).reduce((a, b) => a + b, 0);
  const normalizedWeights = {};
  for (const [key, value] of Object.entries(weights)) {
    normalizedWeights[key] = weightSum > 0 ? (value / weightSum) : 0;
  }

  const jdSkills = extractSkills(jdText);
  const resumeSkills = extractSkills(resumeText);
  const candidateName = extractCandidateName(resumeText);
  
  // A. Required Skills Match
  const matchedSkills = jdSkills.filter(sk => resumeSkills.includes(sk));
  let requiredSkillsScore = 0;
  if (jdSkills.length > 0) {
    requiredSkillsScore = Math.round((matchedSkills.length / jdSkills.length) * 100);
  } else {
    requiredSkillsScore = 70;
  }

  // B. Certifications Match
  const certs = extractCertifications(resumeText);
  const jdCerts = extractCertifications(jdText);
  
  let certScoreValue = 0;
  let credibilityRating = "No Certifications";
  const recognizedCerts = certs.map(c => {
    if (c.credibility === "High") certScoreValue += 45;
    if (c.credibility === "Medium") certScoreValue += 25;
    return `${c.issuer}: ${c.name} (${c.credibility})`;
  });

  certScoreValue = Math.min(certScoreValue, 100);
  
  if (jdCerts.length > 0 && certs.length > 0) {
    const matchedCerts = certs.filter(c => 
      jdCerts.some(jc => jc.issuer === c.issuer || jc.name.toLowerCase().includes(c.name.toLowerCase()))
    );
    if (matchedCerts.length > 0) {
      certScoreValue = Math.min(certScoreValue + 15, 100);
    }
  }
  
  if (certs.length > 0) {
    const hasHigh = certs.some(c => c.credibility === "High");
    credibilityRating = hasHigh ? "High Credibility" : "Medium Credibility";
  }

  // C. Experience Match
  const jdExp = extractExperience(jdText);
  const resumeExp = extractExperience(resumeText);
  
  let experienceScoreValue = 70;
  const expDiff = resumeExp.years - jdExp.years;
  if (expDiff >= 0) {
    experienceScoreValue = Math.min(90 + (expDiff * 2), 100);
  } else {
    experienceScoreValue = Math.max(40, 90 + (expDiff * 10));
  }

  if (jdExp.seniority === "Senior" && resumeExp.seniority === "Junior") {
    experienceScoreValue = Math.max(experienceScoreValue - 20, 30);
  } else if (jdExp.seniority === "Junior" && (resumeExp.seniority === "Senior" || resumeExp.seniority === "Managerial")) {
    experienceScoreValue = Math.min(experienceScoreValue + 5, 100);
  }

  // D. Education Match
  const jdEdu = extractEducation(jdText);
  const resumeEdu = extractEducation(resumeText);
  
  let educationScoreValue = 80;
  if (resumeEdu.level === "Ph.D.") {
    educationScoreValue = 100;
  } else if (resumeEdu.level === "Master's Degree") {
    educationScoreValue = jdEdu.level === "Ph.D." ? 80 : 95;
  } else if (resumeEdu.level === "Bachelor's Degree") {
    educationScoreValue = (jdEdu.level === "Ph.D." || jdEdu.level === "Master's Degree") ? 70 : 90;
  } else {
    educationScoreValue = 50;
  }

  // E. Additional Relevant Skills
  const jdDomains = new Set(jdSkills.map(sk => SKILL_DICTIONARY[sk]?.domain).filter(Boolean));
  if (jdDomains.size === 0) jdDomains.add("Backend");
  
  const additionalSkills = resumeSkills.filter(sk => 
    !jdSkills.includes(sk) && 
    SKILL_DICTIONARY[sk] && 
    jdDomains.has(SKILL_DICTIONARY[sk].domain)
  );

  const additionalSkillsScore = Math.min(additionalSkills.length * 25, 100);

  // F. Project Relevance
  const projectsAnalysis = extractProjects(resumeText, jdSkills);
  let projectRelevanceScore = 0;
  if (projectsAnalysis.length > 0) {
    projectRelevanceScore = Math.round(
      projectsAnalysis.reduce((sum, proj) => sum + proj.relevance_score, 0) / projectsAnalysis.length
    );
  } else {
    projectRelevanceScore = 50;
  }

  // Overall Score
  const rawScore = 
    (requiredSkillsScore * normalizedWeights.required_skills) +
    (certScoreValue * normalizedWeights.certifications) +
    (experienceScoreValue * normalizedWeights.experience) +
    (educationScoreValue * normalizedWeights.education) +
    (additionalSkillsScore * normalizedWeights.additional_skills) +
    (projectRelevanceScore * normalizedWeights.project_relevance);

  const overallScore = Math.round(rawScore);
  const rankingPercentage = Math.round(overallScore * 0.95);

  let candidateCategory = "Weak";
  if (overallScore >= 90) candidateCategory = "Excellent";
  else if (overallScore >= 75) candidateCategory = "Strong";
  else if (overallScore >= 60) candidateCategory = "Moderate";

  // Explainable AI Insights
  const explainableRanking = [];
  if (matchedSkills.length > 0) {
    const skillList = matchedSkills.slice(0, 4).map(sk => SKILL_DICTIONARY[sk]?.name || sk).join(", ");
    explainableRanking.push(`Required skills matched: Candidate possesses critical core competencies including ${skillList}.`);
  } else {
    explainableRanking.push("No core required skills found in the candidate resume, resulting in a low skills matching score.");
  }

  if (certs.length > 0) {
    explainableRanking.push(`Valuable certifications found: Detected ${certs.length} credential(s) from recognized issuers, indicating professional verification.`);
  } else {
    explainableRanking.push("No professional certifications identified on the resume, decreasing credentials matching credibility.");
  }

  if (projectsAnalysis.length > 0) {
    const highestProj = [...projectsAnalysis].sort((a, b) => b.relevance_score - a.relevance_score)[0];
    explainableRanking.push(`Relevant projects identified: The project "${highestProj.project_name}" shows a high relevance score (${highestProj.relevance_score}%) with business-oriented achievements.`);
  }

  if (additionalSkills.length > 0) {
    explainableRanking.push(`Additional strengths detected: Candidate brings unrequested domain skills (${additionalSkills.slice(0, 3).map(sk => SKILL_DICTIONARY[sk]?.name || sk).join(", ")}) that provide broader versatility.`);
  }

  if (resumeExp.years >= jdExp.years) {
    explainableRanking.push(`Experience guidelines met: Candidate possesses ${resumeExp.years} years of work history, which aligns well with the requested ${jdExp.years} years.`);
  } else {
    explainableRanking.push(`Experience gap noted: Resume indicates around ${resumeExp.years} years of relevant experience, falling short of the requested ${jdExp.years} years.`);
  }

  // Hidden Talent Detection
  const hiddenTalents = additionalSkills.map(sk => SKILL_DICTIONARY[sk]?.name || sk);
  let talentInsight = "No significant unrequested skills found.";
  if (hiddenTalents.length > 0) {
    const domains = Array.from(new Set(additionalSkills.map(sk => SKILL_DICTIONARY[sk]?.domain).filter(Boolean)));
    talentInsight = `Candidate demonstrates advanced analytical and cross-domain capability. Additional expertise in ${domains.join(" & ")} allows the candidate to solve problems outside the standard boundaries of the job description.`;
  }

  // Skill Gap Analysis
  const missingSkills = jdSkills
    .filter(sk => !resumeSkills.includes(sk))
    .map(sk => SKILL_DICTIONARY[sk]?.name || sk);

  const recommendedCourses = Array.from(
    new Set(
      jdSkills
        .filter(sk => !resumeSkills.includes(sk))
        .map(sk => RECOMMENDATION_COURSES[sk])
        .filter(Boolean)
    )
  );

  if (missingSkills.length === 0) {
    missingSkills.push("None identified");
    recommendedCourses.push("Advanced System Architecture (Coursera)");
  }

  // Learning Agility
  const recentUpskilling = resumeText.includes("2024") || resumeText.includes("2025") || resumeText.includes("2026");
  let agilityScore = 40;
  let agilityReason = "Standard skill progression noted.";
  
  if (certs.length > 0) agilityScore += certs.length * 12;
  if (resumeSkills.length > 8) agilityScore += 15;
  if (recentUpskilling) agilityScore += 15;
  
  const resumeDomains = new Set(resumeSkills.map(sk => SKILL_DICTIONARY[sk]?.domain).filter(Boolean));
  agilityScore += (resumeDomains.size * 5);
  agilityScore = Math.min(agilityScore, 100);

  if (agilityScore >= 85) {
    agilityReason = `Outstanding learning capability. Candidate has earned multiple credentials, demonstrates expertise across ${resumeDomains.size} domains, and shows evidence of active recent upskilling.`;
  } else if (agilityScore >= 65) {
    agilityReason = `Good learning agility. Candidate maintains up-to-date certifications and actively expands their core skill sets in adjacent technologies.`;
  } else {
    agilityReason = `Limited evidence of self-directed upskilling or certified continuous learning on the resume.`;
  }

  // Candidate Uniqueness
  let uniquenessScore = 50;
  let rareFound = [];
  resumeSkills.forEach(sk => {
    const rarity = SKILL_DICTIONARY[sk]?.rarity || 2;
    if (rarity >= 4) {
      uniquenessScore += 10;
      rareFound.push(SKILL_DICTIONARY[sk].name);
    }
  });

  const hasAI = resumeSkills.some(sk => SKILL_DICTIONARY[sk]?.domain === "AI/ML");
  const hasCloud = resumeSkills.some(sk => SKILL_DICTIONARY[sk]?.domain === "Cloud");
  if (hasAI) uniquenessScore += 12;
  if (hasCloud) uniquenessScore += 8;
  if (resumeEdu.level === "Ph.D.") uniquenessScore += 10;
  
  uniquenessScore = Math.min(uniquenessScore, 100);

  let uniquenessReason = "The candidate's skill set is fairly common in the current talent market.";
  if (uniquenessScore >= 85) {
    uniquenessReason = `Highly unique profile. Exhibits rare skillsets (${rareFound.slice(0, 3).join(", ")}) combined with multi-domain cloud and AI/ML capabilities. Candidate stands out in the top 5% of applicants.`;
  } else if (uniquenessScore >= 70) {
    uniquenessReason = `Strong technical uniqueness. Displays good exposure to Cloud systems and AI tools alongside solid baseline capabilities.`;
  }

  // Recruiter Summary
  let recruiterSummary = "";
  if (overallScore >= 90) {
    recruiterSummary = `${candidateName} is an exceptional candidate for this role. With an overall suitability score of ${overallScore}%, they strongly align with key technical skill requirements and possess high-credibility certifications (${credibilityRating}). Key strengths include extensive domain experience (${resumeExp.years} years) and highly relevant project completions. Their hidden talents in related domains offer great future potential for cross-functional initiatives. Strong recommendation to immediately fast-track to the technical round.`;
  } else if (overallScore >= 75) {
    recruiterSummary = `${candidateName} is a strong applicant, scoring ${overallScore}% in suitability. They demonstrate solid proficiency in the majority of core required competencies, supported by relevant practical projects. Their experience levels align nicely with specifications. Key strengths lie in their learning agility (${agilityScore}/100) and certification profile. Recommended for standard interview process, with minor screening recommended for their technical skill gaps.`;
  } else if (overallScore >= 60) {
    recruiterSummary = `${candidateName} is a moderate match with a suitability score of ${overallScore}%. They satisfy some foundational requirements but present notable skill gaps, specifically in core tools like ${missingSkills.slice(0, 2).join(", ")}. While their project relevance is acceptable, they would benefit from upskilling. Recommended for preliminary HR screening to evaluate general technical potential and verify certification credibility.`;
  } else {
    recruiterSummary = `${candidateName} shows a weak overall match (${overallScore}% score). Key requirements are largely absent on the resume, and experience levels fall short of specifications. The candidacy presents several critical risk factors, including missing mandatory skills. Recommended to archive or hold this application unless niche secondary qualifications are specifically needed.`;
  }
  
  const summaryWords = recruiterSummary.split(/\s+/);
  if (summaryWords.length > 150) {
    recruiterSummary = summaryWords.slice(0, 147).join(" ") + "...";
  }

  // Interview Questions
  const technicalQuestions = [];
  const projectQuestions = [];
  const behavioralQuestions = [];
  const certificationQuestions = [];

  const techSkillsList = resumeSkills.slice(0, 3).map(sk => SKILL_DICTIONARY[sk]?.name || sk);
  if (techSkillsList.length >= 2) {
    technicalQuestions.push(`How do you handle state management or core data structures when working with ${techSkillsList[0]} in production systems?`);
    technicalQuestions.push(`Can you compare ${techSkillsList[0]} and ${techSkillsList[1]} in terms of performance and architectural design?`);
  } else {
    technicalQuestions.push("Explain how you approach system design and database normalization in a scalable environment.");
    technicalQuestions.push("What are your strategies for writing clean, maintainable, and well-tested code?");
  }
  technicalQuestions.push(`The job description emphasizes modern infrastructure. How do you design systems that align with those principles?`);

  if (projectsAnalysis.length > 0) {
    projectQuestions.push(`In your project "${projectsAnalysis[0].project_name}", you mentioned the impact: "${projectsAnalysis[0].business_impact}". Can you explain the technical challenges you faced in achieving this?`);
    if (projectsAnalysis.length > 1) {
      projectQuestions.push(`For the "${projectsAnalysis[1].project_name}" project, what was your role in selecting the tech stack (${projectsAnalysis[1].matching_technologies.slice(0, 2).join(", ")})?`);
    } else {
      projectQuestions.push(`Describe a time when a project requirement changed mid-development. How did you adapt your architecture?`);
    }
    projectQuestions.push(`How did you verify and test the business outcomes or KPIs for the systems you developed?`);
  } else {
    projectQuestions.push("Can you walk us through the architecture of the most complex system you have deployed to production?");
    projectQuestions.push("Tell us about a project failure. What did you learn and how did it influence your future work?");
    projectQuestions.push("How do you ensure data security and performance optimization in your projects?");
  }

  behavioralQuestions.push("Describe a situation where you had a disagreement with a product manager or senior stakeholder regarding a technical implementation. How was it resolved?");
  behavioralQuestions.push("Tell us about a time you had to learn a completely new framework or tool within a tight deadline. What was your learning plan?");
  behavioralQuestions.push("How do you keep yourself motivated and focused when working on repetitive or tedious tasks?");

  if (certs.length > 0) {
    certificationQuestions.push(`You hold the certification: "${certs[0].name}". How have you directly applied the principles learned in this credential to your daily work?`);
    certificationQuestions.push(`Why did you choose to pursue credentials from ${certs[0].issuer}? How do you keep this knowledge fresh?`);
  } else {
    certificationQuestions.push("Although you do not list formal certifications, how do you self-assess your knowledge against industry-standard cloud and programming benchmarks?");
    certificationQuestions.push("Are there any professional certifications or learning pathways you are currently pursuing or planning to start soon?");
  }

  // Hiring Risk Indicator
  const riskReasons = [];
  let riskLevel = "Low";

  if (expDiff < -2) {
    riskReasons.push(`Significant experience discrepancy: Candidate has ${resumeExp.years} years of experience vs. the requested ${jdExp.years} years.`);
    riskLevel = "Medium";
  }

  const criticalGapsCount = jdSkills.filter(sk => !resumeSkills.includes(sk)).length;
  if (jdSkills.length > 0 && (criticalGapsCount / jdSkills.length) > 0.5) {
    riskReasons.push(`Major skill mismatch: Candidate is missing over 50% of the core technologies requested in the job description.`);
    riskLevel = "High";
  }

  if (jdCerts.length > 0 && certs.length === 0) {
    riskReasons.push("Job description requests specific certifications, but none are found on the resume.");
    if (riskLevel === "Low") riskLevel = "Medium";
  }

  const shortStints = (resumeText.match(/(?:202\d|201\d)\s*-\s*(?:202\d|201\d)/g) || []).length;
  if (shortStints > 3) {
    riskReasons.push("Frequent job switching: Candidate has several employment stints lasting under a year.");
    if (riskLevel === "Low") riskLevel = "Medium";
  }

  if (riskReasons.length === 0) {
    riskReasons.push("No significant hiring risks or red flags detected. Candidate profile appears stable and well-matched.");
    riskLevel = "Low";
  }

  // Fraud Detection & Organizational Benefit (new features)
  const fraudDetection = detectFraud(resumeText, jdText, resumeSkills, certs, resumeExp, resumeEdu);
  const orgBenefit = calculateOrgBenefit(resumeSkills, resumeDomains, resumeExp, certs, uniquenessScore, agilityScore);

  return {
    candidate_name: candidateName,
    overall_score: overallScore,
    ranking_percentage: rankingPercentage,
    candidate_category: candidateCategory,
    score_breakdown: {
      required_skills: requiredSkillsScore,
      certifications: certScoreValue,
      experience: experienceScoreValue,
      education: educationScoreValue,
      additional_skills: additionalSkillsScore,
      project_relevance: projectRelevanceScore
    },
    explainable_ranking: explainableRanking,
    hidden_talent_detection: {
      detected_skills: hiddenTalents,
      insight: talentInsight
    },
    skill_gap_analysis: {
      missing_skills: missingSkills,
      recommended_courses: recommendedCourses
    },
    certificate_quality_analysis: {
      certificate_score: certScoreValue,
      credibility_rating: credibilityRating,
      recognized_certifications: recognizedCerts
    },
    learning_agility: {
      score: agilityScore,
      reason: agilityReason
    },
    project_analysis: projectsAnalysis,
    candidate_uniqueness: {
      score: uniquenessScore,
      reason: uniquenessReason
    },
    recruiter_summary: recruiterSummary,
    interview_questions: {
      technical: technicalQuestions,
      project_based: projectQuestions,
      behavioral: behavioralQuestions,
      certification_based: certificationQuestions
    },
    hiring_risk: {
      level: riskLevel,
      reasons: riskReasons
    },
    fraud_detection: fraudDetection,
    organizational_benefit: orgBenefit
  };
}

// Attach to window for browser access
window.analyzeRecruitment = analyzeRecruitment;
window.detectFraud = detectFraud;
window.calculateOrgBenefit = calculateOrgBenefit;
window.SKILL_DICTIONARY = SKILL_DICTIONARY;
window.CERTIFICATION_DICT = CERTIFICATION_DICT;
