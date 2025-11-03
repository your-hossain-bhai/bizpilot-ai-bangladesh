import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2, Mail, MapPin, DollarSign, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Investor {
  id: string;
  name: string;
  sector: string;
  funding_range_min: number;
  funding_range_max: number;
  location: string;
  contact_email: string;
  description: string;
}

export default function Investors() {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filteredInvestors, setFilteredInvestors] = useState<Investor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestors();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = investors.filter(
        (inv) =>
          inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInvestors(filtered);
    } else {
      setFilteredInvestors(investors);
    }
  }, [searchTerm, investors]);

  const fetchInvestors = async () => {
    try {
      const { data, error } = await supabase
        .from('investors')
        .select('*')
        .order('name');

      if (error) throw error;
      setInvestors(data || []);
      setFilteredInvestors(data || []);
    } catch (error: any) {
      toast.error('Failed to load investors');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading investors...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Investor Network</h1>
        <p className="text-muted-foreground">Connect with investors who match your business needs</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, sector, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredInvestors.map((investor) => (
          <Card key={investor.id} className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary">{investor.sector}</Badge>
              </div>
              <CardTitle className="text-xl">{investor.name}</CardTitle>
              <CardDescription className="line-clamp-2">{investor.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {formatCurrency(investor.funding_range_min)} - {formatCurrency(investor.funding_range_max)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{investor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${investor.contact_email}`}
                    className="text-primary hover:underline"
                  >
                    {investor.contact_email}
                  </a>
                </div>
              </div>
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Contact Investor
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvestors.length === 0 && (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">No investors found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
}
