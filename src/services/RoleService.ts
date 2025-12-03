import { db } from "../database/firebase.js";

export interface RoleData {
    name: string;       // ex: "supregprf"
    id: string;         // ex: "1428086443435233491"
    category: string;   // ex: "prf"
}

export default class RoleService {

    static async getAll(): Promise<RoleData[]> {
        const snapshot = await db.collection("cargos").get();
        const roles: RoleData[] = [];

        snapshot.forEach(doc => {
            const category = doc.id;
            const data = doc.data();

            for (const [key, value] of Object.entries(data)) {
                if (typeof value === "string" && key.toLowerCase().endsWith("roleid")) {
                    const name = key.slice(0, -6);
                    roles.push({ name, id: value, category });
                }
            }
        });

        return roles;
    }

    static async findByName(name: string): Promise<RoleData | null> {
        const allRoles = await this.getAll();
        const role = allRoles.find(r => r.name.toLowerCase() === name.toLowerCase());
        return role || null;
    }

    static async getRolesByCategory(category: string): Promise<RoleData[]> {
        const doc = await db.collection("cargos").doc(category).get();
        if (!doc.exists) return [];

        const data = doc.data() || {};
        const roles: RoleData[] = [];

        for (const [key, value] of Object.entries(data)) {
            if (typeof value === "string" && key.toLowerCase().endsWith("roleid")) {
                const name = key.slice(0, -6); // remove "RoleId"
                roles.push({ name, id: value, category });
            }
        }

        return roles;
    }
}
