import Stripe from "stripe";
import { currentUser } from '@clerk/nextjs/server';
import { PLAN_LIMITS } from "@/lib/utils/constants/plan";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request) {

    const user = await currentUser();
    const userId = user?.id;

    try {
        const { credits } = await request.json(); // Parse JSON body

        // ✅ Set the credits here
        const priceMap = {
            9000: process.env.BASIC_MONTHLY_PLAN, // ✅ Use correct env variables
            27000: process.env.PROFESSIONAL_MONTHLY_PLAN,
            120000: process.env.ENTERPRISE_MONTHLY_PLAN,
            108000: process.env.BASIC_YEARLY_PLAN,
            324000: process.env.PROFESSIONAL_YEARLY_PLAN,
            1440000: process.env.ENTERPRISE_YEARLY_PLAN,
        };

        const selectedPriceId = priceMap[credits]; // Get correct Price ID

        const plan = PLAN_LIMITS[credits]?.name;

        console.log("Credits selected:", credits);
        console.log("Plans selected:", plan);
        console.log("Using Price ID:", selectedPriceId);

        if (!selectedPriceId) {
            return new Response(JSON.stringify({ error: "Invalid credit amount selected" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Assuming you have the email and userId
        const email = user?.emailAddresses[0]?.emailAddress || "example@gmail.com"; // Replace with actual email

        // Step 1: Search for an existing customer by email
        const customers = await stripe.customers.list({ email });
        let customer = customers.data.length > 0 ? customers.data[0] : null;

        // Step 2: Create customer if not found
        if (!customer) {
            console.log("Customer not found, creating a new one...");
            customer = await stripe.customers.create({
                email,
                metadata: { userId },  // Optionally store your system's userId in metadata for reference
            });
        } else {
            console.log("Found existing customer:", customer.id);
        }

        // Now, you can check customer.id and use it for payment
        const customerId = customer.id;
        console.log("Using customer ID:", customerId);

        // Continue with creating a payment session or any other Stripe operation


        const origin = request.headers.get("origin") || process.env.NEXT_APP_HOSTNAME;
        console.log("Request origin:", origin);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            client_reference_id: userId, // 👈 Clerk user ID
            line_items: [
                {
                    price: selectedPriceId, // Use correct Stripe Price ID
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer: customerId,           // Link the session to the customer ID
            metadata: {
                clerkUserId: userId,       // 👈 Optional: store it in metadata too
                plan: plan || 'FREE',                // get the correct plan name
                credits: credits            // provide credits 
            },
            success_url: `${origin}/`,
            cancel_url: `${origin}/`,
        });

        console.log("Stripe session created:", session);

        return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}