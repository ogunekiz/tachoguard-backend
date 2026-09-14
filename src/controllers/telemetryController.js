const telemetryService = require('../services/telemetryService');

class TelemetryController {
  getLatestTelemetry(req, res) {
    try {
      const data = telemetryService.fetchLatestTelemetry();
      res.status(200).json({
        success: true,
        message: "Binary tachograph data successfully parsed from remote unit.",
        data
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  getAllHistory(req, res) {
    try {
      const data = telemetryService.getAllHistory ? telemetryService.getAllHistory() : [telemetryService.fetchLatestTelemetry()];
      res.status(200).json({
        success: true,
        message: "Historical telemetry records successfully retrieved.",
        data
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new TelemetryController();