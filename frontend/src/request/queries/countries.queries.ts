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
