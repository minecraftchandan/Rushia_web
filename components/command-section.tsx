interface Command {
  name: string
  description: string
  usage: string
  details: string
}

interface CommandSectionProps {
  title: string
  description: string
  commands: Command[]
}

export function CommandSection({ title, description, commands }: CommandSectionProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        {commands.map((command) => (
          <div key={command.name} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border bg-muted/50 px-4 py-3">
              <code className="font-mono text-sm font-medium text-primary">{command.name}</code>
              <span className="ml-3 text-sm text-muted-foreground">{command.description}</span>
            </div>
            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs font-medium uppercase text-muted-foreground">Usage</span>
                <code className="ml-2 rounded bg-muted px-2 py-1 font-mono text-xs text-foreground">
                  {command.usage}
                </code>
              </div>
              <p className="text-sm text-muted-foreground">{command.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
