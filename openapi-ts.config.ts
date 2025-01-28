import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-axios",
  input: 'rest-api.yml',
  // input: 'https://petstore3.swagger.io/api/v3/openapi.json',
  output: {
		path: "src/services/client",
		format: "biome",
		lint: "biome",
	},
	plugins: [
		"@hey-api/sdk",
		{
			enums: "javascript",
			name: "@hey-api/typescript",
		},
	],
	});
	