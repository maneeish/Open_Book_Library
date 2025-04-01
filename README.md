
# **Open Book - A Digital Library Web App 📖**  

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  

A modern and user-friendly book library website that dynamically fetches and displays book details using the FreeAPI.app. Browse through an extensive collection, search for your favorite books, and switch between different viewing styles effortlessly.  

## **📸 Screenshots**  
![image](https://github.com/user-attachments/assets/ef1e4a88-d8d6-45c0-a70e-50c0f502b732)

## **✨ Features**  

- Fetch & Display Books – Automatically retrieves book data from the API and displays it dynamically.
![image](https://github.com/user-attachments/assets/d3e6c3f5-2427-43f6-8284-ad2ea7560b30)

  
- List & Grid View – Users can toggle between a list and grid layout for easy browsing.

| Grid View | List View |
|---|---|
| ![Grid View](https://github.com/user-attachments/assets/a0e313cd-4125-495d-899a-4f6989c9dc68) | ![List View](https://github.com/user-attachments/assets/5e3cd728-4aac-4844-9a5e-7f30c0646d88) |

- Search Functionality – Search books by title or author to quickly find what you're looking for.
![image](https://github.com/user-attachments/assets/e60060ea-7f69-48c3-a3d6-487cfb187af2)

- Book Details – View essential details like title, author, publisher, published date, and cover image.  
![image](https://github.com/user-attachments/assets/1a33399e-3b27-42e7-b907-49b124982d1d)

- Sorting Options – Arrange books alphabetically or by published date for better organization. 

| A-Z Sort | Z-A Sort |
|---|---|
| ![image](https://github.com/user-attachments/assets/851fac5c-32bc-4137-a456-b8957b38a0e1) | ![image](https://github.com/user-attachments/assets/f33a0e53-d0ab-4112-8507-393637b98190) |

| Newest Sort | Oldest Sort |
|---|---|
| ![image](https://github.com/user-attachments/assets/b4ebad90-dbee-4ee4-b358-c9a9432a2bd1) | ![image](https://github.com/user-attachments/assets/80fed86d-2e02-489a-92f1-51b68024303a) |

- Pagination Support – Load more books dynamically as you change the page to Previous or Next.
![image](https://github.com/user-attachments/assets/b25f95fe-b0b3-46a9-bccb-3b1936d2d5f2)


- External Details – Clicking on a book redirects to an external page for more in-depth information. 
![image](https://github.com/user-attachments/assets/fecf101c-db30-4cd6-8e07-de75c106a622)
 

## **🚀 Live Demo**  

Try out the Books Library here: **[Open Book Library](https://open-book-libraryy.vercel.app/)**  

## **🛠️ Tech Stack**  

- **HTML** – Structuring the content  
- **CSS & Tailwind CSS** – Styling, responsiveness, and modern UI components  
- **JavaScript** – Fetching API data, handling interactions  

## **📡 API Endpoint**  

The book data is retrieved from FreeAPI.app using the following endpoint:  

```bash
GET https://api.freeapi.app/api/v1/public/books
```

For more details, check the **[API Documentation](https://freeapi.hashnode.space/api-guide/apireference/getBooks)**.  

## **💻 Project Setup**  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/shreyansh-Geek/BooksLibrary.git
   cd BooksLibrary
   ```

2. **Install Dependencies**  
   Since this project uses Tailwind CSS, ensure that Tailwind is installed by running:  
   ```bash
   npm install
   ```

   If Tailwind is not installed, set it up manually using:  
   ```bash
   npm install -D tailwindcss
   npx tailwindcss init
   ```

3. **Run the Project**  
   Simply open `index.html` in your browser to view the project.  

   If using a local development server, run:  
   ```bash
   npx tailwindcss -i ./styles.css -o ./output.css --watch
   ```

## **🔮 Future Enhancements**  

- Advanced Filters – Add genre-based filtering for better book discovery.  
- Personalized Bookmarks – Allow users to save favorite books for later reference.  
- User Reviews – Enable users to leave reviews and ratings for books.  

## **📄 License**  

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  
