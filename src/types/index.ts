export interface SportData {
  sport: string;
  position: string;
  weight: number;
  benchPress: number;
  height: number;
  calorieIntake: number;
  helpArea: string;
  mealImage: string;
  currentSchedule: string;
}

export interface AdviceResponse {
  isValid: boolean;
  advice: string;
  nutritionAdvice?: string;
  scheduleAdvice?: string;
}

export type PageType = 'home' | 'about';