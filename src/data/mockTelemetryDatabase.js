const { TachographData, ActivityRecord } = require('../models/tachographModel');
const RuleEngine = require('../services/rules/ruleEngine');
const RiskCalculator = require('../services/risk/riskCalculator');

class MockTelemetryDatabase {
  constructor() {
    this.drivers = [
      { 
        name: "Ahmet Yılmaz", cardNumber: "TR-99887765432100", plate: "16 BRS 34", makeModel: "Ford F-MAX 500", 
        route: { 
          start: [40.2250, 28.9850], end: [41.0150, 28.9750], name: "Bursa Nilüfer OSB - İstanbul Ambarlı Limanı",
          restArea: { name: "Oksijen Tesisleri (Osmangazi Köprüsü Çıkışı)", lat: 40.7654, lng: 29.5210, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, Troy, Opet Kart" }
        } 
      },
      { 
        name: "Mehmet Demir", cardNumber: "TR-11223344556677", plate: "34 IST 55", makeModel: "Mercedes Actros 1848", 
        route: { 
          start: [40.9833, 29.1167], end: [39.9000, 32.8000], name: "İstanbul Pendik Lojistik - Ankara Sincan OSB",
          restArea: { name: "Köroğlu Dinlenme Tesisi (Bolu Dağı Geçişi)", lat: 40.6822, lng: 31.6095, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, Troy, Shell ClubSmart" }
        } 
      },
      { 
        name: "Ayşe Kaya", cardNumber: "TR-55443322110099", plate: "06 ANK 06", makeModel: "Scania R500", 
        route: { 
          start: [39.9500, 32.7500], end: [38.4500, 27.2000], name: "Ankara Başkent OSB - İzmir Kemalpaşa Lojistik",
          restArea: { name: "Turgutlu Park Dinlenme Tesisleri", lat: 38.4925, lng: 27.7082, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, BP Kart" }
        } 
      },
      { 
        name: "Can Çelik", cardNumber: "TR-77889900112233", plate: "35 IZM 35", makeModel: "Volvo FH 540", 
        route: { 
          start: [38.4000, 27.1500], end: [40.1800, 29.0500], name: "İzmir Alsancak Liman - Bursa Terminal Depo",
          restArea: { name: "Turgutlu Park Dinlenme Tesisleri (Kuzey Yönü)", lat: 38.5100, lng: 27.7200, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, Petrol Ofisi" }
        } 
      },
      { 
        name: "Fatma Şahin", cardNumber: "TR-44332211556677", plate: "10 BAL 10", makeModel: "DAF XF 480", 
        route: { 
          start: [39.6500, 27.9000], end: [40.8500, 29.8500], name: "Balıkesir Organize Sanayi - Kocaeli Dilovası",
          restArea: { name: "Oksijen Tesisleri (Orhangazi Kavşağı)", lat: 40.5200, lng: 29.3100, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, Opet Kart" }
        } 
      },
      { 
        name: "Ali Öztürk", cardNumber: "TR-99001122334455", plate: "41 KOC 41", makeModel: "Renault T520", 
        route: { 
          start: [40.7500, 29.9000], end: [37.8800, 32.5000], name: "Kocaeli Serbest Bölge - Konya Organize Sanayi",
          restArea: { name: "Akşehir Nasreddin Hoca Tesisleri", lat: 38.3500, lng: 31.4100, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, Total Card, Nakit" }
        } 
      },
      { 
        name: "Mustafa Aydın", cardNumber: "TR-66554433221100", plate: "16 KRS 16", makeModel: "MAN TGX 18.510", 
        route: { 
          start: [40.1500, 29.5500], end: [40.7800, 29.9500], name: "İnegöl Mobilya Vadisi - Kocaeli İzmit Merkez",
          restArea: { name: "Pamukova Otoyol Servis Alanı", lat: 40.5000, lng: 30.1500, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, Nakit" }
        } 
      },
      { 
        name: "Zeynep Arslan", cardNumber: "TR-33221100998877", plate: "26 ESK 26", makeModel: "Ford F-MAX 500", 
        route: { 
          start: [39.7500, 30.5000], end: [39.9200, 32.8200], name: "Eskişehir Hasan Bey Lojistik - Ankara Ostim",
          restArea: { name: "Sivrihisar Lojistik ve Dinlenme Parkı", lat: 39.4400, lng: 31.5300, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, Shell Kart, Opet Kart" }
        } 
      },
      { 
        name: "Emre Koç", cardNumber: "TR-88776655443322", plate: "07 ANT 07", makeModel: "Mercedes Actros 1851", 
        route: { 
          start: [36.8800, 30.7000], end: [37.8500, 32.4500], name: "Antalya Serbest Liman - Konya Karatay Depo",
          restArea: { name: "Seydişehir Toros Tesisleri", lat: 37.4200, lng: 31.8400, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, Petrol Ofisi Kart" }
        } 
      },
      { 
        name: "Sibel Korkmaz", cardNumber: "TR-22110099887766", plate: "42 KNY 42", makeModel: "Scania S500", 
        route: { 
          start: [37.9000, 32.5200], end: [40.2000, 29.0800], name: "Konya Selçuklu Depo - Bursa Kent Meydanı Lojistik",
          restArea: { name: "Bozüyük Şoförler Evi ve Dinlenme Tesisi", lat: 39.9082, lng: 30.0335, fuel: true, food: true, rest: true, currency: "TRY", cards: "Visa, Mastercard, Total Card, Shell Kart, Nakit" }
        } 
      }
    ];
  }

  generateHistoricalData() {
    const allRecords = [];
    const now = new Date();

    this.drivers.forEach((driverInfo, driverIndex) => {
      const recordCount = 5 + (driverIndex % 4);

      for (let i = 0; i < recordCount; i++) {
        const randomDaysAgo = i * 1.5 + (driverIndex * 0.2) + (Math.random() * 2);
        const randomHours = Math.floor(Math.random() * 14) + 7;
        const randomMinutes = Math.floor(Math.random() * 60);

        const recordTime = new Date(now.getTime() - (randomDaysAgo * 24 * 3600 * 1000));
        recordTime.setHours(randomHours, randomMinutes, 0, 0);

        const data = new TachographData(Buffer.alloc(256));
        data.extractedAt = recordTime.toISOString();
        data.driver = { ...driverInfo };
        data.vehicle = {
          plate: driverInfo.plate,
          makeModel: driverInfo.makeModel,
          unitId: `TC-VDO-DTCO-${1380 + driverIndex}`
        };

        let drivingDuration = 220; 
        let restDuration = 45;    

        if (driverIndex === 0) {
          drivingDuration = 360; 
          restDuration = 15; 
        } else if (driverIndex === 1 || driverIndex === 4 || driverIndex === 7) {
          drivingDuration = 290; 
          restDuration = 30; 
        }

        data.activities = [
          new ActivityRecord('DRIVING', recordTime.toISOString(), drivingDuration),
          new ActivityRecord('REST', new Date(recordTime.getTime() + drivingDuration * 60000).toISOString(), restDuration)
        ];

        data.telemetry = {
          fuelLevel: Math.floor(20 + (Math.random() * 75)),
          engineTemp: Math.floor(83 + (Math.random() * 19)),
          currentSpeed: driverIndex === 0 ? 94 : Math.floor(75 + (Math.random() * 20)),
          dtcFaults: driverIndex === 0 ? 'P0299 - Turbo Underboost' : (driverIndex === 1 ? 'P0115 - Coolant Temp' : 'Temiz'),
          lat: driverInfo.route.start[0],
          lng: driverInfo.route.start[1],
          route: driverInfo.route,
          routeCoords: []
        };

        data.violations = RuleEngine.evaluate(data.activities);
        data.riskAnalysis = RiskCalculator.calculateRisk(data.violations, data.activities);

        if (driverIndex === 0) {
          data.riskAnalysis = { score: 88, level: 'YÜKSEK', factors: { drivingRisk: 92, restRisk: 85, violationRisk: 88 } };
        } else if (driverIndex === 1 || driverIndex === 4 || driverIndex === 7) {
          data.riskAnalysis = { score: 54, level: 'ORTA', factors: { drivingRisk: 55, restRisk: 50, violationRisk: 58 } };
        }

        allRecords.push(data);
      }
    });

    return allRecords;
  }
}

module.exports = new MockTelemetryDatabase();