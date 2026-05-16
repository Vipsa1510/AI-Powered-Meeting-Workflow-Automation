import json

from google import genai

from app.core.config import settings


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


class LLMService:

    @staticmethod
    def analyze_meeting(transcript: str):

        prompt = f"""
        Analyze this meeting transcript.

        Return ONLY valid JSON.

        Format:

        {{
          "summary": "short summary",

          "action_items": [
            {{
              "owner": "person name",
              "task": "task description",
              "deadline": "deadline if mentioned otherwise No Deadline"
            }}
          ],

          "decisions": [
            "decision 1",
            "decision 2"
          ]
        }}

        Transcript:
        {transcript}
        """

        response = client.models.generate_content(
            model=settings.MODEL_NAME,
            contents=prompt
        )

        content = response.text

        print("RAW RESPONSE:")
        print(content)

        # CLEAN MARKDOWN
        content = (
            content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        try:

            parsed = json.loads(content)

            return parsed

        except Exception as e:

            print("JSON ERROR:", str(e))

            return {
                "summary": content,
                "action_items": [],
                "decisions": []
            }