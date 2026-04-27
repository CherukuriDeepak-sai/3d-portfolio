type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    education: TSection;
    certifications: Required<TSection>;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Deepaksai Cherukuri — 3D Portfolio",
    fullName: "Deepaksai Cherukuri",
    email: "deepaksaicherukuri@mail.com",
  },
  hero: {
    name: "Deepaksai Cherukuri",
    p: [
      "AI/ML enthusiast based in the",
      "London Area, United Kingdom",
    ],
  },
  contact: {
    p: "Let us connect",
    h2: "Contact.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "What do you want to say?",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "About Me.",
      content: `I have always been curious about how technology can turn ideas
      into practical real-world solutions. During my studies in Computer Science
      at the University of East London, I moved beyond theory and started building
      projects in AI and machine learning that solve real problems. I enjoy
      converting raw and unstructured data into clear insights, building models
      that improve prediction accuracy, and developing simple web tools that make
      those insights usable.

      My core strengths include machine learning with Python, data analysis,
      predictive modelling, algorithms, and object-oriented programming. I am
      currently focused on AI/ML Engineer and Data Analyst opportunities in the
      UK where I can build reliable systems that help people make better, faster
      decisions.`,
    },
    experience: {
      p: "My professional journey",
      h2: "Work Experience.",
    },
    education: {
      p: "Academic background",
      h2: "Education.",
    },
    certifications: {
      p: "Professional learning",
      h2: "Courses & Certifications.",
      content: `A quick snapshot of focused programs that strengthened my
    practical software engineering and AI/ML development skills.`,
    },
    feedbacks: {
      p: "Recommendations",
      h2: "Testimonials.",
    },
    works: {
      p: "Selected work",
      h2: "Projects.",
      content: `These projects represent my work across frontend engineering,
    3D interaction, and full-stack implementation. Each one highlights
    practical problem-solving, clean architecture, and attention to user
    experience from concept to deployment.`,
    },
  },
};
