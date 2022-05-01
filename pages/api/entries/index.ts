import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "GET":
            return getEntries(res);
        case "POST":
            return postEntries(req, res);

        default:
            return res.status(400).json({ message: "Metodo no existe" });
    }
}

const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect();

    const entries = await Entry.find().sort({ createdAt: "ascending" });

    await db.disconnect();

    res.status(200).json(entries);
};
const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description = "" } = req.body;

    const newEntry = new Entry({
        description,
        createAt: Date.now(),
    });

    try {
        await db.connect();
        await newEntry.save();

        await db.disconnect();

        res.status(201).json(newEntry);
    } catch (error) {
        console.log("error: ", error);
        await db.disconnect();
        return res.status(500).json({ message: "Error creando la entrada" });
    }
};
