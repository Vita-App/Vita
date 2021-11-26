import { MotivationEnumType } from 'types';

const shuffleArray = <T>(array: T[]) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swapping 2 variables
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export interface Topic {
  topicName: string;
  motivation: MotivationEnumType;
  description: string;
  emojiIcon: string;
  emojiBadge: string;
}

const topics: Topic[] = [
  {
    topicName: 'Practice Mock Interview',
    motivation: 'Job Search',
    description:
      'Practice HR, technical and behavioural interviews with mentors.',
    emojiIcon: '🔍',
    emojiBadge: '🧑🏻‍🏫',
  },
  {
    topicName: 'Resume and Portfolio Review',
    motivation: 'Job Search',
    description: 'Get actionable feedback on your resume or portfolio',
    emojiIcon: '🔍',
    emojiBadge: '💬',
  },

  {
    topicName: 'Acing techincal interviews',
    motivation: 'Job Search',
    description:
      'Learn the best ways to answer technical interview questions with framework',
    emojiIcon: '🔍',
    emojiBadge: '💁🏻',
  },
  {
    topicName: 'Breaking into tech',
    motivation: 'Job Search',
    description:
      "Talk to people who've broken into the tech industry and learn their stories.",
    emojiIcon: '🔍',
    emojiBadge: '👋',
  },

  {
    topicName: 'Changing Roles',
    motivation: 'Career Advice',
    description: 'Tips for transitioning into a new role or company',
    emojiIcon: '⚡',
    emojiBadge: '🌠',
  },
  {
    topicName: 'Getting the most out of my internship',
    motivation: 'Career Advice',
    description:
      'Strategies to maximize the amount of learning during an intership or co-op programs',
    emojiIcon: '⚡',
    emojiBadge: '📚',
  },
  {
    topicName: 'How to get promoted',
    motivation: 'Career Advice',
    description:
      'How to successfully prepare and position yourself for a job promotion?',
    emojiIcon: '⚡',
    emojiBadge: '📈',
  },
  {
    topicName: 'Negotiating a Job Offer',
    motivation: 'Career Advice',
    description: 'How to ask for a promotion and negotiate for salary raise?',
    emojiIcon: '⚡',
    emojiBadge: '🤝',
  },
  {
    topicName: 'Design Career Path',
    motivation: 'Career Advice',
    description:
      'How to think about design career paths and what progression looks like for designers?',
    emojiIcon: '⚡',
    emojiBadge: '🤓',
  },
  {
    topicName: 'Product Managment Career Path',
    motivation: 'Career Advice',
    description: 'Learn the career path and progression for product managers.',
    emojiIcon: '⚡',
    emojiBadge: '🌱',
  },
  {
    topicName: 'Dealing with Imposter Syndrome',
    motivation: 'Mentorship',
    description:
      'Talk to people who have learned to manage their imposter syndrome.',
    emojiIcon: '👏',
    emojiBadge: '🤴',
  },
  {
    topicName: 'Managing Burnout',
    motivation: 'Mentorship',
    description:
      'Learn essential burnout prevention techniques and replenish physical and emotional energy.',
    emojiIcon: '👏',
    emojiBadge: '🧨',
  },
  {
    topicName: 'Working Remotely',
    motivation: 'Mentorship',
    description:
      'Making remote and globally distributed teams work for you and your needs.',
    emojiIcon: '👏',
    emojiBadge: '🌚',
  },
  {
    topicName: 'Fostering a Good Team Culture',
    motivation: 'Leadership',
    description:
      'How to create a positive workplace culture that drives collaboration and productivity?',
    emojiIcon: '✊',
    emojiBadge: '🥧',
  },
  {
    topicName: 'Building An Effective Team',
    motivation: 'Leadership',
    description:
      'Steps to building and maintaining a strong, cohesive and effective team.',
    emojiIcon: '✊',
    emojiBadge: '☕',
  },
  {
    topicName: 'Keeping Team Member Movitvate',
    motivation: 'Leadership',
    description:
      'Understanding factors that lead to a motivated team - recognition, communication and more.',
    emojiIcon: '✊',
    emojiBadge: '🙌',
  },
  {
    topicName: 'Managing a remote team',
    motivation: 'Leadership',
    description:
      'Learn the tips to successfully manage a team in a remote environment.',
    emojiIcon: '✊',
    emojiBadge: '👨‍🏫',
  },
  {
    topicName: 'Managing People',
    motivation: 'Leadership',
    description:
      'Understand the process of training, motivating and directing your team members.',
    emojiIcon: '✊',
    emojiBadge: '👯',
  },
  {
    topicName: 'Avoiding common dysfunctions',
    motivation: 'Leadership',
    description:
      'How to maintain trust, commitment, accountability deliver results while handling conflict',
    emojiIcon: '✊',
    emojiBadge: '⚒️',
  },
  {
    topicName: 'Present Your work with Impact',
    motivation: 'Skills',
    description:
      'Learn how to properly present your work and share ideas and opinions.',
    emojiIcon: '🚀',
    emojiBadge: '🧙‍♂️',
  },
  {
    topicName: 'Giving effective Feedback',
    motivation: 'Skills',
    description: 'Ways to provide constructive feedback to team members.',
    emojiIcon: '🚀',
    emojiBadge: '🙊',
  },
  {
    topicName: 'Running Effective Meetings',
    motivation: 'Skills',
    description:
      'Manage team expectations and get the most out of your meetings.',
    emojiIcon: '🚀',
    emojiBadge: '💨',
  },
  {
    topicName: 'Improving Problem Solving',
    motivation: 'Skills',
    description: 'Learn the quintessential skill required for job interviews',
    emojiIcon: '🚀',
    emojiBadge: '👩‍💻',
  },

  {
    topicName: 'Getting started with Open Source',
    motivation: 'Skills',
    description: 'Start contriburing to production grade software',
    emojiIcon: '🚀',
    emojiBadge: '🔮',
  },
];

export default shuffleArray(topics);
