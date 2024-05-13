import type { CodegenConfig } from '@graphql-codegen/cli';

const { backend } = process.env;

const config: CodegenConfig = {
	overwrite: true,
	schema: `http://localhost:4000`,
	documents: [
		'src/request/queries/*.queries.ts',
		'src/request/mutations/*.mutations.ts',
	],
	generates: {
		'./src/types/graphql.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo',
			],
		},
	},
};

export default config;
