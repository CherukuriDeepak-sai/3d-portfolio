import type {
  TNavLink,
  TService,
  TTechnology,
  TCertificate,
  TExperience,
  TTestimonial,
  TProject,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  java,
  python,
  html,
  css,
  git,
  figma,
  framer,
  mysql,
  tensorflow,
  scikitlearn,
  pandas,
  numpy,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "AI/ML Enthusiast",
    icon: web,
  },
  {
    title: "Python Developer",
    icon: mobile,
  },
  {
    title: "Full Stack Java Developer",
    icon: backend,
  },
  {
    title: "Web App Developer",
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "HTML",
    icon: html,
  },
  {
    name: "CSS",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Figma",
    icon: figma,
  },
  {
    name: "Framer",
    icon: framer,
  },
  {
    name: "TensorFlow",
    icon: tensorflow,
  },
  {
    name: "Scikit-learn",
    icon: scikitlearn,
  },
  {
    name: "Pandas",
    icon: pandas,
  },
  {
    name: "NumPy",
    icon: numpy,
  },
];

const experiences: TExperience[] = [
  {
    title: "Python Developer",
    companyName: "Maang Technologies Private Limited",
    icon: starbucks,
    iconBg: "#383E56",
    date: "December 2024 - October 2025",
    points: [
      "Built and optimized Python applications and automation scripts, reducing manual processing time by 30-40%.",
      "Developed and tested backend features using Python and Java, improving performance and reliability.",
      "Analysed structured datasets and implemented ML algorithms to improve prediction accuracy.",
      "Collaborated with remote teams using Git/GitHub for faster feature delivery and cleaner version control.",
    ],
  },
  {
    title: "Python Developer",
    companyName: "Atrisol Technologies",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "January 2024 - May 2024",
    points: [
      "Developed Python scripts for data processing and automation, improving workflow efficiency by 25%.",
      "Assisted in building machine learning models for data classification and analysis.",
      "Cleaned and analysed datasets using Pandas and NumPy for more accurate reporting.",
      "Contributed to web development tasks and improved runtime stability through testing and debugging.",
    ],
  },
];

const education: TExperience[] = [
  {
    title: "Master's Degree, Computer Science",
    companyName: "University of East London",
    icon: shopify,
    iconBg: "#383E56",
    date: "Expected 2028",
    points: [
      "Specializing in AI and machine learning with a practical, project-driven approach.",
      "Focused on data-driven systems, predictive modelling, and applied algorithm design.",
      "Built strong foundations in object-oriented programming and software engineering.",
      "Continually developing practical AI/ML solutions for real-world use cases.",
    ],
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    companyName: "R.K Degree College",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "2021 - 2024",
    points: [
      "Completed core coursework in programming, data structures, databases, and software engineering.",
      "Built foundational skills in problem-solving, object-oriented programming, and application development.",
      "Worked on practical academic projects using web and programming technologies.",
      "Graduated with a strong base for advanced AI/ML and analytics-focused study.",
    ],
  },
];

const certifications: TCertificate[] = [
  {
    title: "Java Full Stack Developer",
    provider: "JSpiders",
    credentialType: "Professional Training",
  },
  {
    title: "Python 100 Days Bootcamp",
    provider: "Udemy",
    credentialType: "Online Bootcamp",
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      "Deepaksai consistently turned complex data questions into practical solutions and delivered outcomes with clarity.",
    name: "Team Lead",
    designation: "Engineering",
    company: "Maang Technologies",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "His focus on clean implementation and model accuracy made a visible impact on project quality and delivery speed.",
    name: "Project Mentor",
    designation: "Data and AI",
    company: "Atrisol Technologies",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Deepaksai brings curiosity, discipline, and strong technical grounding to every task, especially in AI/ML workflows.",
    name: "Academic Reviewer",
    designation: "Computer Science",
    company: "University of East London",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects: TProject[] = [
  {
    name: "Predictive Demand Analyzer",
    description:
      "Built an end-to-end machine learning pipeline to analyse historical business data, identify patterns, and improve forecasting accuracy for operational planning.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "scikit-learn",
        color: "green-text-gradient",
      },
      {
        name: "pandas",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "Smart Dataset Insights",
    description:
      "Designed and implemented data cleaning, transformation, and exploratory analysis workflows that generated actionable insights from noisy datasets.",
    tags: [
      {
        name: "numpy",
        color: "blue-text-gradient",
      },
      {
        name: "data-analysis",
        color: "green-text-gradient",
      },
      {
        name: "visualization",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "AI Web Utility Dashboard",
    description:
      "Created a lightweight web-based dashboard that connects model outputs with simple UI components so non-technical users can interpret predictions quickly.",
    tags: [
      {
        name: "flask",
        color: "blue-text-gradient",
      },
      {
        name: "machine-learning",
        color: "green-text-gradient",
      },
      {
        name: "web-app",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    sourceCodeLink: "https://github.com/",
  },
];

export {
  services,
  technologies,
  experiences,
  education,
  certifications,
  testimonials,
  projects,
};
