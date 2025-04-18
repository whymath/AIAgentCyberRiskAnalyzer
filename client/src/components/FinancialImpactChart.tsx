import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface FinancialImpactChartProps {
  expectedLoss: number;
  worstCase: number;
  industryAverage: number;
}

const FinancialImpactChart = ({ 
  expectedLoss, 
  worstCase, 
  industryAverage 
}: FinancialImpactChartProps) => {
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
        type: 'bar',
        data: {
          labels: ['Expected Loss', 'Worst Case', 'Industry Average'],
          datasets: [{
            label: 'Financial Impact ($M)',
            data: [
              parseFloat(expectedLoss.toFixed(2)),
              parseFloat(worstCase.toFixed(2)),
              parseFloat(industryAverage.toFixed(2))
            ],
            backgroundColor: [
              'rgba(52, 152, 219, 0.7)', // Accent blue
              'rgba(231, 76, 60, 0.7)',  // Secondary red
              'rgba(46, 204, 113, 0.7)'  // Green
            ],
            borderColor: [
              'rgba(52, 152, 219, 1)',
              'rgba(231, 76, 60, 1)',
              'rgba(46, 204, 113, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount in $M'
              }
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
  }, [expectedLoss, worstCase, industryAverage]);

  return <canvas ref={chartRef} />;
};

export default FinancialImpactChart;
