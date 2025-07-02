import * as fs from "fs";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JSONObject = { [key: string]: any };

const escapeNewlines = (value: any): string => {
  if (typeof value === "string") {
    return value.replace(/\n/g, "\\n");
  }
  return value;
};

const jsonToEnvString = (json: JSONObject): string => {
  return Object.entries(json)
    .map(([key, value]) => `"${key}":${JSON.stringify(escapeNewlines(value))}`)
    .join(",");
};

const readJsonFromFile = (filePath: string): JSONObject => {
  const rawData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(rawData);
};

const convertJsonFileToEnvString = (filePath: string): string => {
  const jsonData = readJsonFromFile(filePath);
  return jsonToEnvString(jsonData);
};

// Example usage with command line argument:
const [, , jsonFilePath] = process.argv;

if (!jsonFilePath) {
  console.error("Please provide the path to the JSON file as an argument.");
  process.exit(1);
}

const absolutePath = path.resolve(jsonFilePath);
const envString = convertJsonFileToEnvString(absolutePath);

console.log(envString);
