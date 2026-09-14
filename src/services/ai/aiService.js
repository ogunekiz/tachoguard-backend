class AiService {
  /**
   * Generates executive summary and risk explanation using Gemini AI or Mock Fallback
   * @param {Object} riskData 
   * @returns {Object} AI summary and source
   */

  async explainRisk(riskData) {
    const { score, level } = riskData.riskAnalysis;
    const violationCount = riskData.violations.length;
    const driverName = riskData.driver.name;

    let mockSummary = "";
    if (level === 'HIGH') {
      mockSummary = `Sürücü ${driverName}, son 28 günlük periyotta yüksek risk profili (${score}/100) sergilemektedir. Sistem tarafından ${violationCount} adet kritik mevzuat ihlali tespit edilmiş olup, özellikle kesintisiz sürüş sürelerinin aşılması öncelikli risk faktörüdür.`;
    } else {
      mockSummary = `Sürücü ${driverName} genel olarak uyumlu bir sürüş profili çizmektedir. Risk skoru ${score} seviyesinde olup olağan dışı büyük bir ihlal tespit edilmemiştir.`;
    }

    return {
      source: 'smart-mock-ai',
      summary: mockSummary
    };
  }
}

module.exports = new AiService();