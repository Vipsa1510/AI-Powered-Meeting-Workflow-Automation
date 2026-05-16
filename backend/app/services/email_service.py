'''import google.generativeai as genai

from app.core.config import settings
from app.core.prompts import EMAIL_PROMPT


genai.configure(
    api_key=settings.GEMINI_API_KEY
)

model = genai.GenerativeModel(
    settings.MODEL_NAME
)


class EmailService:

    @staticmethod
    def generate_email(summary, action_items):

        prompt = EMAIL_PROMPT.format(
            summary=summary,
            action_items=action_items
        )

        response = model.generate_content(
            prompt
        )
        cleaned_email = response.text.replace("**", "")

        return cleaned_email
        #return response.text'''

from google import genai

from app.core.config import settings
from app.core.prompts import EMAIL_PROMPT


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


class EmailService:

    @staticmethod
    def generate_email(summary, action_items):

        prompt = EMAIL_PROMPT.format(
            summary=summary,
            action_items=action_items
        )

        response = client.models.generate_content(
            model=settings.MODEL_NAME,
            contents=prompt
        )

        cleaned_email = (
            response.text
            .replace("**", "")
            .replace("*", "")
            .replace("```", "")
        )

        return cleaned_email