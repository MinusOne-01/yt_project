export default async function getSummary(transcript) {
  try {
    console.log("Summaryhook hit");
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });

    const data = await res.json();
    if (data.summary) {
      return data.summary;
    } else {
      return "Could not generate summary.";
    }
  } catch (err) {
    console.error("Summarization failed:", err);
    return "Error generating summary.";
  }
}
