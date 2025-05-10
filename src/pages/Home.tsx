import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Coffee, Check, Sparkles, BookOpen, BoxSelect as Select } from 'lucide-react';
import { genAI } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Select as SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SupportBox = () => (
  <Card className="p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 border-2 border-neutral-200 mb-8">
    <div className="text-center space-y-4">
      <Coffee className="h-12 w-12 mx-auto text-purple-500" />
      <h2 className="text-2xl font-bold">Support Our Work ❤️</h2>
      <p className="text-neutral-600 max-w-xl mx-auto">
        Help us maintain and improve our tool by supporting our API & hosting costs. 
        Your contribution helps keep our Bible verse generator free for everyone! 🙏
      </p>
      <a
        href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=random-verse-generator"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button 
          size="lg" 
          className="text-lg px-8 bg-purple-500 hover:bg-purple-600 text-white"
        >
          <Coffee className="mr-2 h-5 w-5" />
          Support Our Work 💜
        </Button>
      </a>
    </div>
  </Card>
);

const bibleTranslations = [
  { id: 'kjv', name: 'King James Version (KJV)' },
  { id: 'niv', name: 'New International Version (NIV)' },
  { id: 'esv', name: 'English Standard Version (ESV)' },
  { id: 'nlt', name: 'New Living Translation (NLT)' },
  { id: 'nkjv', name: 'New King James Version (NKJV)' },
];

const bibleBooks = [
  { id: 'any', name: 'Any Book' },
  { id: 'genesis', name: 'Genesis' },
  { id: 'exodus', name: 'Exodus' },
  { id: 'psalms', name: 'Psalms' },
  { id: 'proverbs', name: 'Proverbs' },
  { id: 'matthew', name: 'Matthew' },
  { id: 'john', name: 'John' },
  { id: 'romans', name: 'Romans' },
  { id: 'revelation', name: 'Revelation' },
];

export default function Home() {
  const [context, setContext] = useState('');
  const [translation, setTranslation] = useState('kjv');
  const [book, setBook] = useState('any');
  const [verse, setVerse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateVerse = async () => {
    if (!translation) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate a Bible verse ${book !== 'any' ? `from ${book}` : ''} that ${context ? `relates to: ${context}` : 'is inspiring'}. 
      Follow these requirements:
      - Use the ${bibleTranslations.find(t => t.id === translation)?.name} translation
      - Include the verse reference (book, chapter, verse)
      - Provide the complete verse text
      - Add a brief explanation of the verse's meaning
      - Format the response in markdown
      - Keep the explanation concise and clear
      The verse should be meaningful and relevant to the context provided.`;
      
      const result = await model.generateContent(prompt);
      setVerse(result.response.text().trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the verse');
      setVerse('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(verse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 py-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-neutral-800 leading-tight">
            Random Bible Verse Generator 📖
          </h1>
          <p className="text-xl text-neutral-600">
            Discover meaningful verses from God's Word ✨
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-4 sm:p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bible Translation
                  </label>
                  <SelectUI value={translation} onValueChange={setTranslation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select translation" />
                    </SelectTrigger>
                    <SelectContent>
                      {bibleTranslations.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectUI>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bible Book (Optional)
                  </label>
                  <SelectUI value={book} onValueChange={setBook}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select book" />
                    </SelectTrigger>
                    <SelectContent>
                      {bibleBooks.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectUI>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Context or Topic (Optional)
                </label>
                <Textarea
                  placeholder="✍️ What's on your mind? (e.g., love, faith, hope, guidance...)"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="min-h-[100px] text-lg border-2 focus:border-neutral-400"
                />
              </div>
              
              <Button 
                onClick={generateVerse}
                disabled={loading}
                className="w-full text-lg py-6 bg-purple-500 hover:bg-purple-600 text-white"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Finding Verse...
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-5 w-5" />
                    Generate Verse 📖
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {verse && (
          <div className="space-y-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-neutral-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Your Verse</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 hover:bg-neutral-50"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-purple-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="prose prose-neutral max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {verse}
                  </ReactMarkdown>
                </div>
              </div>
            </Card>
          </div>
        )}

        <SupportBox />

        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-neutral max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-neutral-800">
              Random Bible Verse Generator: Your Spiritual Guide 📖
            </h2>
            
            <div className="space-y-8">
              <p className="text-neutral-600 leading-relaxed">
                Discover meaningful Bible verses with ou random bible verse generator. 
                At RandomVerseGenerator.com, we've created a tool that helps you
                find relevant verses from God's Word that speak to your heart and situation.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Select className="h-6 w-6 text-neutral-600" />
                  Why Choose Our Verse Generator? 📖
                </h2>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-start">
                    <span className="mr-2">🎯</span>
                    <span>Multiple Bible translations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📝</span>
                    <span>Context-aware verse selection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span>Instant verse generation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🔍</span>
                    <span>Book-specific searches</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🛡️</span>
                    <span>Meaningful explanations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-neutral-600" />
                  Random Bible Verse Generator  Features ⚡
                </h2>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Popular translations</li>
                  <li>• Book selection</li>
                  <li>• Topic relevance</li>
                  <li>• Verse explanations</li>
                  <li>• Easy sharing</li>
                  <li>• Contextual matching</li>
                  <li>• And more!</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Perfect For Everyone 🎯
                </h2>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Bible Study Groups</li>
                  <li>• Personal Devotion</li>
                  <li>• Pastors & Teachers</li>
                  <li>• Social Media Sharing</li>
                  <li>• Daily Inspiration</li>
                  <li>• Spiritual Growth</li>
                  <li>• Prayer Time</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  AI-Powered Features ⚡
                </h2>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Smart verse selection</li>
                  <li>• Context understanding</li>
                  <li>• Clear explanations</li>
                  <li>• Relevant matching</li>
                  <li>• Multiple translations</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Usage Guidelines 💡
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-neutral-600">
                  <li>Choose your preferred translation</li>
                  <li>Select a specific book (optional)</li>
                  <li>Add context or topic</li>
                  <li>Generate your verse</li>
                  <li>Read and reflect</li>
                </ol>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Benefits of Our Free Random Bible Verse Generator 🚀
                </h2>
                <p className="text-neutral-600">
                  Our advanced Bible verse generator provides:
                </p>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li>• Spiritual guidance</li>
                  <li>• Daily inspiration</li>
                  <li>• Biblical wisdom</li>
                  <li>• Verse understanding</li>
                  <li>• Personal growth</li>
                </ul>
              </div>
            </div>
          </article>
        </div>

        <SupportBox />
      </div>
    </div>
  );
}