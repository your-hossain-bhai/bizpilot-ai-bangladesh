import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Sparkles } from 'lucide-react';

const templates = [
  {
    id: 1,
    title: 'Business Proposal',
    description: 'Professional proposal template for pitching your business ideas',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Pitch Deck',
    description: 'Investor-ready pitch deck with all essential slides',
    icon: Sparkles,
  },
  {
    id: 3,
    title: 'Financial Report',
    description: 'Comprehensive financial report template for stakeholders',
    icon: FileText,
  },
  {
    id: 4,
    title: 'Business Plan',
    description: 'Complete business plan structure with guidance',
    icon: FileText,
  },
];

export default function Templates() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Business Templates</h1>
        <p className="text-muted-foreground">Professional templates to help you succeed</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <template.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
