const getFormData = () => {
  const name = document.getElementById("name").value;
  const contactComment = document.getElementById("contactComment").value;
  return {
    name,
    contactComment
  }
}

const clearFormData = () => {
  document.getElementById("name").value = "";
  document.getElementById("contactComment").value = "";
}

const validateForm = () => {
  const formData = getFormData();
  return validateData(formData);
}

const validateData = (formData) => {
  if(!formData.name){
    alert("informe o nome");
    return false
  }
  if(!formData.contactComment){
    alert("informe o comentário");
    return false
  }
  return true;
}

const sendData = async() => {
  const formData = getFormData();
  if(validateData(formData)){
    const result = await fetch("/api/v1/inscricao", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    if(result.status === 200){
      const data = await result.json();
      alert(data.message);
      clearFormData();
    } else {
      const data = await result.json();
      alert(`ocorreu um erro no envio da inscrição: ${data.message}`);
    }
  }
}