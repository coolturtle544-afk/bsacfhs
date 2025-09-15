import React from 'react';
import { Target, Users, BarChart3, Heart, MessageSquare, BookOpen, Instagram } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bulldog Sports & Analytics Club</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We help our community and play sports - making better athletes and a cleaner neighborhood.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">What we do?</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700">Clean up local parks</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700">Play sports after cleanup</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700">Analyze data from school sports</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-gray-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Why we do it?</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700">Keeps us physically active</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700">Simple and fun way to give back to our community</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700">Connect with new people</p>
              </div>
            </div>
          </div>
        </div>

        <div id="join-section" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white mb-8">
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Join The Club</h2>
            <p className="text-xl mb-8 opacity-90">
              Ready to make a difference in your community while improving your athletic performance?
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                <MessageSquare className="h-8 w-8 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">Join Discord</h3>
                <p className="text-sm opacity-80 mb-4">Chat with club members and get updates</p>
                <a
                  href="https://discord.gg/9hxz8wXzjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Join Discord
                </a>
              </div>

              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                <BookOpen className="h-8 w-8 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">Google Classroom</h3>
                <p className="text-sm opacity-80 mb-4">Get club info and homework</p>
                <div className="bg-white bg-opacity-30 rounded px-3 py-2 text-sm font-mono">
                  lbtimtnp
                </div>
                <p className="text-xs opacity-70 mt-2">Use this code to join</p>
              </div>

              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                <Instagram className="h-8 w-8 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                <p className="text-sm opacity-80 mb-4">See what we're doing</p>
                <a
                  href="https://www.instagram.com/bulldogsportsanalyticsclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Follow
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Bulldog Sports & Analytics Club, we think helping our community and playing sports go together. 
            We clean up parks and then play sports there. This helps our neighborhood and gives us clean places to be active. 
            We also look at school sports data to help athletes get better and make friends that last forever.
          </p>
        </div>
      </div>
    </div>
  );
}