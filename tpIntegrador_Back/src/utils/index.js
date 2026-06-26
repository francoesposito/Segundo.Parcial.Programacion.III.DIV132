import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { dir } from "console";

const filename = fileURLToPath(import.meta.url);

const __dirname = join(dirname(filename), "../../");

export {
    __dirname,
    join
}