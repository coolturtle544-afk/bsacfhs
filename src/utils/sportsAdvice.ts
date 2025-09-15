import { SportData, AdviceResponse } from '../types';

const SPORTS_LIST = [
  'basketball', 'football', 'soccer', 'baseball', 'tennis', 'volleyball', 
  'track and field', 'swimming', 'wrestling', 'cross country', 'golf',
  'hockey', 'lacrosse', 'softball', 'badminton', 'table tennis'
];

const MEAL_KEYWORDS = {
  healthy: ['salad', 'chicken', 'fish', 'vegetables', 'broccoli', 'spinach', 'quinoa', 'brown rice', 'sweet potato'],
  protein: ['chicken', 'fish', 'eggs', 'beef', 'turkey', 'protein', 'milk', 'yogurt', 'beans'],
  carbs: ['rice', 'pasta', 'bread', 'potato', 'oats', 'banana'],
  unhealthy: ['pizza', 'burger', 'fries', 'soda', 'candy', 'chips', 'ice cream', 'donut']
};

export function generateSportsAdvice(data: SportData): AdviceResponse {
  const { sport, position, weight, benchPress, height, calorieIntake, helpArea, mealImage, currentSchedule } = data;
  
  // Check if sport is valid
  if (!SPORTS_LIST.some(s => sport.toLowerCase().includes(s) || s.includes(sport.toLowerCase()))) {
    return {
      isValid: false,
      advice: "I can only help with sports. Please enter a real sport to get training tips."
    };
  }

  const sportLower = sport.toLowerCase();
  let advice = '';
  let nutritionAdvice = '';
  let scheduleAdvice = '';

  // Generate sport-specific training advice
  advice += generateSportSpecificTraining(sportLower, position, helpArea);
  
  // Generate strength training advice
  advice += generateStrengthTraining(benchPress, weight);
  
  // Generate nutrition advice
  advice += generateNutritionAdvice(calorieIntake, weight);
  
  // Generate meal analysis if provided
  if (mealImage) {
    nutritionAdvice = analyzeMeal(mealImage);
  }
  
  // Generate schedule improvements if provided
  if (currentSchedule) {
    scheduleAdvice = improveSchedule(currentSchedule, sportLower);
  }

  return {
    isValid: true,
    advice,
    nutritionAdvice,
    scheduleAdvice
  };
}

function generateSportSpecificTraining(sport: string, position: string, helpArea: string): string {
  let training = `🏃‍♂️ **Training Plan for ${sport.charAt(0).toUpperCase() + sport.slice(1)}**\n\n`;

  // Sport-specific drills
  if (sport.includes('basketball')) {
    training += `**Daily Basketball Drills:**\n`;
    training += `• Dribbling: 20 minutes with both hands\n`;
    training += `• Shooting: 100 shots from different spots\n`;
    training += `• Layups: 50 with each hand\n`;
    training += `• Free throws: 50 shots daily\n\n`;
    
    if (position.toLowerCase().includes('guard')) {
      training += `**Point Guard Skills:**\n`;
      training += `• Ball handling: 15 minutes of cone drills\n`;
      training += `• Quick feet ladder drills: 10 minutes\n`;
      training += `• Passing drills: 100 passes to targets\n\n`;
    } else if (position.toLowerCase().includes('forward') || position.toLowerCase().includes('center')) {
      training += `**Big Man Skills:**\n`;
      training += `• Post moves: 20 minutes daily\n`;
      training += `• Rebounding drills: 15 minutes\n`;
      training += `• Box jumps: 3 sets of 10\n\n`;
    }
  }

  if (sport.includes('football')) {
    training += `**Daily Football Training:**\n`;
    training += `• 40-yard sprints: 10 times\n`;
    training += `• Agility ladder: 15 minutes\n`;
    training += `• Cone drills: 20 minutes\n`;
    training += `• Position drills: 30 minutes\n\n`;
    
    if (position.toLowerCase().includes('quarterback')) {
      training += `**Quarterback Training:**\n`;
      training += `• Throw 100 passes daily\n`;
      training += `• Footwork drills: 20 minutes\n`;
      training += `• Quick release practice: 15 minutes\n\n`;
    } else if (position.toLowerCase().includes('receiver')) {
      training += `**Receiver Training:**\n`;
      training += `• Route running: 30 minutes\n`;
      training += `• Catch 50 balls daily\n`;
      training += `• Speed training: 20 minutes\n\n`;
    }
  }

  if (sport.includes('soccer')) {
    training += `**Daily Soccer Training:**\n`;
    training += `• Ball touches: 1000 per day\n`;
    training += `• Juggling: 15 minutes\n`;
    training += `• Shooting: 50 shots on goal\n`;
    training += `• Running: 30 minutes\n\n`;
  }

  if (sport.includes('track') || sport.includes('running')) {
    training += `**Daily Running Training:**\n`;
    training += `• Easy run: 30 minutes, 4 days a week\n`;
    training += `• Speed work: 8 x 200m sprints\n`;
    training += `• Long run: 60 minutes once a week\n`;
    training += `• Hill training: 20 minutes twice a week\n\n`;
  }

  if (sport.includes('swimming')) {
    training += `**Daily Swimming Training:**\n`;
    training += `• Warm up: 400m easy swim\n`;
    training += `• Main set: 8 x 50m fast\n`;
    training += `• Technique work: 20 minutes\n`;
    training += `• Cool down: 200m easy\n\n`;
  }

  // Help area specific advice
  if (helpArea) {
    training += `**Help with ${helpArea}:**\n`;
    if (helpArea.toLowerCase().includes('speed')) {
      training += `• Sprint intervals: 6 x 50 yards\n`;
      training += `• Plyometric jumps: 3 sets of 10\n`;
      training += `• High knees: 3 sets of 30 seconds\n\n`;
    } else if (helpArea.toLowerCase().includes('strength')) {
      training += `• Push-ups: 3 sets of 15\n`;
      training += `• Squats: 3 sets of 20\n`;
      training += `• Planks: 3 sets of 45 seconds\n\n`;
    } else if (helpArea.toLowerCase().includes('endurance')) {
      training += `• Long runs: 45 minutes, 3 times a week\n`;
      training += `• Bike rides: 60 minutes twice a week\n`;
      training += `• Swimming: 30 minutes once a week\n\n`;
    }
  }

  return training;
}

function generateStrengthTraining(benchPress: number, weight: number): string {
  const benchRatio = benchPress / weight;
  let strength = `💪 **Strength Training Plan**\n\n`;

  if (benchRatio < 1.0) {
    strength += `**Beginner Strength (3 days a week):**\n`;
    strength += `• Bench Press: 3 sets of 8 reps at ${Math.round(benchPress * 0.8)} lbs\n`;
    strength += `• Squats: 3 sets of 10 reps at ${Math.round(weight * 0.8)} lbs\n`;
    strength += `• Push-ups: 3 sets of 12 reps\n`;
    strength += `• Pull-ups: 3 sets of 5 reps (use help if needed)\n`;
    strength += `• Planks: 3 sets of 30 seconds\n\n`;
  } else if (benchRatio > 1.5) {
    strength += `**Advanced Strength (4 days a week):**\n`;
    strength += `• Bench Press: 4 sets of 5 reps at ${Math.round(benchPress * 1.1)} lbs\n`;
    strength += `• Deadlifts: 4 sets of 3 reps at ${Math.round(weight * 1.5)} lbs\n`;
    strength += `• Power cleans: 3 sets of 3 reps at ${Math.round(weight * 0.7)} lbs\n`;
    strength += `• Box jumps: 4 sets of 8 reps\n`;
    strength += `• Medicine ball throws: 3 sets of 10\n\n`;
  } else {
    strength += `**Intermediate Strength (3 days a week):**\n`;
    strength += `• Bench Press: 3 sets of 6 reps at ${Math.round(benchPress * 1.05)} lbs\n`;
    strength += `• Squats: 3 sets of 8 reps at ${Math.round(weight * 1.2)} lbs\n`;
    strength += `• Deadlifts: 3 sets of 5 reps at ${Math.round(weight * 1.3)} lbs\n`;
    strength += `• Pull-ups: 3 sets of 8 reps\n`;
    strength += `• Dips: 3 sets of 10 reps\n\n`;
  }

  return strength;
}

function generateNutritionAdvice(calorieIntake: number, weight: number): string {
  const caloriesPerPound = calorieIntake / weight;
  let nutrition = `🥗 **Nutrition Plan**\n\n`;

  if (caloriesPerPound < 12) {
    nutrition += `**You need to eat more food:**\n`;
    nutrition += `• Target: ${Math.round(weight * 16)} calories per day\n`;
    nutrition += `• Drink 3 glasses of milk daily\n`;
    nutrition += `• Eat chicken, fish, or eggs with every meal\n`;
    nutrition += `• Have a protein shake after workouts\n`;
    nutrition += `• Snack on nuts and peanut butter\n\n`;
  } else if (caloriesPerPound > 18) {
    nutrition += `**You need to eat less food:**\n`;
    nutrition += `• Target: ${Math.round(weight * 14)} calories per day\n`;
    nutrition += `• Fill half your plate with vegetables\n`;
    nutrition += `• Drink water instead of soda\n`;
    nutrition += `• Eat lean meats like chicken breast\n`;
    nutrition += `• Avoid fried foods and candy\n\n`;
  } else {
    nutrition += `**Your eating is good, keep it up:**\n`;
    nutrition += `• Keep eating ${calorieIntake} calories per day\n`;
    nutrition += `• Eat protein with every meal\n`;
    nutrition += `• Have fruits and vegetables daily\n`;
    nutrition += `• Drink 8 glasses of water per day\n\n`;
  }

  nutrition += `**Daily Meal Plan:**\n`;
  nutrition += `• Breakfast: 2 eggs, oatmeal, banana, milk\n`;
  nutrition += `• Lunch: Chicken breast, brown rice, broccoli\n`;
  nutrition += `• Snack: Greek yogurt with berries\n`;
  nutrition += `• Dinner: Fish, sweet potato, spinach salad\n`;
  nutrition += `• Before bed: Glass of milk\n\n`;

  return nutrition;
}

function analyzeMeal(mealDescription: string): string {
  const mealLower = mealDescription.toLowerCase();
  let analysis = `📸 **Your Meal Analysis**\n\n`;

  // Check if this is an AI-detected meal
  if (mealDescription.startsWith('AI detected:')) {
    analysis += `🤖 **AI Found Your Meal:**\n`;
    analysis += `${mealDescription.replace('AI detected: ', '')}\n\n`;
  }

  // Count healthy vs unhealthy items
  let healthyCount = 0;
  let proteinCount = 0;
  let carbCount = 0;
  let unhealthyCount = 0;

  MEAL_KEYWORDS.healthy.forEach(item => {
    if (mealLower.includes(item)) healthyCount++;
  });
  
  MEAL_KEYWORDS.protein.forEach(item => {
    if (mealLower.includes(item)) proteinCount++;
  });
  
  MEAL_KEYWORDS.carbs.forEach(item => {
    if (mealLower.includes(item)) carbCount++;
  });
  
  MEAL_KEYWORDS.unhealthy.forEach(item => {
    if (mealLower.includes(item)) unhealthyCount++;
  });

  // Provide analysis
  if (unhealthyCount > 2) {
    analysis += `❌ **This meal needs work:**\n`;
    analysis += `• Too much junk food\n`;
    analysis += `• Bad for sports\n`;
    analysis += `• Will make you tired\n\n`;
    
    analysis += `**How to make it better:**\n`;
    analysis += `• Eat sweet potato instead of fries\n`;
    analysis += `• Pick grilled chicken, not fried\n`;
    analysis += `• Add green salad\n`;
    analysis += `• Drink water instead of soda\n\n`;
  } else if (proteinCount > 0 && healthyCount > 1) {
    analysis += `✅ **Great meal choice:**\n`;
    analysis += `• Good protein for muscles\n`;
    analysis += `• Healthy food for energy\n`;
    analysis += `• Great for sports\n\n`;
    
    analysis += `**To make it even better:**\n`;
    analysis += `• Add more colorful veggies\n`;
    analysis += `• Eat avocado for healthy fat\n`;
    analysis += `• Drink lots of water\n\n`;
  } else {
    analysis += `⚠️ **Okay meal, but could be better:**\n`;
    analysis += `• Needs more protein\n`;
    analysis += `• Needs more veggies\n`;
    analysis += `• Missing important stuff\n\n`;
    
    analysis += `**How to improve:**\n`;
    analysis += `• Add chicken, fish, or eggs\n`;
    analysis += `• Eat green veggies\n`;
    analysis += `• Add a piece of fruit\n`;
    analysis += `• Pick brown bread or rice\n\n`;
  }

  return analysis;
}

function improveSchedule(schedule: string, sport: string): string {
  let improvements = `📅 **Your Schedule Improvements**\n\n`;
  
  const scheduleLower = schedule.toLowerCase();
  
  improvements += `**Current Schedule Analysis:**\n`;
  
  // Check for rest days
  if (!scheduleLower.includes('rest') && !scheduleLower.includes('off')) {
    improvements += `❌ No rest days found - you need recovery time\n`;
  } else {
    improvements += `✅ Good - you have rest days\n`;
  }
  
  // Check for variety
  if (scheduleLower.includes('same') || !scheduleLower.includes('different')) {
    improvements += `❌ Not enough variety in training\n`;
  } else {
    improvements += `✅ Good variety in your training\n`;
  }
  
  improvements += `\n**Better Schedule for ${sport}:**\n\n`;
  
  improvements += `**Monday - Hard Training Day:**\n`;
  improvements += `• Sport practice: 90 minutes\n`;
  improvements += `• Strength training: 45 minutes\n`;
  improvements += `• Stretching: 15 minutes\n\n`;
  
  improvements += `**Tuesday - Active Recovery:**\n`;
  improvements += `• Light jogging: 20 minutes\n`;
  improvements += `• Skill work: 30 minutes\n`;
  improvements += `• Yoga or stretching: 20 minutes\n\n`;
  
  improvements += `**Wednesday - Hard Training Day:**\n`;
  improvements += `• Sport practice: 90 minutes\n`;
  improvements += `• Conditioning: 30 minutes\n`;
  improvements += `• Core work: 15 minutes\n\n`;
  
  improvements += `**Thursday - Skill Focus:**\n`;
  improvements += `• Technical practice: 60 minutes\n`;
  improvements += `• Light strength training: 30 minutes\n`;
  improvements += `• Recovery stretching: 15 minutes\n\n`;
  
  improvements += `**Friday - Game Prep:**\n`;
  improvements += `• Light practice: 45 minutes\n`;
  improvements += `• Mental preparation: 15 minutes\n`;
  improvements += `• Easy stretching: 10 minutes\n\n`;
  
  improvements += `**Saturday - Game Day or Scrimmage:**\n`;
  improvements += `• Warm up: 20 minutes\n`;
  improvements += `• Game or competition\n`;
  improvements += `• Cool down: 15 minutes\n\n`;
  
  improvements += `**Sunday - Complete Rest:**\n`;
  improvements += `• No training\n`;
  improvements += `• Light walking only\n`;
  improvements += `• Focus on sleep and nutrition\n\n`;
  
  return improvements;
}