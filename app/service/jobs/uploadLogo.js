export default async function uploadLogo(logoForm) {
  try {
    const response = await fetch(`/api/jobs/upload-logo`, {
      method: "POST",
      body: logoForm,
    });

    if (!response.ok) {
      const errData = await response.json(); // ✅ capture server error
      return {
        state: false,
        error: 'Failed to upload logo',
        message: 'Response Error uploadLogo',
      };
    }

    const result = await response.json();

    if (!result?.url) {
      return {
        state: false,
        error: 'Missing URL in upload response',
        message: 'Upload failed',
      };
    }

    return {
      state: true,
      data: { url: result.url },
      message: 'Upload successful',
    };
  } catch (err) {
    console.error('Logo upload error:', err);
    return {
      state: false,
      error: err.message || 'Something went wrong',
      message: 'Upload failed',
    };
  }
}
