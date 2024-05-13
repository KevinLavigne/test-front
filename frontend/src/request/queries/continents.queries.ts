import { gql } from '@apollo/client';

export const REGISTER = gql`
	query continents {
		continents {
			name
			id
		}
	}
`;
