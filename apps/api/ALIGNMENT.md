# Frontend-Backend Alignment

## ✅ Backend Now Matches Frontend

The backend GraphQL schema has been updated to align with the frontend's `BlogContentModel` interface.

### Field Mapping

| Frontend (BlogContentModel) | Backend (Post GraphQL Type) | Status |
|----------------------------|----------------------------|--------|
| `id` | `id: ID!` | ✅ Matched |
| `title` | `title: String!` | ✅ Matched |
| `content` | `content: String!` | ✅ Matched |
| `author: { name, title, bio, img }` | `author: Author` (object) | ✅ Matched |
| `date` | `date: String` (mapped from `publish_date`) | ✅ Matched |
| `introText` | `introText: String` | ✅ Matched |
| `img` | `img: String` | ✅ Matched |
| `imgAlt` | `imgAlt: String` | ✅ Matched |
| `imgCaption` | `imgCaption: String` | ✅ Matched |
| `imgTitle` | `imgTitle: String` | ✅ Matched |
| `imgCredit` | `imgCredit: String` | ✅ Matched |
| `imgCreditLink` | `imgCreditLink: String` | ✅ Matched |
| `imgCreditLinkTitle` | `imgCreditLinkTitle: String` | ✅ Matched |
| `tags: string[]` | `tags: [String]` | ✅ Matched |

### Key Features

1. **Author Object Support**: The backend now returns an `Author` object instead of a string, matching the frontend's `Partial<Author>` type.

2. **Date Mapping**: The backend automatically maps `publish_date` to `date` for frontend compatibility, while maintaining backward compatibility.

3. **Field Resolvers**: 
   - `author` resolver handles both string and object formats from the database
   - `date` resolver maps `publish_date` to `date` if needed

4. **Data Transformation**: The `transformPost` method ensures:
   - Tags are always returned as arrays
   - Date fields are properly mapped
   - All fields match the frontend's expected structure

### GraphQL Queries & Mutations

All mutations now support the full set of fields:

**Create Post:**
```graphql
mutation {
  createPost(
    title: "My Post"
    content: "Content here"
    date: "2025-01-15"
    introText: "Intro"
    img: "image.jpg"
    tags: ["tech", "angular"]
    # ... all other fields
  ) {
    id
    title
    # ... all fields
  }
}
```

**Update Post:**
```graphql
mutation {
  updatePost(
    id: "123"
    title: "Updated Title"
    tags: ["updated"]
    # ... any fields to update
  ) {
    id
    title
    # ... all fields
  }
}
```

### Database Schema Considerations

**Note**: Your Supabase `posts` table should have columns for all these fields:
- `id`, `title`, `content`
- `author` (can be JSONB for object or text for string)
- `date` or `publish_date` (both supported)
- `introText`, `img`, `imgAlt`, `imgCaption`, `imgTitle`
- `imgCredit`, `imgCreditLink`, `imgCreditLinkTitle`
- `tags` (should be JSONB array or text array)

If your database schema doesn't have all these columns yet, you may need to:
1. Add migrations to add missing columns
2. Or the backend will work with whatever columns exist (missing fields will be `null`)

### Next Steps

1. **Update Database Schema** (if needed): Ensure your Supabase `posts` table has all the required columns.

2. **Frontend Integration**: The frontend can now directly use the GraphQL API:
   ```typescript
   // Example query
   query {
     posts {
       id
       title
       content
       date
       author {
         name
         title
         bio
         img
       }
       tags
       img
       imgAlt
       # ... all fields
     }
   }
   ```

3. **Test the Integration**: 
   - Start the backend: `npm run start:api`
   - Visit GraphQL Playground: `http://localhost:3333/api/graphql`
   - Test queries and mutations

The backend is now fully aligned with your frontend's data model! 🎉

