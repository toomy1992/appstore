import path from "node:path";
import fs from "fs/promises";

const packageFile = process.argv[2];
const newVersion = process.argv[3];

type AppConfig = {
    tipi_version: string;
    version: string;
    updated_at: number;
};

type ComposeService = {
    isMain?: boolean;
    image?: string;
};

type DynamicCompose = {
    services?: ComposeService[];
};

const isMainImageUpdate = async (composePath: string, version: string) => {
    try {
        const compose = JSON.parse(await fs.readFile(composePath, "utf-8")) as DynamicCompose;
        const services = compose.services ?? [];
        const main = services.find((service) => service.isMain) ?? services[0];
        const image = main?.image ?? "";

        return image.endsWith(`:${version}`);
    } catch {
        return true;
    }
};

const updateAppConfig = async (packageFile: string, newVersion: string) => {
    try {
        const packageRoot = path.dirname(packageFile);
        const configPath = path.join(packageRoot, "config.json");

        const config = await fs.readFile(configPath, "utf-8");
        const configParsed = JSON.parse(config) as AppConfig;

        configParsed.tipi_version = configParsed.tipi_version + 1;
        if (await isMainImageUpdate(packageFile, newVersion)) {
            configParsed.version = newVersion;
        }
        configParsed.updated_at = new Date().getTime();

        await fs.writeFile(configPath, JSON.stringify(configParsed, null, 2));
    } catch (e) {
        console.error(`Failed to update app config, error: ${e}`);
    }
};

if (!packageFile || !newVersion) {
    console.error("Usage: node update-config.js <packageFile> <newVersion>");
    process.exit(1);
}
updateAppConfig(packageFile, newVersion);