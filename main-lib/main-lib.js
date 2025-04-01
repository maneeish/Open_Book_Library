document.addEventListener("DOMContentLoaded", function () {
  const booksContainer = document.getElementById("booksContainer");
  let pageNo = 1;
  let totalPages = 1;
  const paginationContainer = document.getElementById("pagination");
  const listButton = document.getElementById("list");
  const gridButton = document.getElementById("grid");
  const sortSelect = document.getElementById("sort-options");
  const searchInput = document.getElementById("searchInput");
  const noResultsMessage = document.getElementById("noResultsMessage");

  const gridClasses = ["grid", "grid-cols-2", "md:grid-cols-3", "gap-x-8", "gap-y-12"];
  const listClasses = ["flex", "flex-col", "gap-y-4"];

  /**
   * Parses date strings (YYYY, YYYY-MM, YYYY-MM-DD, N/A) into a sortable number.
   * Returns a timestamp or 0 for invalid/missing dates (treating them as oldest).
   */
  function parseSortableDate(dateString) {
      if (!dateString || dateString.toLowerCase() === 'n/a') {
          return 0;
      }
      // Handles various valid date formats
      const date = new Date(dateString);
      // getTime() is NaN for invalid dates
      return isNaN(date.getTime()) ? 0 : date.getTime();
  }

  /**
   * Creates and returns a DOM element representing a book card.
   */
  function createBookCardElement(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add(
      "book-card-item", // Common class for selection
      "bg-[#00000050]", "border", "border-[#ECDFCC]", "rounded-lg", "p-4",
      "flex", "items-start", "gap-x-4",
      "transition-all", "duration-100", "ease-in-out"
    );

    if (book.volumeInfo) {
      const {
        title = "No Title Available", authors, publisher = "Unknown Publisher",
        publishedDate = "N/A", imageLinks, infoLink
      } = book.volumeInfo;

      // Store data attributes used for sorting and filtering
      bookDiv.dataset.title = title;
      bookDiv.dataset.publishedDate = publishedDate;

      const authorText = authors && authors.length > 0 ? authors.join(", ") : "Unknown Author";

      const textContainerDiv = document.createElement("div");
      // min-w-0 prevents flex item from overflowing its container
      textContainerDiv.classList.add("flex", "flex-col", "flex-grow", "min-w-0");

      const titleElement = document.createElement("p");
      titleElement.textContent = title;
      titleElement.classList.add(
        "book-title", "text-lg", "font-semibold", "text-[#ECDFCC]", "title-font-fallback", "mb-1",
        "overflow-hidden", "text-ellipsis", "whitespace-nowrap" // Prevent wrap issues
      );

      const authorElement = document.createElement("p");
      authorElement.textContent = authorText;
      authorElement.classList.add(
        "text-sm", "text-gray-300", "title-font-fallback", "mb-3",
        "overflow-hidden", "text-ellipsis", "whitespace-nowrap" // Prevent wrap issues
      );

      const publisherDateDiv = document.createElement("div");
      publisherDateDiv.classList.add(
        "flex", "justify-between", "items-center", "pt-2", "text-xs", "text-gray-400"
      );

      const publisherElement = document.createElement("p");
      publisherElement.textContent = publisher;
      publisherElement.classList.add(
        "title-font-fallback", "overflow-hidden", "text-ellipsis", "whitespace-nowrap", "pr-2"
      );

      const publishedDateElement = document.createElement("p");
      publishedDateElement.textContent = publishedDate;
      publishedDateElement.classList.add("book-published-date", "title-font-fallback", "flex-shrink-0");

      publisherDateDiv.appendChild(publisherElement);
      publisherDateDiv.appendChild(publishedDateElement);
      textContainerDiv.appendChild(titleElement);
      textContainerDiv.appendChild(authorElement);
      textContainerDiv.appendChild(publisherDateDiv);

      let imageOrPlaceholder;
      if (imageLinks?.smallThumbnail) {
        imageOrPlaceholder = document.createElement("img");
        imageOrPlaceholder.src = imageLinks.smallThumbnail;
        imageOrPlaceholder.alt = title;
        imageOrPlaceholder.classList.add(
          "w-[80px]", "h-[120px]", "object-contain", "flex-shrink-0", "rounded", "shadow-lg"
        );
      } else {
        imageOrPlaceholder = document.createElement("div");
        imageOrPlaceholder.textContent = "No Image";
        imageOrPlaceholder.classList.add(
          "w-[80px]", "h-[120px]", "flex-shrink-0", "rounded", "bg-gray-600",
          "flex", "items-center", "justify-center", "text-gray-400",
          "text-xs", "text-center", "p-1"
        );
      }

      bookDiv.appendChild(imageOrPlaceholder);
      bookDiv.appendChild(textContainerDiv);

      if (infoLink) {
        bookDiv.classList.add(
          "cursor-pointer", "hover:scale-[1.03]", "hover:shadow-lg", "hover:bg-[#ecdfcc20]"
        );
        bookDiv.addEventListener('click', () => { window.open(infoLink, '_blank'); });
      }
    } else {
      // Fallback for missing book data
      bookDiv.classList.add("justify-center", "items-center");
      bookDiv.classList.remove("items-start", "gap-x-4");
      const placeholderText = document.createElement("p");
      placeholderText.textContent = "Book data unavailable";
      placeholderText.classList.add("text-center", "text-gray-400", "px-4");
      bookDiv.appendChild(placeholderText);
      // Add default data for sorting consistency
      bookDiv.dataset.title = "zzz";
      bookDiv.dataset.publishedDate = "N/A";
      console.warn("Missing volumeInfo for a book:", book);
    }
    return bookDiv;
  }

  /**
   * Creates and returns a DOM element for a pagination button.
   */
  function createPaginationButton(config) {
    const button = document.createElement("button");
    button.textContent = config.text;
    button.classList.add(
      "cursor-pointer", "h-10", "rounded-md", "border", "border-[#ecdfcc95]",
      "transition-colors", "duration-200"
    );

    button.classList.add(config.isNav ? "w-20" : "w-10");
    if (config.isNav) button.classList.add("font-honda");

    if (config.isDisabled) {
      button.classList.add("opacity-50", "cursor-not-allowed", "bg-black", "text-white");
      button.disabled = true;
    } else if (config.isActive) {
      button.classList.add("bg-[#ECDFCC]", "text-black", "cursor-default", "font-bold");
      button.disabled = true;
    } else if (config.isEllipsis) {
        button.classList.add("bg-black", "text-white", "cursor-default");
        button.disabled = true;
    } else { // Default clickable button
      button.classList.add("bg-black", "text-white", "hover:bg-gray-600");
      if (config.onClick) {
        button.addEventListener("click", config.onClick);
      }
    }
    return button;
  }

  /**
   * Fetches books from the API for a specific page and updates the display.
   */
  function fetchBooks(page) {
    booksContainer.innerHTML = '<p class="text-center text-gray-400 w-full py-10">Loading books...</p>';
    paginationContainer.innerHTML = "";
    sortSelect.value = ""; // Reset sort dropdown
    searchInput.value = ""; // Reset search input
    noResultsMessage.classList.add('hidden'); // Hide no results message

    fetch(`https://api.freeapi.app/api/v1/public/books?limit=15&page=${page}`)
      .then((response) => {
         if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
         return response.json();
      })
      .then((res) => {
        if (!res || !res.success || !res.data || !res.data.data) {
          console.error("API did not return successful data:", res);
          booksContainer.innerHTML = '<p class="text-center text-red-500 w-full py-10">Error loading books. Please try again.</p>';
          return;
        }

        booksContainer.innerHTML = ""; // Clear loading message
        totalPages = res.data.totalPages || 1;
        pageNo = res.data.page || 1;

        if (res.data.data.length === 0) {
           booksContainer.innerHTML = '<p class="text-center text-gray-400 w-full py-10">No books found on this page.</p>';
        } else {
            res.data.data.forEach((book) => {
              const bookElement = createBookCardElement(book);
              booksContainer.appendChild(bookElement);
            });
        }
        updatePaginationButtons(); // Update pagination after books are loaded
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        booksContainer.innerHTML = `<p class="text-center text-red-500 w-full py-10">Failed to load books: ${error.message}. Please try again later.</p>`;
        paginationContainer.innerHTML = ""; // Clear pagination on error
      });
  }

  /**
   * Generates and displays the pagination buttons based on current page and total pages.
   */
  function updatePaginationButtons() {
    paginationContainer.innerHTML = ""; // Clear existing buttons

    // Previous Button
    paginationContainer.appendChild(createPaginationButton({
        text: "Previous", isNav: true, isDisabled: pageNo <= 1,
        onClick: () => { if (pageNo > 1) fetchBooks(pageNo - 1); }
    }));

    // Page Number Logic (with ellipsis)
    let maxContiguousButtons = 5; // Max number buttons shown directly (e.g., 3,4, *5*, 6,7)
    let totalPagesToShow = totalPages > 0 ? totalPages : 1; // Ensure at least 1 page for calc
    let startPage, endPage;

    if (totalPagesToShow <= maxContiguousButtons + 2) { // Show all pages if few enough
      startPage = 1;
      endPage = totalPagesToShow;
    } else { // Determine start/end with ellipsis logic
      const sides = Math.floor((maxContiguousButtons - 1) / 2);
      if (pageNo <= sides + 1) { // Near the beginning
        startPage = 1;
        endPage = maxContiguousButtons;
      } else if (pageNo >= totalPagesToShow - sides) { // Near the end
        startPage = totalPagesToShow - maxContiguousButtons + 1;
        endPage = totalPagesToShow;
      } else { // In the middle
        startPage = pageNo - sides;
        endPage = pageNo + sides;
      }
    }

    // Add first page & ellipsis if needed
    if (startPage > 1) {
       paginationContainer.appendChild(createPaginationButton({ text: "1", onClick: () => fetchBooks(1) }));
      if (startPage > 2) {
        paginationContainer.appendChild(createPaginationButton({ text: "...", isEllipsis: true }));
      }
    }

    // Add the main range of page numbers
    for (let i = startPage; i <= endPage; i++) {
       paginationContainer.appendChild(createPaginationButton({
           text: i.toString(),
           isActive: i === pageNo,
           onClick: () => { if (i !== pageNo) fetchBooks(i); }
       }));
    }

    // Add last page & ellipsis if needed
    if (endPage < totalPagesToShow) {
      if (endPage < totalPagesToShow - 1) {
        paginationContainer.appendChild(createPaginationButton({ text: "...", isEllipsis: true }));
      }
      paginationContainer.appendChild(createPaginationButton({
          text: totalPagesToShow.toString(),
          onClick: () => fetchBooks(totalPagesToShow)
      }));
    }

    // Next Button
    paginationContainer.appendChild(createPaginationButton({
        text: "Next", isNav: true, isDisabled: pageNo >= totalPages,
        onClick: () => { if (pageNo < totalPages) fetchBooks(pageNo + 1); }
    }));
  }


  /**
   * Sorts the currently displayed book elements based on the selected dropdown option.
   */
  function sortBooks() {
      const sortBy = sortSelect.value;
      if (!sortBy) return; // Exit if default "Sort" is selected

      // Select only actual book card elements using the common class
      const bookElements = Array.from(booksContainer.querySelectorAll('.book-card-item'));

      if (bookElements.length < 2) return; // Need at least two items to sort

      bookElements.sort(function(elementA, elementB) {
          const titleA = elementA.dataset.title.toLowerCase();
          const titleB = elementB.dataset.title.toLowerCase();
          const dateStringA = elementA.dataset.publishedDate;
          const dateStringB = elementB.dataset.publishedDate;

          // Comparison logic using simplified if/else
          if (sortBy === 'A-Z') {
              if (titleA < titleB) return -1;
              if (titleA > titleB) return 1;
              return 0;
          } else if (sortBy === 'Z-A') {
              if (titleB < titleA) return -1;
              if (titleB > titleA) return 1;
              return 0;
          } else if (sortBy === 'Newest') {
              const dateValueA = parseSortableDate(dateStringA);
              const dateValueB = parseSortableDate(dateStringB);
              // Sort descending: higher timestamp (newer) comes first
              if (dateValueB > dateValueA) return 1;
              if (dateValueB < dateValueA) return -1;
              return 0;
          } else if (sortBy === 'Oldest') {
              const dateValueA = parseSortableDate(dateStringA);
              const dateValueB = parseSortableDate(dateStringB);
              // Sort ascending: lower timestamp (older) comes first
              if (dateValueA < dateValueB) return -1;
              if (dateValueA > dateValueB) return 1;
              return 0;
          } else {
              return 0; // No change for unknown sort type
          }
      });

      // Re-render the sorted elements
      booksContainer.innerHTML = ''; // Clear the container
      bookElements.forEach(function(element) {
          booksContainer.appendChild(element); // Append in sorted order
      });

      // Re-apply the current search filter after sorting
      filterBooksByTitle();
  }


  /**
   * Filters the currently displayed book elements based on the search input value.
   * Hides elements that do not match, shows those that do.
   */
  function filterBooksByTitle() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const bookElements = booksContainer.querySelectorAll('.book-card-item');
      let visibleCount = 0;

      bookElements.forEach(function(element) {
          const title = element.dataset.title.toLowerCase();
          const matches = title.includes(searchTerm);

          // Toggle visibility based on match
          element.classList.toggle('hidden', !matches);

          if (matches) {
              visibleCount++;
          }
      });

      // Show 'no results' message only if a search term is active and nothing matches
      const showNoResults = visibleCount === 0 && bookElements.length > 0 && searchTerm !== '';
      noResultsMessage.classList.toggle('hidden', !showNoResults);
  }


  // --- Initial Load ---
  fetchBooks(pageNo);

  // --- Event Listeners ---

  // View Switching
  listButton.addEventListener('click', () => {
      booksContainer.classList.remove(...gridClasses);
      booksContainer.classList.add(...listClasses);
      listButton.classList.add('bg-gray-700'); // Indicate active view
      gridButton.classList.remove('bg-gray-700');
  });
  gridButton.addEventListener('click', () => {
      booksContainer.classList.remove(...listClasses);
      booksContainer.classList.add(...gridClasses);
      gridButton.classList.add('bg-gray-700'); // Indicate active view
      listButton.classList.remove('bg-gray-700');
  });

  // Sorting
  sortSelect.addEventListener('change', sortBooks);

  // Live Search Filtering
  searchInput.addEventListener('input', filterBooksByTitle);

}); // End of DOMContentLoaded