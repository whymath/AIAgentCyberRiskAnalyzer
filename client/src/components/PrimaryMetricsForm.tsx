import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import MetricsRelationship from "./MetricsRelationship";
import LogScaleSlider from "./LogScaleSlider";
import { useState, useEffect } from "react";
import { calculateRisk } from "@/lib/riskCalculator";
import { RiskResults, PrimaryMetrics, calculateDerivedMetrics } from "@/pages/Home";

interface PrimaryMetricsFormProps {
  primaryMetrics: PrimaryMetrics;
  setPrimaryMetrics: React.Dispatch<React.SetStateAction<PrimaryMetrics>>;
  setRiskResults: React.Dispatch<React.SetStateAction<RiskResults | null>>;
  setCalculationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  defaultPrimaryMetrics: PrimaryMetrics;
}

const PrimaryMetricsForm = ({ 
  primaryMetrics, 
  setPrimaryMetrics, 
  setRiskResults,
  setCalculationComplete,
  defaultPrimaryMetrics 
}: PrimaryMetricsFormProps) => {
  const [derivedParameters, setDerivedParameters] = useState(calculateDerivedMetrics(primaryMetrics));
  
  // Update derived parameters when primary metrics change
  useEffect(() => {
    setDerivedParameters(calculateDerivedMetrics(primaryMetrics));
  }, [primaryMetrics]);

  const handleCalculate = () => {
    // Calculate risk results based on derived parameters
    const results = calculateRisk(derivedParameters);
    
    setRiskResults(results);
    setCalculationComplete(true);
  };

  const handleReset = () => {
    setPrimaryMetrics(defaultPrimaryMetrics);
  };

  const handleSliderChange = (name: keyof PrimaryMetrics, value: number[]) => {
    setPrimaryMetrics((prev) => ({
      ...prev,
      [name]: value[0]
    }));
  };
  
  const handleLogSliderChange = (name: keyof PrimaryMetrics, value: number) => {
    setPrimaryMetrics((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardContent className="p-6">
        <h2 
          className="text-xl font-semibold mb-4 text-[#2C3E50]"
          style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
        >
          AI Benchmark Metrics
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Adjust the AI benchmark metrics to automatically calculate risk parameters and assess cybersecurity risks
        </p>
        
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            These primary metrics determine the derived risk parameters shown in the "Risk Parameters" tab.
          </AlertDescription>
        </Alert>
        
        <div className="mb-6 p-2 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium mb-2 text-[#34495E]">Parameters Relationship</h3>
          <div className="h-64">
            <MetricsRelationship 
              primaryMetrics={primaryMetrics}
              derivedMetrics={derivedParameters}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500 italic text-center">
            Radar chart showing the relationship between primary AI metrics and derived risk parameters
          </div>
        </div>
        
        <form className="space-y-6">
          {/* AgentHarm Average Score */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="agentHarmScore" className="block text-sm font-medium text-[#34495E]">
                AgentHarm Average Score
              </label>
              <span className="text-sm font-semibold">{primaryMetrics.agentHarmScore}%</span>
            </div>
            <Slider
              id="agentHarmScore"
              min={0}
              max={100}
              step={1}
              value={[primaryMetrics.agentHarmScore]}
              onValueChange={(value) => handleSliderChange("agentHarmScore", value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 italic">
              Higher scores indicate greater vulnerability to harmful prompts
            </p>
          </div>
          
          {/* Overall AgentBench (with logarithmic scale) */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="overallAgentBench" className="block text-sm font-medium text-[#34495E]">
                Overall AgentBench Score (Log Scale)
              </label>
              <span className="text-sm font-semibold">{primaryMetrics.overallAgentBench.toFixed(2)}</span>
            </div>
            <LogScaleSlider
              id="overallAgentBench"
              min={0.1}
              max={10}
              step={0.01}
              value={primaryMetrics.overallAgentBench}
              onChange={(value) => handleLogSliderChange("overallAgentBench", value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.1</span>
              <span>10.0</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="text-blue-500">Logarithmic Scale</span>
              <span>Exponential Improvement →</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 italic">
              Higher scores indicate greater agent capabilities which can increase risk surface area.
              Small improvements at higher scores represent significant capability jumps.
            </p>
          </div>
          
          {/* SWE-Bench % Resolved */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="sweBenchResolved" className="block text-sm font-medium text-[#34495E]">
                SWE-Bench % Resolved
              </label>
              <span className="text-sm font-semibold">{primaryMetrics.sweBenchResolved}%</span>
            </div>
            <Slider
              id="sweBenchResolved"
              min={0}
              max={100}
              step={1}
              value={[primaryMetrics.sweBenchResolved]}
              onValueChange={(value) => handleSliderChange("sweBenchResolved", value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 italic">
              Higher scores indicate greater code generation capabilities, increasing potential exploitation risks
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-[#34495E]">Derived Risk Parameters:</h3>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Number of Attacks: <span className="font-medium">{derivedParameters.numAttacks}</span></li>
              <li>Spearphishing Success: <span className="font-medium">{derivedParameters.spearphishingProb}%</span></li>
              <li>Malware Success: <span className="font-medium">{derivedParameters.malwareProb}%</span></li>
              <li>Persistence Success: <span className="font-medium">{derivedParameters.persistenceProb}%</span></li>
              <li>Financial Severity: <span className="font-medium">${derivedParameters.financialSeverity}M</span></li>
            </ul>
          </div>
          
          <div className="flex space-x-4">
            <Button
              type="button"
              onClick={handleCalculate}
              className="px-6 py-3 bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-white rounded-md font-medium transition w-full"
            >
              Calculate Risk
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              variant="outline"
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-[#34495E] rounded-md font-medium transition"
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrimaryMetricsForm;