class TachographData {
  constructor(rawBuffer) {
    this.rawSize = rawBuffer.length;
    this.extractedAt = new Date().toISOString();
    this.driver = new DriverInfo();
    this.vehicle = new VehicleInfo();
    this.activities = [];
  }
}

class DriverInfo {
  constructor() {
    this.name = "Ahmet Yılmaz";
    this.cardNumber = "TR-99887765432100";
    this.licenseClass = "CE";
  }
}

class VehicleInfo {
  constructor() {
    this.plate = "16 BURSA 34";
    this.makeModel = "Ford F-MAX 500";
    this.unitId = "TC-VDO-DTCO-1381";
  }
}

class ActivityRecord {
  constructor(type, startTime, durationMinutes, isViolation = false) {
    this.type = type; // 'DRIVING', 'REST', 'WORKING', 'AVAILABILITY'
    this.startTime = startTime;
    this.durationMinutes = durationMinutes;
    this.isViolation = isViolation;
  }
}

module.exports = { TachographData, ActivityRecord };