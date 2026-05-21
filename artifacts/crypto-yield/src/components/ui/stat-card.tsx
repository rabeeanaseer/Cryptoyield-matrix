import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, subtitle, icon, trend }: StatCardProps) {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{title}</p>
            <div className="text-3xl font-bold tracking-tight text-foreground">{value}</div>
            {(subtitle || trend) && (
              <div className="flex items-center gap-2 mt-1">
                {trend && (
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded-sm ${trend.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {trend.isPositive ? '+' : ''}{trend.value}%
                  </span>
                )}
                {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
              </div>
            )}
          </div>
          {icon && <div className="p-3 bg-muted rounded-md text-primary">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
