import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { calculateRisk } from "@/lib/riskCalculator";
import { RiskParameters, RiskResults } from "@/pages/Home";

interface RiskInputFormProps {
  riskParameters: RiskParameters;
  setRiskParameters: React.Dispatch<React.SetStateAction<RiskParameters>>;
  setRiskResults: React.Dispatch<React.SetStateAction<RiskResults | null>>;
  setCalculationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  defaultParameters: RiskParameters;
  readOnly?: boolean;
}

const RiskInputForm = ({ 
  riskParameters, 
  setRiskParameters, 
  setRiskResults,
  setCalculationComplete,
  defaultParameters,
  readOnly = false
}: RiskInputFormProps) => {
  const handleCalculate = () => {
    const results = calculateRisk(riskParameters);
    setRiskResults(results);
    setCalculationComplete(true);
  };

  const handleReset = () => {
    if (!readOnly) {
      setRiskParameters(defaultParameters);
    }
  };

  const handleSliderChange = (name: keyof RiskParameters, value: number[]) => {
    if (!readOnly) {
      setRiskParameters((prev) => ({
        ...prev,
        [name]: value[0]
      }));
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardContent className="p-6">
        <h2 
          className="text-xl font-semibold mb-4 text-[#2C3E50]"
          style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
        >
          Risk Parameters
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {readOnly 
            ? "These parameters are automatically calculated from the AI benchmark metrics" 
            : "Enter the risk parameters to calculate cybersecurity risk exposure for your organization"}
        </p>
        
        {readOnly && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <AlertDescription>
              These values are derived from the AI Benchmark Metrics. Switch to the "AI Benchmark Metrics" tab to modify them.
            </AlertDescription>
          </Alert>
        )}
        
        <form className="space-y-6">
          {/* Number of Attacks Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="numAttacks" className="block text-sm font-medium text-[#34495E]">
                Number of Attacks (per year)
              </label>
              <span className="text-sm font-semibold">{riskParameters.numAttacks}</span>
            </div>
            <Slider
              id="numAttacks"
              min={1}
              max={500}
              step={1}
              value={[riskParameters.numAttacks]}
              onValueChange={(value) => handleSliderChange("numAttacks", value)}
              className={`w-full ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={readOnly}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>500</span>
            </div>
          </div>
          
          {/* Spearphishing Success Probability */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="spearphishingProb" className="block text-sm font-medium text-[#34495E]">
                Spearphishing Success Probability
              </label>
              <span className="text-sm font-semibold">{riskParameters.spearphishingProb}%</span>
            </div>
            <Slider
              id="spearphishingProb"
              min={0}
              max={100}
              step={1}
              value={[riskParameters.spearphishingProb]}
              onValueChange={(value) => handleSliderChange("spearphishingProb", value)}
              className={`w-full ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={readOnly}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* Malware Success Probability */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="malwareProb" className="block text-sm font-medium text-[#34495E]">
                Malware Success Probability
              </label>
              <span className="text-sm font-semibold">{riskParameters.malwareProb}%</span>
            </div>
            <Slider
              id="malwareProb"
              min={0}
              max={100}
              step={1}
              value={[riskParameters.malwareProb]}
              onValueChange={(value) => handleSliderChange("malwareProb", value)}
              className={`w-full ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={readOnly}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* Persistence Success Probability */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="persistenceProb" className="block text-sm font-medium text-[#34495E]">
                Persistence Success Probability
              </label>
              <span className="text-sm font-semibold">{riskParameters.persistenceProb}%</span>
            </div>
            <Slider
              id="persistenceProb"
              min={0}
              max={100}
              step={1}
              value={[riskParameters.persistenceProb]}
              onValueChange={(value) => handleSliderChange("persistenceProb", value)}
              className={`w-full ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={readOnly}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* Financial Severity */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="financialSeverity" className="block text-sm font-medium text-[#34495E]">
                Financial Severity (per breach in $M)
              </label>
              <span className="text-sm font-semibold">${riskParameters.financialSeverity}M</span>
            </div>
            <Slider
              id="financialSeverity"
              min={1}
              max={50}
              step={1}
              value={[riskParameters.financialSeverity]}
              onValueChange={(value) => handleSliderChange("financialSeverity", value)}
              className={`w-full ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={readOnly}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$1M</span>
              <span>$50M</span>
            </div>
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
              className={`px-6 py-3 bg-gray-300 hover:bg-gray-400 text-[#34495E] rounded-md font-medium transition ${readOnly ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={readOnly}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RiskInputForm;
