import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { RiskParameters } from "@/pages/Home";

interface RiskVisualizationProps {
  riskParameters: RiskParameters;
}

const RiskVisualization = ({ riskParameters }: RiskVisualizationProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Normalize values for radar chart (0-100 scale)
    const attacksNormalized = riskParameters.numAttacks / 5; // Scale to 0-100
    const spearphishingNormalized = riskParameters.spearphishingProb;
    const malwareNormalized = riskParameters.malwareProb;
    const persistenceNormalized = riskParameters.persistenceProb;
    const severityNormalized = riskParameters.financialSeverity * 2; // Scale to 0-100

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: [
            'Attack Volume',
            'Spearphishing Success',
            'Malware Success',
            'Persistence Success',
            'Financial Severity'
          ],
          datasets: [{
            label: 'Risk Profile',
            data: [
              attacksNormalized,
              spearphishingNormalized,
              malwareNormalized,
              persistenceNormalized,
              severityNormalized
            ],
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: 'rgba(52, 152, 219, 1)',
            pointBackgroundColor: 'rgba(52, 152, 219, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
          }]
        },
        options: {
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0,
              suggestedMax: 100
            }
          },
          maintainAspectRatio: false
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [riskParameters]);

  return <canvas ref={chartRef} />;
};

export default RiskVisualization;
