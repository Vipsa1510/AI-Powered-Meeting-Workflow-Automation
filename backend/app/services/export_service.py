class ExportService:

    @staticmethod
    def generate_markdown(data):
        md = f"# Meeting Summary\n\n{data['summary']}\n\n"

        md += "## Action Items\n"

        for item in data["action_items"]:
            md += (
                f"- {item['description']} "
                f"(Assignee: {item['assignee']}, "
                f"Deadline: {item['deadline']})\n"
            )

        md += "\n## Decisions\n"

        for decision in data["decisions"]:
            md += f"- {decision}\n"

        return md