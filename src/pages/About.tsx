import { Card } from "@/components/ui/card";
import { BookOpen, Heart, Sparkles, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-600 text-transparent bg-clip-text">
            About Us 📖
          </h1>
          <p className="text-xl text-gray-600">
            Helping you discover meaningful verses from God's Word
          </p>
        </div>
        
        <div className="gradient-border mb-16">
          <div className="p-8 text-center">
            <p className="text-xl leading-relaxed text-gray-700">
              Welcome to RandomVerseGenerator.com, where we combine advanced AI technology
              with biblical wisdom to help you find verses that speak to your heart
              and situation. ✨
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold">Our Mission 🎯</h2>
              <p className="text-gray-600">
                Making God's Word accessible and relevant to everyone by combining
                AI technology with biblical understanding.
              </p>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold">Our Values ❤️</h2>
              <p className="text-gray-600">
                We believe in helping people connect with Scripture and find
                guidance and inspiration in God's Word.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-12 mb-16">
          <section className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">How It Works ⚡</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Our AI-powered platform analyzes your input and suggests
              relevant Bible verses that match your context. Perfect for
              daily devotion, study, or seeking guidance.
            </p>
          </section>

          <section className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">Our Commitment 🤝</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We're dedicated to helping you grow in your faith journey.
              Our tool is continuously updated to provide meaningful
              verses that inspire and guide.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}