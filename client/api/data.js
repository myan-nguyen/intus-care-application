const faker = require("faker");
const { ICD_CODE_MAP } = require("./constants/icdCode");

function makeDiagnosis(numDiagnoses) {
  const result = [];

  for (let i = 0; i < numDiagnoses; i++) {
    const icdCode = faker.random.arrayElement(Object.keys(ICD_CODE_MAP));
    result.push({
      icdCode: icdCode,
      conditionName: ICD_CODE_MAP[icdCode] || "Unknown Condition",
      timestamp: faker.date.recent(365),
    });
  }

  return result.sort((a, b) => new Date(a.timestamp - b.timestamp));
}

function makeParticipants(numParticipants) {
  const result = [];

  for (let i = 0; i < numParticipants; i++) {
    const numDiagnoses = faker.datatype.number({ min: 1, max: 20 }); // generate a random number of diagnoses (1 to 20)
    result.push({ // generate generic participant data
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: faker.date.past(10, new Date(1950, 0, 1)),
      gender: faker.random.arrayElement(["MALE", "FEMALE", "NON-BINARY"]),
      phoneNumber: faker.datatype.number({ min: 1000000000, max: 9999999999 }),
      patientNotes: faker.random.arrayElement([faker.lorem.text(), null]),
      diagnoses: makeDiagnosis(numDiagnoses),
    });
  }

  return result;
}

const participants = makeParticipants(200);

module.exports = { participants };