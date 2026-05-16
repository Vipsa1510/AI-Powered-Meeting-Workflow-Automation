MEETING_ANALYSIS_PROMPT = """
You are an enterprise meeting assistant.

Analyze the meeting transcript and generate structured JSON.

Return ONLY valid JSON.

Schema:
{
    "summary": "",
    "action_items": [
    {
      "description": "",
      "assignee": "",
      "deadline": ""
    }
  ],
  "decisions": []
}

Rules:
- Summary must be 3-4 sentences.
- Extract all action items.
- Detect assignee names from context.
- If deadline not available use "Not Mentioned".
- Keep decisions concise.
"""


EMAIL_PROMPT = """
Generate a professional follow-up email using:

Summary:
{summary}

Action Items:
{action_items}
"""