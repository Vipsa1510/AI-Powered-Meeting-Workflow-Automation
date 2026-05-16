from fastapi import UploadFile


async def read_uploaded_file(
    file: UploadFile
) -> str:

    try:

        content = await file.read()

        text = content.decode(
            "utf-8",
            errors="ignore"
        )

        return text

    except Exception as e:

        print("FILE READ ERROR:", str(e))

        return ""