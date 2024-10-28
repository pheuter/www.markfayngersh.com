import { read } from '$app/server';
import resume from './resume.pdf';

export const GET = async () => {
	return new Response(await read(resume).arrayBuffer(), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="Mark Fayngersh Resume.pdf"'
		}
	});
};
