const aiService = require('../services/ai/aiService');

class AiController {
  async explain(req, res) {
    try {
      const riskData = req.body;
      const result = await aiService.explainRisk(riskData);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new AiController();