"use server";

export async function searchAction(formData: FormData) {
    const query = formData.get("text");

    // Validate form data
    if (!query) {
        console.error("Buscar error: Buscar query is required");
        return;
    }

    if (typeof query !== "string" || query.trim().length === 0) {
        console.error("Buscar error: Invalid search query");
        return;
    }

    try {
        // Simulate search process
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Here you would typically:
        // 1. Buscar through database
        // 2. Filter results based on query
        // 3. Return search results
        // 4. Log the search query

        console.log("Buscar performed:", { query: query.trim() });
    } catch (error) {
        console.error("Buscar error:", error);
    }
}
