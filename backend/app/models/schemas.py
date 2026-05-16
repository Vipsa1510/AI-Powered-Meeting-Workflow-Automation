from pydantic import BaseModel
from typing import List


class ActionItem(BaseModel):
    description: str
    assignee: str
    deadline: str


class MeetingResponse(BaseModel):
    summary: str
    action_items: List[ActionItem]
    decisions: List[str]


class EmailResponse(BaseModel):
    email: str