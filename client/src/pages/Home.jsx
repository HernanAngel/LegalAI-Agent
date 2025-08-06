import { useState } from "react"; 

function Home(){ 
    const [inputText, SetInputText] = useState(""); 
    const [outputText, setOutputText] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 

    const handleExplain = async () => {
        if (inputText.trim().length < 20) {
        setError("Please paste more detailed legal text.");
        return;
        }

        setLoading(true);
        setError("");
        setOutputText("");

        try {
        const res = await fetch("http://localhost:5000/api/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputText }),
        });

        const data = await res.json();

        if (res.ok) {
            setOutputText(data.explanation);
        } else {
            setError(data.error || "Something went wrong.");
        }
        } catch (err) {
        console.error(err);
        setError("Failed to connect to server.");
        } finally {
        setLoading(false);
        }
    };
  return ( 
    <div className= "flex h-screen bg-gray-950 text-white"> 
    {/* Sidebar*/}
    <aside className="w-60 bg-gray-900 border-r border-gray-800 p-4 flex flex-col justify-between">
        <div> 
            {/* Mode buttons placeholder */} 
            <div className="space-y-2"> 
                <button className="w-full text-left px-3 py-2 rounded-lg bg-gray-800 hover:bg-blue-600 transition">
                    🧠 Case Strategy
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg bg-gray-800 hover:bg-blue-600 transition">
                    📄 Document Review
                </button>
            </div>
        </div>

        {/* Footer/branding */ }
        <div className="text-xs text-gray-400">© 2025 LegalAI</div>
    </aside>

    {/* Main panel*/}
    <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
            {/* Chat will render here */}
        </div>
        <div className = "border-t border-gray-800 p-4 bg-gray-900">
            {/* Input Bar */}
            <div className="flex items-center gap-2">
                <input 
                    type="text"
                    placeholder="Type your legal question.."
                    className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg ">
                Send
            </button>
            </div>
        </div>
    </main>
</div> 
  ); 
}

export default Home; 
