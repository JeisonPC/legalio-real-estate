"use server";

export async function subscribeNewsletter(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");

    // Validate form data
    if (!name) {
        console.error("Newsletter error: Name is required");
        return;
    }

    if (!email) {
        console.error("Newsletter error: Email is required");
        return;
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        console.error("Newsletter error: Please enter a valid name");
        return;
    }

    if (typeof email !== "string" || !email.includes("@")) {
        console.error("Newsletter error: Please enter a valid email address");
        return;
    }

    try {
        // Simulate newsletter subscription
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would typically:
        // 1. Check if email already subscribed
        // 2. Add email to newsletter database
        // 3. Send confirmation email
        // 4. Log the subscription

        console.log("Newsletter subscription successful:", { name, email });
    } catch (error) {
        console.error("Newsletter subscription error:", error);
    }
}
