# **Open Book - A Digital Library Web App📚**  

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  

A modern and user-friendly book library website that dynamically fetches and displays book details using the FreeAPI.app. Browse through an extensive collection, search for your favorite books, and switch between different viewing styles effortlessly.  

---

## **✨ Features**  

📖 **Fetch & Display Books** – Automatically retrieves book data from the API and displays it dynamically.  

🔀 **List & Grid View** – Users can toggle between a list and grid layout for easy browsing.  

🔍 **Search Functionality** – Search books by title or author to quickly find what you're looking for.  

📌 **Book Details** – View essential details like title, author, publisher, published date, and cover image.  

📝 **Sorting Options** – Arrange books alphabetically or by published date for better organization.  

📄 **Pagination Support** – Load more books dynamically as you scroll, ensuring smooth navigation.  

🔗 **External Details** – Clicking on a book redirects to an external page for more in-depth information.  

---

## **🚀 Live Demo**  
Try out the **Books Library** here: **[https://open-book-libraryy.vercel.app/]**  

---

## **🛠️ Tech Stack**  

- **HTML** – Structuring the content  
- **CSS & Tailwind CSS** – Styling, responsiveness, and modern UI components  
- **JavaScript** – Fetching API data, handling interactions  

---

## **📡 API Endpoint**  
The book data is retrieved from **FreeAPI.app** using the following endpoint:  

```bash
GET https://api.freeapi.app/api/v1/public/books
```

🔗 **API Documentation** – [FreeAPI.app API Guide](https://freeapi.hashnode.space/api-guide/apireference/getBooks)  

---

## **💻 Project Setup**  

### **1️⃣ Clone the Repository**  

```bash
git clone https://github.com/shreyansh-Geek/BooksLibrary.git
cd BooksLibrary
```

### **2️⃣ Install Dependencies**  
Since this project uses **Tailwind CSS**, ensure that Tailwind is installed by running:  

```bash
npm install
```

If Tailwind is not installed, set it up manually using:  

```bash
npm install -D tailwindcss
npx tailwindcss init
```

### **3️⃣ Run the Project**  
Simply open **index.html** in your browser to view the project.  

If using a local development server, run:  

```bash
npx tailwindcss -i ./styles.css -o ./output.css --watch
```

---

## **🔮 Future Enhancements**  

📊 **Advanced Filters** – Add genre-based filtering for better book discovery.  

📚 **Personalized Bookmarks** – Allow users to save favorite books for later reference.  

📑 **User Reviews** – Enable users to leave reviews and ratings for books.  

---

## **📄 License**  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
