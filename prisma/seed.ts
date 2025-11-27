import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.measurement.deleteMany();
  await prisma.processStepExecution.deleteMany();
  await prisma.ctqDefinition.deleteMany();
  await prisma.processStepDefinition.deleteMany();
  await prisma.componentLot.deleteMany();
  await prisma.fixture.deleteMany();
  await prisma.episode.deleteMany();
  await prisma.kit.deleteMany();
  await prisma.unit.deleteMany();

  const unitAlpha = await prisma.unit.create({
    data: {
      name: "Unit Alpha",
      serialNumber: "U-1001",
      description: "First production-ready assembly",
    },
  });

  const unitBeta = await prisma.unit.create({
    data: {
      name: "Unit Beta",
      serialNumber: "U-1002",
      description: "Alternate build for validation",
    },
  });

  const kitMain = await prisma.kit.create({
    data: {
      name: "Main Build Kit",
      code: "KIT-001",
      unit: { connect: { id: unitAlpha.id } },
    },
  });

  const kitService = await prisma.kit.create({
    data: {
      name: "Service Kit",
      code: "KIT-002",
      unit: { connect: { id: unitBeta.id } },
    },
  });

  const fixture = await prisma.fixture.create({
    data: {
      name: "Assembly Station A",
      description: "Primary bench for torque application",
      kit: { connect: { id: kitMain.id } },
    },
  });

  const componentLot = await prisma.componentLot.create({
    data: {
      identifier: "LOT-AX45",
      description: "Fastener lot for torque validation",
      quantity: 250,
      kit: { connect: { id: kitMain.id } },
    },
  });

  const torqueStep = await prisma.processStepDefinition.create({
    data: {
      name: "Torque Application",
      description: "Apply torque to primary fasteners",
      sequence: 1,
      ctqDefs: {
        create: [
          {
            name: "Torque",
            description: "Applied torque in N-m",
            lowerLimit: 2.3,
            upperLimit: 2.7,
            target: 2.5,
            measurementUnit: "N-m",
          },
          {
            name: "Angle",
            description: "Angle of turn for final tightening",
            lowerLimit: 8,
            upperLimit: 12,
            target: 10,
            measurementUnit: "degrees",
          },
        ],
      },
    },
    include: { ctqDefs: true },
  });

  const inspectionStep = await prisma.processStepDefinition.create({
    data: {
      name: "Visual Inspection",
      description: "Inspect build for cosmetic defects",
      sequence: 2,
      ctqDefs: {
        create: [
          {
            name: "Scratch Length",
            description: "Maximum allowed scratch length",
            upperLimit: 3,
            measurementUnit: "mm",
          },
        ],
      },
    },
    include: { ctqDefs: true },
  });

  const episode = await prisma.episode.create({
    data: {
      title: "Alpha Pilot Run",
      description: "Pilot build for firmware v1.2",
      unit: { connect: { id: unitAlpha.id } },
      kit: { connect: { id: kitMain.id } },
    },
  });

  const torqueExecution = await prisma.processStepExecution.create({
    data: {
      operator: "Samira I.",
      notes: "Used calibrated wrench",
      processStepDefinition: { connect: { id: torqueStep.id } },
      unit: { connect: { id: unitAlpha.id } },
      kit: { connect: { id: kitMain.id } },
      fixture: { connect: { id: fixture.id } },
      episode: { connect: { id: episode.id } },
      measurements: {
        create: [
          {
            value: 2.55,
            unitLabel: "N-m",
            ctqDefinition: { connect: { id: torqueStep.ctqDefs[0].id } },
            componentLot: { connect: { id: componentLot.id } },
          },
          {
            value: 9.8,
            unitLabel: "degrees",
            ctqDefinition: { connect: { id: torqueStep.ctqDefs[1].id } },
          },
        ],
      },
    },
  });

  await prisma.processStepExecution.create({
    data: {
      operator: "Lina T.",
      notes: "Minor scuff noted on housing",
      processStepDefinition: { connect: { id: inspectionStep.id } },
      unit: { connect: { id: unitAlpha.id } },
      kit: { connect: { id: kitMain.id } },
      episode: { connect: { id: episode.id } },
      measurements: {
        create: [
          {
            value: 1.5,
            unitLabel: "mm",
            ctqDefinition: { connect: { id: inspectionStep.ctqDefs[0].id } },
          },
        ],
      },
    },
  });

  await prisma.processStepExecution.create({
    data: {
      operator: "Kai M.",
      processStepDefinition: { connect: { id: torqueStep.id } },
      unit: { connect: { id: unitBeta.id } },
      kit: { connect: { id: kitService.id } },
      measurements: {
        create: [
          {
            value: 2.35,
            unitLabel: "N-m",
            ctqDefinition: { connect: { id: torqueStep.ctqDefs[0].id } },
          },
          {
            value: 11.2,
            unitLabel: "degrees",
            ctqDefinition: { connect: { id: torqueStep.ctqDefs[1].id } },
          },
        ],
      },
    },
  });

  console.log("Seed data created:", {
    units: [unitAlpha.serialNumber, unitBeta.serialNumber],
    kits: [kitMain.code, kitService.code],
    torqueExecution: torqueExecution.id,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
