const imgContainers = {
    yellow: document.getElementById('img-yellow'),
    red: document.getElementById('img-red'),
    blue: document.getElementById('img-blue'),
  };
  
  // Reusable function to fetch and append images
  const fetchAndAppendImage = (bookId, container) => {
    fetch(`https://api.freeapi.app/api/v1/public/books/${bookId}`)
      .then(response => response.json())
      .then(res => {
        if (!res.data.volumeInfo.imageLinks) {
          console.warn(`No image for book ID: ${bookId}`);
          return;
        }
        const imageUrl = res.data.volumeInfo.imageLinks.smallThumbnail;
  
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `${container} Book Cover`;
        imgElement.style.width = "110px";
        imgElement.style.height = "150px";
        imgElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
  
        imgContainers[container].appendChild(imgElement);
      })
      .catch(error => console.error(`Error fetching book ID: ${bookId}`, error));
  };
  
  // Fetch images for respective containers
  fetchAndAppendImage(12, "yellow");
  fetchAndAppendImage(171, "red");
  fetchAndAppendImage(105, "blue");
  

