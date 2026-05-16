from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    GEMINI_API_KEY: str
    MODEL_NAME: str

    class Config:
        env_file = ".env"


settings = Settings()
print("MODEL LOADED:", settings.MODEL_NAME)