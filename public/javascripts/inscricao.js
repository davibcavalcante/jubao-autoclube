const getFormData = () => {
  const numParticipants = document.getElementById('participants-select').value;
  const data = {};

  function extractParticipantData(prefix) {
      const participantData = {};
      const inputs = document.querySelectorAll(`[name^="${prefix}"]`);
      inputs.forEach((input) => {
          if (input.value.trim() !== "") {
              const fieldName = input.name.replace(`${prefix}-`, "");
              const fieldParts = fieldName.split('-');
              if (fieldParts.length === 1) {
                  participantData[fieldParts[0]] = input.value;
              } else {
                  if (!participantData[fieldParts[0]]) {
                      participantData[fieldParts[0]] = {};
                  }
                  participantData[fieldParts[0]][fieldParts[1]] = input.value;
              }
          }
      });
      return Object.keys(participantData).length > 0 ? participantData : null;
  }

  const teamData = extractParticipantData('team');
  if (teamData) {
    data.team = teamData
  }

  const carData = extractParticipantData('car');
  if (carData) {
    data.car = carData
  }

  const pilotData = extractParticipantData('pilot');
  if (pilotData) {
      data.pilot = pilotData;
  }

  const navigatorData = extractParticipantData('nav');
  if (navigatorData) {
      data.navigator = navigatorData;
  }

  if (numParticipants >= 3) {
      const aux1Data = extractParticipantData('aux1');
      if (aux1Data) {
          data.aux1 = aux1Data;
      }
  }

  if (numParticipants === 4) {
      const aux2Data = extractParticipantData('aux2');
      if (aux2Data) {
          data.aux2 = aux2Data;
      }
  }

  return data;
}

const clearFormData = () => {
  const inputsForReset = document.querySelectorAll('input.active')
  const placeholdersForReset = document.querySelectorAll('.placeholder.active')

  function resetForm(element) {
    element.forEach((item) => item.classList.remove('active'))
    form.reset()
  }
  
  resetForm(inputsForReset)
  resetForm(placeholdersForReset)
}

const validateForm = () => {
  const formData = getFormData();
  return sendData(formData)
}

const sendData = async(formData) => {
    const result = await fetch("/api/v1/inscricao", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    if (result.status === 200) {
      const data = await result.json();
      alert(data.message);
      clearFormData();
    } else {
      const data = await result.json();
      alert(`ocorreu um erro no envio da inscrição: ${data.message}`);
    }
}