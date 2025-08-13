
let pollingInterval;
let lastResponseCount = 0;

function startPolling(requestId) {

  pollingInterval = setInterval(async () => {
    try {
      const response = await fetch(`/api/request/${requestId}/responses`);
      if (!response.ok) {
        throw new Error('Failed to fetch responses.');
      }
      const responses = await response.json();

      if (responses.length > lastResponseCount) {
        updateUIWithResponses(responses);
        lastResponseCount = responses.length;
      }
    } catch (error) {
      console.error('Polling error:', error);

    }
  }, 5000); 
}

function updateUIWithResponses(responses) {
  const responsesContainer = document.getElementById('responses-container');
  if (!responsesContainer) return;

  responsesContainer.innerHTML = ''; 

  if (responses.length === 0) {
    responsesContainer.innerHTML = '<p>No one has responded yet.</p>';
    return;
  }

  responses.forEach(res => {
    const responseElement = document.createElement('div');
    responseElement.className = 'response-item';
    responseElement.innerHTML = `
      <h4>Responder: ${res.responderDetails.username}</h4>
      <p>Phone: ${res.responderDetails.phone}</p>
      <p>Blood Group: ${res.responderDetails.bloodGroup || 'N/A'}</p>
      <p>Location: ${res.responderDetails.location || 'N/A'}</p>
    `;
    responsesContainer.appendChild(responseElement);
  });
}

function stopPolling() {
  clearInterval(pollingInterval);
}

document.addEventListener('DOMContentLoaded', () => {
  const requestElement = document.getElementById('emergency-request-container');
  if (requestElement) {
    const requestId = requestElement.dataset.requestId;
    if (requestId) {
      startPolling(requestId);
    }
  }
});

window.addEventListener('beforeunload', stopPolling);