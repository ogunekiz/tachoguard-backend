const dddParser = require('./parser/dddParser');
const ruleEngine = require('./rules/ruleEngine');
const riskCalculator = require('./risk/riskCalculator');
const { generateMockDddBuffer } = require('../utils/dddGenerator');
const mockTelemetryDatabase = require('../data/mockTelemetryDatabase');

class TelemetryService {
  fetchLatestTelemetry() {
    const rawBuffer = generateMockDddBuffer();
    const parsedData = dddParser.parse(rawBuffer);
    const violations = ruleEngine.evaluate(parsedData.activities);
    const riskAnalysis = riskCalculator.calculateRisk(violations);
    
    return {
      ...parsedData,
      violations,
      riskAnalysis
    };
  }

  getAllHistory() {
    // 10 sürücünün mock tarihsel kayıtlarını döndürür
    return mockTelemetryDatabase.generateHistoricalData();
  }
}

module.exports = new TelemetryService();