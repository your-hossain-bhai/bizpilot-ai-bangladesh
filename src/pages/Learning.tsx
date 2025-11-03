import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText, TrendingUp } from 'lucide-react';

const resources = [
  {
    id: 1,
    title: 'Starting Your SME in Bangladesh',
    type: 'Guide',
    duration: '15 min read',
    icon: BookOpen,
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Financial Management Basics',
    type: 'Video Course',
    duration: '2 hours',
    icon: Video,
    level: 'Beginner',
  },
  {
    id: 3,
    title: 'Scaling Your Business',
    type: 'Article',
    duration: '10 min read',
    icon: FileText,
    level: 'Intermediate',
  },
  {
    id: 4,
    title: 'Tax Planning Strategies',
    type: 'Guide',
    duration: '20 min read',
    icon: TrendingUp,
    level: 'Advanced',
  },
  {
    id: 5,
    title: 'Investor Pitching Masterclass',
    type: 'Video Course',
    duration: '3 hours',
    icon: Video,
    level: 'Intermediate',
  },
  {
    id: 6,
    title: 'Digital Marketing for SMEs',
    type: 'Article',
    duration: '12 min read',
    icon: FileText,
    level: 'Beginner',
  },
];

export default function Learning() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Learning Hub</h1>
        <p className="text-muted-foreground">Educational resources to grow your business knowledge</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <resource.icon className="h-6 w-6 text-secondary" />
                </div>
                <Badge variant="outline">{resource.level}</Badge>
              </div>
              <CardTitle className="text-xl">{resource.title}</CardTitle>
              <CardDescription>
                {resource.type} • {resource.duration}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Click to access this learning resource and expand your business knowledge.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
