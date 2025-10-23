import { useState } from 'react';

export default function NewsletterSignup() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        try{
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            })

            const data = await res.json();

            if(!res.ok){
                setStatus({type: "error", message: data.error || "Subscription" +
                        " Failed"});
            } else {
                setStatus({type: "success", message: "Check your email to" +
                        " confirm subscription."});
                setEmail("");
                setTimeout(() => setStatus(null), 3000)
            }
        } catch(err){
            setStatus({type: "error", message: "Something went wrong. Please" +
                    " try again."})
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    alignItems: "center",
                }}
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        flex: "1 1 200px",
                        minWidth: "300px",
                        maxWidth: "300px",
                        padding: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "0.9rem",
                    }}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: 'var(--mantine-color-blue-filled)',
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                    }}
                >
                    {isSubmitting ? "Joining..." : "Join my Newsletter"}
                </button>
            </form>

            {status && (
                <p
                    style={{
                        marginTop: "0.5rem",
                        fontSize: "0.85rem",
                        color: status.type === "error" ? "#d00" : "green",
                    }}
                >
                    {status.message}
                </p>
            )}
        </div>
    );
}