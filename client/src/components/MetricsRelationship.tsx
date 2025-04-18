import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { PrimaryMetrics, RiskParameters } from "@/pages/Home";

interface MetricsRelationshipProps {
  primaryMetrics: PrimaryMetrics;
  derivedMetrics: RiskParameters;
}

const MetricsRelationship = ({ primaryMetrics, derivedMetrics }: MetricsRelationshipProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

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
            'AgentHarm Score',
            'AgentBench Score',
            'SWE-Bench % Resolved',
            'Number of Attacks',
            'Spearphishing Success',
            'Malware Success',
            'Persistence Success',
            'Financial Severity'
          ],
          datasets: [
            {
              label: 'Primary Metrics',
              data: [
                primaryMetrics.agentHarmScore,
                primaryMetrics.overallAgentBench * 10, // Scale 0-10 to 0-100 for radar chart
                primaryMetrics.sweBenchResolved,
                0, 0, 0, 0, 0 // Placeholders for derived metrics
              ],
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              borderColor: 'rgba(52, 152, 219, 1)',
              pointBackgroundColor: 'rgba(52, 152, 219, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
            },
            {
              label: 'Derived Risk Parameters',
              data: [
                0, 0, 0, // Placeholders for primary metrics
                derivedMetrics.numAttacks / 5, // Scale to 0-100
                derivedMetrics.spearphishingProb,
                derivedMetrics.malwareProb,
                derivedMetrics.persistenceProb,
                derivedMetrics.financialSeverity * 2 // Scale to 0-100
              ],
              backgroundColor: 'rgba(231, 76, 60, 0.2)',
              borderColor: 'rgba(231, 76, 60, 1)',
              pointBackgroundColor: 'rgba(231, 76, 60, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(231, 76, 60, 1)'
            }
          ]
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
  }, [primaryMetrics, derivedMetrics]);

  return <canvas ref={chartRef} />;
};

export default MetricsRelationship;