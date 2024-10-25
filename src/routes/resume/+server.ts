import { readFileSync } from 'node:fs';

export const GET = async () => {
	const resume = readFileSync('resume.pdf');

	return new Response(resume, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="Mark Fayngersh Resume.pdf"'
		}
	});
};
