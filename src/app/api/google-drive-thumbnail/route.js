export const dynamic = 'force-dynamic';


function extractGoogleDriveFileId(url) {
	const match = url.match(/[-\w]{25,}/);
	return match ? match[0] : null;
}

export async function GET(request) {
	const fileId = extractGoogleDriveFileId(request.url);
	if (!fileId) return new Response('Invalid file ID', { status: 400 });
	const drive_request = await fetch(`https://drive.google.com/uc?export=download&confirm=1&id=${fileId}`, {
		redirect: 'follow',
	});
	const response = new Response(drive_request.body, drive_request);
	response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	return response;
}