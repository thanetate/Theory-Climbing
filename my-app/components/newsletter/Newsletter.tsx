//Newsletter Component
'use client'
import { useState } from "react";
//import axios
import axios from "axios";

export default function NewsletterForm() {
	const [input, setInput] = useState(""); // State to store the input email address
	const [status, setStatus] = useState(""); // State to store status messages (success or error)
  
	// Function to handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
	  e.preventDefault(); // Prevent default form submission behavior
  
	  try {
		// Send a POST request to the API route with the email address
		const response = await axios.post('/api/subscribe', { email: input });
  
		// Check if the response status is 200 (OK)
		if (response.status === 200) {
		  setStatus('Subscribed successfully!'); // Set success message
		  setInput(''); // Clear the input field
		}
	  } catch (error) {
		// Handle errors if the subscription fails
		setStatus('Subscription failed. Please try again.'); // Set error message
		console.error('Subscription error:', error); // Log the error for debugging
	  }
	};


return (
	<div className="container" id="about">
	<div className="footer">
		<div className="newsletter">
			<div className="newsletter-left">
				<h2>Subsribe to our</h2>
				<h1>Newsletter</h1>
			</div>
			<div className="newsletter-right">
				<div className="newsletter-input">
					<input value={input} onChange={e => setInput(e.target.value)} type="email" placeholder="Email Address" required />
					<button>Submit</button>
				</div>
			</div>
		</div>
	</div>
</div>
);
}
