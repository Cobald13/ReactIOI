import { useCallback } from 'react';

const useRecognition = (setError, setIsLoading) => {
  const backendUrl = 'https://pure-chicken-urgently.ngrok-free.app';

  return useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${backendUrl}/recognize`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Slika neuspešno prepoznana.');
      }

      const data = await response.json();

      if (data.painterId && data.paintingId) {
        // Redirect with painterId and paintingId in the URL
        window.location.href = `/painter/${data.painterId}?paintingId=${data.paintingId}`;
      } else {
        alert("Slika neuspešno prepoznana.");
      }
    } catch (err) {
      console.error('Napaka med razpoznavo:', err);
      setError('An error occurred while recognizing the painting.');
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading, backendUrl]);
};

export default useRecognition;
