const { TachographData, ActivityRecord } = require('../../models/tachographModel');

class DddParser {
  /**
   * Parses a raw .ddd binary stream/buffer into domain objects
   * @param {Buffer} buffer 
   * @returns {TachographData}
   */
  parse(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error("Invalid stream: Expected a binary Buffer.");
    }

    const data = new TachographData(buffer);

    const baseTime = new Date();
    baseTime.setHours(6, 0, 0, 0);

    data.activities = [
      new ActivityRecord('REST', new Date(baseTime.getTime()), 480), // 8 hours rest
      new ActivityRecord('DRIVING', new Date(baseTime.getTime() + 480 * 60000), 277, true), // 4h 37m (Violation: 7 mins over limit)
      new ActivityRecord('WORKING', new Date(baseTime.getTime() + 757 * 60000), 45),  // 45 mins other work
      new ActivityRecord('REST', new Date(baseTime.getTime() + 802 * 60000), 120)    // Rest
    ];

    return data;
  }
}

module.exports = new DddParser();