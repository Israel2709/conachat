const getComments = () => {
  document.getElementById("card-container").innerHTML = "";
  fetch("https://conachat-a9a04-default-rtdb.firebaseio.com/comentarios/.json")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      Object.keys(json).forEach((key) => {
        let data = json[key];
        let containerHtml = document.getElementById("card-container").innerHTML;
        console.log(data);
        let cardHtml = `
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Para: ${data.para}</h5>
                    <h5 class="card-title">De: ${data.de}</h5>
                    <p class="card-text">${data.mensaje}}</p>
                </div>
            </div>
        </div>
        `;
        document.getElementById("card-container").innerHTML =
          containerHtml + cardHtml;
      });
    });
};
getComments();

document.getElementById("submit-button").addEventListener("click", () => {
  let de = document.getElementById("de").value;
  let para = document.getElementById("para").value;
  let mensaje = document.getElementById("mensaje").value;

  let commentObject = { de, para, mensaje };

  console.log(commentObject);
  fetch(
    "https://conachat-a9a04-default-rtdb.firebaseio.com/comentarios/.json",
    {
      method: "POST",
      body: JSON.stringify(commentObject),
    }
  )
    .then((response) => response.json)
    .then(() => getComments());
});
