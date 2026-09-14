function generateMockDddBuffer() {
  const headerBytes = Buffer.from('TACHO_G2V2_HEADER_MOCK', 'utf8');
  const driverIdBytes = Buffer.from('TR99887765432100', 'utf8'); // Mock Driver Card Number
  const vehicleRegBytes = Buffer.from('16ABC123', 'utf8');       // Vehicle Plate

  const activityData = Buffer.alloc(32);
  activityData.writeUInt8(0x01, 0); // 01: Driving block start
  activityData.writeUInt32BE(1728000000, 1); // Timestamp mock
  activityData.writeUInt16BE(270, 5);  // Duration in minutes (4h 30m -> 270 mins)

  activityData.writeUInt8(0x03, 10); // 03: Rest block start
  activityData.writeUInt32BE(1728018000, 11);
  activityData.writeUInt16BE(60, 15);  // Duration (68 mins / violation context)

  const fullBuffer = Buffer.concat([
    headerBytes,
    Buffer.from([0xFF, 0xEE]), // Marker
    driverIdBytes,
    vehicleRegBytes,
    activityData
  ]);

  return fullBuffer;
}

module.exports = { generateMockDddBuffer };