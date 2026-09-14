class RiskCalculator {
  /**
   * Calculates driver risk score and analytical factors
   * @param {Array} violations 
   * @returns {Object} risk analysis data
   */
  calculateRisk(violations) {
    let baseScore = 10; // Clean baseline score
    
    let drivingRisk = 20;
    let restRisk = 15;
    let violationRisk = 10;

    if (violations.length > 0) {
      violations.forEach(v => {
        if (v.severity === 'HIGH') {
          baseScore += 35 * (v.excessMinutes / 60);
          drivingRisk += 40;
          violationRisk += 50;
        }
      });
    }

    // Clamp score between 0 and 100
    const finalScore = Math.min(Math.round(baseScore), 100);
    
    let riskLevel = 'LOW';
    if (finalScore > 70) riskLevel = 'HIGH';
    else if (finalScore > 40) riskLevel = 'MEDIUM';

    return {
      score: finalScore,
      level: riskLevel,
      factors: {
        drivingRisk: Math.min(drivingRisk, 100),
        restRisk: Math.min(restRisk, 100),
        violationRisk: Math.min(violationRisk, 100)
      }
    };
  }
}

module.exports = new RiskCalculator();