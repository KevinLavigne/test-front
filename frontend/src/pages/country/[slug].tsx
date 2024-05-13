import { useRouter } from 'next/router';

const AppoloLaMerde = () => {
	const router = useRouter();
	const country = router.query?.slug;
	return <>{country}</>;
};

export default AppoloLaMerde;
