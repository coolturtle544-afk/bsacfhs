import React, { useState } from 'react';
import { SportData } from '../types';
import { generateSportsAdvice } from '../utils/sportsAdvice';
import { Brain, TrendingUp, Zap, Camera, Calendar, HelpCircle, Upload, X } from 'lucide-react';

export default function AITool() {
  const [formData, setFormData] = useState<SportData>({
    sport: '',
    position: '',
    weight: 0,
    benchPress: 0,
    height: 0,
    calorieIntake: 0,
    helpArea: '',
    mealImage: '',
    currentSchedule: ''
  });

  const [advice, setAdvice] = useState<string>('');
  const [nutritionAdvice, setNutritionAdvice] = useState<string>('');
  const [scheduleAdvice, setScheduleAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (field: keyof SportData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.sport) {
      alert('Please enter a sport to get advice.');
      return;
    }

    setIsLoading(true);
    setShowResult(false);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = generateSportsAdvice(formData);
    setAdvice(result.advice);
    setNutritionAdvice(result.nutritionAdvice || '');
    setScheduleAdvice(result.scheduleAdvice || '');
    setIsLoading(false);
    setShowResult(true);
  };

  const resetForm = () => {
    setFormData({
      sport: '',
      position: '',
      weight: 0,
      benchPress: 0,
      height: 0,
      calorieIntake: 0,
      helpArea: '',
      mealImage: '',
      currentSchedule: ''
    });
    setAdvice('');
    setNutritionAdvice('');
    setScheduleAdvice('');
    setShowResult(false);
    setUploadedImage('');
    setImageFile(null);
  };

  const formatAdviceText = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      } else if (line.startsWith('🏃‍♂️') || line.startsWith('💪') || line.startsWith('🥗') || line.startsWith('📸') || line.startsWith('📅')) {
        return (
          <h2 key={index} className="text-xl font-bold text-blue-600 mt-6 mb-3 flex items-center">
            {line}
          </h2>
        );
      } else if (line.startsWith('•')) {
        return (
          <div key={index} className="flex items-start mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-700">{line.substring(2)}</p>
          </div>
        );
      } else if (line.startsWith('❌') || line.startsWith('✅') || line.startsWith('⚠️')) {
        return (
          <div key={index} className="flex items-start mb-2 p-2 rounded-lg bg-gray-50">
            <p className="text-gray-700">{line}</p>
          </div>
        );
      } else if (line.trim()) {
        return (
          <p key={index} className="text-gray-700 mb-2">
            {line}
          </p>
        );
      }
      return <div key={index} className="mb-2"></div>;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        // Simulate AI image recognition - in a real app, this would call an AI service
        simulateImageRecognition(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateImageRecognition = (fileName: string) => {
    // Simulate AI recognizing common meal types from filename or random selection
    const commonMeals = [
      'grilled chicken breast with rice and broccoli',
      'salmon with sweet potato and green beans',
      'turkey sandwich with whole wheat bread and lettuce',
      'pasta with marinara sauce and side salad',
      'burger with fries and soda',
      'pizza slice with pepperoni',
      'oatmeal with banana and berries',
      'eggs with toast and orange juice',
      'stir fry with vegetables and brown rice',
      'protein shake with banana'
    ];
    
    const randomMeal = commonMeals[Math.floor(Math.random() * commonMeals.length)];
    handleInputChange('mealImage', `AI detected: ${randomMeal}`);
  };

  const removeImage = () => {
    setUploadedImage('');
    setImageFile(null);
    handleInputChange('mealImage', '');
  };
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Sports Coach</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get training tips based on your sport and body stats. 
          Our AI looks at your info and gives you a plan to get better.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
            Tell Us About You
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Basic Info</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sport <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.sport}
                  onChange={(e) => handleInputChange('sport', e.target.value)}
                  placeholder="e.g., Basketball, Football, Soccer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder="e.g., Point Guard, Quarterback, Midfielder"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={formData.weight || ''}
                    onChange={(e) => handleInputChange('weight', Number(e.target.value))}
                    placeholder="160"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (inches)
                  </label>
                  <input
                    type="number"
                    value={formData.height || ''}
                    onChange={(e) => handleInputChange('height', Number(e.target.value))}
                    placeholder="70"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bench Press (lbs)
                </label>
                <input
                  type="number"
                  value={formData.benchPress || ''}
                  onChange={(e) => handleInputChange('benchPress', Number(e.target.value))}
                  placeholder="150"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calories You Eat Per Day
                </label>
                <input
                  type="number"
                  value={formData.calorieIntake || ''}
                  onChange={(e) => handleInputChange('calorieIntake', Number(e.target.value))}
                  placeholder="2500"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Help Area */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium text-gray-800 flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                What do you need help with?
              </h4>
              <div>
                <input
                  type="text"
                  value={formData.helpArea}
                  onChange={(e) => handleInputChange('helpArea', e.target.value)}
                  placeholder="e.g., Speed, Strength, Endurance, Shooting"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Meal Analysis */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium text-gray-800 flex items-center">
                <Camera className="h-4 w-4 mr-2 text-blue-500" />
                Your Last Meal
              </h4>
              
              {/* Image Upload */}
              <div className="space-y-3">
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="meal-image-upload"
                    />
                    <label
                      htmlFor="meal-image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700">Upload meal photo</span>
                      <span className="text-xs text-gray-500 mt-1">AI will analyze your meal</span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded meal"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {/* Text description as backup/override */}
                <textarea
                  value={formData.mealImage}
                  onChange={(e) => handleInputChange('mealImage', e.target.value)}
                  placeholder={uploadedImage ? "AI detected your meal above. You can edit or add details here." : "Or describe your meal: Chicken breast, rice, broccoli, and water"}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium text-gray-800 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                Your current training schedule
              </h4>
              <div>
                <textarea
                  value={formData.currentSchedule}
                  onChange={(e) => handleInputChange('currentSchedule', e.target.value)}
                  placeholder="e.g., Monday: Practice 2 hours, Tuesday: Gym, Wednesday: Rest..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Making Your Plan...
                  </div>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Get AI Advice
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          {!showResult && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Brain className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">Ready to Get Better?</h3>
              <p className="text-gray-400">
                Fill out your info to get training tips from our AI coach.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Making Your Plan</h3>
              <p className="text-gray-500">Our AI is looking at your info...</p>
            </div>
          )}

          {showResult && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Zap className="h-5 w-5 text-blue-500 mr-2" />
                Your Personal Training Plan
              </h3>
              
              <div className="space-y-6 h-96 overflow-y-auto">
                {/* Main Training Advice */}
                {advice && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    {formatAdviceText(advice)}
                  </div>
                )}
                
                {/* Nutrition Advice */}
                {nutritionAdvice && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    {formatAdviceText(nutritionAdvice)}
                  </div>
                )}
                
                {/* Schedule Advice */}
                {scheduleAdvice && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    {formatAdviceText(scheduleAdvice)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}