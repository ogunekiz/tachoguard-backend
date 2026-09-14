const express = require('express');
const router = express.Router();
const MockDb = require('../data/mockTelemetryDatabase');
const { TachographData, ActivityRecord } = require('../models/tachographModel');
const RuleEngine = require('../services/rules/ruleEngine');
const RiskCalculator = require('../services/risk/riskCalculator');

router.get('/history', (req, res) => {
  const records = MockDb.generateHistoricalData();
  res.json({
    success: true,
    count: records.length,
    data: records
  });
});

router.get('/sync', (req, res) => {
  const drivers = MockDb.drivers;
  const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
  
  const data = new TachographData(Buffer.alloc(512));
  data.driver.name = randomDriver.name;
  data.driver.cardNumber = randomDriver.cardNumber;
  data.vehicle.plate = randomDriver.plate;
  data.vehicle.makeModel = randomDriver.makeModel;

  const drivingDuration = 285; // 4.5 saat sınırını 15 dk aşım
  data.activities = [
    new ActivityRecord('DRIVING', new Date().toISOString(), drivingDuration),
    new ActivityRecord('REST', new Date().toISOString(), 45)
  ];

  data.violations = RuleEngine.evaluate(data.activities);
  data.riskAnalysis = RiskCalculator.calculateRisk(data.violations, data.activities);

  res.json({
    success: true,
    data: data
  });
});

module.exports = router;