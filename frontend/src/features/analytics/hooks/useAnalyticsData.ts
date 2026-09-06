import { useState, useEffect } from 'react';
import { analyticsService } from '../../../services/analytics.service';
import { SalesTrendPoint, ProductPerformance, ProductVelocity, DecisionRecommendation } from '../../../types/analytics';

export interface AnalyticsData {
  kpis: any | null;
  trends: SalesTrendPoint[];
  performance: ProductPerformance[];
  velocity: ProductVelocity[];
  inventory: any | null;
  recommendations: DecisionRecommendation[];
}

export const useAnalyticsData = () => {
  const [data, setData] = useState<AnalyticsData>({
    kpis: null,
    trends: [],
    performance: [],
    velocity: [],
    inventory: null,
    recommendations: [],
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch everything in parallel
        const [
          kpis,
          trends,
          performance,
          velocity,
          inventory,
          recommendations
        ] = await Promise.all([
          analyticsService.getKpis(),
          analyticsService.getTrends(),
          analyticsService.getPerformance(),
          analyticsService.getVelocity(),
          analyticsService.getInventory(),
          analyticsService.getDecisionSupportRecommendations(),
        ]);

        if (mounted) {
          setData({ kpis, trends, performance, velocity, inventory, recommendations });
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load analytics data');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, []);

  return { data, isLoading, error };
};

