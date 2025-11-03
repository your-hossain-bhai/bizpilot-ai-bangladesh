import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function SmartTax() {
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [taxResult, setTaxResult] = useState<{
    taxable: number;
    tax: number;
    netProfit: number;
  } | null>(null);

  const calculateTax = () => {
    const incomeNum = parseFloat(income) || 0;
    const expenseNum = parseFloat(expense) || 0;

    if (incomeNum <= 0) {
      toast.error('Please enter a valid income amount');
      return;
    }

    const taxable = incomeNum - expenseNum;
    const taxRate = 0.15; // 15% tax rate for Bangladesh SMEs
    const tax = taxable > 0 ? taxable * taxRate : 0;
    const netProfit = taxable - tax;

    setTaxResult({
      taxable,
      tax,
      netProfit,
    });

    toast.success('Tax calculated successfully!');
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">SmartTax Calculator</h1>
        <p className="text-muted-foreground">Calculate your tax liability and plan ahead</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Tax Calculator
            </CardTitle>
            <CardDescription>Enter your financial details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="income">Total Annual Income</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter your total income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense">Total Annual Expenses</Label>
              <Input
                id="expense"
                type="number"
                placeholder="Enter your total expenses"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
              />
            </div>
            <Button onClick={calculateTax} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Tax
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-secondary" />
              Tax Summary
            </CardTitle>
            <CardDescription>Your calculated tax breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {taxResult ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Taxable Income</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(taxResult.taxable)}</p>
                </div>
                <div className="rounded-lg bg-accent/10 p-4">
                  <p className="text-sm text-muted-foreground">Tax Payable (15%)</p>
                  <p className="text-2xl font-bold text-accent">{formatCurrency(taxResult.tax)}</p>
                </div>
                <div className="rounded-lg bg-secondary/10 p-4">
                  <p className="text-sm text-muted-foreground">Net Profit After Tax</p>
                  <p className="text-2xl font-bold text-secondary">{formatCurrency(taxResult.netProfit)}</p>
                </div>
                <div className="flex items-start gap-2 rounded-lg border border-border bg-card p-4">
                  <Calendar className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Payment Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Tax payment is typically due on November 30th each year. Make sure to file on time to avoid penalties.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-center">
                <div>
                  <Calculator className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Enter your income and expenses to calculate your tax liability
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Planning Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-secondary">•</span>
              Keep detailed records of all business expenses to maximize deductions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">•</span>
              Consider quarterly tax payments to avoid year-end cash flow issues
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">•</span>
              Consult with a tax professional for complex business structures
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">•</span>
              Take advantage of small business tax incentives in Bangladesh
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
