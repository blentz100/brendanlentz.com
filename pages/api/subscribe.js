export default async function handler(req, res) {
    if(req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
    }

    const {email: email_address} = req.body

    if (!email_address){
        return res.status(400).json({ error: "Missing email field"})
    }

    try {
        // Step 1: Create the subscriber
        const createResponse = await fetch(
            `https://api.convertkit.com/v4/subscribers`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Kit-Api-Key": process.env.CONVERTKIT_API_KEY
                },
                body: JSON.stringify({
                    email_address,
                    state: "inactive"
                })
            }
        )
        const subscriberData = await createResponse.json();

        if(!createResponse.ok){
            return res.status(createResponse.status).json({
                error: subscriberData.error ?? "Error creating subscriber",
                details: subscriberData,
            })
        }
        // Step 2: Add subscriber to form
        const formRes = await fetch(
            `https://api.kit.com/v4/forms/${process.env.CONVERTKIT_FORM_ID}/subscribers`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Kit-Api-Key": process.env.CONVERTKIT_API_KEY,
                },
                body: JSON.stringify({
                    email_address,
                })
            }
        );

        const formData = await formRes.json();

        if (!formRes.ok) {
            return res.status(formRes.status).json({
                error: formData.error ?? "Error adding subscriber to form",
                details: formData,
            });
        }

        return res.status(200).json({
            message: "Subscriber added successfully!",
            subscriber: subscriberData.subscriber,
            form: formData,
        });
    } catch (err) {
        console.error("ConvertKit API error:", err);
        return res.status(500).json({ error: err.message });
    }
}