import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from 'lucide-react';

const Documentation = () => {
  const [userManual, setUserManual] = useState<string>('');
  const [technicalGuide, setTechnicalGuide] = useState<string>('');
  const [logScaleGuide, setLogScaleGuide] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>("user-manual");

  // Fetch documentation content
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const userManualResponse = await fetch('/docs/user_manual.md');
        const userManualText = await userManualResponse.text();
        setUserManual(userManualText);

        const techGuideResponse = await fetch('/docs/technical_reference.md');
        const techGuideText = await techGuideResponse.text();
        setTechnicalGuide(techGuideText);

        const logScaleResponse = await fetch('/docs/logarithmic_scale_guide.md');
        const logScaleText = await logScaleResponse.text();
        setLogScaleGuide(logScaleText);
      } catch (error) {
        console.error('Error fetching documentation:', error);
      }
    };

    fetchDocs();
  }, []);

  // Simple Markdown renderer helper
  const renderMarkdown = (markdown: string) => {
    // Replace headers
    let html = markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 text-[#2C3E50] mt-6">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3 text-[#2C3E50] mt-5">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2 text-[#2C3E50] mt-4">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-medium mb-2 text-[#2C3E50] mt-3">$1</h4>');
    
    // Replace bold and italic
    html = html
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace lists
    html = html
      .replace(/^\s*\d+\.\s(.*$)/gim, '<ol class="list-decimal ml-6 mb-4"><li>$1</li></ol>')
      .replace(/^\s*-\s(.*$)/gim, '<ul class="list-disc ml-6 mb-4"><li>$1</li></ul>');
    
    // Fix list items - collapse adjacent list items
    html = html
      .replace(/<\/ol>\s*<ol class="list-decimal ml-6 mb-4">/g, '')
      .replace(/<\/ul>\s*<ul class="list-disc ml-6 mb-4">/g, '');
    
    // Replace code blocks
    html = html
      .replace(/```([^`]+)```/g, '<pre class="bg-gray-100 p-4 rounded-md overflow-x-auto my-4 text-sm"><code>$1</code></pre>');
    
    // Replace inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');
    
    // Replace paragraphs
    html = html
      .replace(/^\s*([^\n<][^\n]+[^\n<])\s*$/gim, '<p class="mb-4">$1</p>');
    
    // Replace horizontal rules
    html = html.replace(/^---$/gim, '<hr class="my-6 border-t border-gray-300">');

    return html;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#2C3E50]">Documentation</h1>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Assessment
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="user-manual">User Manual</TabsTrigger>
            <TabsTrigger value="technical">Technical Guide</TabsTrigger>
            <TabsTrigger value="log-scale">Log Scale Guide</TabsTrigger>
          </TabsList>

          <Card className="bg-white rounded-lg shadow-md">
            <CardContent className="p-6">
              <TabsContent value="user-manual" className="prose max-w-none">
                <div className="documentation-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(userManual) }} />
              </TabsContent>
              
              <TabsContent value="technical" className="prose max-w-none">
                <div className="documentation-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(technicalGuide) }} />
              </TabsContent>
              
              <TabsContent value="log-scale" className="prose max-w-none">
                <div className="documentation-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(logScaleGuide) }} />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;