import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import RiskVisualization from "./RiskVisualization";
import FinancialImpactChart from "./FinancialImpactChart";
import { RiskParameters, RiskResults } from "@/pages/Home";

interface RiskResultsDisplayProps {
  riskResults: RiskResults | null;
  riskParameters: RiskParameters;
  calculationComplete: boolean;
}

const RiskResultsDisplay = ({ 
  riskResults, 
  riskParameters,
  calculationComplete 
}: RiskResultsDisplayProps) => {
  if (!calculationComplete || !riskResults) {
    return (
      <div className="w-full md:w-1/2 space-y-6">
        <Card className="bg-white rounded-lg shadow-md">
          <CardContent className="p-6">
            <h2 
              className="text-xl font-semibold mb-4 text-[#2C3E50]"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Risk Assessment Results
            </h2>
            <p className="text-sm text-gray-600">
              Click "Calculate Risk" to see your organization's risk assessment results
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'text-[#2ECC71]';
      case 'Medium':
        return 'text-[#F39C12]';
      case 'High':
        return 'text-[#E74C3C]';
      default:
        return 'text-[#3498DB]';
    }
  };

  const getProgressColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-[#2ECC71]';
      case 'Medium':
        return 'bg-[#F39C12]';
      case 'High':
        return 'bg-[#E74C3C]';
      default:
        return 'bg-[#3498DB]';
    }
  };

  return (
    <div className="w-full md:w-1/2 space-y-6">
      {/* Summary Card */}
      <Card className="bg-white rounded-lg shadow-md">
        <CardContent className="p-6">
          <h2 
            className="text-xl font-semibold mb-4 text-[#2C3E50]"
            style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
          >
            Risk Assessment Results
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F8F9FA] rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Annual Risk Exposure</h3>
              <p 
                className="text-3xl font-bold text-[#E74C3C]"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              >
                ${riskResults.annualRiskExposure.toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#F8F9FA] rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Risk Level</h3>
              <p 
                className={`text-3xl font-bold ${getRiskLevelColor(riskResults.riskLevel)}`}
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              >
                {riskResults.riskLevel}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Risk Score</span>
              <span className="text-sm font-medium">{riskResults.riskScore}/100</span>
            </div>
            <Progress 
              value={riskResults.riskScore} 
              max={100} 
              className="w-full h-2.5 bg-gray-200"
            >
              <div className={`h-full ${getProgressColor(riskResults.riskLevel)}`} style={{ width: `${riskResults.riskScore}%` }} />
            </Progress>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Risk Breakdown</h3>
            <div className="bg-[#F8F9FA] rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Expected Annual Breaches</span>
                  <span className="font-medium">{riskResults.expectedAnnualBreaches.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Breach Probability</span>
                  <span className="font-medium">{(riskResults.annualBreachProbability * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Single Breach Impact</span>
                  <span className="font-medium">${riskParameters.financialSeverity}M</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Risk Visualization */}
      <Card className="bg-white rounded-lg shadow-md">
        <CardContent className="p-6">
          <h2 
            className="text-xl font-semibold mb-4 text-[#2C3E50]"
            style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
          >
            Risk Visualization
          </h2>
          <div className="h-64">
            <RiskVisualization riskParameters={riskParameters} />
          </div>
        </CardContent>
      </Card>
      
      {/* Financial Impact Chart */}
      <Card className="bg-white rounded-lg shadow-md">
        <CardContent className="p-6">
          <h2 
            className="text-xl font-semibold mb-4 text-[#2C3E50]"
            style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
          >
            Financial Impact
          </h2>
          <div className="h-48">
            <FinancialImpactChart 
              expectedLoss={riskResults.annualRiskExposure} 
              worstCase={riskResults.worstCase} 
              industryAverage={riskResults.industryAverage} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskResultsDisplay;
