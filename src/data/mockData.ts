import type { Quiz } from '../types/quiz';

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 'js-mastery',
    title: 'Modern JavaScript: The Complete Guide',
    description: 'Master ES6+, closures, prototypes, and the event loop. Deep technical dive into the core of JS.',
    category: 'Programming',
    difficulty: 'Intermediate',
    coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80',
    authorId: 'system',
    isPublic: true,
    createdAt: Date.now(),
    attempts: 1250,
    rating: 4.9,
    questions: [
      {
        id: 'js-1',
        text: 'What is the output of: console.log(typeof null)?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctOptionIndex: 2,
        explanation: 'In JavaScript, typeof null is "object" due to a historical bug in the language.',
        timeLimit: 20
      },
      {
        id: 'js-2',
        text: 'Which statement correctly describes "hoisting" in JavaScript?',
        options: ['Variable declarations are physically moved to the top.', 'Functions and variables are stored in memory during compilation.', 'Variables must be declared at the top.', 'Only arrow functions are hoisted.'],
        correctOptionIndex: 1,
        explanation: 'Hoisting is a mechanism where declarations are moved to the top of their scope during compilation.',
        timeLimit: 25
      },
      {
        id: 'js-3',
        text: 'What is a "closure" in JavaScript?',
        options: ['A way to close a database.', 'A function that has access to its outer scope even after return.', 'A syntax for private variables.', 'A method to stop event propagation.'],
        correctOptionIndex: 1,
        explanation: 'A closure is the combination of a function bundled together with references to its surrounding state.',
        timeLimit: 30
      },
      {
        id: 'js-4',
        text: 'What is the purpose of "use strict"?',
        options: ['Safe mode', 'Prevent global variables', 'Stricter parsing and error handling', 'All of the above'],
        correctOptionIndex: 2,
        explanation: '"use strict" enables strict mode, catching common coding bloopers.',
        timeLimit: 20
      },
      {
        id: 'js-5',
        text: 'What is the output of 0.1 + 0.2 === 0.3?',
        options: ['true', 'false', 'undefined', 'NaN'],
        correctOptionIndex: 1,
        explanation: 'Floating-point precision issues make 0.1 + 0.2 equal 0.30000000000000004.',
        timeLimit: 20
      },
      {
        id: 'js-6',
        text: 'Which of the following is NOT a primitive data type in JavaScript?',
        options: ['String', 'Number', 'Boolean', 'Object'],
        correctOptionIndex: 3,
        explanation: 'Object is a complex data type, while the others are primitives.',
        timeLimit: 15
      }
    ]
  },
  {
    id: 'ts-pro',
    title: 'TypeScript Mastery: Type Systems & Generics',
    description: 'Go beyond basic types. Master generics, utility types, and advanced type inference.',
    category: 'Programming',
    difficulty: 'Advanced',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
    authorId: 'system',
    isPublic: true,
    createdAt: Date.now(),
    attempts: 850,
    rating: 4.8,
    questions: [
      {
        id: 'ts-1',
        text: 'What is the difference between "interface" and "type" in TypeScript?',
        options: ['No difference', 'Interfaces can be merged, types cannot', 'Types only for primitives', 'Interfaces are faster'],
        correctOptionIndex: 1,
        explanation: 'Interfaces support declaration merging, type aliases do not.',
        timeLimit: 30
      },
      {
        id: 'ts-2',
        text: 'What does the "Omit" utility type do?',
        options: ['Removes all properties', 'Creates a type by picking all properties then removing some', 'Makes all properties optional', 'Makes all properties read-only'],
        correctOptionIndex: 1,
        explanation: 'Omit<Type, Keys> constructs a type by picking all properties from Type and then removing Keys.',
        timeLimit: 25
      },
      {
        id: 'ts-3',
        text: 'How do you define an optional property in an interface?',
        options: ['property: optional', 'property?: type', 'property: type | null', 'property!: type'],
        correctOptionIndex: 1,
        explanation: 'The question mark suffix indicates an optional property.',
        timeLimit: 15
      },
      {
        id: 'ts-4',
        text: 'What is "unknown" type in TypeScript?',
        options: ['Same as any', 'Type-safe version of any', 'Implicitly any', 'A type that cannot be assigned'],
        correctOptionIndex: 1,
        explanation: 'Unknown is more restrictive than any; you must perform type checking before using it.',
        timeLimit: 25
      },
      {
        id: 'ts-5',
        text: 'Which operator is used for non-null assertion?',
        options: ['?', '!', '??', '||'],
        correctOptionIndex: 1,
        explanation: 'The ! operator tells TS that a value is definitely not null or undefined.',
        timeLimit: 20
      }
    ]
  },
  {
    id: 'react-hooks',
    title: 'React Hooks & Performance Optimization',
    description: 'Learn when to use useMemo, useCallback, and how to prevent unnecessary re-renders.',
    category: 'Programming',
    difficulty: 'Intermediate',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    authorId: 'system',
    isPublic: true,
    createdAt: Date.now(),
    attempts: 2100,
    rating: 4.9,
    questions: [
      {
        id: 'rh-1',
        text: 'When should you use the useCallback hook?',
        options: ['Every function', 'Passing callbacks to optimized children', 'Fetching data', 'Replacing useEffect'],
        correctOptionIndex: 1,
        explanation: 'useCallback memoizes functions to prevent unnecessary child re-renders.',
        timeLimit: 25
      },
      {
        id: 'rh-2',
        text: 'What is the primary purpose of useRef?',
        options: ['Store state that triggers re-renders', 'Access DOM elements or persist values across renders without re-rendering', 'Fetch data', 'Define global variables'],
        correctOptionIndex: 1,
        explanation: 'useRef returns a mutable ref object whose .current property is persisted across renders.',
        timeLimit: 20
      },
      {
        id: 'rh-3',
        text: 'What are the rules of Hooks?',
        options: ['Only call hooks at the top level', 'Only call hooks from React functions', 'Both A and B', 'Hooks can be called in loops'],
        correctOptionIndex: 2,
        explanation: 'Hooks must be called at the top level and only from React functions/custom hooks.',
        timeLimit: 20
      },
      {
        id: 'rh-4',
        text: 'What does useEffect return?',
        options: ['A promise', 'A cleanup function', 'The current state', 'Nothing'],
        correctOptionIndex: 1,
        explanation: 'useEffect can return a function for cleaning up side effects.',
        timeLimit: 25
      },
      {
        id: 'rh-5',
        text: 'How do you force a re-render in a functional component?',
        options: ['this.forceUpdate()', 'Update a state variable', 'Call the component function again', 'Use a ref'],
        correctOptionIndex: 1,
        explanation: 'Functional components re-render when state or props change.',
        timeLimit: 15
      }
    ]
  },
  {
    id: 'ai-fundamentals',
    title: 'AI & Machine Learning Foundations',
    description: 'Understand neural networks, supervised vs unsupervised learning, and the history of AI.',
    category: 'AI',
    difficulty: 'Beginner',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    authorId: 'system',
    isPublic: true,
    createdAt: Date.now(),
    attempts: 3500,
    rating: 4.7,
    questions: [
      {
        id: 'ai-1',
        text: 'What is "Supervised Learning"?',
        options: ['Labeled data', 'Environment exploration', 'No feedback', 'Unlabelled data'],
        correctOptionIndex: 0,
        explanation: 'Supervised learning uses labeled training data.',
        timeLimit: 20
      },
      {
        id: 'ai-2',
        text: 'Which algorithm is commonly used for classification?',
        options: ['Linear Regression', 'K-Means Clustering', 'Logistic Regression', 'Principal Component Analysis'],
        correctOptionIndex: 2,
        explanation: 'Logistic Regression is a popular classification algorithm.',
        timeLimit: 25
      },
      {
        id: 'ai-3',
        text: 'What is a "Neural Network" inspired by?',
        options: ['Computer CPU', 'The human brain', 'Social networks', 'Electrical grids'],
        correctOptionIndex: 1,
        explanation: 'Neural networks are loosely modeled after the structure of the human brain.',
        timeLimit: 15
      },
      {
        id: 'ai-4',
        text: 'What is "Overfitting"?',
        options: ['Model is too simple', 'Model performs well on training data but poorly on new data', 'Data is too large', 'Training is too fast'],
        correctOptionIndex: 1,
        explanation: 'Overfitting happens when a model learns noise in the training data too well.',
        timeLimit: 30
      },
      {
        id: 'ai-5',
        text: 'Which language is most popular for AI development?',
        options: ['Java', 'C++', 'Python', 'JavaScript'],
        correctOptionIndex: 2,
        explanation: 'Python is the industry standard for AI and ML due to its vast libraries.',
        timeLimit: 15
      }
    ]
  },
  {
    id: 'space-exploration',
    title: 'Space: The Final Frontier',
    description: 'Explore the mysteries of the solar system, galaxies, and black holes.',
    category: 'Science',
    difficulty: 'Beginner',
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    authorId: 'system',
    isPublic: true,
    createdAt: Date.now(),
    attempts: 4200,
    rating: 4.9,
    questions: [
      {
        id: 'space-1',
        text: 'What is the largest planet in our solar system?',
        options: ['Saturn', 'Jupiter', 'Neptune', 'Mars'],
        correctOptionIndex: 1,
        explanation: 'Jupiter is the largest planet.',
        timeLimit: 15
      },
      {
        id: 'space-2',
        text: 'Which planet is known as the "Red Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
        correctOptionIndex: 1,
        explanation: 'Mars appears red due to iron oxide on its surface.',
        timeLimit: 15
      },
      {
        id: 'space-3',
        text: 'What is at the center of the Milky Way galaxy?',
        options: ['A Sun', 'A Black Hole', 'A Nebula', 'Nothing'],
        correctOptionIndex: 1,
        explanation: 'A supermassive black hole called Sagittarius A* is at the center.',
        timeLimit: 20
      },
      {
        id: 'space-4',
        text: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'],
        correctOptionIndex: 1,
        explanation: 'There are 8 recognized planets since Pluto was reclassified as a dwarf planet.',
        timeLimit: 15
      },
      {
        id: 'space-5',
        text: 'What is the closest star to Earth?',
        options: ['Proxima Centauri', 'Sirius', 'The Sun', 'Betelgeuse'],
        correctOptionIndex: 2,
        explanation: 'The Sun is our closest star.',
        timeLimit: 10
      }
    ]
  },
  {
    id: 'cybersecurity-basics',
    title: 'Cybersecurity: Defense & Threats',
    description: 'Test your knowledge on phishing, encryption, and network security.',
    category: 'Technology',
    difficulty: 'Beginner',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    authorId: 'system',
    isPublic: true,
    createdAt: Date.now(),
    attempts: 1800,
    rating: 4.8,
    questions: [
      {
        id: 'cyber-1',
        text: 'What is "Phishing"?',
        options: ['A type of sport', 'Fraudulent attempt to get sensitive info', 'A way to speed up the internet', 'Email blocking'],
        correctOptionIndex: 1,
        explanation: 'Phishing is a social engineering attack.',
        timeLimit: 20
      },
      {
        id: 'cyber-2',
        text: 'What does "VPN" stand for?',
        options: ['Virtual Private Network', 'Visible Public Node', 'Verified Proxy Network', 'Variable Private Network'],
        correctOptionIndex: 0,
        explanation: 'VPN creates a secure connection over the internet.',
        timeLimit: 15
      },
      {
        id: 'cyber-3',
        text: 'What is a "Firewall"?',
        options: ['A physical wall', 'Security system that monitors network traffic', 'A type of computer virus', 'A fast router'],
        correctOptionIndex: 1,
        explanation: 'Firewalls act as a barrier between trusted and untrusted networks.',
        timeLimit: 20
      },
      {
        id: 'cyber-4',
        text: 'Which protocol is secure for web browsing?',
        options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
        correctOptionIndex: 2,
        explanation: 'HTTPS encrypts data between the browser and the server.',
        timeLimit: 15
      },
      {
        id: 'cyber-5',
        text: 'What is "Two-Factor Authentication" (2FA)?',
        options: ['Using two passwords', 'Requiring two forms of identification', 'Double encryption', 'Two user accounts'],
        correctOptionIndex: 1,
        explanation: '2FA adds an extra layer of security beyond just a password.',
        timeLimit: 20
      }
    ]
  },
  {
    id: 'startup-business',
    title: 'Startup Strategy: From Zero to One',
    description: 'Test your knowledge on MVPs, pivots, and funding.',
    category: 'Business',
    difficulty: 'Beginner',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    authorId: 'system',
    isPublic: true,
    createdAt: Date.now(),
    attempts: 3200,
    rating: 4.8,
    questions: [
      {
        id: 'bz-1',
        text: 'What is an MVP?',
        options: ['Most Valuable Player', 'Minimum Viable Product', 'Market Value Project', 'Visionary Plan'],
        correctOptionIndex: 1,
        explanation: 'A version of a product with just enough features to satisfy early customers.',
        timeLimit: 15
      },
      {
        id: 'bz-2',
        text: 'What is a "Pivot" in startup terms?',
        options: ['A complete shutdown', 'A fundamental change in business strategy', 'Hiring a new CEO', 'Moving to a new office'],
        correctOptionIndex: 1,
        explanation: 'Pivoting involves shifting the business model to reach a different market.',
        timeLimit: 20
      },
      {
        id: 'bz-3',
        text: 'What is "Venture Capital"?',
        options: ['Personal savings', 'Investment from firms in exchange for equity', 'Bank loans', 'Government grants'],
        correctOptionIndex: 1,
        explanation: 'VC firms provide capital to high-potential startups.',
        timeLimit: 25
      },
      {
        id: 'bz-4',
        text: 'What does "ROI" stand for?',
        options: ['Rate of Interest', 'Return on Investment', 'Revenue on Income', 'Risk of Investment'],
        correctOptionIndex: 1,
        explanation: 'ROI measures the gain or loss generated on an investment.',
        timeLimit: 15
      },
      {
        id: 'bz-5',
        text: 'What is the "Burn Rate"?',
        options: ['How fast employees quit', 'Rate at which a company spends its capital', 'Computing power used', 'Marketing speed'],
        correctOptionIndex: 1,
        explanation: 'Burn rate is the monthly negative cash flow.',
        timeLimit: 20
      }
    ]
  },
  {
    id: 'history-turning-points',
    title: 'World History: Turning Points',
    description: 'Test your knowledge on events that shaped the modern world.',
    category: 'History',
    difficulty: 'Intermediate',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
    authorId: 'system',
    isPublic: true,
    createdAt: Date.now(),
    attempts: 3100,
    rating: 4.7,
    questions: [
      {
        id: 'hist-1',
        text: 'When did World War II officially end?',
        options: ['1943', '1944', '1945', '1946'],
        correctOptionIndex: 2,
        explanation: 'WWII ended in 1945 with the surrender of Japan.',
        timeLimit: 15
      },
      {
        id: 'hist-2',
        text: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
        correctOptionIndex: 2,
        explanation: 'George Washington served from 1789 to 1797.',
        timeLimit: 10
      },
      {
        id: 'hist-3',
        text: 'In which city was the Titanic built?',
        options: ['London', 'New York', 'Belfast', 'Southampton'],
        correctOptionIndex: 2,
        explanation: 'The Titanic was built in Belfast, Northern Ireland.',
        timeLimit: 20
      },
      {
        id: 'hist-4',
        text: 'The French Revolution began in which year?',
        options: ['1776', '1789', '1804', '1812'],
        correctOptionIndex: 1,
        explanation: 'The storming of the Bastille occurred in 1789.',
        timeLimit: 20
      },
      {
        id: 'hist-5',
        text: 'Who discovered America in 1492?',
        options: ['Vasco da Gama', 'Christopher Columbus', 'Marco Polo', 'Ferdinand Magellan'],
        correctOptionIndex: 1,
        explanation: 'Columbus reached the Americas in 1492 under the Spanish flag.',
        timeLimit: 15
      }
    ]
  }
];

export const MOCK_USERS = [
  {
    id: 'u-alex',
    name: 'Alex Rivera',
    email: 'alex@example.com',
    xp: 25420,
    level: 15,
    streak: 45,
    achievements: ['first_quiz', 'perfect_score', 'streak_master'],
    attempts: []
  }
];

export const MOCK_ATTEMPTS = [];
