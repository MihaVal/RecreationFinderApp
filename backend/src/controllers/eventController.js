import { prisma } from "../db/client.js";

export async function listEvents(_req, res) {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startAt: "asc" },
      include: {
        createdBy: { select: { id: true, name: true, surname: true } },
      },
    });
    res.json(events);
  } catch {
    res.status(500).json({ error: "Could not fetch events" });
  }
}

export async function createEvent(req, res) {
  try {
    const { sport, location, startAt, skillLevel, ageGroup } = req.body;
    const event = await prisma.event.create({
      data: {
        sport,
        location,
        startAt: new Date(startAt),
        skillLevel: Number(skillLevel),
        ageGroup,
        createdById: req.user.id,
      },
    });
    res.status(201).json(event);
  } catch {
    res.status(500).json({ error: "Could not create event" });
  }
}
