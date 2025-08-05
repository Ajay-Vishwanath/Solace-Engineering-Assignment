## Options for Next Steps (Given More Time)

- **Tests**  
  - Add a test for the `GET /advocates` endpoint to ensure it retrieves advocates and handles search/filtering logic
  - Consider frontend integration tests using Jest (e.g., search flow, data rendering)

- **Refactor CSS**  
  - Split styles into separate files for:
    - Layout
    - Home page
    - Search component
    - Table component  
  - Migrate to SCSS to enable nesting and reusable mixins

- **Add Database Indexing**  
  - Create indexes on relevant fields to speed up search queries as the number of advocates scales up

- **Add Pagination**  
  - Implement pagination for the advocate search results to improve UX and reduce load

- **Introduce Caching (e.g., Redis)**  
  - Use Redis to cache expensive DB queries
  - I don't have deep experience with caching so this would be good for me to learn, I’ve worked with Sidekiq and Redis in other contexts
