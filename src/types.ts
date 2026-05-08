export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
  };
  category: 'AI' | 'Cybersecurity' | 'DevOps' | 'IoT';
}

export interface Skill {
  name: string;
  category: string;
  icon: string;
}
