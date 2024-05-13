import { gql } from '@apollo/client';

export const REGISTER = gql`
	query countries {
		countries {
			name
			emoji
			code
		}
	}
`;

export const findone = gql`
	query country($code: String!) {
		country(code: $code) {
			name
			emoji
			code
			continent {
				name
			}
		}
	}
`;
