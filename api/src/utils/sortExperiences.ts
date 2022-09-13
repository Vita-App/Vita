import { ExperienceType } from '../types';

export const sortExperiences = (experiences: ExperienceType[]) =>
  experiences.sort(experienceComparator);

const experienceComparator = (a: ExperienceType, b: ExperienceType) => {
  if (a.end_year.trim().toLowerCase() === 'present') return -1;
  if (b.end_year.trim().toLowerCase() === 'present') return 1;
  try {
    return (
      -1 * (parseInt(a.end_year.trim(), 10) - parseInt(b.end_year.trim(), 10))
    );
  } catch (e) {
    return 0;
  }
};
