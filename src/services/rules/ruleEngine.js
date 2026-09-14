const { MAX_CONTINUOUS_DRIVING_MINUTES } = require('../../constants/drivingRules');

class RuleEngine {
  evaluate(activities) {
    const violations = [];

    activities.forEach((activity) => {
      if (activity.type === 'DRIVING') {
        if (activity.durationMinutes > MAX_CONTINUOUS_DRIVING_MINUTES) {
          const excessMinutes = activity.durationMinutes - MAX_CONTINUOUS_DRIVING_MINUTES;
          violations.push({
            ruleId: 'CONTINUOUS_DRIVING_LIMIT',
            severity: 'HIGH',
            title: 'Kesintisiz Sürüş Süresi Aşıldı',
            description: `Sürücü, kesintisiz yasal sürüş sınırını ${excessMinutes} dakika aştı.`,
            allowedMinutes: MAX_CONTINUOUS_DRIVING_MINUTES,
            actualMinutes: activity.durationMinutes,
            excessMinutes: excessMinutes,
            timestamp: activity.startTime
          });
        }
      }
    });

    return violations;
  }
}

module.exports = new RuleEngine();