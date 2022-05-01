import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = { message: string } | IEntry;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query;

    switch (req.method) {
        case "GET":
            return getEntries(req, res, id);
        case "PUT":
            return putEntries(req, res, id);
        default:
            return res.status(400).json({ message: "Metodo no existe" });
    }
}

const putEntries = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    id: string | string[]
) => {
    try {
        await db.connect();

        const entryToUpdate = await Entry.findById(id);
        if (!entryToUpdate) {
            await db.disconnect();
            return res
                .status(400)
                .json({ message: "No hay entrada con el Id: " + id });
        }

        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status,
        } = req.body;

        const updatedEntry = await Entry.findByIdAndUpdate(
            id,
            { description, status },
            { runValidators: true, new: true }
        );

        await db.disconnect();

        res.status(201).json(updatedEntry!);
    } catch (error) {
        console.log("error: ", error);
        await db.disconnect();
        return res
            .status(500)
            .json({ message: "Error actualizando la entrada" });
    }
};

const getEntries = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    id: string | string[]
) => {
    try {
        await db.connect();

        const entry = await Entry.findById(id);

        await db.disconnect();

        if (!entry) {
            return res
                .status(400)
                .json({ message: "No hay entrada con el Id: " + id });
        }

        res.status(201).json(entry!);
    } catch (error) {
        console.log("error: ", error);
        await db.disconnect();
        return res
            .status(500)
            .json({ message: "Error actualizando la entrada" });
    }
};
